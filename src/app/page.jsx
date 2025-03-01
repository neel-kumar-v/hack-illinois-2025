'use client'
import MainCalendar from "@/components/Calendar/Calendar.jsx"
import Auth from "@/app/Auth";
import AddEvent from "@/app/Event";
import AddTask from "@/app/Task";
import ICS_Events from "@/app/ICS_Events";


export default function Home() {

  return (
    <div className="">
      <MainCalendar />
      <Auth />
      <AddEvent />
      <AddTask />
      <ICS_Events />
    </div>
  );

}