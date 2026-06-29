import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CTAButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent'

interface CTAButtonProps {
  href: string
  children: ReactNode
  variant?: CTAButtonVariant
  className?: string
  external?: boolean
}

const variants: Record<CTAButtonVariant, string> = {
  primary:
    'bg-espresso text-white shadow-warm hover:bg-espresso-light hover:shadow-card',
  secondary:
    'bg-coffee text-white shadow-warm hover:bg-coffee-light hover:shadow-card',
  ghost:
    'border border-white/60 bg-white/10 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-espresso',
  accent:
    'bg-caramel text-white shadow-warm hover:bg-caramel-light hover:shadow-card',
}

function parseInternalHref(href: string) {
  if (!href.startsWith('/') || href.startsWith('//')) {
    return null
  }

  const hashIndex = href.indexOf('#')
  if (hashIndex === -1) {
    return { pathname: href, hash: '' }
  }

  return {
    pathname: href.slice(0, hashIndex) || '/',
    hash: href.slice(hashIndex),
  }
}

export default function CTAButton({
  href,
  children,
  variant = 'primary',
  className,
  external,
}: CTAButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-500 ease-premium',
    variants[variant],
    className,
  )

  if (external || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  const internal = parseInternalHref(href)
  if (internal) {
    return (
      <Link to={`${internal.pathname}${internal.hash}`} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  )
}
