// src/components/SignUp.jsx
import React from "react";
import {auth, provider, db, signInWithGoogle, doc, setDoc} from "@/firebase/firebaseConfig.js";

const SignUp = () => {
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithGoogle(auth, provider);
      
      console.log("User signed up:", user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
    </div>
  );
};

export default SignUp;

