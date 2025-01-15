import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {MyTable} from '@/components/backoffice/MyTable'
export default function index () {
  return (
    <div className='py-20'>
    <MyTable title="Customer Orders"  filter={true} customerStatus={true} Orderproducts={false} searchPlaceholder="Search Customers" suppressHydrationWarning/>
    </div>
  )
}
