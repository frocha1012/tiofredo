import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
  isActive?: boolean
  className?: string
}

export default function TestimonialCard({
  testimonial,
  isActive = false,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        'flex h-full min-h-0 flex-col rounded-3xl border border-border bg-surface px-8 py-9 shadow-soft transition-all duration-500 ease-premium md:px-10 md:py-10',
        isActive && 'border-caramel/20 shadow-card',
        className,
      )}
    >
      <Quote
        className={cn(
          'text-caramel/40',
          isActive ? 'h-9 w-9' : 'h-7 w-7',
        )}
        aria-hidden
      />

      <blockquote className="mt-5 flex-1">
        <p
          className={cn(
            'leading-relaxed text-charcoal',
            isActive
              ? 'text-base md:text-lg md:leading-relaxed'
              : 'text-sm md:text-base',
          )}
        >
          “{testimonial.quote}”
        </p>
      </blockquote>

      <footer className="mt-6 border-t border-border pt-5">
        <cite className="not-italic">
          <div
            className={cn(
              'font-display font-bold text-espresso',
              isActive ? 'text-lg' : 'text-base',
            )}
          >
            {testimonial.author}
          </div>
          <div className="mt-1 text-sm text-muted">{testimonial.role}</div>
        </cite>
      </footer>
    </article>
  )
}
