import FrontSidebar from '@/components/frontend/FrontSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
export default function index ({children}) {
  return (
    <>
      <SidebarProvider suppressHydrationWarning>
        <FrontSidebar />
        <main className='w-full h-fit p-5 xl:p-16 md:p-10 sm:p-5 pt-5 '>
            {/* <SidebarTrigger suppressHydrationWarning /> */}
          {children}
        </main>
      </SidebarProvider>
    </>
  )
}
