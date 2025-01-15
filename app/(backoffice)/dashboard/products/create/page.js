import {Button} from '@/components/ui/button'
import Link from 'next/link'
import ProductListingForm from '@/components/backoffice/ProductListingForm'
import Heading from '@/components/backoffice/Heading'
export default function index () {
  return (
    <>
   <Heading title='Add New Product' className="w-full mx-auto pt-20"/>
   <ProductListingForm/>
    </>
  )
}
