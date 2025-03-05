'use client'
import MainCalendar from "@/components/Calendar/Calendar.jsx"
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import AddTask from "@/app/Task";

export default function Home() {
  // const handleGoogle = async (e) => {
  //     const provider = new GoogleAuthProvider();
  //     return signInWithPopup(auth, provider);
  //   }
  // 

  return (
    <>
      <AddTask />
      <MainCalendar />
    </>
  );

}