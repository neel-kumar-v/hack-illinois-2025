// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, addDoc } from "firebase/firestore"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfQpDXpeP7Cxrxbn5On_u7q0ekdpLIuuY",
  authDomain: "taskoverflow-7d65a.firebaseapp.com",
  databaseURL: "https://taskoverflow-7d65a-default-rtdb.firebaseio.com",
  projectId: "taskoverflow-7d65a",
  storageBucket: "taskoverflow-7d65a.firebasestorage.app",
  messagingSenderId: "258675631688",
  appId: "1:258675631688:web:6e8db4eb95397694009a7d",
  measurementId: "G-TRBQ1PR3Y5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {

      const user = result.user;
      // console.log(user)
      // Store user data in Firesto"re
      console.log("Writing user to Firestore:", user.uid);
      setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.displayName,
        productivity: 0,
        profilePic: user.photoURL
      });

      console.log(result.user);
      return result;
    })
    .catch((error) => {
      console.error(error);
    });
};

const getUserEvents = async () => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const eventIds = user.events;
  } catch (error) {
    console.error("Error getting events: ", error);
    throw error;
  }
  for (let i = 0; i < eventIds.length; i++) {
    const eventId = eventIds[i];
    const eventRef = doc(db, "events", eventId);
    const eventSnap = await getDoc(eventRef);
    if (eventSnap.exists()) {
      console.log("Event data:", eventSnap.data());
    } else {
      console.log("No such event!");
    }
  }
  return eventIds;
};

const logout = () => {
  signOut(auth)
  window.refresh()
  console.log("logged out")
}

getUserEvents();

// Export the required Firebase services
export { app, auth, provider, db, analytics, signInWithGoogle, doc, setDoc, addDoc, logout };