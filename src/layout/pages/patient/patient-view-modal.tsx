import { format } from "date-fns"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Patient } from "@/model/types"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PatientViewModalProps {
  patient: Patient
  isOpen: boolean
  onClose: () => void
}

export function PatientViewModal({ patient, isOpen, onClose }: PatientViewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-0 max-h-[540px] p-0 sm:max-h-[min(640px,80vh)] max-w-lg [&>button:last-child]:hidden">
      <ScrollArea className="flex min-h-full flex-col p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>Patient Profile</DialogTitle>
          <DialogDescription>Complete information for patient {patient.id}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <Badge
              variant={patient.status === "Active" ? "default" : "secondary"}
              className={patient.status === "Active" ? "bg-green-500" : "bg-gray-500"}
            >
              {patient.status}
            </Badge>
          </div>
          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Patient ID</p>
              <p>{patient.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Full Name</p>
              <p>{patient.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Age</p>
              <p>{patient.age} years</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Gender</p>
              <p>{patient.gender}</p>
            </div>
          </div>

          <h3 className="text-lg font-medium">Contact Information</h3>
          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p>{patient.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{patient.email}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Address</p>
              <p>{patient.address}</p>
            </div>
          </div>

          <h3 className="text-lg font-medium">Medical Information</h3>
          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Consultation</p>
              <p>{format(new Date(patient.lastConsultation), "MMMM d, yyyy")}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Primary Physician</p>
              <p>{patient.primaryPhysician || "Not assigned"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Medical Conditions</p>
              <p>{patient.medicalConditions || "None recorded"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Allergies</p>
              <p>{patient.allergies || "None recorded"}</p>
            </div>
          </div>

          <h3 className="text-lg font-medium">Insurance Information</h3>
          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Insurance Provider</p>
              <p>{patient.insuranceProvider || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Policy Number</p>
              <p>{patient.policyNumber || "Not provided"}</p>
            </div>
          </div>
        </div>
        

        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

