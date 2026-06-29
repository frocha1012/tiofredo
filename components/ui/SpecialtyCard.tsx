import AppImage from '@/components/ui/AppImage'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Specialty } from '@/types'

interface SpecialtyCardProps {
  specialty: Specialty
  className?: string
  featured?: boolean
}

export default function SpecialtyCard({
  specialty,
  className,
  featured = false,
}: SpecialtyCardProps) {
  return (
    <article
      className={cn(
        'group relative h-full min-h-[220px] overflow-hidden rounded-3xl border border-border bg-white shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-elevated',
        className,
      )}
    >
      <AppImage
        src={specialty.image}
        alt={specialty.title}
        fill
        className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/25 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3
              className={cn(
                'font-display font-bold text-white',
                featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl',
              )}
            >
              {specialty.title}
            </h3>
            <p
              className={cn(
                'mt-2 leading-relaxed text-white/85',
                featured ? 'max-w-md text-sm md:text-base' : 'text-sm',
              )}
            >
              {specialty.description}
            </p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all duration-500 group-hover:border-caramel group-hover:bg-caramel group-hover:text-white">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </article>
  )
}

function getSpecialtyGridClass(id: string): string {
  switch (id) {
    case 'pizza':
      return 'md:row-span-2 lg:col-span-1 lg:row-span-2'
    case 'pasta':
      return 'lg:row-span-2'
    case 'desserts':
      return 'md:col-span-2 lg:col-span-2'
    default:
      return ''
  }
}

export { getSpecialtyGridClass }
