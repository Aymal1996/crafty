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
import StarRating from './StarRating'
import User from '@/public/img/user.png'
import User2 from '@/public/img/user2.png'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {ChevronLeft, ChevronRight} from 'lucide-react'



export default function Testimonial () {
  const [api, setApi] = useState(null)
  const [rating, setRating] = useState(3.1);
  const [current, setCurrent] = useState(0)
  const testimonials = [
    {   title: 'Floyd Miles',
        description : 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>,
        image: User
    },
    {   title: 'Ronald Richards',
        description : 'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>,
        image: User2
    },
    {   title: 'Savannah Nguyen',
        description : 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>,
        image: User
    },
    {   title: 'Floyd Miles',
        description : 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>,
        image: User
    },
    {   title: 'Ronald Richards',
        description : 'ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>,
        image: User2
    },
    {   title: 'Savannah Nguyen',
        description : 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
        review: <StarRating totalStars={5} initialRating={rating} onChange={(newRating)=> setRating(newRating)}/>,
        image: User
    }
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
    api.scrollTo(Math.max(0, current - 1));
  }, [api,current])

  const scrollNext = useCallback(() => {
    if(!api) return;
    // api?.scrollNext()
    api.scrollTo(Math.max(testimonials.length - 1, current - 1));
  }, [api,current])
  return (
    <div className="relative">
        <div className="px-3 xl:px-20 md:px-10 sm:px-5 pb-3">
            <Heading title="Our Customer Feedback" className='capitalize text-3xl font-Inter text-left text-black font-bold pb-0 mb-0' />
            <p className="pt-2 m-0 text-md text-gray-600 font-Inter">Don’t take our word for it. Trust our customers</p>
        </div>
        <Carousel
        className='pb-0 px-16 w-full '
        setApi={setApi}
        // opts={{
        //   align: "center",
        // }}
        >
        <CarouselContent className='ml-[-25px] w-full pt-3 px-5 xl:px-10 md:px-10 sm:px-5 gap-0 xl:gap-5 md:gap-5 sm:gap-2'>
            {testimonials.map((testimonial, index) => (
            <CarouselItem
                className={cn('pl-1 pb-7 basis-full xl:basis-1/3 md:basis-1/2 h-[100%]')}
                key={index}
            >
               <Card className="transition-all duration-300 hover:animate-growShadow pb-3 rounded-br-lg rounded-bl-lg h-[320px] w-full ">
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            <Image src={testimonial.image} alt={testimonial.title} />
                            <div>{testimonial.review}</div>
                        </CardTitle>
                        <CardDescription className={cn("text-[20px] text-[#133240] pt-3 font-Inter")} >{testimonial.title}</CardDescription>
                    </CardHeader>
                    <CardContent className={cn("font-Inter text-[14px] text-[#133240]")}>
                        {testimonial.description}
                    </CardContent>
               </Card>
                
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious
                    onClick={scrollPrev}
                    className='block xl:hidden md:hidden sm:block left-10 top-[50%] shadow-2'
                />
          <CarouselNext
                    onClick={scrollNext}
                    className='right-10 top-[50%] block xl:hidden md:hidden sm:block shadow-2'
                />
        <Card className="hidden xl:block md:block sm:hidden border-0 absolute top-[-68px] right-10 shadow-none ">
            <CardFooter className="border-0 w-full flex justify-between gap-3">
                <Button variant="outline" onClick={scrollPrev} className="border-[#133240] shadow-2"><ChevronLeft strokeWidth={3} /> Previous</Button>
                <Button variant="outline" onClick={scrollNext} className="border-[#133240] shadow-2">Next <ChevronRight strokeWidth={3} /></Button>
            </CardFooter>
        </Card>
        </Carousel>
    </div>
  )
}
