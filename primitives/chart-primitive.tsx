"use client"

import * as React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js"
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2"

import { cn } from "@/lib/utils"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

export interface ChartProps extends React.ComponentProps<typeof Bar> {
  type?: "bar" | "line" | "pie" | "doughnut"
}

const Chart = React.forwardRef<HTMLCanvasElement, ChartProps>(({ className, type = "bar", ...props }, ref) => {
  const Component = type === "line" ? Line : type === "pie" ? Pie : type === "doughnut" ? Doughnut : Bar
  return (
    <div className={cn("relative w-full", className)}>
      <Component ref={ref} {...props} />
    </div>
  )
})
Chart.displayName = "Chart"

export { Chart }
