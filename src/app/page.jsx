import MainCalendar from "@/components/Calendar/Calendar.jsx"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { LoginForm } from "@/components/login-form"
import {AddEvent} from "@/app/Event";
import AddTask from "@/app/Task";
import ICS_Events from "@/app/ICS_Events";



export default function Home() {
  const icsUrl = "./example.ics";

  return (
    <>
    <ICS_Events icsUrl="./example.ics"/>
    <AddTask />
    {/* <MainCalendar /> */}
      {/* <AddEvent /> */}
      <AddTask />
      <ICS_Events />
    </>
  );

}