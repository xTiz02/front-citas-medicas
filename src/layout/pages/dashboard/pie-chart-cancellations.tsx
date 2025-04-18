import {  ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { cancellationData } from "@/data/dashbord-data"
import { LabelList, Pie, PieChart } from "recharts"


const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]

const chartDataWithColors = cancellationData.map((item, index) => ({
  ...item,
  fill: colors[index % colors.length],
}))

const chartConfig = chartDataWithColors.reduce((acc, item) => {
  acc[item.motivo] = {
    label: item.motivo,
    color: item.fill,
  }
  return acc
}, {
  cantidad: {
    label: "Cantidad",
  },
} as Record<string, { label: string; color?: string }>)

export function PieChartCancellations() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[420px]"
    >
      <PieChart  >
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={chartDataWithColors}
          dataKey="cantidad"
          nameKey="motivo"
          label
        >
          <LabelList
            dataKey="porcentaje"
            className="fill-background"
            stroke="none"
            fontSize={14}
            
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
