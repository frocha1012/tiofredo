import { RevealHeading } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'eyebrow mb-5',
            align === 'center' && 'justify-center',
            light && 'text-caramel before:bg-caramel/60',
          )}
        >
          {eyebrow}
        </p>
      )}
      <RevealHeading
        className={cn(
          'font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl',
          light ? 'text-white' : 'text-espresso',
        )}
      >
        {title}
      </RevealHeading>
      {subtitle && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed md:text-lg',
            light ? 'text-white/85' : 'text-muted',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
