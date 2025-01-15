import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {MyTable} from '@/components/backoffice/MyTable'
export default function index () {
  return (
    <div className='py-20'>
    <MyTable title="Orders Details"  filter={true} customerStatus={false} Orderproducts={true} searchPlaceholder="Search Orders" suppressHydrationWarning />
    </div>
  )
}
