'use client'

import * as React from 'react'
import { useState } from 'react'
import { Check, AlertCircle, Eye, EyeOff, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const steps = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: ['name', 'email']
  },
  {
    id: 'Step 2',
    name: 'Store Details',
    fields: ['storeName', 'category', 'licenceKey']
  },
  {
    id: 'Step 3',
    name: 'Create Password',
    fields: ['password', 'confirmPassword'] 
  }
]

export default function MultiStepForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storeName: '',
    category: '',
    licenceKey: null,
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [complete, setComplete] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : ''
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
          ? 'Please enter a valid email address' 
          : ''
      case 'storeName':
        return value.length < 3 ? 'Store name must be at least 3 characters' : ''
      case 'licenceKey':
        if (!value) return 'PDF document is required'
        if (value.size > 2 * 1024 * 1024) return 'File size must be less than 2MB'
        if (value.type !== 'application/pdf') return 'Only PDF files are allowed'
        return ''
      case 'password':
        return value.length < 8 
          ? 'Password must be at least 8 characters' 
          : !/(?=.*[A-Z])/.test(value)
          ? 'Password must contain at least one uppercase letter'
          : !/(?=.*[0-9])/.test(value)
          ? 'Password must contain at least one number'
          : !/(?=.*[!@#$%^&*])/.test(value)
          ? 'Password must contain at least one special character'
          : ''
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : ''
      default:
        return ''
    }
  }

  const validateStep = () => {
    const currentFields = steps[currentStep].fields
    const newErrors = {}
    let isValid = true

    currentFields.forEach(field => {
      const error = validateField(field, formData[field])
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  function onSubmit(e) {
    e.preventDefault()
    
    if (!validateStep()) return

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setComplete(true)
      console.log('Form submitted:', formData)
      router.push('/login/seller')
    }
  }

  function previousStep() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  function updateFormData(field, value) {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  return (
    <div className="h-[100vh] w-[1000px] mx-auto grid md:grid-cols-2 py-10">
      <div className="hidden lg:block relative" style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}>
        <img
          src={'https://dashtar-admin.netlify.app/@/assets/login-office-JBFguH2f.jpeg'}
          alt="Dashboard Preview"
          className="absolute inset-0 h-full w-full object-cover"
          style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}} />
      </div>

      <div className="flex items-center justify-center p-5 bg-gray-800" style={{borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}}>
        <form onSubmit={onSubmit} className="w-full max-w-[440px] mx-auto">
          <Card className="border-none shadow-none bg-gray-800">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl md:text-3xl font-semibold">
                Create your account
              </CardTitle>
              <CardDescription className="text-gray-300">
                Complete the following steps to create your store account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative flex justify-between mb-8">
                <div className="absolute top-5 left-0 right-0 h-[2px] flex">
                  <div className={cn(
                    "w-full border-t-2 border-dashed transition-colors duration-500",
                    currentStep >= 1 ? "border-slate-300" : "border-gray-400"
                  )} />
                  <div className={cn(
                    "w-full border-t-2 border-dashed transition-colors duration-500",
                    currentStep >= 2 ? "border-slate-300" : "border-gray-400"
                  )} />
                </div>

                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center z-10 px-2">
                    <div 
                      className={cn(
                        "w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition-all duration-500 transform bg-gray-900",
                        currentStep === index ? "border-slate-500 text-primary scale-110" :
                        currentStep > index ? "border-slate-700 bg-gray-700 text-primary-foreground" :
                        "border-muted text-muted-foreground",
                        "hover:scale-105"
                      )}
                    >
                      {currentStep > index ? (
                        <Check className="w-6 h-6 animate-fadeIn text-green-500" />
                      ) : (
                        <span className="animate-fadeIn">{index + 1}</span>
                      )}
                    </div>
                    <div className="text-xs mt-2 text-center text-muted-foreground">
                      {step.name}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 transition-all duration-500 animate-slideUp">
                {currentStep === 0 && (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className={cn(
                          "transition-all duration-300 bg-gray-700 border-slate-700",
                          errors.name && "border-destructive focus-visible:ring-destructive"
                        )}
                      />
                      {errors.name && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className={cn(
                          "transition-all duration-300 bg-gray-700 border-slate-700",
                          errors.email && "border-destructive focus-visible:ring-destructive"
                        )}
                      />
                      {errors.email && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="storeName" className="text-sm font-medium">
                        Store Name
                      </label>
                      <Input
                        id="storeName"
                        placeholder="Enter your store name"
                        value={formData.storeName}
                        onChange={(e) => updateFormData('storeName', e.target.value)}
                        className={cn(
                          "transition-all duration-300 bg-gray-700 border-slate-700",
                          errors.storeName && "border-destructive focus-visible:ring-destructive"
                        )}
                      />
                      {errors.storeName && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.storeName}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Category
                      </label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => updateFormData('category', value)}
                        className="bg-gray-700 border-slate-700"
                      >
                        <SelectTrigger className="transition-all duration-300 bg-gray-700 border-slate-700">
                          <SelectValue placeholder="Select store category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="fashion">Fashion</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="health">Health & Beauty</SelectItem>
                          <SelectItem value="home">Home & Garden</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="licenceKey" className="text-sm font-medium">
                        Licence key
                      </label>
                      <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 hover:border-slate-500 transition-colors">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-8 w-8 text-slate-500" />
                          <input
                            id="licenceKey"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => updateFormData('licenceKey', e.target.files[0])}
                            className="hidden"
                          />
                          <label
                            htmlFor="licenceKey"
                            className="cursor-pointer text-sm text-center"
                          >
                            <span className="font-semibold text-primary">Click to upload</span>
                            {' '}or drag and drop
                            <p className="text-xs text-muted-foreground">
                              PDF (max. 2MB)
                            </p>
                          </label>
                          {formData.licenceKey && (
                            <p className="text-sm text-muted-foreground">
                              Selected: {formData.licenceKey.name}
                            </p>
                          )}
                        </div>
                      </div>
                      {errors.licenceKey && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.licenceKey}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) => updateFormData('password', e.target.value)}
                          className={cn(
                            "transition-all duration-300 bg-gray-700 border-slate-700 pr-10",
                            errors.password && "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                        </button>
                      </div>
                      {errors.password && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                          className={cn(
                            "transition-all duration-300 bg-gray-700 border-slate-700 pr-10",
                            errors.confirmPassword && "border-destructive focus-visible:ring-destructive"
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <div className="flex items-center gap-2 text-destructive text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {currentStep === 0 && (
                  <div className="space-y-4 pt-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-muted" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" type="button" className="bg-white text-black">
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button variant="outline" type="button" className="bg-blue-500 text-white">
                        <svg className="mr-2 h-4 w-4" fill="#fff" viewBox="0 0 24 24">
                          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                        </svg>
                        Facebook
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={previousStep}
                disabled={currentStep === 0}
                className="transition-all duration-300 hover:scale-105"
              >
                Previous
              </Button>
              <Button 
                type="submit"
                className="transition-all duration-300 hover:scale-105"
              >
                {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}

