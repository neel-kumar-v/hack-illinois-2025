import axios from "axios";
import ICAL from "ical.js";

const fetchICalEvents = async (icsUrl) => {
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
        start: eventObj.startDate.toJSDate(),
        end: eventObj.endDate.toJSDate(),
      };
    });
  } catch (error) {
    console.error("Error fetching ICS calendar:", error);
    return [];
  }
};

export default function ICS_Events() {
  const icsUrl = "./example.ics";
  return (
    <div>
      <button onClick={() => fetchICalEvents(icsUrl).then((events) => console.log(events))}>ics_events</button>
    </div>
  );
}