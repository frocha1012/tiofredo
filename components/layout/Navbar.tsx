import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { company, navLinks } from '@/data/content'
import { EASE } from '@/lib/motion'
import { cn, hasContactPhone } from '@/lib/utils'
import CTAButton from '@/components/ui/CTAButton'

function parseNavHref(href: string) {
  const hashIndex = href.indexOf('#')
  if (hashIndex === -1) {
    return href
  }

  const pathname = href.slice(0, hashIndex) || '/'
  const hash = href.slice(hashIndex)
  return `${pathname}${hash}`
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const hasPhone = hasContactPhone(company.phoneRaw)
  const reserveHref = hasPhone ? `tel:${company.phoneRaw}` : '/#contactos'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const transparent = isHome && !scrolled && !open

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium',
          transparent
            ? 'border-b border-transparent bg-transparent'
            : 'border-b border-border bg-ivory/92 shadow-soft backdrop-blur-xl',
        )}
      >
        <nav
          className="container-px mx-auto flex max-w-7xl items-center justify-between py-4 md:py-5"
          aria-label="Navegação principal"
        >
          <Link
            to="/"
            className={cn(
              'font-display text-xl font-bold tracking-tight transition-colors md:text-2xl',
              transparent ? 'text-white' : 'text-espresso',
            )}
          >
            {company.shortName}
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={parseNavHref(link.href)}
                  className={cn(
                    'relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-caramel after:transition-all after:duration-500 hover:after:w-full',
                    transparent
                      ? 'text-white/90 hover:text-white'
                      : 'text-muted hover:text-espresso',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <CTAButton
              href={reserveHref}
              variant={transparent ? 'ghost' : 'primary'}
              className="!px-5 !py-2.5 !text-xs"
              external={hasPhone}
            >
              Reservar Mesa
            </CTAButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden',
              transparent
                ? 'border border-white/30 bg-white/10 text-white backdrop-blur-sm'
                : 'border border-border bg-surface text-espresso',
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-espresso/98 backdrop-blur-md lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
              className="flex h-full flex-col items-center justify-center gap-8 px-6"
              aria-label="Menu mobile"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, ease: EASE }}
                >
                  <Link
                    to={parseNavHref(link.href)}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl font-bold text-white transition-colors hover:text-caramel"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, ease: EASE }}
                className="mt-4"
              >
                <CTAButton
                  href={reserveHref}
                  variant="accent"
                  external={hasPhone}
                >
                  Reservar Mesa
                </CTAButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
