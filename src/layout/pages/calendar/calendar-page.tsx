"use client"

import { useState } from "react"
import { addDays, format, startOfToday } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentForm } from "./appoiment-form"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


// import { DailySchedule } from "./daily-schedule"

export function CalendarPage() {
  const today = startOfToday()
  const [selectedDate, setSelectedDate] = useState<Date>(today)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
    }
  }

  const handlePrevDay = () => {
    setSelectedDate((prev) => addDays(prev, -1))
  }

  const handleNextDay = () => {
    setSelectedDate((prev) => addDays(prev, 1))
  }

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time)
    setIsBookingModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsBookingModalOpen(false)
    setSelectedTimeSlot(null)
  }

  const handleSelectModuleChange = (value: string) => {
    
  }

  const handleSelectDoctorChange = (value: string) => {

  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="calendar" className="w-full">
        <div className="flex lg:flex-row  justify-between flex-col">
          <TabsList className="grid w-full lg:max-w-md grid-cols-2 max-lg:mb-7">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="daily">Daily Schedule</TabsTrigger>
          </TabsList>
          <div className="flex sm:flex-row gap-5 flex-col justify-center items-center">
            <div className="flex flex-row">
              <Label className="text-right pr-2">
                Módulo:
              </Label>
              <Select onValueChange={handleSelectModuleChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Módulo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">General Checkup</SelectItem>
                  <SelectItem value="2">Specialist Consultation</SelectItem>
                  <SelectItem value="3">Follow-up Visit</SelectItem>
                  <SelectItem value="4">Urgent Care</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-row">
              <Label className="text-right pr-2">
                Médico:
              </Label>
              <Select onValueChange={handleSelectDoctorChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Médico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">General Checkup</SelectItem>
                  <SelectItem value="2">Specialist Consultation</SelectItem>
                  <SelectItem value="3">Follow-up Visit</SelectItem>
                  <SelectItem value="4">Urgent Care</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
        </div>
        
        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardContent className="">
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateChange}
                  className="rounded-md border"
                  disabled={(date) => date < today}
                />
                <div className="flex flex-1 flex-col space-y-4">
                  <div className="flex sm:flex-row gap-y-4 flex-col items-center justify-between">
                    <h2 className="text-xl font-semibold">Tiempos Disponibles</h2>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" onClick={handlePrevDay} disabled={selectedDate <= today}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center rounded-md border bg-muted px-3 py-1">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-sm font-medium">{format(selectedDate, "MMMM d, yyyy")}</span>
                      </div>
                      <Button variant="outline" size="icon" onClick={handleNextDay}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
                    {generateTimeSlots().map((time) => {
                      const isAvailable = checkAvailability(selectedDate, time)
                      return (
                        <Button
                          key={time}
                          variant={isAvailable ? "outline" : "ghost"}
                          className={cn(
                            "h-12 justify-start",
                            isAvailable ? "hover:bg-teal-50 hover:text-teal-700" : "cursor-not-allowed opacity-50",
                          )}
                          disabled={!isAvailable}
                          onClick={() => isAvailable && handleTimeSlotSelect(time)}
                        >
                          <div
                            className={cn("mr-2 h-2 w-2 rounded-full", isAvailable ? "bg-teal-500" : "bg-gray-300")}
                          />
                          {time}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="daily" className="mt-6">
          {/* <DailySchedule
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            onTimeSlotSelect={handleTimeSlotSelect}
          /> */}
          En progreso
        </TabsContent>
      </Tabs>

      <AppointmentForm
        isOpen={isBookingModalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
        selectedTime={selectedTimeSlot}
      />
    </div>
  )
}

// Helper functions
function generateTimeSlots() {
  const slots = []
  for (let hour = 9; hour < 17; hour++) {
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12
    const period = hour < 12 ? "AM" : "PM"
    slots.push(`${hourFormatted}:00 ${period}`)
    slots.push(`${hourFormatted}:30 ${period}`)
  }
  return slots
}

// This would typically come from your backend
function checkAvailability(date: Date, time: string): boolean {
  // Mock data - in a real app, this would check against booked appointments
  const dateStr = format(date, "yyyy-MM-dd")
  const today = startOfToday()
  const bookedSlots: Record<string, string[]> = {
    [format(today, "yyyy-MM-dd")]: ["9:00 AM", "11:30 AM", "2:00 PM"],
    [format(addDays(today, 1), "yyyy-MM-dd")]: ["10:00 AM", "3:30 PM"],
    [format(addDays(today, 2), "yyyy-MM-dd")]: ["9:30 AM", "1:00 PM", "4:30 PM"],
  }

  return !(bookedSlots[dateStr] && bookedSlots[dateStr].includes(time))
}

