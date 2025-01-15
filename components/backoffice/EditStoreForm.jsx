'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { toast } from "@/hooks/use-toast"
import { Upload } from 'lucide-react'
import { cn } from "@/lib/utils"

const formSchema = z.object({
  storeName: z.string().min(1, 'Store name is required'),
  storeEmail: z.string().email('Invalid store email address'),
  storeMobile: z.string().regex(/^\d{10}$/, 'Invalid mobile number (must be 10 digits)'),
  storeAddress: z.string().min(1, 'Store address is required'),
  storeCoverPic: z.instanceof(File)
    .refine(file => !file || (file.type === 'image/jpeg' || file.type === 'image/png'), 'Only JPG and PNG files are accepted')
    .refine(file => !file || file.size <= 2 * 1024 * 1024, 'File size must be less than 2MB')
    .optional(),
  contactName: z.string().optional(),
  contactEmail: z.string().optional(),
  contactMobile: z.string().optional()
})

export default function EditStoreForm () {
  const [useStoreInfo, setUseStoreInfo] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [coverPicPreview, setCoverPicPreview] = useState(null)
  const [originalStoreInfo, setOriginalStoreInfo] = useState({
    storeName: '',
    storeEmail: '',
    storeMobile: '',
    storeAddress: ''
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: '',
      storeEmail: '',
      storeMobile: '',
      storeAddress: '',
      storeCoverPic: undefined,
      contactName: '',
      contactEmail: '',
      contactMobile: '',
    }
  })

  const onSubmit = data => {
    // If useStoreInfo is true, copy store information to contact fields
    const submissionData = {
      ...data,
      contactName: useStoreInfo ? data.storeName : data.contactName,
      contactEmail: useStoreInfo ? data.storeEmail : data.contactEmail,
      contactMobile: useStoreInfo ? data.storeMobile : data.contactMobile
    }

    console.log('Form submitted:', submissionData)
    
    // Reset form
    form.reset({
      storeName: '',
      storeEmail: '',
      storeMobile: '',
      storeAddress: '',
      storeCoverPic: undefined,
      contactName: '',
      contactEmail: '',
      contactMobile: '',
    })

    toast({
      title: 'Store Info updated',
      description: 'Your Store settings have been successfully updated.'
    })
  }

  const handleUseStoreInfo = useCallback(
    checked => {
      setUseStoreInfo(checked)
      if (checked) {
        const { storeName, storeEmail, storeMobile } = form.getValues()
        form.setValue('contactName', storeName)
        form.setValue('contactEmail', storeEmail)
        form.setValue('contactMobile', storeMobile)
      } else {
        form.setValue('contactName', '')
        form.setValue('contactEmail', '')
        form.setValue('contactMobile', '')
      }
    },
    [form]
  )

  const handleDragEnter = e => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = e => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileUpload(file)
  }

  const handleFileUpload = file => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      if (file.size <= 2 * 1024 * 1024) {
        form.setValue('storeCoverPic', file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setCoverPicPreview(reader.result)
        }
        reader.readAsDataURL(file)
      } else {
        toast({
          title: 'File too large',
          description: 'The image must be less than 2MB in size.',
          variant: 'destructive',
        })
      }
    } else {
      toast({
        title: 'Invalid file type',
        description: 'Only JPG and PNG files are accepted.',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    const { storeName, storeEmail, storeMobile, storeAddress } = form.getValues()
    setOriginalStoreInfo({
      storeName,
      storeEmail,
      storeMobile,
      storeAddress
    })
    if (useStoreInfo) {
      form.setValue('contactName', storeName)
      form.setValue('contactEmail', storeEmail)
      form.setValue('contactMobile', storeMobile)
    }
  }, [form, useStoreInfo])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Card className=' mx-auto dark:bg-gray-800'>
          <CardHeader className='max-w-5xl mx-auto'>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className='max-w-5xl mx-auto space-y-4'>
            <FormField
              control={form.control}
              name='storeName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-gray-700" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='storeEmail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Email</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} className="bg-gray-700" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='storeMobile'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Mobile Number</FormLabel>
                  <FormControl>
                    <Input type='tel' {...field}  className="bg-gray-700" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='storeAddress'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Address</FormLabel>
                  <FormControl>
                    <Textarea {...field}  className="bg-gray-700"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='storeCoverPic'
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Store Cover Picture</FormLabel>
                  <FormControl>
                    <div
                      className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
                        isDragging
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-400'
                      }`}
                      onDragEnter={handleDragEnter}
                      onDragOver={e => e.preventDefault()}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() =>
                        document.getElementById('storeCoverPic').click()
                      }
                    >
                      {coverPicPreview ? (
                        <img
                          src={coverPicPreview}
                          alt='Cover Preview'
                          className='w-full h-32 object-cover rounded-lg mb-4'
                        />
                      ) : (
                        <Upload className='w-12 h-12 text-gray-400 mb-4' />
                      )}
                      <p className='text-sm text-muted-foreground text-center'>
                        Drag and drop an image here, or click to select
                      </p>
                      <Input
                        id='storeCoverPic'
                        type='file'
                        accept='image/jpeg,image/png'
                        className='hidden bg-gray-700'
                        onChange={e => {
                          handleFileUpload(e.target.files[0])
                          onChange(e.target.files[0])
                        }}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardHeader className='max-w-5xl mx-auto'>
            <CardTitle>Contact Person Information</CardTitle>
          </CardHeader>
          <CardContent className='max-w-5xl mx-auto space-y-4'>
            <div className='flex items-center space-x-2 mb-4'>
              <Checkbox
                id='useStoreInfo'
                checked={useStoreInfo}
                onCheckedChange={handleUseStoreInfo}
              />
              <Label htmlFor='useStoreInfo'>
                Use store information for contact details
              </Label>
            </div>
            <div
              className={cn(
                "grid gap-4 transition-all duration-1000 ease-in-out",
                useStoreInfo ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
              )}
            >
              <div className="overflow-hidden">
                <div className={cn(
                  "transition-all duration-300 ease-in-out",
                  useStoreInfo ? "translate-y-[-10px]" : "translate-y-0"
                )}>
                  <FormField
                    control={form.control}
                    name='contactName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Name</FormLabel>
                        <FormControl>
                          <Input {...field}  className="bg-gray-700"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='contactEmail'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Email</FormLabel>
                        <FormControl>
                          <Input type='email' {...field}  className="bg-gray-700"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='contactMobile'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Mobile Number</FormLabel>
                        <FormControl>
                          <Input type='tel' {...field}  className="bg-gray-700"/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter  className="max-w-5xl mx-auto flex justify-end">
            <Button type='submit'>Save Changes</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

