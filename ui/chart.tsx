"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { useTheme } from "next-themes"
import { ChartPrimitive } from "@/components/primitives/chart-primitive"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: { color: COLORS } }
const COLORS = {
  light: {
    grid: "hsl(220 13% 91%)",
    tooltip: "hsl(240 10% 3.9%)",
    tooltipForeground: "hsl(210 20% 98%)",
    background: "hsl(0 0% 100%)",
    foreground: "hsl(240 10% 3.9%)",
    primary: "hsl(221.2 83.2% 53.3%)",
    primaryForeground: "hsl(210 20% 98%)",
    secondary: "hsl(220 14.3% 95.9%)",
    secondaryForeground: "hsl(240 5.9% 10%)",
    muted: "hsl(220 14.3% 95.9%)",
    mutedForeground: "hsl(220 8.9% 46.1%)",
    accent: "hsl(220 14.3% 95.9%)",
    accentForeground: "hsl(240 5.9% 10%)",
    destructive: "hsl(0 84.2% 60.2%)",
    destructiveForeground: "hsl(210 20% 98%)",
    border: "hsl(220 13% 91%)",
    input: "hsl(220 13% 91%)",
    ring: "hsl(221.2 83.2% 53.3%)",
  },
  dark: {
    grid: "hsl(240 3.7% 15.9%)",
    tooltip: "hsl(210 20% 98%)",
    tooltipForeground: "hsl(240 10% 3.9%)",
    background: "hsl(240 10% 3.9%)",
    foreground: "hsl(210 20% 98%)",
    primary: "hsl(221.2 83.2% 53.3%)",
    primaryForeground: "hsl(210 20% 98%)",
    secondary: "hsl(240 3.7% 15.9%)",
    secondaryForeground: "hsl(210 20% 98%)",
    muted: "hsl(240 3.7% 15.9%)",
    mutedForeground: "hsl(215 20.2% 65.1%)",
    accent: "hsl(240 3.7% 15.9%)",
    accentForeground: "hsl(210 20% 98%)",
    destructive: "hsl(0 62.8% 30.6%)",
    destructiveForeground: "hsl(210 20% 98%)",
    border: "hsl(240 3.7% 15.9%)",
    input: "hsl(240 3.7% 15.9%)",
    ring: "hsl(221.2 83.2% 53.3%)",
  },
}

type ChartContextProps = {
  config: Record<string, { color?: string; icon?: string }>
  children: React.ReactNode
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function ChartProvider({ config, children }: ChartContextProps) {
  return <ChartContext.Provider value={{ config }}>{children}</ChartContext.Provider>
}

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartProvider />")
  }
  return context
}

type ChartProps = React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer> &
  ChartContextProps & {
    className?: string
  }

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(({ config, children, className, ...props }, ref) => {
  return (
    <ChartProvider config={config}>
      <div ref={ref} className={cn("h-[400px] w-full", className)}>
        <RechartsPrimitive.ResponsiveContainer {...props}>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartProvider>
  )
})
Chart.displayName = "Chart"

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    is
    nameKey?: string
    valueKey?: string
  }
>(
  (
    {
      className,
      hideLabel = false,
      hideIndicator = false,
      is,
      nameKey,
      valueKey,
      active,
      payload,
      label,
      formatter,
      ...props
    },
    ref,
  ) => {
    const { config } = useChart()
    const { theme } = useTheme()
    const currentColors = COLORS[theme as keyof typeof COLORS] || COLORS.light

    if (active && payload && payload.length) {
      return (
        <div
          ref={ref}
          className={cn(
            "grid overflow-hidden rounded-md border border-border bg-tooltip p-4 text-tooltip-foreground shadow-md",
            className,
          )}
          {...props}
        >
          {!hideLabel && label ? (
            <div className="row-span-2 flex flex-col">
              <div className="text-muted-foreground">{label}</div>
            </div>
          ) : null}
          <div className="grid gap-1.5">
            {payload.map((item: any, i: number) => {
              if (item.dataKey === "average") return null
              const key = nameKey ? item.payload[nameKey] : item.name
              const val = valueKey ? item.payload[valueKey] : item.value

              return (
                <div key={item.dataKey} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {!hideIndicator && (
                      <div
                        className={cn("h-3 w-3 shrink-0 rounded-full", {
                          [`bg-[${config[key]?.color || currentColors.primary}]`]: config[key]?.color,
                          "bg-primary": !config[key]?.color,
                        })}
                      />
                    )}
                    <span className="text-muted-foreground">
                      {config[key]?.icon && <ChartPrimitive.ChartTooltip className="mr-1" icon={config[key].icon} />}
                      {item.name}
                    </span>
                  </div>
                  <span className="font-bold text-foreground">{formatter ? formatter(val, key, item) : val}</span>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    return null
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Legend> & {
    hideIcon?: boolean
    nameKey?: string
  }
>(({ className, hideIcon = false, nameKey, payload, ...props }, ref) => {
  const { config } = useChart()
  const { theme } = useTheme()
  const currentColors = COLORS[theme as keyof typeof COLORS] || COLORS.light

  return (
    <div ref={ref} className={cn("flex flex-wrap items-center justify-center gap-4", className)} {...props}>
      {payload?.map((item: any) => {
        const key = nameKey ? item.payload[nameKey] : item.value
        if (typeof key === "string") {
          return (
            <div key={key} className="flex items-center gap-1.5">
              {!hideIcon && (
                <div
                  className={cn("h-3 w-3 shrink-0 rounded-full", {
                    [`bg-[${config[key]?.color || currentColors.primary}]`]: config[key]?.color,
                    "bg-primary": !config[key]?.color,
                  })}
                />
              )}
              {config[key]?.icon && <ChartPrimitive.ChartLegend className="mr-1" icon={config[key].icon} />}
              <span className="text-muted-foreground">{item.name}</span>
            </div>
          )
        }
        return null
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"

export { Chart, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent }
