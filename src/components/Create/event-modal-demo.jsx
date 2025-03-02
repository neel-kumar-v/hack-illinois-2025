"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import EventModal from "./Create"

const difficultyTimeEstimates = {
  easy: "1-2 hours",
  medium: "3-4 hours",
  hard: "5+ hours",
}

const users = [
  { value: "user1", label: "User 1" },
  { value: "user2", label: "User 2" },
  // Add more users as needed
]

export default function EventModalDemo() {
  const [open, setOpen] = useState(false)
  const [eventData, setEventData] = useState(null)

  const handleSave = (data) => {
    console.log("Event saved:", data)
    setEventData(data)
  }

  return (
    (<div className="p-6 max-w-md mx-auto">
      <Button onClick={() => setOpen(true)}>Create New Event</Button>
      <EventModal open={open} onOpenChange={setOpen} onSave={handleSave} />
      {eventData && (
        <div className="mt-6 p-4 border rounded-md">
          <h3 className="font-medium mb-2">Last Created Event:</h3>
          <p>
            <strong>Title:</strong> {eventData.title}
          </p>
          <p>
            <strong>Color:</strong> {eventData.color}
          </p>
          <p>
            <strong>Start:</strong> {eventData.start?.toString()}
          </p>
          <p>
            <strong>End:</strong> {eventData.end?.toString()}
          </p>
          <p>
            <strong>Difficulty:</strong> {eventData.difficulty} ({difficultyTimeEstimates[eventData.difficulty]})
          </p>
          <p>
            <strong>Finished:</strong> {eventData.isFinished ? "Yes" : "No"}
          </p>
          <p>
            <strong>Block Out:</strong> {eventData.isBlockOut ? "Yes" : "No"}
          </p>
          <p>
            <strong>Assigned Users:</strong>{" "}
            {eventData.assignedUsers.length > 0
              ? eventData.assignedUsers.map((id) => users.find((u) => u.value === id)?.label).join(", ")
              : "None"}
          </p>
          <p>
            <strong>Tags:</strong> {eventData.tags.join(", ") || "None"}
          </p>
        </div>
      )}
    </div>)
  );
}

