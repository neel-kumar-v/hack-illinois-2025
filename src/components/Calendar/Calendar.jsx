'use client'
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
import EventModal from "../Create/Create";
import { time } from "framer-motion";

// Define event color options
const colorOptions = [
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "green", label: "Green", class: "bg-green-500" },
  { value: "red", label: "Red", class: "bg-red-500" },
  { value: "purple", label: "Purple", class: "bg-purple-500" },
  { value: "yellow", label: "Yellow", class: "bg-yellow-500" },
]

// Define available tags
const availableTags = [
  "Work",
  "Personal",
  "Meeting",
  "Important",
  "Reminder",
  "Travel",
  "Health",
  "Family"
]

// Define difficulty time estimates
const difficultyTimeEstimates = {
  1: "30 minutes",
  2: "1 hour",
  3: "2 hours",
  4: "3-4 hours",
  5: "5-6 hours",
  6: "6-7 hours",
  7: "7-8 hours",
  8: "8-9 hours",
  9: "9-10 hours",
  10: "10-12 hours",
}

// Sample users for the combobox
const users = [
  { value: "user1", label: "John Doe" },
  { value: "user2", label: "Jane Smith" },
  { value: "user3", label: "Robert Johnson" },
  { value: "user4", label: "Emily Davis" },
  { value: "user5", label: "Michael Wilson" },
  { value: "user6", label: "Sarah Brown" },
  { value: "user7", label: "David Miller" },
  { value: "user8", label: "Lisa Taylor" },
]

const DNDCalendar = withDragAndDrop(Calendar)
let baseEvents = [ 
  { 
    id: 1,
    start: moment("2025-03-18T10:00:00").toDate(), 
    end: moment("2025-03-18T11:00:00").toDate(), 
    title: "Event 1", 
    color: colorOptions[0].value,
    difficulty: 4,
    isBlockedOut: false,
    isFinished: false,
    assignedUsers: [
      users[0].value,
      users[1].value,
    ],
    tags: [
      availableTags[0],
      availableTags[1],
    ],
  }, 
  { 
    id: 2,
    start: moment("2025-03-18T14:00:00").toDate(), 
    end: moment("2025-03-18T15:30:00").toDate(), 
    title: "Event 2", 
    color: colorOptions[0].value,
    difficulty: 4,
    isBlockedOut: false,
    isFinished: false,
    assignedUsers: [
      users[0].value,
      users[1].value,
    ],
    tags: [
      availableTags[0],
      availableTags[1],
    ],
  }, 
  { 
    id: 3,
    start: moment("2025-03-12T14:00:00").toDate(), 
    end: moment("2025-03-12T15:30:00").toDate(), 
    title: "Event 3", 
    color: colorOptions[0].value,
    difficulty: 4,
    isBlockedOut: false,
    isFinished: false,
    assignedUsers: [
      users[0].value,
      users[1].value,
    ],
    tags: [
      availableTags[0],
      availableTags[1],
    ],
  }, 
  { 
    id: 4,
    start: moment("2025-03-13T14:00:00").toDate(), 
    end: moment("2025-03-13T15:30:00").toDate(), 
    title: "Event 4", 
    color: colorOptions[0].value,
    difficulty: 4,
    isBlockedOut: false,
    isFinished: false,
    assignedUsers: [
      users[0].value,
      users[1].value,
    ],
    tags: [
      availableTags[0],
      availableTags[1],
    ],
  }, 
];



const localizer = momentLocalizer(moment);

const TimeHeaderCell = ({ children, value }) => {
  const time = moment(value).format("hA");
  console.log("Time: ", time) 
  return (
    <div className="rbc-time-header-cell">
      {time}
    </div>
  );
};


export default function MainCalendar() {
  const components = {
    timeSlotWrapper: ({ children, value }) => {
      if (value.getHours() < 8 || value.getHours() > 18) {
        return <div style={{ background: "rgba(0, 0, 0, 0.05)" }}>{children}</div>
      }
      // console.log("Children: ", children.props.children)
      return children
    },
    timeHeaderCell: TimeHeaderCell,
    event: ({ event }) => {
      if (event?.color) {
        return (
          <div className={`rbc-event ${event.color}`}>
            {event.title}
          </div>
        )
      }
      if (event?.isBlockedOut) {
        return (
          <div className="rbc-event-blocked-out">
            {event.title}
          </div>
        )
      }
    }
  };
  const [events, setEvents] = useState(baseEvents)
  const [eventData, setEventData] = useState(null)
  const [date, setDate] = useState(moment().toDate());
  const [view, setView] = useState(Views.WEEK);

  const [contextMenu, setContextMenu] = useState(null);

  const [open, setOpen] = useState(false)

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      if (allDay && !droppedOnAllDaySlot) {
          event.allDay = false;
      }

      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, allDay: event.allDay }]
      })
    },
    [setEvents]
  )

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      console.log(start, end)
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setEvents]
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
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      console.log("Event selected:", start, end)
      setOpen(true)
      setEventData({ start: start, end: end })
    }, []
  )

  const handleSelectEvent = useCallback(
    (event) => {
      setEventData(event)
      console.log("Event selected:", eventData)
      setOpen(true)
    },
    []
  )

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: moment().toDate(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )

  const handleSave = (data) => {
    console.log("Event saved:", data)
    setEvents((prevEvents) => [...prevEvents, { ...data, id: prevEvents.length + 1 }])
    console.log(events)
  }

  return (
    <>
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
          events={events}
          localizer={localizer}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          resizable={true}
          toolbar={false}
          date={date}
          onView={setView}
          view={view}
          onNavigate={setDate}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
          components={components}
        />
      </div>
      <EventModal open={open} onOpenChange={setOpen} onSave={handleSave} event={eventData} />
    </>
  )
}


