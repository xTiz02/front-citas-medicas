import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarClock, CalendarX2, Users, UserCog } from "lucide-react"
import { StatCard } from "./stat-card"
import { ModuleBarChart } from "./module-bar-chart"
import { PieChartCancellations } from "./pie-chart-cancellations"
import { DateRangeAppointmentChart } from "./appoiment-line-chart"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function DashboardPage() {
  return (
    <div className="mx-auto">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Panel de Estadísticas</h1>
      <p className="mb-8 text-muted-foreground">Descripción general de las estadísticas del sistema</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Pacientes Totales"
          value="2,540"
          description="Pacientes registrados"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend="+12% mas que el mes pasado"
          trendUp={true}
        />
        <StatCard
          title="Citas de Hoy"
          value="120"
          description="75 atendidas, 45 pendientes"
          icon={<CalendarClock className="h-4 w-4 text-muted-foreground" />}
          trend="15 mas que ayer"
          trendUp={true}
        />
        <StatCard
          title="Citas Canceladas"
          value="35"
          description="Citas canceladas en el mes"
          icon={<CalendarX2 className="h-4 w-4 text-muted-foreground" />}
          trend="5 menos que el mes pasado"
          trendUp={false}
        />
        <StatCard
          title="Médicos Activos"
          value="35"
          description="Médicos Trabajando Hoy"
          icon={<UserCog className="h-4 w-4 text-muted-foreground" />}
          trend="Igual que ayer"
          trendUp={null}
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Citas por Módulo/Especialidad</CardTitle>
            <CardDescription>Número de citas totales reservadas por módulo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ModuleBarChart />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Razones de Cancelación</CardTitle>
            <CardDescription>Distribución por razones de cancelación de citas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="">
              <PieChartCancellations />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Gráficos de linea temporal del sistema </CardTitle>
            <CardDescription>Elige el rango de fechas para ver las estadísticas</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            
            <Tabs defaultValue="sixMonths">
              <div className="flex justify-center px-6"> 
                <ScrollArea className="x-full overflow-x-auto">
                  <TabsList>
                    <TabsTrigger value="sixMonths">Citas</TabsTrigger>
                    <TabsTrigger value="year">Otro</TabsTrigger>
                    <TabsTrigger value="3">Otro</TabsTrigger>
                    <TabsTrigger value="4">Otro</TabsTrigger>
                    <TabsTrigger value="5">Otro</TabsTrigger>
                    <TabsTrigger value="6">Otro</TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
                
              </div>
            
              <TabsContent value="sixMonths">
                <div className="mt-4">
                  <DateRangeAppointmentChart 
                  title = "Citas Reservadas"
                  description = "Estadísticas de citas reservadas"
                  //data={[]}
                  label={{name: "appointments", value: "scheduled"}} />
                </div>
              </TabsContent>
              <TabsContent value="year">
                <div className="h-[400px]">
                  
                </div>
              </TabsContent>
            </Tabs>
            
            
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



