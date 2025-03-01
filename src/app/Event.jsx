import React from 'react';
import { auth, provider, db, doc, setDoc, addDoc } from "@/firebase/firebaseConfig.js";
import { v4 as uuidv4 } from 'uuid';

const AddEvent = () => {
    const AddEventToDB = async () => {
        try {
            const user = auth.currentUser;
            const uniqueId = uuidv4(); // Generate a unique ID
            if (user) {
                // User is signed in, get user details
                const eventData = {
                    category: "Sample Event",
                    end: new Date().toISOString(),
                    start: "Sample Location",
                    tags: "This is a sample event description",
                    user: user.uid,
                    // createdByName: user.displayName
                };
                await setDoc(doc(db, "events", uniqueId), eventData);
                console.log("Event added:", eventData);
            } else {
                console.log("No user is signed in");
            }
        } catch (error) {
            console.error("Error adding event to Firestore", error);
        }
    };

  return (
    <div>
      <button onClick={AddEventToDB}>Add Event</button>
    </div>
  );
};

export default AddEvent;