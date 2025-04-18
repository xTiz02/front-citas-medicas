
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


import { useTheme } from "@/components/theme-provider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { departmentData } from "@/data/dashbord-data"



export function ModuleBarChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  
  const barColor = isDark ? "#10b981" : "#10b981" // teal-500
  const textColor = isDark ? "#e5e7eb" : "#374151" // gray-200 : gray-700

  return (
    <ScrollArea className="h-full overflow-y-auto">
      <ResponsiveContainer width="100%" height={departmentData.length * 40}>
        <BarChart data={departmentData} layout="vertical" margin={{ top: 5, right: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDark ? "#374151" : "#e5e7eb"} />
          <XAxis type="number" tick={{ fill: textColor }} />
          <YAxis type="category" dataKey="name" tick={{ fill: textColor }} width={135} fontSize={14}/>
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              borderColor: isDark ? "#374151" : "#e5e7eb",
              color: textColor,
            }}
          />
          <Bar dataKey="appointments" fill={barColor} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ScrollArea>
    
      
  )
}
