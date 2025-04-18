import { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
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
import {CalendarIcon, ChevronDown, ChevronLeftIcon, ChevronRightIcon, Filter, ListFilter, Search } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Slider } from "@/components/ui/slider"
//import { Patient } from '@/model/types'
import { patients } from '@/data/patient'
import { columns } from './columns'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PatientViewModal } from './patient-view-modal'
import { Patient } from '@/model/types'
import { DeactivatePatientDialog } from './desactive-patient-dilog'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'


interface FilterData {
  date?: string
  genderItems?: string[]
  statusItems?: string[]
  ageRange?: number[]
  searchTerm?: string
  searchField?: string
}


const gendersList = [
  {
    id: "hombre",
    label: "Hombre",
  },
  {
    id: "mujer",
    label: "Mujer",
  },
  {
    id: "otro",
    label: "Otro",
  },
  
] as const


const statusList = [
  {
    id: "activo",
    label: "Activo",
  },
  {
    id: "inactivo",
    label: "Inactivo",
  },
] as const
 
const FormSchema = z.object({
  genderItems: z.array(z.string()).refine((value) => value.length !== gendersList.length, {
    message: "No puedes seleccionar todos los géneros"
  }),
  statusItems: z.array(z.string()).refine((value) => value.length !== statusList.length, {
    message: "No puedes seleccionar todos los estados"
  }),
})

function PatientList() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [ageRange, setAgeRange] = useState([0, 150])
  const [viewPatient, setViewPatient] = useState<Patient | null>(null)
  const [patientToDeactivate, setPatientToDeactivate] = useState<Patient | null>(null)
  const [date, setDate] = useState<Date>()
  const [filterData, setFilterData] = useState<FilterData>({});


  const [searchTerm, setSearchTerm] = useState<string >("");
  const [searchField, setSearchField] = useState<string >("");
  const [loadingBySearch, setLoadingBySearch] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      genderItems: [],
      statusItems: [],
    },
  })
  
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

  useEffect(() => {
    console.log("Filter data updated:", filterData)
  } , [filterData])



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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
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
        //const genderMatch = selectedGender ? true : false

        // Filtro por estado
        //const statusMatch = selectedStatus ? true : false

        return nameIdMatch && ageMatch
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
        variant: error,
      })
    }
  }



  const handleSearch = () => {
    setLoadingBySearch(true)
    setFilterData(prev => ({ ...prev, searchTerm, searchField }))
  };

  const handleSearchReset = () => {
    setLoadingBySearch(false);
    setSearchTerm("");
    setFilterData(prev => ({ ...prev, searchTerm: undefined, searchField: undefined }))
  };

  const handleSelectDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if(selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      setFilterData((prev) => ({ ...prev, date: formattedDate }))
    }else{
      setFilterData((prev) => ({ ...prev, date: undefined }))
    }
    console.log("Selected date:", selectedDate)
  }

  const handleRangeAge = () => {
    setFilterData((prev) => ({ ...prev, ageRange }))
  }

  const handleAllReset = () => {
    //setColumnFilters([])
    //setSorting([])
    //setColumnVisibility({})
    setDate(undefined)
    setAgeRange([0, 150])
    form.reset()
    setFilterData((prev) => ({ ...prev, date: undefined, ageRange: undefined, genderItems: [], statusItems: [] }))
  }


  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFilterData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="space-y-4">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Listado de Pacientes</h1>
        <p className="mb-6 text-muted-foreground">Filtrado y búsqueda de pacientes</p>
    <Card>
      <CardContent className='max-sm:px-1'>
        <div className="flex flex-col space-y-8 md:items-center">
            <div className='flex flex-col md:flex-row w-full justify-between space-y-2'>
              <div className="flex items-center space-x-2 md:px-2">
                <Search className="h-6 w-6 text-muted-foreground" />
                <Input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  placeholder="Buscar por campo"
                  className="h-9"
                />
                <Button
                 onClick={handleSearch}
                  disabled={searchField.length==0 || searchTerm.length==0}
                  >Buscar</Button>
              </div>
              <div className='flex flex-row justify-center space-x-2'> 
                {loadingBySearch ? (
                  <div className="text-center items-center text-neutral-500 inline-flex">
                    Buscar: <strong>{searchTerm}</strong>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-2 mt-1 h-7 w-7 rounded-full text-amber-700"
                      onClick={handleSearchReset}
                    >
                      <IoIosCloseCircleOutline />
                    </Button>
                  </div>
                ) : (
                  <div></div>
                )}
                <Select onValueChange={setSearchField} >
                  <SelectTrigger className="w-[100px] sm:w-[190px] ">
                    <SelectValue placeholder="Selecciona un campo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Campos</SelectLabel>
                      <SelectItem value="dni">DNI</SelectItem>
                      <SelectItem value="nombre">Nombre</SelectItem>
                      
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex w-full flex-wrap justify-center gap-2"> 
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2 h-4 w-4" />
                    Edad: {ageRange[0]} - {ageRange[1]}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Edad Rango</h4>
                    <div className="px-1">
                      <Slider
                        
                        min={0}
                        max={150}
                        step={1}
                        value={ageRange}
                        onValueChange={setAgeRange}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Min: {ageRange[0]}</div>
                      <div className="text-sm text-muted-foreground">Max: {ageRange[1]}</div>
                    </div>
                    <Button variant="default" onClick={handleRangeAge}>Aplicar</Button>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                  <ListFilter size={16} className="mr-2 h-4 w-4" />
                    Filtros 
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-50">
                  <ScrollArea className="h-72">
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          <FormField
                            control={form.control}
                            name="genderItems"
                            render={() => (
                              <FormItem>
                                <h4 className=" text-sm font-medium leading-none">Género</h4>
                                <Separator/>
                                {gendersList.map((item) => (
                                  <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="genderItems"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={item.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(item.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, item.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== item.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-normal">
                                            {item.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                                <FormMessage />
                              </FormItem>
                            )}
                          />


                          <FormField
                            control={form.control}
                            name="statusItems"
                            render={() => (
                              <FormItem>
                                <h4 className=" text-sm font-medium leading-none">Estado</h4>
                                <Separator/>
                                {statusList.map((item) => (
                                  <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="statusItems"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={item.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(item.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, item.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== item.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-normal">
                                            {item.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          
                          <Button type="submit">Aplicar</Button>
                        </form>
                      </Form>
                    
                  </ScrollArea>
                </PopoverContent>
                
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Fecha de cita</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                  
                    onSelect={handleSelectDate}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    Columnas <ChevronDown className="ml-2 h-4 w-4" />
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

              <div>
                <Button variant="destructive" onClick={handleAllReset}>Reset</Button>
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
                Sin resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div
      className='flex items-center justify-end flex-row'
      style={{ overflowClipMargin: 1 }}
    >
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='hidden text-sm font-medium sm:block'>Filas por Página</p>
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
          Página {table.getState().pagination.pageIndex + 1} de{' '}
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