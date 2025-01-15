import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Layers,
  ShoppingBasket,
  BadgeDollarSign,
  ChartNoAxesCombined,
  ChartNoAxesColumn,
} from "lucide-react";

const Cards = () => {
  let data = [
    {
      title: "Today Orders",
      value: "1500",
      icon: <Layers size="30" />,
      bgColor: "bg-teal-600",
    },
    {
      title: "Total Revenue",
      value: "$3430.00",
      icon: <ChartNoAxesColumn size="30" />,
      bgColor: "bg-orange-400",
    },

    {
      title: "All Time Sales",
      value: "$9999.00",
      icon: <BadgeDollarSign size="30" />,
      bgColor: "bg-blue-500",
    },
    {
      title: "Total Customers",
      value: "5630",
      icon: <ChartNoAxesCombined size="30" />,
      bgColor: "bg-yellow-500",
    },
    {
      title: "Total Products",
      value: "502",
      icon: <ShoppingBasket  size="30" />,
      bgColor: "bg-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {data.map((item, index) => (
        <Card
          key={index}
          className={`py-5 flex flex-col items-center text-center ${item.bgColor}`}
        >
          <CardHeader className="text-center m-0 p-0 pb-1">
            <div className="text-gray-50 flex justify-center">{item.icon}</div>
            <CardTitle className="text-gray-50 text-lg font-[400] font-Vietnam pt-3">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="m-0 p-0">
            <p className="text-3xl font-[400] p-0 font-Vietnam text-gray-50">{item.value}</p>
          </CardContent>
          <CardFooter>
            {/* <p className="text-sm text-black">More details...</p> */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
