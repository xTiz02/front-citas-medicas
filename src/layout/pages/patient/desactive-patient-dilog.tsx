
import { AlertCircle } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeactivatePatientDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  patientName: string
}

export function DeactivatePatientDialog({ isOpen, onClose, onConfirm, patientName }: DeactivatePatientDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertDialogTitle>Deactivate Patient</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Are you sure you want to deactivate <span className="font-semibold">{patientName}</span>? This action will:
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Mark the patient as inactive in the system</li>
              <li>Prevent new appointments from being scheduled</li>
              <li>Archive their medical records</li>
            </ul>
            <p className="mt-3">This action can be reversed by an administrator if needed.</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Deactivate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
