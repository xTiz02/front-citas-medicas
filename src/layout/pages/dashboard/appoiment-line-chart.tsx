
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { format, subDays } from "date-fns"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { DateRange } from "react-day-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMemo, useState } from "react"

interface AppointmentData {
  date: string
  scheduled: number
}

interface DateRangeAppointmentChartProps {
  title?: string
  description?: string
  label : { 
    name: "appointments" | "cancellations"
    value: "scheduled" | "cancelled"
  }
  data?: AppointmentData[]
  defaultDays?: number
}

const chartConfig = {
  //citas
  appointments: {
    label: "Appointments",
  },
  scheduled: {
    label: "Scheduled",
    color: "hsl(var(--chart-1))",
  },
  
  //cancellations
  cancellations: {
    label: "Cancellations",
  },
  cancelled: {
    label: "Cancelled",
    color: "hsl(var(--chart-2))",
  },


} satisfies ChartConfig

// Generate sample appointment data for the past 90 days
const generateAppointmentData = () => {
  const data = []
  const today = new Date()

  for (let i = 90; i >= 0; i--) {
    const date = subDays(today, i)
    const dateStr = format(date, "yyyy-MM-dd")

    // Generate random appointment counts with some patterns
    // Weekends have fewer appointments
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    const baseCount = isWeekend ? 15 : 35
    const variation = isWeekend ? 10 : 20
    const scheduled = Math.floor(baseCount + Math.random() * variation)

    // Completed is usually a subset of scheduled
    const completed = Math.floor(scheduled * (0.7 + Math.random() * 0.2))

    data.push({
      date: dateStr,
      scheduled,
      completed,
    })
  }

  return data
}

export function DateRangeAppointmentChart({
  title = "Appointment Trends",
  description = "Daily appointment statistics",
  label = {name: "appointments", value: "scheduled"},
  data = generateAppointmentData(),
  defaultDays = 30,
}: DateRangeAppointmentChartProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), defaultDays),
    to: new Date(),
  })

  const filteredData = useMemo(() => {
    if (!dateRange?.from) return data.slice(-defaultDays)

    return data.filter((item) => {
      const itemDate = new Date(item.date)
      if (dateRange.from && dateRange.to) {
        return itemDate >= dateRange.from && itemDate <= dateRange.to
      }
      if (dateRange.from && !dateRange.to) {
        return itemDate >= dateRange.from
      }
      return false
    })
  }, [data, dateRange, defaultDays])


  return (
    <div>
      <CardHeader>
        <div className="flex items-center sm:justify-between max-sm:flex-col gap-y-4">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "justify-start text-left  font-normal",
                  !dateRange && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={(date) => date > new Date()} // Disable future dates
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <div>
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
          <LineChart
            accessibilityLayer
            data={filteredData}
            margin={{
              top: 20,
              right: 30,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return format(date, "MMM d")
              }}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[180px]"
                  nameKey={label.name}
                  labelFormatter={(value) => {
                    return format(new Date(value), "MMMM d, yyyy")
                  }}
                />
              }
            />
            <Line
              dataKey= {label.value}
              type="monotone"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  )
}
