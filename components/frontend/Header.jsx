import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Gift,
  Heart,
  Search,
  ShoppingCart,
  ThumbsUp,
  Star,
  Sparkles
} from 'lucide-react'
import Image from 'next/image'
import Logo from '@/public/img/logo.png'
export function Header () {
  return (
    <header className='w-full border-b bg-[#F4F4F4] text-black pb-1 font-Inter '>
      <div className='w-full px-4 md:px-6 md:w-full font-Inter '>
        <div className='flex h-[68px] pt-5 items-center justify-between px-8 font-Inter pb-3 mb-0'>
          {/* Logo */}
          <Link href='/' className='flex items-right justify-center'>
            <Image src={Logo} alt='Logo' className='w-[80%]' />
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className='hidden md:flex md:flex-1 md:items-center md:justify-center md:px-6'>
            <div className='relative w-full hover:shadow-2 rounded-[50%]'>
              <Search className='absolute left-2.5 top-2.5 h-7 w-4 text-gray-700' />
              <Input
                type='search'
                placeholder='Search for anything'
                className='w-full bg-white pl-9 rounded-[50px] h-[50px] border-[#1B1A1A] border-2 text-gray-700 placeholder:text-gray-950 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-[#1B1A1A] focus-visible:ring-opacity-0'
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <nav className='flex items-center gap-4'>
            <Button
              variant='ghost'
              size='md'
              className='text-md hidden md:flex hover:bg-transparent hover:text-black'
            >
              Sign in
            </Button>
            {/* <Button variant="ghost" className="hidden md:flex hover:bg-transparent hover:text-black"> */}
            <Link href='' className='hover:shadow-2 w-9 h-9 pt-1.5 pl-1.5 rounded-[50%] hover:opacity-50 hover:bg-c_green hover:text-white transition-all duration-500 ease-in-out'>
              <Heart size='22' strokeWidth={2} />
              <span className='sr-only'>Wishlist</span>
            </Link>

            {/* </Button> */}
            {/* <Button variant="ghost" size="icon" className="hover:bg-transparent hover:text-black"> */}
            <Link href='' className='hover:shadow-2 w-9 h-9 pt-1.5 pl-1.5 rounded-[50%] hover:opacity-50 hover:bg-c_green hover:text-white transition-all duration-500 ease-in-out'>
              <Gift size='22' strokeWidth={2} />
              <span className='sr-only'>Gifts</span>
            </Link>

            {/* </Button> */}
            {/* <Button variant="ghost" size="icon" className="hover:bg-transparent hover:text-black"> */}
            <Link
  href=""
  className="hover:shadow-2 w-9 h-9 pt-1.5 pl-1.5 rounded-[50%] hover:opacity-50 hover:bg-c_green hover:text-white transition-all duration-500 ease-in-out"
>
  <ShoppingCart size="22" strokeWidth={2} />
  <span className="sr-only">Cart</span>
</Link>


            {/* </Button> */}
          </nav>
        </div>

        {/* Search Bar - Mobile Only */}
        <div className='my-2 md:hidden font-Inter '>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500' />
            <Input
              type='search'
              placeholder='Search for anything'
              className='w-full bg-white pl-9'
            />
          </div>
        </div>

        {/* Secondary Navigation */}
        <nav className='font-Inter scrollbar-none -mx-4 mb-4 flex justify-center items-center space-x-2 overflow-x-auto px-4 pb-2 md:mx-0 md:mb-0 md:justify-center md:space-x-6 md:px-0 md:pb-0'>
          <Button variant='Link' size='sm' className='rounded-2xl min-w-max text-md hover:shadow-2 hover:opacity-70 hover:bg-c_green hover:text-white transition-all duration-500 ease-in-out'>
            <ThumbsUp size={100} />
            Best Sellers
          </Button>
          <Button variant='Link' size='sm' className='rounded-2xl min-w-max text-md hover:shadow-2 hover:opacity-70 hover:bg-c_green hover:text-white transition-all duration-500 ease-in-out'>
            <Star />
            5-Star Rated
          </Button>
          <Button variant='Link' size='sm' className='rounded-2xl min-w-max text-md hover:shadow-2 hover:opacity-70 hover:bg-c_green hover:text-white transition-all duration-500 ease-in-out'>
            <Sparkles />
            New Year
          </Button>
          <Button variant='Link' size='sm' className='rounded-2xl min-w-max text-md hover:shadow-2 hover:opacity-70 hover:bg-c_green hover:text-white transition-all duration-500 ease-in-out'>
            New Arrivals
          </Button>
        </nav>
      </div>
    </header>
  )
}
