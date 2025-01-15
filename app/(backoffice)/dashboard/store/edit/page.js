
import EditStoreForm from '@/components/backoffice/EditStoreForm'
import Heading from '@/components/backoffice/Heading'
export default function index () {
  return (
    <div className='py-10'>
    <Heading title='Edit Store' className="max-w-7xl mx-auto"/>
    <EditStoreForm suppressHydrationWarning/>
    </div>
  )
}
