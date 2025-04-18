
import { format } from "date-fns"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Calendar, Eye, FileText, Pencil, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Patient } from "@/model/types"
import { Link } from "react-router-dom"

export const columns: ColumnDef<Patient>[] = [
  
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Edad
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("age")}</div>,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Genero
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "lastConsultation",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Última Consulta
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastConsultation"))
      return <div>{format(date, "MMM d, yyyy")}</div>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Estado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={status === "Active" ? "default" : "secondary"}
          className={status === "Active" ? "bg-green-500" : "bg-gray-500"}
        >
          {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const patient = row.original

      return (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const viewPatientEvent = new CustomEvent("VIEW_PATIENT", { detail: patient })
              document.dispatchEvent(viewPatientEvent)
            }}
            title="View profile"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="View medical history">
            <FileText className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Schedule appointment">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" asChild title="Edit patient">
            <Link to={`/paciente/editar/${patient.id}`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="Deactivate patient"
            onClick={() => {
              const deactivatePatientEvent = new CustomEvent("DEACTIVATE_PATIENT", { detail: patient })
              document.dispatchEvent(deactivatePatientEvent)
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

