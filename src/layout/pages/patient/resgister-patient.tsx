import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"

const patientFormSchema = z.object({
  // Personal Information
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

  // Medical Information
  // primaryPhysician: z.string().optional(),
  // allergies: z.string().optional(),
  // medications: z.string().optional(),
  // medicalConditions: z.string().optional(),
  // previousSurgeries: z.string().optional(),

  // Insurance Information
  // insuranceProvider: z.string().min(1, { message: "Insurance provider is required." }),
  // policyNumber: z.string().min(1, { message: "Policy number is required." }),
  // groupNumber: z.string().optional(),
  // policyHolderName: z.string().min(1, { message: "Policy holder name is required." }),
  // relationshipToPatient: z.string().min(1, { message: "Please select a relationship." }),

  // Emergency Contact
  // emergencyContactName: z.string().min(2, { message: "Emergency contact name is required." }),
  // emergencyContactPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  // emergencyContactRelationship: z.string().min(1, { message: "Please select a relationship." }),

  // Consent
  // consentToTreatment: z.boolean().refine((val) => val === true, {
  //   message: "You must agree to the consent to treatment.",
  // }),
  // consentToShareInformation: z.boolean().refine((val) => val === true, {
  //   message: "You must agree to the consent to share information.",
  // }),
  // acknowledgmentOfPrivacyPractices: z.boolean().refine((val) => val === true, {
  //   message: "You must acknowledge the privacy practices.",
  // }),
})

// Infer the type from the schema
type PatientFormValues = z.infer<typeof patientFormSchema>

function RegisterPatient() {
  const navigate = useNavigate()
  //const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
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
      // primaryPhysician: "",
      // allergies: "",
      // medications: "",
      // medicalConditions: "",
      // previousSurgeries: "",
      // insuranceProvider: "",
      // policyNumber: "",
      // groupNumber: "",
      // policyHolderName: "",
      // relationshipToPatient: "self",
      // emergencyContactName: "",
      // emergencyContactPhone: "",
      // emergencyContactRelationship: "",
      // consentToTreatment: false,
      // consentToShareInformation: false,
      // acknowledgmentOfPrivacyPractices: false,
    },
    mode: "onChange",
  })

  

  // const handleCheckboxChange = (name: string, checked: boolean) => {
  //   setFormData((prev) => ({ ...prev, [name]: checked }))
  // }

  // const handleRadioChange = (name: string, value: string) => {
  //   setFormData((prev) => ({ ...prev, [name]: value }))
  // }

  async function onSubmit(data: PatientFormValues) {
    setIsSubmitting(true)

    try {
      // In a real application, you would send this data to your backend
      console.log("Submitting patient data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)
      console.log({
        title: "Registration Successful",
        description: "Your patient information has been registered in our system.",
      })

      // In a real app, you might redirect to a dashboard or confirmation page
      // setTimeout(() => router.push('/dashboard'), 2000)
    } catch (error) {
      console.log({
        title: "Registration Failed",
        description: "There was an error registering your information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <CheckCircle2 className="mb-4 h-16 w-16 text-teal-500" />
          <h2 className="mb-2 text-2xl font-bold">Registration Complete</h2>
          <p className="mb-6 text-center text-muted-foreground">
            Thank you for registering as a patient. Your information has been successfully saved in our system.
          </p>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsSuccess(false)
                form.reset()
              }}
            >
              Register Another Patient
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => navigate("/")}>
              Go to Appointments  
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  
    return (
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mx-auto ">
            <CardHeader>
              <CardTitle>Información del Paciente</CardTitle>
              <CardDescription>Por favor completa todos los campos requeridos</CardDescription>
            </CardHeader>
            <CardContent>
              
                
    
                {/* Personal Information Tab */}
                <div className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Nombres <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ingresar nombre" {...field} />
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
                        <FormLabel>
                          Apellidos <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ingresar apellido" {...field} />
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
                        <FormLabel>
                          Fecha Nacimiento <span className="text-red-500">*</span>
                        </FormLabel>
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
                        <FormLabel>
                          Género <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder="Seleccionar género" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent >
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
                        <FormLabel>
                          Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="tu.email@example.com" {...field} />
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
                        <FormLabel>
                          Teléfono <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" {...field} />
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
                      <FormLabel>
                        Dirección <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresar dirección" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Ciudad <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Ingresar ciudad" {...field} />
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
                        <FormLabel>
                          Distrito <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder="Seleccionar distrito" />
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
                </div>
                  
                </div>
    
                
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-2">
              <p className="text-sm text-muted-foreground">
                <span className="text-red-500">*</span> Campos Requeridos
              </p>
              <div className="flex justify-end pt-3">
                <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
                    {isSubmitting ? "Cargando..." : "Completar Registro"}
                  </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
        </Form>
      )
}

export default RegisterPatient