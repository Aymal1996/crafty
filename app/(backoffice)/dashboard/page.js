
import Username from '@/components/backoffice/Username'
import Cards from '@/components/backoffice/Cards'
import Cardstatus from '@/components/backoffice/Cardstatus'
import {MyChart} from '@/components/backoffice/MyChart'
import {MyTable} from '@/components/backoffice/MyTable'
export default function index () {
  return (
    <div className='h-[100vh] w-full py-10'>
      <div className='flex justify-between pr-5 items-center'>
        <div>
          <Username name='Hi! Mohammad Kblawi' />
        </div>
      </div>
      {/* Over Details */}
      <div className='mt-10'>
        <Cards />
        <Cardstatus />
      </div>
       <MyChart />
      <MyTable filter={false} customerStatus={false} Orderproducts={true} searchPlaceholder="Search Recent Orders" suppressHydrationWarning asChild/>
    </div>
  )
}
