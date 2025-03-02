'use client'
import MainCalendar from "@/components/Calendar/Calendar.jsx"
import Auth from "@/app/Auth";
import AddEvent from "@/app/Event";
import AddTask from "@/app/Task";
import ICS_Events from "@/app/ICS_Events";


export default function Home() {
  const icsUrl = "./example.ics";

  return (
    <div className="">
      <MainCalendar />
      <Auth />
      <AddTask />
      <ICS_Events icsUrl = {icsUrl}/>
    </div>
  );

}