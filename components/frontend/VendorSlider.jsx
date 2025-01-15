'use client'
import { React, useState, useCallback, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '../ui/button'
import Heading from '@/components/frontend/Heading'
import Link from 'next/link'
import vendor1 from '@/public/img/vendor-1.png'
import vendor2 from '@/public/img/vendor-2.png'
import vendor3 from '@/public/img/vendor-3.png'
import vendor4 from '@/public/img/vendor-4.png'
import StarRating from '@/components/frontend/StarRating'

export default function VendorSlider () {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)
  const [rating, setRating] = useState(3.1);
  const topVendors = [
    {
      title: 'Dynamic',
      image: vendor1,
      review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>
    },
    {
      title: 'Pinnacle',
      image: vendor2,
      review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>

    },
    {
      title: 'Elite',
      image: vendor3,
      review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>

    },
    {
      title: 'Prime',
      image: vendor4,
      review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>
    },
    {
        title: 'Dynamic',
        image: vendor1,
        review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>
      },
      {
        title: 'Pinnacle',
        image: vendor2,
        review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>
  
      },
      {
        title: 'Elite',
        image: vendor3,
        review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>
  
      },
      {
        title: 'Prime',
        image: vendor4,
        review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>
      },
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
    //  api.scrollTo(Math.max(0, current - 1));
    api.scrollTo(Math.max(0,current - 1));
   }, [api,current])
 
   const scrollNext = useCallback(() => {
     if(!api) return;
     // api?.scrollNext()
     api.scrollTo(Math.max(topVendors.length - 1, current - 1));
   }, [api,current])
  return (
    <>
      <Heading
        title='TOP Vendors'
        className='font-Inter uppercase text-2xl text-center text-black font-bold pt-10 xl:pt-5 md:pt-10'
      />
      <Carousel className='px-0 xl:px-0 md:px-10 sm:px-0 w-full ' setApi={setApi}>
        <CarouselContent className='-ml-10 w-full p-0 xl:p-20 xl:pr-0 xl:pt-2 xl:pb-5 md:p-10 md:pb-5 sm:p-5 pr-0  gap-0'>
          {topVendors.map((vendor, index) => (
            <CarouselItem className={cn('py-3 pl-0 transition-all duration-300 hover:animate-growShadow rounded-2xl basis-full xl:basis-[12.5%] md:basis-1/4 sm:basis-1/2')} key={index}>
                <Link href="" className="flex flex-col justify-center items-center" key={index}>
                    <Image src={vendor.image} alt={vendor.title} className="rounded w-[80%]" />
                    <h3 className="font-smibold pt-5 text-[15px] font-Inter">{vendor.title}</h3>
                    {vendor.review}
                </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onClick={scrollPrev} className='left-5 top-[50%] shadow-2' />
        <CarouselNext onClick={scrollNext} className='right-5 top-[50%] shadow-2' />
      </Carousel>
    </>
  )
}

// flex justify-start xl:justify-center md:justify-center sm:justify-start items-center xl:items-center md:items-center sm:items-start