import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Layers,
    PackageCheck,
    ListTodo,
    PackageSearch,
    ShoppingCart
} from 'lucide-react'

const Cardstatus = () => {
    let data = [
        {
            status: 'Today Orders',
            value: '504',
            icon: <ShoppingCart size='30' />,
            iconBgColor: 'bg-blue-500'
        },
        {
            status: 'Orders Pending',
            value: '138',
            icon: <ListTodo size='30' />,
            iconBgColor: 'bg-yellow-500'
        },
        {
            status: 'Orders Processing',
            value: '77',
            icon: <PackageSearch size='30' />,
            iconBgColor: 'bg-orange-500'
        },
        {
            status: 'Orders Delivered',
            value: '220',
            icon: <PackageCheck size='30' />,
            iconBgColor: 'bg-green-500'
        }
    ]

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5'>
            {data.map((item, index) => (
                <Card
                    key={index}
                    className={`flex items-center justify-start gap-3 py-5 px-4 dark:bg-gray-800 dark:text-gray-50`}
                >
                    {/* Icon Section with Circle */}
                    <div
                        className={`w-14 h-14 flex items-center justify-center rounded-full ${item.iconBgColor}`}
                    >
                        {item.icon}
                    </div>

                    {/* Status and Value Section */}
                    <div className='text-left'>
                        <CardTitle className='text-lg font-[400] font-Vietnam'>
                            {item.status}
                        </CardTitle>
                        <CardContent className='p-0'>
                            <p className='text-xl font-[400] font-Vietnam p-0'>{item.value}</p>
                        </CardContent>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default Cardstatus
