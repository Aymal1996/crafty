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
import Banner_slider_1 from '@/public/img/banner-slider.png'
import Banner_slider_2 from '@/public/img/banner-slider-2.png'
import Banner_slider_3 from '@/public/img/banner-slider-3.png'
import Image from 'next/image'
import { Button } from '../ui/button'


const Carousel_1 = () => {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0);
  const slides = [
 
      {image: Banner_slider_1},
      {image: Banner_slider_1},
      {image: Banner_slider_1},
      {image: Banner_slider_1},
      {image: Banner_slider_1},
    
    ];
  useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const scrollPrev = useCallback(()=>{
    api?.scrollPrev()
  }, [api]);

  const scrollNext = useCallback(()=>{
    api?.scrollNext()
  }, [api]);
const scrollTo = useCallback((index)=>{
    api?.scrollTo(index)
}, [api]);
  return (
    <div className="relative">
    <Carousel className='pt-5' setApi={setApi} opts={{ loop: true, align: 'center' }}>
      <CarouselContent className='gap-3'>
        {slides.map((slide,index) =>
            <CarouselItem className={cn("basis-1/2", current === index ? "basis-1/1" : "basis-1/1")} key={index}>
             <Image src={slide.image} alt="hello" className="w-full xl:h-100 md:h-[400px]" />
           </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious onClick={scrollPrev} className="left-10 opacity-50 top-[60%]" />
    <CarouselNext onClick={scrollNext} className="right-10 opacity-50 top-[60%]" /> 
    </Carousel>
   <div className="flex justify-center mt-4 space-x-2">
    {slides.map((_, index)=>(
    <Button key={index} size="sm" className={cn("w-4 h-4 rounded-full p-0 hover:text-gray-900", current === index ? "bg-gray-900" : "bg-gray-400")} onClick={()=> scrollTo(index)}></Button>
   ) )}
   </div>
    </div>
  )
}

export default Carousel_1
