"use client"

import data from "./data.json"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp, TrendingDown, MoreVertical, Plus } from "lucide-react"

const chartData = [
  { date: "Apr 1", val1: 400, val2: 240 },
  { date: "Apr 7", val1: 300, val2: 139 },
  { date: "Apr 13", val1: 200, val2: 980 },
  { date: "Apr 19", val1: 278, val2: 390 },
  { date: "Apr 26", val1: 189, val2: 480 },
  { date: "May 2", val1: 239, val2: 380 },
  { date: "May 8", val1: 349, val2: 430 },
  { date: "May 14", val1: 200, val2: 300 },
  { date: "May 21", val1: 278, val2: 200 },
  { date: "Jun 3", val1: 189, val2: 278 },
  { date: "Jun 9", val1: 349, val2: 189 },
  { date: "Jun 15", val1: 400, val2: 239 },
  { date: "Jun 21", val1: 300, val2: 349 },
  { date: "Jun 29", val1: 200, val2: 400 },
]

export default function AdminPage() {
  return (
    <div className="space-y-6 text-zinc-100 dark">
      {/* Метрики */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-zinc-900/50 border-zinc-800 text-zinc-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Revenue</CardTitle>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 gap-1 text-xs font-normal">
              <TrendingUp className="h-3 w-3" /> +12.5%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">$1,250.00</div>
            <p className="text-xs text-zinc-500 mt-2">Visitors for the last 6 months</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800 text-zinc-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">New Customers</CardTitle>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 gap-1 text-xs font-normal">
              <TrendingDown className="h-3 w-3" /> -20%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">1,234</div>
            <p className="text-xs text-zinc-500 mt-2">Acquisition needs attention</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800 text-zinc-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Active Accounts</CardTitle>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 gap-1 text-xs font-normal">
              <TrendingUp className="h-3 w-3" /> +12.5%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">45,678</div>
            <p className="text-xs text-zinc-500 mt-2">Engagement exceed targets</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800 text-zinc-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Growth Rate</CardTitle>
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 gap-1 text-xs font-normal">
              <TrendingUp className="h-3 w-3" /> +4.5%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">4.5%</div>
            <p className="text-xs text-zinc-500 mt-2">Meets growth projections</p>
          </CardContent>
        </Card>
      </div>

      {/* График */}
      <Card className="bg-zinc-900/50 border-zinc-800 text-zinc-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Total Visitors</CardTitle>
            <CardDescription className="text-zinc-500 text-xs">Total for the last 3 months</CardDescription>
          </div>
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs text-zinc-400">
            <Button variant="ghost" size="sm" className="h-7 text-xs bg-zinc-800 text-white">Last 3 months</Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">Last 30 days</Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">Last 7 days</Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVal1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#fff" }} />
                <Area type="monotone" dataKey="val1" stroke="#a1a1aa" fillOpacity={1} fill="url(#colorVal1)" strokeWidth={2} />
                <Area type="monotone" dataKey="val2" stroke="#52525b" fillOpacity={0} strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Таблица */}
      <Card className="bg-zinc-900/50 border-zinc-800 text-zinc-100">
        <div className="p-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="h-8 bg-zinc-800 text-xs border border-zinc-700">Outline</Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs text-zinc-400">Past Performance <span className="ml-1 rounded-full bg-zinc-800 px-1.5 py-0.5 text-[10px]">3</span></Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs text-zinc-400">Key Personnel <span className="ml-1 rounded-full bg-zinc-800 px-1.5 py-0.5 text-[10px]">2</span></Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs border-zinc-800 bg-zinc-900">Customize Columns</Button>
            <Button size="sm" className="h-8 text-xs bg-white text-black hover:bg-zinc-200"><Plus className="mr-1 h-3.5 w-3.5" /> Add Section</Button>
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="border-zinc-800 bg-zinc-900/30">
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="w-[40px]"><Checkbox className="border-zinc-700" /></TableHead>
                <TableHead className="text-zinc-400">Header</TableHead>
                <TableHead className="text-zinc-400">Section Type</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400">Target</TableHead>
                <TableHead className="text-zinc-400">Limit</TableHead>
                <TableHead className="text-zinc-400">Reviewer</TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="border-zinc-800/60 hover:bg-zinc-800/40">
                  <TableCell><Checkbox className="border-zinc-700" /></TableCell>
                  <TableCell className="font-medium text-zinc-200">{item.header}</TableCell>
                  <TableCell>
                    <span className="rounded-full bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-400 border border-zinc-700/50">{item.type}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={item.status === "Done" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" : "border-amber-500/30 bg-amber-500/10 text-amber-400"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-zinc-300">{item.target || 18}</TableCell>
                  <TableCell className="font-mono text-zinc-400">{item.limit || 5}</TableCell>
                  <TableCell className="text-zinc-300">{item.reviewer}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}