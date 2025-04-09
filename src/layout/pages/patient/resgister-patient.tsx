import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RegisterPatient() {
  const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState({
    // Personal Information
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

    // // Medical Information
    // primaryPhysician: "",
    // allergies: "",
    // medications: "",
    // medicalConditions: "",
    // previousSurgeries: "",

    // // Insurance Information
    // insuranceProvider: "",
    // policyNumber: "",
    // groupNumber: "",
    // policyHolderName: "",
    // relationshipToPatient: "self",

    // // Emergency Contact
    // emergencyContactName: "",
    // emergencyContactPhone: "",
    // emergencyContactRelationship: "",

    // // Consent
    // consentToTreatment: false,
    // consentToShareInformation: false,
    // acknowledgmentOfPrivacyPractices: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real application, you would send this data to your backend
      console.log("Submitting patient data:", formData)

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
                setFormData({
                  firstName: "",
                  lastName: "",
                  dateOfBirth: "",
                  gender: "",
                  email: "",
                  phone: "",
                  address: "",
                  city: "",
                  state: "",
                  zipCode: ""
                //   primaryPhysician: "",
                //   allergies: "",
                //   medications: "",
                //   medicalConditions: "",
                //   previousSurgeries: "",
                //   insuranceProvider: "",
                //   policyNumber: "",
                //   groupNumber: "",
                //   policyHolderName: "",
                //   relationshipToPatient: "self",
                //   emergencyContactName: "",
                //   emergencyContactPhone: "",
                //   emergencyContactRelationship: "",
                //   consentToTreatment: false,
                //   consentToShareInformation: false,
                //   acknowledgmentOfPrivacyPractices: false,
                })
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
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto ">
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Please provide accurate information to ensure proper medical care.</CardDescription>
            </CardHeader>
            <CardContent>
              
                
    
                {/* Personal Information Tab */}
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>
    
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">
                        Date of Birth <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">
                        Gender <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => handleSelectChange("gender", value)}
                        required
                      >
                        <SelectTrigger className='w-full' id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
    
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>
    
                  <div className="space-y-2">
                    <Label htmlFor="address">
                      Address <span className="text-red-500">*</span>
                    </Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                  </div>
    
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)} required>
                        <SelectTrigger  className='w-full' id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          {/* Add all states here */}
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="CO">Colorado</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="GA">Georgia</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="WA">Washington</SelectItem>
                          {/* More states would be added in a real application */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">
                        Zip Code <span className="text-red-500">*</span>
                      </Label>
                      <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                    </div>
                  </div>
    
                  
                </div>
    
                
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-2">
              <p className="text-sm text-muted-foreground">
                <span className="text-red-500">*</span> Required fields
              </p>
              <div className="flex justify-end pt-3">
                <Button type="button" onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700">
                    {isSubmitting ? "Submitting..." : "Register Patient"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      )
}

export default RegisterPatient