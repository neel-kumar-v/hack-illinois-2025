'use client'
import React from 'react';
import { Button } from "@/components/ui/button"
import { signInWithGoogle } from '@/firebase/firebaseConfig';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  return (
    <div>
      <Button onClick={signInWithGoogle} variant="outline" className="w-full cursor-pointer">
      <FaGoogle></FaGoogle>
                  Login with Google
                </Button>
      {/* <button onClick={signInWithGoogle}>  Login with Google</button> */}
    </div>
  );
};

export default Login;