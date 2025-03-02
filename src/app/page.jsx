'use client'
import MainCalendar from "@/components/Calendar/Calendar.jsx"
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import SignUp from "@/components/SignUp";
import Login from "@/components/Login";
import AddEvent from "@/app/Event";
import AddTask from "@/app/Task";
import ICS_Events from "@/app/ICS_Events";



export default function Home() {

  return (
    <>
      <MainCalendar />
      <AddEvent />
      <AddTask />
      <ICS_Events />
    </>
  );

}