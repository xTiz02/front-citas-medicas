

import { useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Patient } from "@/model/types"
import { useNavigate, useParams } from "react-router-dom"
import { DeactivatePatientDialog } from "./desactive-patient-dilog"
import { patients } from '@/data/patient'



const patientEditSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required." }),
  gender: z.string().min(1, { message: "Please select a gender." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(1, { message: "Please select a state." }),
  zipCode: z.string().min(5, { message: "Please enter a valid zip code." }),
})


type PatientEditFormValues = z.infer<typeof patientEditSchema>


export function PatientEditForm() {
  const navigate = useNavigate()
  //useMemo to patiens
  const patientsMemo = useMemo(() => patients, [patients])
  const { id } = useParams<{ id: string }>(); // Obtiene el ID desde la URL
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false)
  //get id patient on path
  
  
  // const nameParts = patient.name.split(" ")
  // const firstName = nameParts[0]
  // const lastName = nameParts.slice(1).join(" ")
  const form = useForm<PatientEditFormValues>({
    resolver: zodResolver(patientEditSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    mode: "onChange",
  })

  useEffect(() => {
    console.log("Fetching patient data for ID:", id)
    // async function fetchPatient() {
    //   try {
    //     const response = await fetch(`/api/patients/${id}`); // Llama a la API del backend
    //     if (!response.ok) throw new Error("Error fetching patient data");
    //     const data = await response.json();
    //     setPatient(data);
    //   } catch (error) {
    //     console.error("Failed to fetch patient:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }

    const foundPatient =patientsMemo.find((p) => p.id === id);
    
    if (foundPatient) {
      setPatient(foundPatient);
      form.reset({
        firstName: foundPatient.name.split(" ")[0],
        lastName: foundPatient.name.split(" ").slice(1).join(" "),
        dateOfBirth: formatDateForInput(foundPatient.dateOfBirth),
        gender: foundPatient.gender.toLowerCase(),
        email: foundPatient.email,
        phone: foundPatient.phone,
        address: foundPatient.address.split(",")[0].trim(), // Extract street address
        city: foundPatient.address.split(",")[1]?.trim() || "", // Extract city
        state: foundPatient.address.split(",")[2]?.trim().split(" ")[0] || "", // Extract state
        zipCode: foundPatient.address.split(",")[2]?.trim().split(" ")[1] || "", // Extract zip code
      })
    }
  }, [id]);

  
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split("T")[0]
  }

  
 
  

  


  async function onSubmit(data: PatientEditFormValues) {
    setIsSubmitting(true)

    try {
    
      console.log("Updating patient data:", {
        id: patient?.id,
        ...data,
      })

      // Simular una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log({
        title: "Patient Updated",
        description: "Patient information has been successfully updated.",
      })

      //Navega de vuelta a la página de pacientes
      navigate("/pacientes")
    } catch (error) {
      console.log({
        title: "Update Failed",
        description: "There was an error updating the patient information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeactivate = async () => {
    try {
      
      console.log("Deactivating patient:", patient?.id)

     
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log({
        title: "Patient Deactivated",
        description: "The patient has been successfully deactivated.",
      })

      
      navigate("/patients")
    } catch (error) {
      console.log({
        title: "Deactivation Failed",
        description: "There was an error deactivating the patient. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mx-auto">
            <CardHeader>
              <CardTitle>Edit Patient: {patient?.name}</CardTitle>
              <CardDescription>Update the patient's personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email@example.com" {...field} />
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
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="CO">Colorado</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="GA">Georgia</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="WA">Washington</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Zip code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-y-4 sm:flex-row justify-between">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setShowDeactivateDialog(true)}
                disabled={isSubmitting}
              >
                Deactivate Patient
              </Button>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => navigate("/pacientes")}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
      
      { patient && (
        <DeactivatePatientDialog
        isOpen={showDeactivateDialog}
        onClose={() => setShowDeactivateDialog(false)}
        onConfirm={handleDeactivate}
        patientName={patient.name}
      />
      )}
      
    </>
  )
}
