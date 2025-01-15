import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {ProductTable} from '@/components/backoffice/ProductTable'
export default function index () {
  return (
    <div className='py-10'>
    <ProductTable />
    </div>
  )
}
