import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import type Lenis from 'lenis'

const NAV_OFFSET = -96

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
      if (lenis) {
        lenis.scrollTo(element, { offset: NAV_OFFSET, immediate })
        return
      }

      const top = element.getBoundingClientRect().top + window.scrollY + NAV_OFFSET
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
  const { pathname, hash } = useLocation()
  const lenis = useLenis()
  const pathnameRef = useRef<string | null>(null)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    if (!lenis && !reduced) return

    const previousPath = pathnameRef.current
    const pathChanged = previousPath !== pathname
    pathnameRef.current = pathname
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
  }, [pathname, hash, lenis])

  return null
}
