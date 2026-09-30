import { BrowserRouter } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieConsentBanner from '@/components/cookies/CookieConsentBanner'
import PageTransition from '@/components/motion/PageTransition'
import SmoothScroll from '@/components/motion/SmoothScroll'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Navbar />
        <PageTransition />
        <Footer />
        <CookieConsentBanner />
      </SmoothScroll>
    </BrowserRouter>
  )
}
