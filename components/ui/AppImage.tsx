import { cn } from '@/lib/utils'

interface AppImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  priority?: boolean
}

export default function AppImage({
  src,
  alt,
  className,
  fill,
  priority,
}: AppImageProps) {
  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        fetchPriority={priority ? 'high' : undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cn('absolute inset-0 h-full w-full object-cover', className)}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  )
}
