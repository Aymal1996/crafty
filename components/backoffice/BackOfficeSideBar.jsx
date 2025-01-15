'use client'

import Link from 'next/link'
import React, { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Radar, UsersRound, TableProperties, Gift, Star, ChevronDown, ShoppingCart, Store, Settings } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import TopBar from '@/components/backoffice/Topbar'

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: <Radar size={20} />
  },
  {
    title: 'Products',
    icon: <Gift size={21} />,
    subItems: [
      { title: 'View All', url: '/dashboard/products' },
      { title: 'Inventory', url: '/dashboard/products/inventory' },
      { title: 'Add Product', url: '/dashboard/products/create' }
    ]
  },
  {
    title: 'Orders',
    icon: <TableProperties size={20} />,
    subItems: [
      { title: 'View All', url: '/dashboard/orders' },
      { title: 'Returns', url: '/dashboard/orders/returns' },
      { title: 'Tracking', url: '/dashboard/orders/tracking' }
    ]
  },
  {
    title: 'Customers',
    icon: <UsersRound size={20} />,
    subItems: [{ title: 'View All', url: '/dashboard/customers' }]
  },
  {
    title: 'Sales',
    icon: <ShoppingCart size={20} />,
    subItems: [
      { title: 'View All', url: '/dashboard/sales' },
      { title: 'Revenue', url: '/dashboard/sales/revenue' }
    ]
  },
  {
    title: 'Online Store',
    icon: <Store size={20} />,
    subItems: [
      { title: 'View Store', url: '/dashboard/store' },
      { title: 'Store Customizations', url: '/dashboard/store/edit' },
      { title: 'Store Setting', url: '/dashboard/store/setting' }
    ]
  },
  {
    title: 'Reviews',
    icon: <Star size={20} />,
    subItems: [
      { title: 'Products', url: '/dashboard/reviews/products' },
      { title: 'Customers', url: '/dashboard/reviews/customers' }
    ]
  },
  {
    title: 'Account',
    icon: <Settings size={20} />,
    url: '/dashboard/account'
  }
]

const BackOfficeSideBar = () => {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState('')
  const [openItems, setOpenItems] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setActiveItem(pathname)
    const activeParent = items.find(item =>
      item.subItems?.some(subItem => subItem.url === pathname)
    )
    if (activeParent) {
      setOpenItems([activeParent.title])
    }
  }, [pathname])

  const toggleCollapsible = useCallback((title) => {
    setOpenItems(prev =>
      prev.includes(title) ? [] : [title]
    )
  }, [])

  const renderMenuItem = useCallback((item) => {
    const isActive = activeItem === item.url ||
      (item.subItems && item.subItems.some(subItem => activeItem === subItem.url))
    const isOpen = openItems.includes(item.title)

    if (item.subItems) {
      return (
        <Collapsible
          key={item.title}
          open={isOpen}
          onOpenChange={() => toggleCollapsible(item.title)}
        >
          <CollapsibleTrigger
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left ${
              isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.title}</span>
            <ChevronDown
              size={16}
              className={`ml-auto transform transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              } ${isActive ? 'text-blue-400' : 'text-gray-400'}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className='bg-gray-800 rounded-[5px]'>
            {item.subItems.map(subItem => (
              <SidebarMenuItem key={subItem.title} className='py-[6px] pl-8'>
                <SidebarMenuButton asChild className='py-2 bg-gray-800'>
                  <Link
                    href={subItem.url}
                    className={`hover:bg-transparent flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
                      ${activeItem === subItem.url ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveItem(subItem.url)}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )
    } else {
      return (
        <SidebarMenuButton key={item.title} asChild className='py-6'>
          <Link
            href={item.url}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 
              ${activeItem === item.url ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
            onClick={() => {
              setActiveItem(item.url)
              toggleCollapsible(item.title)
            }}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      )
    }
  }, [activeItem, openItems, toggleCollapsible])

  if (!mounted) {
    return null // or a loading spinner
  }

  return (
    <div>
      <TopBar />
      <Sidebar className='aimal-sidd' variant="sidebar">
        <SidebarContent className='py-10'>
          <SidebarGroup>
            <SidebarGroupLabel className='mb-5'>
              <h2 className='text-2xl font-Vietnam font-regular mb-5 flex-1'>
                My Account{' '}
                <sup className='text-green-500 capitalize text-sm'>verified</sup>
              </h2>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(renderMenuItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}

export default BackOfficeSideBar

