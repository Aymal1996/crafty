import React from 'react'
import { Bell, ChevronDown, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import eng from '@/public/img/english.png'

const TopBar = () => {
  return (
    <div
      variant='sidebar'
      className='flex justify-end items-center px-4 py-1 bg-c_green text-white flex-col xl:flex-row md:flex-row sm:flex-col'
    >
      <div className='w-11/12 text-center font-inter flex items-center justify-center flex-row xl:flex-row md:flex-row sm:flex-row'>
        <p className='text-[16px] font-Inter'>Welcome To Store Sale For All Items & Delivery- <Button variant="link" className="font-Inter underline w-auto p-0 m-0 font-semibold text-md text-white">Shop Now.</Button></p>
        
      </div>
      <div className='w-full xl:w-1/12 md:w-2/12 sm:6/12 text-center xl:text-right md:text-right sm:text-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='font-Inter relative rounded-full ml-4 hover:bg-transparent'>
              <Image src={eng} alt="English" className='w-5' /> English
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56 font-Inter' align='end' forceMount>
            {/* <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs leading-none text-muted-foreground">
                john.doe@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
            <DropdownMenuItem>German</DropdownMenuItem>
            <DropdownMenuItem>UAE</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default TopBar
