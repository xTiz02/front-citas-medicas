import { useEffect, useState } from 'react'
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Calendar, ChevronDown, ChevronLeftIcon, ChevronRightIcon, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
//import { Patient } from '@/model/types'
import { patients } from '@/data/patient'
import { columns } from './columns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PatientViewModal } from './patient-view-modal'
import { Patient } from '@/model/types'
import { DeactivatePatientDialog } from './desactive-patient-dilog'

function PatientList() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [ageRange, setAgeRange] = useState([0, 100])
  const [selectedGenders, setSelectedGenders] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [viewPatient, setViewPatient] = useState<Patient | null>(null)
  const [patientToDeactivate, setPatientToDeactivate] = useState<Patient | null>(null)

  // Agregar un event listener para escuchar el evento VIEW_PATIENT
  useEffect(() => {
    const handleViewPatient = (e: Event) => {
      const customEvent = e as CustomEvent<Patient>
      setViewPatient(customEvent.detail)
    }

    const handleDeactivatePatient = (e: Event) => {
      const customEvent = e as CustomEvent<Patient>
      setPatientToDeactivate(customEvent.detail)
    }

    document.addEventListener("VIEW_PATIENT", handleViewPatient)
    document.addEventListener("DEACTIVATE_PATIENT", handleDeactivatePatient)
    return () => {
      document.removeEventListener("VIEW_PATIENT", handleViewPatient)
      document.removeEventListener("DEACTIVATE_PATIENT", handleDeactivatePatient)
    }
  }, [])



  const table = useReactTable({
    data: patients,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    filterFns: {
      customGlobalFilter: (row, columnId, value) => {
        console.log(columnId)
        const patient = row.original

        // Filtro por nombre o ID
        const nameIdMatch =
          patient.id.toLowerCase().includes(value.toLowerCase()) ||
          patient.name.toLowerCase().includes(value.toLowerCase())

        // Filtro por rango de edad
        const ageMatch = patient.age >= ageRange[0] && patient.age <= ageRange[1]

        // Filtro por género
        const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(patient.gender)

        // Filtro por estado
        const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(patient.status)

        return nameIdMatch && ageMatch && genderMatch && statusMatch
      },
    },
    globalFilterFn: "auto",
  })

  const handleDeactivateConfirm = async () => {
    if (!patientToDeactivate) return

    try {
      
      console.log("Deactivating patient:", patientToDeactivate.id)

      
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log({
        title: "Patient Deactivated",
        description: `${patientToDeactivate.name} has been successfully deactivated.`,
      })

      
      setPatientToDeactivate(null)

      
    } catch (error) {
      console.log({
        title: "Deactivation Failed",
        description: "There was an error deactivating the patient. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleGenderChange = (gender: string) => {
    setSelectedGenders((prev) => (prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]))
  }

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  return (
    <div className="space-y-4">
    <Card>
      <CardContent className="p-6 ">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex w-full items-center space-x-2 md:w-1/3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or ID..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2 h-4 w-4" />
                    Age: {ageRange[0]} - {ageRange[1]}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Age Range</h4>
                    <div className="px-1">
                      <Slider
                        defaultValue={[0, 100]}
                        min={0}
                        max={120}
                        step={1}
                        value={ageRange}
                        onValueChange={setAgeRange}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Min: {ageRange[0]}</div>
                      <div className="text-sm text-muted-foreground">Max: {ageRange[1]}</div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2 h-4 w-4" />
                    Gender {selectedGenders.length > 0 && `(${selectedGenders.length})`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60">
                  <div className="space-y-4">
                    <h4 className="font-medium">Gender</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="gender-male"
                          checked={selectedGenders.includes("Male")}
                          onCheckedChange={() => handleGenderChange("Male")}
                        />
                        <Label htmlFor="gender-male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="gender-female"
                          checked={selectedGenders.includes("Female")}
                          onCheckedChange={() => handleGenderChange("Female")}
                        />
                        <Label htmlFor="gender-female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="gender-other"
                          checked={selectedGenders.includes("Other")}
                          onCheckedChange={() => handleGenderChange("Other")}
                        />
                        <Label htmlFor="gender-other">Other</Label>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2 h-4 w-4" />
                    Status {selectedStatuses.length > 0 && `(${selectedStatuses.length})`}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60">
                  <div className="space-y-4">
                    <h4 className="font-medium">Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="status-active"
                          checked={selectedStatuses.includes("Active")}
                          onCheckedChange={() => handleStatusChange("Active")}
                        />
                        <Label htmlFor="status-active">Active</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="status-inactive"
                          checked={selectedStatuses.includes("Inactive")}
                          onCheckedChange={() => handleStatusChange("Inactive")}
                        />
                        <Label htmlFor="status-inactive">Inactive</Label>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Calendar className="mr-2 h-4 w-4" />
                    Last Visit
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  {/* <DatePickerWithRange /> */}
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <div className="rounded-md border ">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div
      className='flex items-center justify-between overflow-clip px-2'
      style={{ overflowClipMargin: 1 }}
    >
      <div className='hidden flex-1 text-sm text-muted-foreground sm:block'>
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
      {viewPatient && (
        <PatientViewModal patient={viewPatient} isOpen={!!viewPatient} onClose={() => setViewPatient(null)} />
      )}

      {patientToDeactivate && (
        <DeactivatePatientDialog
          isOpen={!!patientToDeactivate}
          onClose={() => setPatientToDeactivate(null)}
          onConfirm={handleDeactivateConfirm}
          patientName={patientToDeactivate.name}
        />
      )}
    </div>

  </div>
)
}

export default PatientList