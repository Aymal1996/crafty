'use client'

import React, { useState } from 'react'
import EditStoreForm from '@/components/backoffice/EditStoreForm'
import ViewStore from '@/components/backoffice/ViewStore'
import { Button } from "@/components/ui/button"

export default function index() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Store Management</h1>
      <ViewStore/>
    </div>
  )
}

