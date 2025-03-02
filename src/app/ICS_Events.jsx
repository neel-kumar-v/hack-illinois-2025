import axios from "axios";
import ICAL from "ical.js";
import { AddEventToDB } from "@/app/Event.jsx";

const fetchICalEvents = async (icsUrl) => {
    console.log(icsUrl);
  try {
    const response = await axios.get(icsUrl);
    const jcalData = ICAL.parse(response.data);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents("vevent");

    return vevents.map((event) => {
      const eventObj = new ICAL.Event(event);
      console.log(eventObj);
      return {
        id: eventObj.uid,
        title: eventObj.summary,
        description: eventObj.description,
        start: eventObj.startDate.toJSDate(),
        end: eventObj.endDate.toJSDate(),
        recurrenceRule: event.getFirstPropertyValue("rrule") ? event.getFirstPropertyValue("rrule").toString() : null,
        recurrenceId: event.getFirstPropertyValue("recurrence-id")
      };
    });
  } catch (error) {
    console.error("Error fetching ICS calendar:", error);
    return [];
  }
};

const populateICalEvents = async (icsUrl) => {
    const events = await fetchICalEvents(icsUrl);
    console.log(events);
    // Add events to Firestore
    events.forEach((event) => {
        //event.recurrenceRule, event.recurrenceId,
        console.log(event)
        AddEventToDB(event.title,event.description, event.start, event.end);
    });
    console.log("success!");
}

export default function ICS_Events({icsUrl}) {
  return (
    <div>
      <button onClick={() => populateICalEvents(icsUrl)}>ics_events</button>
    </div>
  );
}