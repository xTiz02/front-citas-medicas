import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import type { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: ReactNode
  trend: string
  trendUp: boolean | null
}

export function StatCard({ title, value, description, icon, trend, trendUp }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="mt-3 flex items-center text-xs">
          {trendUp !== null && (
            <>
              {trendUp ? (
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={trendUp ? "text-green-500" : "text-red-500"}>{trend}</span>
            </>
          )}
          {trendUp === null && <span className="text-muted-foreground">{trend}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
