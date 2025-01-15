import TopBar from '@/components/frontend/Topbar'
import { Header } from '@/components/frontend/Header'
import Footer from '@/components/frontend/Footer'

export default function FrontLayout ({children}) {
  return (
    <>
      <TopBar />
      <Header />
      {children}
      <Footer />
    </>
  )
}
