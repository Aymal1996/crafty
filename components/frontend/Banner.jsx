import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Heading from "@/components/frontend/Heading";
import Cat1 from "@/public/img/cat-1.png";
import Cat2 from "@/public/img/cat-2.png";
import Cat3 from "@/public/img/cat-3.png";
import Cat4 from "@/public/img/cat-4.png";
import Cat5 from "@/public/img/cat-5.png";
import banner1 from "@/public/img/banner-imgae.png"
import Image from "next/image";
import Link from "next/link";

const topCategories = [
  {
    title: "Candles",
    image: Cat1,
  },
  {
    title: "Accessories",
    image: Cat2,
  },
  {
    title: "Vase",
    image: Cat3,
  },
  {
    title: "Clothing",
    image: Cat4,
  },
  {
    title: "Gadgets",
    image: Cat5,
  },
];

export default function Banner(){
    return(
        <>
        <div className="flex flex-col xl:flex-row md:flex-row sm:xl:flex-col w-full h-full text-white">
            <div className="font-Inter w-full xl:w-[21%] md:w-[25%] sm:w-full bg-c_green p-10 pt-5 hover:shadow-xl transition-all duration-300">
                <Heading title="Top Categories" className='uppercase text-2xl pl-3' />
                {topCategories.map((category, index) => {
                    return (
                        <Link href="" key={index} className="flex flex-row items-center justify-between w-full mb-3 px-3">
                            <h3 className="text-lg">{category.title}</h3>
                            <Image src={category.image} alt={category.title} className="rounded-full w-[40px]"/>
                        </Link>
                    );
                })}
            </div>
            <div className=" w-full xl:w-[65%] md:w-[58%] sm:w-full bg-cover bg-center bg-banner1 bg-no-repeat hover:shadow-xl transition-all duration-300" style={{backgroundRepeat: 'no-repeat'}}>
            </div>
            <div className="font-Inter w-full xl:w-[18%] md:w-[25%] sm:w-full ">
                <div className="hover:shadow-xl transition-all duration-300 flex h-[50%] w-full bg-banner2 bg-no-repeat bg-cover bg-center relative text-white justify-left items-center pl-10">
                <div className="absolute inset-0 bg-c_green bg-opacity-70"></div>
                    <h3 className="hidden xl:block md:block sm:hidden text-white relative z-20 text-3xl font-bold">NEW<br></br> YEAR<br></br> SALE</h3>
                    <h3 className="py-10 block xl:hidden md:hidden sm:block text-white relative z-20 text-3xl font-bold">NEW YEAR SALE</h3>
                </div>
                <div className="hover:shadow-xl transition-all duration-300 flex h-[50%] w-full bg-banner3 bg-no-repeat bg-cover bg-center relative justify-left items-center pl-10">
                <div className="absolute inset-0 bg-c_green bg-opacity-70"></div>
                    <h3 className="hidden xl:block md:block sm:hidden text-white relative z-20 text-3xl font-bold">UPTO<br></br> 15%<br></br> OFF</h3>
                    <h3 className="py-10 block xl:hidden md:hidden sm:block text-white relative z-20 text-3xl font-bold">UPTO 15% OFF</h3>
                </div>
            </div>
        </div>
        </>
    )
}