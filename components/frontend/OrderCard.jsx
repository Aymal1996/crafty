import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import order1 from '@/public/img/order-1.png'
import order2 from '@/public/img/order-2.png'
import Image from "next/image";
import { Button } from "../ui/button";
const orders = [
    {
        image: order1,
    },
    {
        image: order2,
    },
    {
        image: order1,
    },
    {
        image: order2,
    },
]
const btns = [
  {
    title: 'Track',
    bgColor: '#25B0B0',
    border: '1px solid #25B0B0',
    textColor: '#fff'
  },
  {
    title: 'Buy this again',
    bgColor: '#fff',
    border: '1px solid #000',
    textColor: '#000'
  },
  {
    title: 'Return/Refund',
    bgColor: '#fff',
      border: '1px solid #000',
      textColor: '#000'
  },
  {
    title: 'Change address',
    bgColor: '#fff',
    border: '1px solid #000',
    textColor: '#000'
  },
]


const OrderCard = () => {
  return (
    <Card className="bg-[#F5F5F5] rounded-e-2xl">
      <CardContent className="flex flex-col xl:flex-row md:flex-row sm:flex-row p-0 border-0 shadow-none bg-[#F5F5F5] rounded-e-2xl">
        <Card className="border-0 w-full xl:w-[75%] md:w-[75%] sm:w-full shadow-none bg-[#F5F5F5]">
          <CardHeader>
              <CardTitle class="font-Vietnam">
                  <span className="text-lg">Shipped Order </span>|<span className="text-lg"> Shipped View</span>
              </CardTitle>
              <CardDescription className="text-red-600 p-0 text-md">
                  Fastest arrival within 5 days
              </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col xl:flex-row md:flex-row sm:flex-col p-5 pt-0 justify-start gap-3 border-0 shadow-none">
              {orders.map((order,index)=>
              <Card key={index} className="border-0 w-full xl:w-[18%] md:w-[18%] sm:w-[40%] shadow-none bg-[#F5F5F5]">
                  <Image src={order.image} alt='image' className="w-full"/> 
              </Card>
              )}
          </CardContent>
        </Card>
        <Card className="border-0 w-full xl:w-[30%] md:w-[30%] sm:w-full flex justify-center shadow-none bg-[#F5F5F5]">
          <CardHeader>
            <CardTitle className='font-normal text-2xl text-center'>View order details</CardTitle>
            <CardContent>
              {btns.map((btn,index)=>
              <Button className="w-full my-1.5 h-9 rounded-full" key={index} style={{backgroundColor: btn.bgColor, border: btn.border, color: btn.textColor}}>{btn.title}</Button>
              )}
            </CardContent>
          </CardHeader>
        </Card>
      </CardContent>
      <CardFooter className="text-right flex justify-end border-0 bg-[#F5F5F5] rounded-e-2xl">
        <span>4 items: AED288.90   Order Time: 16 Dec 2024 Order ID: -209-04179775903273135</span>
      </CardFooter>
    </Card>
  )
}

export default OrderCard


{/*  */}