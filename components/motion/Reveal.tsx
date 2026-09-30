import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

const clipHidden = 'inset(8% 8% 8% 8%)'
const clipShown = 'inset(0% 0% 0% 0%)'

interface RevealImageProps {
  children: ReactNode
  className?: string
  immediate?: boolean
}

export function RevealImage({
  children,
  className,
  immediate = false,
}: RevealImageProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const shown = Boolean(reduce) || immediate || inView

  return (
    <motion.div
      ref={ref}
      className={cn('h-full w-full overflow-hidden', className)}
      initial={reduce ? false : { clipPath: clipHidden }}
      animate={{ clipPath: shown ? clipShown : clipHidden }}
      transition={{ duration: 1.15, ease: EASE }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={reduce ? false : { scale: 1.12 }}
        animate={{ scale: shown ? 1 : 1.12 }}
        transition={{ duration: 1.35, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

interface RevealHeadingProps {
  as?: 'h1' | 'h2' | 'h3'
  children: ReactNode
  className?: string
  immediate?: boolean
  delay?: number
}

export function RevealHeading({
  as: Tag = 'h2',
  children,
  className,
  immediate = false,
  delay = 0,
}: RevealHeadingProps) {
  const reduce = useReducedMotion()

  const motionProps = reduce
    ? {}
    : immediate
      ? { initial: { y: '110%' }, animate: { y: '0%' } }
      : {
          initial: { y: '110%' },
          whileInView: { y: '0%' },
          viewport: { once: true, amount: 0.6 },
        }

  return (
    <Tag className={className}>
      <span className="-my-[0.12em] block overflow-hidden py-[0.12em]">
        <motion.span
          className="block"
          transition={{ duration: 0.9, ease: EASE, delay }}
          {...motionProps}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  )
}
