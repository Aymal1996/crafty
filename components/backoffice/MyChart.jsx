"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  { date: "2024-04-01", Sales: 222, Visitors: 150 },
  { date: "2024-04-02", Sales: 97, Visitors: 180 },
  { date: "2024-04-03", Sales: 167, Visitors: 120 },
  { date: "2024-04-04", Sales: 242, Visitors: 260 },
  { date: "2024-04-05", Sales: 373, Visitors: 290 },
  { date: "2024-04-06", Sales: 301, Visitors: 340 },
  { date: "2024-04-07", Sales: 245, Visitors: 180 },
  { date: "2024-04-08", Sales: 409, Visitors: 320 },
  { date: "2024-04-09", Sales: 59, Visitors: 110 },
  { date: "2024-04-10", Sales: 261, Visitors: 190 },
  { date: "2024-04-11", Sales: 327, Visitors: 350 },
  { date: "2024-04-12", Sales: 292, Visitors: 210 },
  { date: "2024-04-13", Sales: 342, Visitors: 380 },
  { date: "2024-04-14", Sales: 137, Visitors: 220 },
  { date: "2024-04-15", Sales: 120, Visitors: 170 },
  { date: "2024-04-16", Sales: 138, Visitors: 190 },
  { date: "2024-04-17", Sales: 446, Visitors: 360 },
  { date: "2024-04-18", Sales: 364, Visitors: 410 },
  { date: "2024-04-19", Sales: 243, Visitors: 180 },
  { date: "2024-04-20", Sales: 89, Visitors: 150 },
  { date: "2024-04-21", Sales: 137, Visitors: 200 },
  { date: "2024-04-22", Sales: 224, Visitors: 170 },
  { date: "2024-04-23", Sales: 138, Visitors: 230 },
  { date: "2024-04-24", Sales: 387, Visitors: 290 },
  { date: "2024-04-25", Sales: 215, Visitors: 250 },
  { date: "2024-04-26", Sales: 75, Visitors: 130 },
  { date: "2024-04-27", Sales: 383, Visitors: 420 },
  { date: "2024-04-28", Sales: 122, Visitors: 180 },
  { date: "2024-04-29", Sales: 315, Visitors: 240 },
  { date: "2024-04-30", Sales: 454, Visitors: 380 },
  { date: "2024-05-01", Sales: 165, Visitors: 220 },
  { date: "2024-05-02", Sales: 293, Visitors: 310 },
  { date: "2024-05-03", Sales: 247, Visitors: 190 },
  { date: "2024-05-04", Sales: 385, Visitors: 420 },
  { date: "2024-05-05", Sales: 481, Visitors: 390 },
  { date: "2024-05-06", Sales: 498, Visitors: 520 },
  { date: "2024-05-07", Sales: 388, Visitors: 300 },
  { date: "2024-05-08", Sales: 149, Visitors: 210 },
  { date: "2024-05-09", Sales: 227, Visitors: 180 },
  { date: "2024-05-10", Sales: 293, Visitors: 330 },
  { date: "2024-05-11", Sales: 335, Visitors: 270 },
  { date: "2024-05-12", Sales: 197, Visitors: 240 },
  { date: "2024-05-13", Sales: 197, Visitors: 160 },
  { date: "2024-05-14", Sales: 448, Visitors: 490 },
  { date: "2024-05-15", Sales: 473, Visitors: 380 },
  { date: "2024-05-16", Sales: 338, Visitors: 400 },
  { date: "2024-05-17", Sales: 499, Visitors: 420 },
  { date: "2024-05-18", Sales: 315, Visitors: 350 },
  { date: "2024-05-19", Sales: 235, Visitors: 180 },
  { date: "2024-05-20", Sales: 177, Visitors: 230 },
  { date: "2024-05-21", Sales: 82, Visitors: 140 },
  { date: "2024-05-22", Sales: 81, Visitors: 120 },
  { date: "2024-05-23", Sales: 252, Visitors: 290 },
  { date: "2024-05-24", Sales: 294, Visitors: 220 },
  { date: "2024-05-25", Sales: 201, Visitors: 250 },
  { date: "2024-05-26", Sales: 213, Visitors: 170 },
  { date: "2024-05-27", Sales: 420, Visitors: 460 },
  { date: "2024-05-28", Sales: 233, Visitors: 190 },
  { date: "2024-05-29", Sales: 78, Visitors: 130 },
  { date: "2024-05-30", Sales: 340, Visitors: 280 },
  { date: "2024-05-31", Sales: 178, Visitors: 230 },
  { date: "2024-06-01", Sales: 178, Visitors: 200 },
  { date: "2024-06-02", Sales: 470, Visitors: 410 },
  { date: "2024-06-03", Sales: 103, Visitors: 160 },
  { date: "2024-06-04", Sales: 439, Visitors: 380 },
  { date: "2024-06-05", Sales: 88, Visitors: 140 },
  { date: "2024-06-06", Sales: 294, Visitors: 250 },
  { date: "2024-06-07", Sales: 323, Visitors: 370 },
  { date: "2024-06-08", Sales: 385, Visitors: 320 },
  { date: "2024-06-09", Sales: 438, Visitors: 480 },
  { date: "2024-06-10", Sales: 155, Visitors: 200 },
  { date: "2024-06-11", Sales: 92, Visitors: 150 },
  { date: "2024-06-12", Sales: 492, Visitors: 420 },
  { date: "2024-06-13", Sales: 81, Visitors: 130 },
  { date: "2024-06-14", Sales: 426, Visitors: 380 },
  { date: "2024-06-15", Sales: 307, Visitors: 350 },
  { date: "2024-06-16", Sales: 371, Visitors: 310 },
  { date: "2024-06-17", Sales: 475, Visitors: 520 },
  { date: "2024-06-18", Sales: 107, Visitors: 170 },
  { date: "2024-06-19", Sales: 341, Visitors: 290 },
  { date: "2024-06-20", Sales: 408, Visitors: 450 },
  { date: "2024-06-21", Sales: 169, Visitors: 210 },
  { date: "2024-06-22", Sales: 317, Visitors: 270 },
  { date: "2024-06-23", Sales: 480, Visitors: 530 },
  { date: "2024-06-24", Sales: 132, Visitors: 180 },
  { date: "2024-06-25", Sales: 141, Visitors: 190 },
  { date: "2024-06-26", Sales: 434, Visitors: 380 },
  { date: "2024-06-27", Sales: 448, Visitors: 490 },
  { date: "2024-06-28", Sales: 149, Visitors: 200 },
  { date: "2024-06-29", Sales: 103, Visitors: 160 },
  { date: "2024-06-30", Sales: 446, Visitors: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  Visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-2))",
  },
}

export function MyChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className='my-5 border-2 dark:bg-gray-800'>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Visitors - Sales Presentation</CardTitle>
          <CardDescription>
            Showing total visitors and sales for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Sales)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Sales)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Visitors)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Visitors)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="Visitors"
              type="natural"
              fill="url(#fillVisitors)"
              stroke="var(--color-Visitors)"
              stackId="a"
            />
            <Area
              dataKey="Sales"
              type="natural"
              fill="url(#fillSales)"
              stroke="var(--color-Sales)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

