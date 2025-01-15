'use client'
// import Link from 'next/link'
// import React, { useState, useEffect, useCallback } from 'react'
// import { usePathname } from 'next/navigation'
// import {
//   Radar,
//   KeyRound,
//   LogOut,
//   ShoppingCart,
//   Settings,
//   Users
// } from 'lucide-react'
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarMenu,
//   SidebarMenuButton
// } from '@/components/ui/sidebar'

// const items = [
//   {
//     title: 'Dashboard',
//     url: '/user/dashboard',
//     icon: <Radar size={30} />
//   },
//   {
//     title: 'Orders',
//     icon: <ShoppingCart size={30} />,
//     url: '/user/orders'
//   },
//   {
//     title: 'Account',
//     icon: <Settings size={30} />,
//     url: '/account'
//   },
//   {
//     title: 'Update Profile',
//     icon: <Users size={30} />,
//     url: '/update-profile'
//   },
//   {
//     title: 'Change Password',
//     icon: <KeyRound size={30} />,
//     url: '/change-password'
//   },
//   {
//     title: 'Log out',
//     icon: <LogOut size={30} />,
//     url: '/'
//   }
// ]

// const FrontSidebar = () => {
//   const pathname = usePathname() // Get the current route
//   const [mounted, setMounted] = useState(false) // To handle hydration mismatch

//   useEffect(() => {
//     setMounted(true) // Ensure the component renders correctly after hydration
//   }, [])

//   const renderMenuItem = useCallback(
//     (item) => {
//       const isActive = pathname === item.url // Check if the current route matches
//       return (
//         <SidebarMenuButton key={item.title} asChild className="py-7">
//           <Link
//             href={item.url}
//             className={`font-Vietnam text-black flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
//                   ${
//                     isActive
//                       ? 'text-black bg-[#F3F3F3] font-semibold'
//                       : 'text-black hover:text-black'
//                   }`}
//           >
//             <span className="bg-[#DFDFDF] w-8 h-8 flex justify-center items-center rounded-xl">
//               {item.icon}
//             </span>
//             <span>{item.title}</span>
//           </Link>
//         </SidebarMenuButton>
//       )
//     },
//     [pathname]
//   )

//   if (!mounted) {
//     return null // Return null or a spinner during hydration
//   }

//   return (
//     <div>
//       <Sidebar className="bg-white h-auto top-[22.5%] ml-10 w-100 absolute" variant="inset">
//         <SidebarContent className="py-10 pt-2 bg-white">
//           <SidebarGroup>
//             <SidebarGroupContent>
//               <SidebarMenu>{items.map(renderMenuItem)}</SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         </SidebarContent>
//       </Sidebar>
//     </div>
//   )
// }

// export default FrontSidebar

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Radar, KeyRound, LogOut, ShoppingCart, Settings, Users } from 'lucide-react'

const FrontSidebar = ({ className }) => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    {
      title: 'Dashboard',
      url: '/user/dashboard',
      icon: Radar
    },
    {
      title: 'Orders',
      icon: ShoppingCart,
      url: '/user/orders'
    },
    {
      title: 'Account',
      icon: Settings,
      url: '/account'
    },
    {
      title: 'Update Profile',
      icon: Users,
      url: '/update-profile'
    },
    {
      title: 'Change Password',
      icon: KeyRound,
      url: '/change-password'
    },
    {
      title: 'Log out',
      icon: LogOut,
      url: '/'
    }
  ]

  const renderMenuItem = useCallback((item) => {
    const isActive = pathname === item.url

    return (
      <Button
        key={item.title}
        variant='ghost'
        asChild
        className={cn(
          'w-full justify-start gap-2 h-14 rounede-xl font-normal hover:bg-[#F3F3F3] hover:text-black',
          isActive ? 'bg-[#F3F3F3] text-black font-semibold' : 'text-black'
        )}
      >
        <Link href={item.url} className='flex items-center gap-2 py-2'>
          <span className='flex justify-center items-center w-8 h-8 bg-[#DFDFDF] rounded-xl'>
            <item.icon size={20} />
          </span>
          <span className="font-Vietnam text-[16px]">{item.title}</span>
        </Link>
      </Button>
    )
  }, [pathname])

  if (!mounted) {
    return null
  }

  return (
    <div className={cn('pt-5 pb-12 w-72 ml-20', className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-10'>
          <div className='space-y-2 flex flex-col'>
            {menuItems.map(renderMenuItem)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrontSidebar

