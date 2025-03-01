// src/components/SignUp.jsx
'use client'
import React from "react";
import { Button } from "@/components/ui/button"
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
    <>
      <button onClick={handleGoogleSignUp} className="underline underline-offset-4 cursor-pointer">
        Sign Up
        </button>
      {/* <button onClick={handleGoogleSignUp}>Sign Up with Google</button> */}
    </>
  );
};

export default SignUp;

