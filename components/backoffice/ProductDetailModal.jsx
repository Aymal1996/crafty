import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import Image from 'next/image'

export function ProductDetailModal({ open, onOpenChange, product }) {
  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 text-white">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            {product.name}
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="rounded-md object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DialogDescription>Category:</DialogDescription>
            <span>{product.category}</span>
            <DialogDescription>Price:</DialogDescription>
            <span>${product.price.toFixed(2)}</span>
            <DialogDescription>Sale Price:</DialogDescription>
            <span>${product.salePrice.toFixed(2)}</span>
            <DialogDescription>Stock:</DialogDescription>
            <span>{product.stock}</span>
            <DialogDescription>Status:</DialogDescription>
            <span>{product.status}</span>
            <DialogDescription>Published:</DialogDescription>
            <span>{product.published ? 'Yes' : 'No'}</span>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

