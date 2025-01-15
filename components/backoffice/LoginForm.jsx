"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Facebook } from 'lucide-react'
import Link from "next/link"

export default function LoginForm() {
  return (
    <div className="h-[100vh] w-[1000px] mx-auto grid md:grid-cols-2 py-10 ">
      {/* Left side - Image */}
      <div style={{borderTopLeftRadius:"10px",borderBottomLeftRadius: '10px'}} className="hidden md:block bg-[url('https://dashtar-admin.netlify.app/@/assets/login-office-JBFguH2f.jpeg')] bg-cover bg-center" />

      {/* Right side - Login Form */}
      <div style={{borderTopRightRadius:"10px",borderBottomRightRadius: '10px'}} className="flex items-center justify-center p-4 bg-gray-800">
        <Card className="w-full max-w-md bg-gray-800 border-slate-800">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-white">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                placeholder="admin@gmail.com"
                defaultValue="admin@gmail.com"
                type="email"
                className="bg-gray-700 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                defaultValue="************"
                className="bg-gray-700 border-slate-700 text-white"
              />
            </div>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              <Link className="w-full flex text-center justify-center" href="/dashboard">Login</Link>
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full bg-white text-black hover:bg-gray-100 mb-2"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
              </svg>
              Login With Google
            </Button>
            <Button
              variant="outline"
              className="w-full bg-[#1877f2] hover:bg-[#1864d4] text-white border-none"
            >
              <Facebook className="w-5 h-5 mr-2" />
              Login With Facebook
            </Button>

            <div className="space-y-2 text-left text-sm">
              <a href="#" className="block text-emerald-500 hover:text-emerald-400">
                Forgot your password
              </a>
              <Link href="/signup/seller" className="block text-emerald-500 hover:text-emerald-400">
                Create account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

