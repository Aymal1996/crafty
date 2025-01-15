import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram,Search } from 'lucide-react'
import Link from "next/link"
import Logo from '@/public/img/logo-white.png'
import Payment from '@/public/img/payment.png'
import Image from 'next/image'
export default function Footer() {
  return (
    <footer className="bg-[#42B6B3] text-white px-10">
      <div className="container px-4 py-10">
        <div className="flex flex-wrap xl:flex-nowrap md:flex-nowrap sm:flex-wrap gap-8 md:flex-cols-4">
          {/* Brand Section */}
          <div className="space-y-4 w-full xl:w-[50%] md:w-[50%] sm:w-[50%]">
            <Image src={Logo} alt="logo" className="w-[200px]" />
            <p className="font-Inter text-sm pr-0 xl:pr-40 md:pr-40 sm:pr-10 pt-3">
              We Are More Than Just An Ecommerce Platform; We Are A Celebration Of Artistry, Creativity, And Craftsmanship.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold">WE ACCEPT</h3>
              <div className="flex gap-2">
                <Image src={Payment} alt="payment" />
              </div>
            </div>
          </div>

          {/* Quick Links */} 
          <div className="space-y-4 flex justify-start xl:justify-center md:justify-center sm:justify-start flex-col items-start xl:items-center md:items-center sm:items-start w-full xl:w-[20%] md:w-[20%] sm:w-[50%] ">
            <h3 className="font-semibold ml-[0] xl:ml-[-40px] md:ml-[-40px] sm:ml-[0]">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="font-Inter hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-Inter hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="font-Inter hover:underline">
                  Our Blog
                </Link>
              </li>
              <li>
                <Link href="/returns" className="font-Inter hover:underline">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="font-Inter hover:underline">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="font-Inter hover:underline">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="space-y-4 w-full xl:w-[20%] md:w-[20%] sm:w-[50%]">
            <h3 className="font-semibold font-Inter">HELP</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/seller" className="font-Inter hover:underline">
                  Become A Seller
                </Link>
              </li>
              <li>
                <Link href="/faq" className=" font-Inter hover:underline">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/seller-policy" className="font-Inter hover:underline">
                  Seller Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="font-Inter space-y-4 w-full xl:w-[20%] md:w-[20%] sm:w-[50%]">
            <h3 className="font-semibold">NEWSLETTER</h3>
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-6 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-white pl-9 rounded-[50px] h-[45px] border-transparent border-2 text-gray-700 placeholder:text-gray-500 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-opacity-0"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">FOLLOW US ON</h3>
              <div className="flex gap-4">
                <Link href="#" className="hover:opacity-80">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="hover:opacity-80">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="hover:opacity-80">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="font-Inter mt-8 pt-8 border-t border-white/20 text-sm text-center">
          <div className="flex justify-center gap-4 flex-wrap">
            <span>© 2024 Crafty Store Handicraft Works</span>
            <Link href="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:underline">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

