'use client'
import MainCalendar from "@/components/Calendar/Calendar.jsx"
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import SignUp from "@/app/SignUp";
import Login from "@/app/Login";
import AddEvent from "@/app/Event";


export default function Home() {
  // const handleGoogle = async (e) => {
  //     const provider = new GoogleAuthProvider();
  //     return signInWithPopup(auth, provider);
  //   }
  // 

  return (
    <div className="">
      <MainCalendar />
      <SignUp />
      <Login />
      <AddEvent />
    </div>
  );

}