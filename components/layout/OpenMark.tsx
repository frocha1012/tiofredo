import { useEffect, useState } from 'react'
import { getOpeningStatus } from '@/lib/openingHours'
import { cn } from '@/lib/utils'

export default function OpenMark({ light }: { light: boolean }) {
  const [status, setStatus] = useState(() => getOpeningStatus())

  useEffect(() => {
    let timer = 0

    const tick = () => {
      window.clearTimeout(timer)
      const next = getOpeningStatus()
      setStatus(next)
      const delay = Math.max(1000, next.nextChange.getTime() - Date.now() + 500)
      timer = window.setTimeout(tick, delay)
    }

    tick()

    const onVisible = () => {
      if (document.visibilityState === 'visible') tick()
    }

    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  return (
    <p
      role="status"
      className={cn(
        'inline-flex items-center gap-2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.14em]',
        light ? 'text-white/85' : 'text-coffee',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'h-1.5 w-1.5 rounded-full',
          status.open ? 'animate-pulse bg-caramel' : light ? 'bg-white/45' : 'bg-muted',
        )}
      />
      {status.label}
    </p>
  )
}
