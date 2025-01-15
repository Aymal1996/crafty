'use client'
import React, { useState, useCallback, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import Heading from '@/components/frontend/Heading'
import BestSelling1 from '@/public/img/image-1.png'
import BestSelling2 from '@/public/img/image-2.png'
import BestSelling3 from '@/public/img/image-3.png'
import BestSelling4 from '@/public/img/image-4.png'
import BestSelling5 from '@/public/img/image-5.png'
import topcat_1 from '@/public/img/topcat-1.png'
import topcat_2 from '@/public/img/topcat-2.png'
import topcat_3 from '@/public/img/topcat-3.png'
import topcat_4 from '@/public/img/topcat-4.png'
import Image from 'next/image'
import Link from 'next/link'
import StarRating from './StarRating'
import {Button } from '@/components/ui/button'
import {ChevronRight,ChevronLeft} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
const BestSellingProduct = () => {
  const [rating, setRating] = useState(3.1)
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(null)
  const topSellingProduct = [
    {
      title:
        'Magical Rainbow Unicorn Plushie with Glittery Wings and Sound Effects',
      image: topcat_1,
      price: 650,
      cut_price: 950,
      review: (
        <StarRating
          totalStars={5}
          initialRating={rating}
          onChange={newRating => setRating(newRating)}
        />
      ),
      review_count: rating
    },
    {
      title:
        'Super Galactic Space Explorer Adventure Kit with Glow-in-the-Dark Stickers',
      image: topcat_2,
      price: 30,
      cut_price: 50,
      review: (
        <StarRating
          totalStars={5}
          initialRating={rating}
          onChange={newRating => setRating(newRating)}
        />
      ),
      review_count: rating
    },
    {
      title:
        'The Ultimate DIY Slime Factory: 15 Fun Colors and Sparkly Add-ons',
      image: topcat_3,
      price: 50,
      cut_price: 90,
      review: (
        <StarRating
          totalStars={5}
          initialRating={rating}
          onChange={newRating => setRating(newRating)}
        />
      ),
      review_count: rating
    },
    {
      title:
        'Adventures in Dinosaur World: Giant Roaring T-Rex Action Figure Set',
      image: topcat_4,
      price: 650,
      cut_price: 950,
      review: (
        <StarRating
          totalStars={5}
          initialRating={rating}
          onChange={newRating => setRating(newRating)}
        />
      ),
      review_count: rating
    },
    {
      title:
        'Underwater Mermaid Castle Playset with Moving Parts and Shimmering Lights',
      image: topcat_1,
      price: 550,
      cut_price: 850,
      review: (
        <StarRating
          totalStars={5}
          initialRating={rating}
          onChange={newRating => setRating(newRating)}
        />
      ),
      review_count: rating
    },
    {
      title:
        'My First Art Studio: Complete 50-Piece Painting and Craft Supplies Kit',
      image: topcat_2,
      price: 350,
      cut_price: 450,
      review: (
        <StarRating
          totalStars={5}
          initialRating={rating}
          onChange={newRating => setRating(newRating)}
        />
      ),
      review_count: rating
    },
    {
      title: 'The Big Book of Bedtime Stories with 100 Illustrated Fairy Tales',
      image: topcat_3,
      price: 950,
      cut_price: 1050,
      review: (
        <StarRating
          totalStars={5}
          initialRating={rating}
          onChange={newRating => setRating(newRating)}
        />
      ),
      review_count: rating
    },
    {
      title:
        'Enchanted Forest Fairy House with Light-Up Mushrooms and Tiny Fairies',
      image: topcat_4,
      price: 550,
      cut_price: 750,
      review: (
        <StarRating
          totalStars={5}
          initialRating={rating}
          onChange={newRating => setRating(newRating)}
        />
      ),
      review_count: rating
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
    if (!api) return
    // api?.scrollPrev()
    api.scrollTo(Math.max(0, current - 1))
  }, [api, current])

  const scrollNext = useCallback(() => {
    if (!api) return
    // api?.scrollNext()
    api.scrollTo(Math.max(topSellingProduct.length - 1, current - 1))
  }, [api, current])
  return (
    <div className='bg-white py-3 pb-0'>
      <Heading
        title='BEST SELLING PRODUCTS'
        className='font-Inter text-2xl text-center text-black font-bold'
      />
      {/* <div className="flex flex-wrap justify-center items-center px-20 mt-0">
      {topSellingProduct.map((product, index)=>
            <Link href="" className="p-0 transition-all pt-3 duration-300 hover:animate-growShadow pb-2 rounded-2xl w-40% xl:w-[12.5%] md:w-[18%] sm:w-[40%] flex flex-col justify-center items-center" key={index}>
                <Image src={product.image} alt={product.title} className="rounded w-[85%]" />
                <h3 className="font-Inter font-semibold pt-3 text-[14px]">{product.title}</h3>
            </Link>
        )
      }
      </div> */}
      <Carousel setApi={setApi}>
        <CarouselContent className='mx-5 gap-0'>
          {topSellingProduct.map((product, index) => (
            <CarouselItem
              className='basis-full xl:basis-1/6 md:basis-1/4 sm:basis-1/3 pl-0 border-0 transition-all duration-300'
              key={index}
            >
              <Card className='group h-full hover:h-auto border-transparent m-2 rounded-xl transition-all duration-300 hover:animate-growShadow p-1 hover:border-gray-300'>
                {/* Card Header */}
                <CardHeader className='p-0 h-[200px] overflow-hidden mb-0 transition-all duration-300'>
                  <Image
                    src={product.image}
                    alt={product.title}
                    className='w-full group-hover:zoom-in-50'
                  />
                </CardHeader>

                {/* Card Content */}
                <CardContent className='py-0 px-2 border-0 mt-2 opacity-100 transition-opacity duration-300 group-hover:opacity-100'>
                  <h4 className='text-[14px] font-Vietnam text-gray-800 transition-colors duration-300 group-hover:text-gray-900'>
                    {product.title}
                  </h4>
                  <div className='flex items-center gap-1 pt-2'>
                    <span className='block font-Vietnam font-semibold text-lg'>
                      AED
                    </span>
                    <span className='block text-lg font-Vietnam'>
                      {product.price}
                    </span>
                    <span className='block text-sm font-Vietnam line-through text-gray-500'>
                      AED{product.cut_price}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 font-Vietnam'>
                    {product.review}
                    <span>({product.review_count})</span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <Button onClick={scrollPrev} className='absolute right-5 -top-10 shadow-2 bg-white rounded-[50%] w-10 text-black hover:bg-transparent' ><ChevronRight strokeWidth={3} /></Button>
        <Button onClick={scrollNext} className='absolute right-16 -top-10 shadow-2 bg-white rounded-[50%] w-10 text-black hover:bg-transparent' ><ChevronLeft strokeWidth={3}/></Button>
      </Carousel >
    </div>
  )
}

export default BestSellingProduct
