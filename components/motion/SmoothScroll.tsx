import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import 'lenis/dist/lenis.css'

const options = {
  lerp: 0.085,
  smoothWheel: true,
  anchors: false,
  autoRaf: true,
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  )
}
