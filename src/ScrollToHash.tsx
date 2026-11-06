import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import type Lenis from 'lenis'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scrollToLocation(
  hash: string,
  lenis: Lenis | undefined,
  immediate: boolean,
) {
  if (hash) {
    const id = decodeURIComponent(hash.replace('#', ''))
    const element = document.getElementById(id)
    if (element) {
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 110
      const mobileMenu = window.matchMedia('(max-width: 639px)').matches && element.closest('.menu-editorial')
      const offset = mobileMenu
        ? (document.querySelector('.site-header')?.getBoundingClientRect().height ?? 79) + 12
        : padding
      if (lenis) {
        lenis.scrollTo(element, { immediate, offset: padding - offset })
        return
      }

      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({
        top: Math.max(0, top),
        behavior: immediate ? 'auto' : 'smooth',
      })
      return
    }
  }

  if (lenis) {
    lenis.scrollTo(0, { immediate: true })
    return
  }

  window.scrollTo(0, 0)
}

export default function ScrollToHash() {
  const { pathname, hash, state } = useLocation()
  const lenis = useLenis()
  const pathnameRef = useRef<string | null>(null)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    if (!lenis && !reduced) return

    const previousPath = pathnameRef.current
    const pathChanged = previousPath !== pathname
    pathnameRef.current = pathname
    if (!pathChanged && state?.preserveScroll) return
    const immediate = previousPath === null || pathChanged || reduced || !hash
    const scroller = reduced ? undefined : lenis

    let secondFrame = 0
    const frame = window.requestAnimationFrame(() => {
      scroller?.resize()
      scrollToLocation(hash, scroller, immediate)
      if (immediate && hash) {
        secondFrame = window.requestAnimationFrame(() => {
          scroller?.resize()
          scrollToLocation(hash, scroller, true)
        })
      }
    })

    return () => {
      window.cancelAnimationFrame(frame)
      window.cancelAnimationFrame(secondFrame)
    }
  }, [pathname, hash, state, lenis])

  return null
}
