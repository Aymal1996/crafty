import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Search } from 'lucide-react'
import OrderCard from '@/components/frontend/OrderCard'
 
const page = () => {
  return (
    <div className="w-full px-4 py-2">
    <div className="flex items-center justify-between border-b">
      <Tabs defaultValue="all" className="flex-1">
        <div className="flex items-center justify-between">
          <TabsList className="h-9 justify-start gap-4 rounded-none bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="font-Vietnam capitalize text-md relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-normal text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              All orders
            </TabsTrigger>
            <TabsTrigger
              value="processing"
              className="font-Vietnam capitalize text-md relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-normal text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Processing
            </TabsTrigger>
            <TabsTrigger
              value="shipped"
              className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-normal text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Shipped
            </TabsTrigger>
            <TabsTrigger
              value="delivered"
              className="relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-normal text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Delivered
            </TabsTrigger>
            <TabsTrigger
              value="returns"
              className="font-Vietnam capitalize text-md relative h-9 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-normal text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Returns
            </TabsTrigger>
          </TabsList>
          <div className="relative w-[40%]">
            <Search className="rounded-full absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Item name / Order ID / Tracking no."
              className="bg-[#f5f5f5] rounded-full pl-8 border-gray-400"
            />
          </div>
        </div>
        <TabsContent value="all" className="mt-10">
          <OrderCard />
        </TabsContent>
        <TabsContent value="processing" className="mt-10">
          <p>Processing orders content</p>
        </TabsContent>
        <TabsContent value="shipped" className="mt-10">
          <p>Shipped orders content</p>
        </TabsContent>
        <TabsContent value="delivered" className="mt-10">
          <p>Delivered orders content</p>
        </TabsContent>
        <TabsContent value="returns" className="mt-10">
          <p>Returns content</p>
        </TabsContent>
      </Tabs>
    </div>
  </div>
  )
}

export default page
