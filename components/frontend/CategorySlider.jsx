"use client"
import { React, useState, useCallback, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import topcat_1 from '@/public/img/topcat-1.png'
import topcat_2 from '@/public/img/topcat-2.png'
import topcat_3 from '@/public/img/topcat-3.png'
import topcat_4 from '@/public/img/topcat-4.png'
import Image from 'next/image'
import { Button } from '../ui/button'
import Heading from '@/components/frontend/Heading'
import Link from 'next/link'




export default function Categorycategoryr () {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)
  const topCategories = [
    { image: topcat_1},
    { image: topcat_2 },
    { image: topcat_3 },
    { image: topcat_4},
    { image: topcat_1},
    { image: topcat_2 },
    { image: topcat_3 },
    { image: topcat_4},
    { image: topcat_1},
    { image: topcat_2 },
    { image: topcat_3 },
  ]
  useEffect(() => {
      if (!api) {
        return
      }
      setCurrent(api.selectedScrollSnap() || 0)
      api.on('select', () => {
        setCurrent(api.selectedScrollSnap() || 0)
      })
    }, [api])
  
    const scrollPrev = useCallback(() => {
      if(!api) return;
      // api?.scrollPrev()
      api.scrollTo(Math.max(0, current - 2));
    }, [api,current])
  
    const scrollNext = useCallback(() => {
      if(!api) return;
      // api?.scrollNext()
      api.scrollTo(Math.max(topCategories.length - 1, current - 1));
    }, [api,current])
  return (
    <>
        <Heading title="TOP Categories" className='font-Inter uppercase text-2xl text-center text-black font-bold pt-16 pb-0' />
        <Carousel
        className='px-5 xl:px-20 md:px-32 sm:px-20 w-full '
        setApi={setApi}
        >
        <CarouselContent className='-ml-0 w-full p-0 xl:p-0 xl:pl-0 xl:pt-5 xl:pb-8 md:p-10 sm:p-0 flex gap-2'>
            {topCategories.map((category, index) => (
            <CarouselItem
                className={cn('transition-all duration-300 hover:animate-growShadow pb-0 rounded-2xl ml-0 pl-0 basis-full xl:basis-[12.5%] md:basis-1/4 sm:basis-1/3')}
                key={index}
            >
                <Link href="" className='transition-all duration-300 hover:shadow-xl pb-2 rounded-br-lg rounded-bl-lg relative'>
                    <span className="px-1 py-0.5 absolute top-2 left-2 bg-gray-900 text-white rounded-[50px] text-[12px]">Best Seller</span>
                    <Image src={category.image} alt='hello' className='w-full p-1' />
                </Link>
                
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious
            onClick={scrollPrev}
            className='left-10 top-[50%] shadow-2'
        />
        <CarouselNext
            onClick={scrollNext}
            className='right-10 top-[50%] shadow-2'
        />
        </Carousel>
    </>
  )
}
