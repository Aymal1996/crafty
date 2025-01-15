import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {ListOrdered,Loader,PackageSearch,TrendingUp} from 'lucide-react'
import Heading from '@/components/frontend/Heading'
import OrderCard from '@/components/frontend/OrderCard'


const userOrderDetails = [
  {
    title: 'Total Orders',
    icon: <ListOrdered />,
    order: '70',
    bgcolor: '#25B0B0',
    textcolor: '#fff'
  },
  {
    title: 'Pending Orders',
    icon: <Loader />,
    order: '30',
    bgcolor: '#000',
    textcolor: '#fff'
  },
  {
    title: 'Processing Orders',
    icon: <PackageSearch />,
    order: '15',
    bgcolor: '#25B0B0',
    textcolor: '#fff'
  },
  {
    title: 'Complete Orders',
    icon: <TrendingUp />,
    order: '40',
    bgcolor: '#000',
    textcolor: '#fff'
  }
]
const page = () => {
  return ( 
  <div>
    <div className='flex flex-col xl:flex-row md:flex-row sm:flex-row gap-5 w-full'>
      {userOrderDetails.map((order,index)=>
      <Card key={index} className='border-0 w-full rounded-2xl font-Vietnam transition-all delay-300 hover:shadow-2' style={{ backgroundColor: order.bgcolor, color: order.textcolor }} >
        <CardHeader>
          <CardTitle>
            <div className='flex justify-between items-center'>
            <span className='text-[16px]'>{order.title}</span>
            <span>{order.icon}</span>
            </div>
          </CardTitle>
          <CardContent className='p-0 pt-2'>
            <h2 className='text-3xl'>{order.order}</h2>
          </CardContent>
        </CardHeader>
      </Card>
      )}
    </div>
    <Heading title="Recent Order" className='font-Vietnam text-2xl pt-7'/>
    <OrderCard />
  </div>
  )
}

export default page
