"use client"

import { useState } from "react"
import { CalendarIcon, Check, Plus, X, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import {toast} from "sonner"

// Define event color options
const colorOptions = [
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "green", label: "Green", class: "bg-green-500" },
  { value: "red", label: "Red", class: "bg-red-500" },
  { value: "purple", label: "Purple", class: "bg-purple-500" },
  { value: "yellow", label: "Yellow", class: "bg-yellow-500" },
]

// Define available tags
const availableTags = ["Work", "Personal", "Meeting", "Important", "Reminder", "Travel", "Health", "Family"]

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

export default function EventModal({ open, onOpenChange, onSave, event }) {
  const [title, setTitle] = event ? useState(event.title) : useState("")
  const [color, setColor] = event ? useState(event.color) : useState(colorOptions[0].value)
  const [start, setStart] = event ? useState(event.start) : useState()
  const [end, setEnd] = event ? useState(event.end) : useState()
  const [tags, setTags] = event ? useState(event.tags) : useState([])
  const [newTag, setNewTag] = useState("")
  const [difficulty, setDifficulty] = event ? useState(event.difficulty) : useState(5)
  const [isFinished, setIsFinished] = event ? useState(event.isFinished) : useState(false)
  const [isBlockOut, setIsBlockOut] = event ? useState(event.isBlockOut) : useState(false)
  const [assignedUsers, setAssignedUsers] = event ? useState(event.assignedUsers) : useState([])
  const [userComboboxOpen, setUserComboboxOpen] = useState(false)

  const getToast = () => {
    console.log("toast created")
    return (
      toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
      
    )
  }
  const handleSave = () => {
    if (onSave) {
        printState()
      onSave({
        title,
        color,
        start,
        end,
        tags,
        difficulty,
        isFinished,
        isBlockOut,
        assignedUsers,
      })
    }
    resetForm()
    onOpenChange(false)

  }

  const printState = () => {
    console.log("Event has been created: ", {
        title,
        color,
        start,
        end,
        tags,
        difficulty,
        isFinished,
        isBlockOut,
        assignedUsers,
    })
  }

  const resetForm = () => {
    setTitle("")
    setColor(colorOptions[0].value)
    setStart(undefined)
    setEnd(undefined)
    setTags([])
    setNewTag("")
    setDifficulty(5)
    setIsFinished(false)
    setIsBlockOut(false)
    setAssignedUsers([])
  }

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
    printState();
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
    printState();
  }

  const addPredefinedTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
    }
    printState();
  }

  const toggleUser = (userId) => {
    setAssignedUsers((current) =>
      current.includes(userId) ? current.filter((id) => id !== userId) : [...current, userId],
    )
    printState();
  }

  const handleStartTimeChange = (timeString) => {
    if (!timeString) return;
    
    const [hours, minutes] = timeString.split(":").map(Number)
    let newDate = start ? new Date(start) : new Date()
    
    newDate.setHours(hours, minutes, 0, 0)
    setStart(newDate)
    printState();
  }

  // Function to handle time selection for end
  const handleEndTimeChange = (timeString) => {
    if (!timeString) return;
    
    const [hours, minutes] = timeString.split(":").map(Number)
    let newDate = end ? new Date(end) : new Date()
    
    newDate.setHours(hours, minutes, 0, 0)
    setEnd(newDate)
    printState();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </div>

          <div className="grid gap-2">
            <Label>Event Color</Label>
            <RadioGroup value={color} onValueChange={setColor} className="flex flex-wrap gap-2">
              {colorOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`color-${option.value}`} className="sr-only" />
                  <Label
                    htmlFor={`color-${option.value}`}
                    className={cn(
                      "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2",
                      option.class,
                      color === option.value ? "border-black" : "border-transparent",
                    )}
                  >
                    {color === option.value && <Check className="h-4 w-4 text-white" />}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid gap-2">
            <Label>Start Date & Time</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-[85%] justify-start text-left font-normal", !start && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {start ? format(start, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar 
                  mode="single" 
                  selected={start} 
                  onSelect={(date) => {
                    const newDate = new Date(date)
                    if (date) {
                        if(start) newDate.setHours(start.getHours(), start.getMinutes(), 0, 0)
                        setStart(newDate)
                    } else {
                        setStart(undefined)
                    }
                  }} 
                  initialFocus />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                value={start ? format(start, "HH:mm") : ""}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                className="w-24"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>End Date & Time</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-[85%] justify-start text-left font-normal", !end && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {end ? format(end, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar 
                  mode="single" 
                  selected={end} 
                  onSelect={(date) => {
                    if (date) {
                        // Preserve the time if we already had a date set
                        const newDate = new Date(date);
                        if (end) newDate.setHours(end.getHours(), end.getMinutes(), 0, 0)
                        setEnd(newDate);
                      } else {
                        setEnd(undefined);
                      }
                  }} 
                  initialFocus />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                value={end ? format(end, "HH:mm") : ""}
                onChange={(e) => handleEndTimeChange(e.target.value)}
                className="w-24"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Difficulty (Time Estimate)</Label>
            <Slider
              value={[difficulty]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => setDifficulty(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Estimated time: {difficultyTimeEstimates[difficulty]}
            </p>
          </div>

          <div className="grid gap-2">
            <Label>Assign Users</Label>
            <Popover open={userComboboxOpen} onOpenChange={setUserComboboxOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={userComboboxOpen} className="justify-between">
                  {assignedUsers.length > 0
                    ? `${assignedUsers.length} user${assignedUsers.length > 1 ? "s" : ""} assigned`
                    : "Select users"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search users..." />
                  <CommandList>
                    <CommandEmpty>No users found.</CommandEmpty>
                    <CommandGroup>
                      {users.map((user) => (
                        <CommandItem 
                            key={user.value} 
                            value={user.value} 
                            onSelect={() => toggleUser(user.value)}>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={assignedUsers.includes(user.value)}
                              onCheckedChange={() => toggleUser(user.value)}
                              id={`user-${user.value}`}
                            />
                            <Label htmlFor={`user-${user.value}`} className="flex-1 cursor-pointer">
                              {user.label}
                            </Label>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {assignedUsers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {assignedUsers.map((userId) => {
                  const user = users.find((u) => u.value === userId)
                  return (
                    <Badge key={userId} variant="secondary" className="flex items-center gap-1">
                      {user?.label}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => toggleUser(userId)} />
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="is-finished" checked={isFinished} onCheckedChange={setIsFinished} />
              <Label htmlFor="is-finished">Mark as Finished</Label>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="is-blockout" checked={isBlockOut} onCheckedChange={setIsBlockOut} />
              <Label htmlFor="is-blockout">Block Out</Label>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add custom tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addTag()
                  }
                }}
              />
              <Button type="button" size="icon" onClick={addTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2">
              <Label className="text-sm text-muted-foreground">Suggested tags:</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {availableTags
                  .filter((tag) => !tags.includes(tag))
                  .map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                      onClick={() => addPredefinedTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

