import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import ScrollToHash from '@/src/ScrollToHash'
import HomePage from '@/src/pages/HomePage'
import MenuPage from '@/src/pages/MenuPage'
import CookiePolicyPage from '@/src/pages/CookiePolicyPage'
import { EASE } from '@/lib/motion'

export default function PageTransition() {
  const location = useLocation()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
      >
        <ScrollToHash />
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/politica-de-cookies" element={<CookiePolicyPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}
