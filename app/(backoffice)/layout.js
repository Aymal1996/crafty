"use client"

import React, { useState } from 'react';
import BackOfficeSideBar from '@/components/backoffice/BackOfficeSideBar';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }) {
  return (
    <div className='dark bg-black text-white h-[100%]'>
   
     <SidebarProvider suppressHydrationWarning>
     <BackOfficeSideBar suppressHydrationWarning/>
     <main className='w-full h-fit p-8 pt-5 dark'>
      <span className="z-50 fixed" ><SidebarTrigger suppressHydrationWarning /></span>
       {children}
       <Toaster suppressHydrationWarning/>
     </main>
   </SidebarProvider >
   </div>
  );
}
