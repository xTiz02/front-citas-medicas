
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"
// import { toast } from "@/components/ui/use-toast"

interface AppointmentFormProps {
  isOpen: boolean
  onClose: () => void
  selectedDate: Date
  selectedTime: string | null
}


const appointmentFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  appointmentType: z.string({
    required_error: "Please select an appointment type.",
  }),
  notes: z.string().optional(),
})

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>

export function AppointmentForm({ isOpen, onClose, selectedDate, selectedTime }: AppointmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      appointmentType: "",
      notes: "",
    },
  })

  async function onSubmit(data: AppointmentFormValues) {
    setIsSubmitting(true)

    try {
      // Manejar la lógica para enviar los datos a tu API o backend
      console.log({
        ...data,
        date: format(selectedDate, "yyyy-MM-dd"),
        time: selectedTime,
      })

      // Simula una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log({
        title: "Appointment Booked",
        description: `Your appointment has been scheduled for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}.`,
      })

      //Resetea el formulrio
      form.reset()
      onClose()
    } catch (error) {
      console.log({
        title: "Error",
        description: "There was a problem booking your appointment.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col max-h-[540px] p-0 sm:max-h-[min(640px,80vh)] max-w-lg [&>button:last-child]:hidden">
      <ScrollArea className="flex min-h-full flex-col p-3 sm:p-6">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>Fill out the form below to book your medical appointment.</DialogDescription>
        </DialogHeader>
        
        <div className="mb-4 flex items-center rounded-md border bg-muted p-3">
          <CalendarIcon className="mr-2 h-5 w-5 text-teal-600" />
          <span>
            {format(selectedDate, "MMMM d, yyyy")} at {selectedTime}
          </span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appointmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appointment Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select appointment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">General Checkup</SelectItem>
                      <SelectItem value="specialist">Specialist Consultation</SelectItem>
                      <SelectItem value="followup">Follow-up Visit</SelectItem>
                      <SelectItem value="urgent">Urgent Care</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the type of appointment you need.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any specific concerns or information for the doctor"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Optional: Include any symptoms or concerns you'd like to discuss.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
                {isSubmitting ? "Booking..." : "Confirm Booking"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

