import React, { Component, useState, useCallback, useMemo, cloneElement } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faL } from '@fortawesome/free-solid-svg-icons'
import { DateRangeSlideTabs, DateNavigatorSlideTabs } from "../SlideTabs/SlideTabs";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css"

import './index.css'

const DNDCalendar = withDragAndDrop(Calendar)
const events = [ 
  { 
    id: 1,
    start: moment("2025-03-18T10:00:00").toDate(), 
    end: moment("2025-03-18T11:00:00").toDate(), 
    title: "Event 1", 
  }, 
  { 
    id: 2,
    start: moment("2025-03-18T14:00:00").toDate(), 
    end: moment("2025-03-18T15:30:00").toDate(), 
    title: "Event 2", }, 
  { 
    id: 3,
    start: moment("2025-03-12T14:00:00").toDate(), 
    end: moment("2025-03-12T15:30:00").toDate(), 
    title: "Event 3", 
  }, 
  { 
    id: 4,
    start: moment("2025-03-13T14:00:00").toDate(), 
    end: moment("2025-03-13T15:30:00").toDate(), 
    title: "Event 4", 
  }, 
];





const localizer = momentLocalizer(moment);
export default function MainCalendar() {
  const [myEvents, setMyEvents] = useState(events)
  const [date, setDate] = useState(moment().toDate());
  const [view, setView] = useState(Views.WEEK);
  const [contextMenuInfo, setContextMenuInfo] = useState({ 
    xPosition: 0, 
    yPosition: 0, 
    selectedTime: null, 
    resourceId: null 
  });

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      if (allDay && !droppedOnAllDaySlot) {
          event.allDay = false;
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, allDay: event.allDay }]
      })
    },
    [setMyEvents]
  )

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      console.log(start, end)
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setMyEvents]
  )

  const onPrevClick = useCallback(() => {
    setDate(prevDate => {
      if (view === Views.DAY) return moment(prevDate).subtract(1, "d").toDate();
      if (view === Views.WEEK) return moment(prevDate).subtract(1, "w").toDate();
      return moment(prevDate).subtract(1, "M").toDate();
    });
  }, [view]);

  const onNextClick = useCallback(() => {
    setDate(prevDate => {
      if (view === Views.DAY) return moment(prevDate).add(1, "d").toDate();
      if (view === Views.WEEK) return moment(prevDate).add(1, "w").toDate();
      return moment(prevDate).add(1, "M").toDate();
    });
  }, [view]);

  const dateText = useMemo(() => {
    if (view === Views.DAY) return moment(date).format("dddd, MMMM DD");
    if (view === Views.WEEK) {
      const from = moment(date).startOf("week");
      const to = moment(date).endOf("week");
      return `${from.format("MMMM DD")} - ${to.format("MMMM DD")}`;
    }
    return moment(date).format("MMMM YYYY");
  }, [view, date]);

  const onTodayClick = useCallback(() => {
    setDate(moment().toDate());
  }, [])

  const components = {
    timeSlotWrapper: ({
      children,
      value,
      resource,
    }) => {
      return (
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation(); // Add this to stop event bubbling
            setContextMenuInfo({
              xPosition: e.clientX,
              yPosition: e.clientY,
              selectedTime: value,
              resourceId: resource,
            });
            return false; // Additional prevention measure
          }}
        >
          {children}
        </div>
      );
  
    },
  }

  const VIEW_OPTIONS = [
    { id: Views.DAY, label: "Day" },
    { id: Views.WEEK, label: "Week" },
    { id: Views.MONTH, label: "Month" },
  ];
  
  const DATE_NAVIGATOR_OPTIONS = [
    {
      id: "Prev", 
      onclick: onPrevClick,
      children: <FontAwesomeIcon icon={faArrowLeft} />,
    },
    
    {
      id: "Today", 
      onclick: () => setDate(moment().toDate()),
      children: "Today",
    },
    
    {
      id: "Next",
      onclick: onNextClick,
      children: <FontAwesomeIcon icon={faArrowRight} />,
    }
  ]
  

  return (
    <div className="flex flex-col h-screen w-full gap-2 p-2">
      <div className="flex justify-between items-center">
        <div className="w-[45%]">
          <DateRangeSlideTabs
            viewOptions={VIEW_OPTIONS}
            onclick={setView}
          />
        </div>

        <div className="flex justify-center items-center gap-x-2">
          <DateNavigatorSlideTabs
            navOptions={DATE_NAVIGATOR_OPTIONS}
          />
        </div>

        <div className="ml-auto px-4 py-2 transition-all hover:bg-black/10 text-black rounded text-center w-fit">
          {dateText}
        </div>
      </div>
      <DNDCalendar
        events={myEvents}
        localizer={localizer}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        resizable={true}
        toolbar={false}
        date={date}
        onView={setView}
        view={view}
        onNavigate={setDate}
        components={components}
      />
    </div>
  )
}
