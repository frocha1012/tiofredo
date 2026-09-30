import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import AppImage from '@/components/ui/AppImage'
import { Phone } from 'lucide-react'
import { company } from '@/data/content'
import CTAButton from '@/components/ui/CTAButton'
import FadeInWhenVisible from '@/components/motion/FadeInWhenVisible'
import { RevealHeading, RevealImage } from '@/components/motion/Reveal'
import { hasContactPhone } from '@/lib/utils'

export default function ReservationCTA() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['8%', '-8%'])
  const hasPhone = hasContactPhone(company.phoneRaw)
  const reserveHref = hasPhone ? `tel:${company.phoneRaw}` : '/#contactos'

  return (
    <section id="reservas" ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-12%]">
        <RevealImage className="h-full w-full">
          <AppImage
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2400&q=80"
            alt="Salão de restaurante"
            fill
          />
        </RevealImage>
      </motion.div>
      <div className="absolute inset-0 bg-espresso/80" />

      <div className="container-px relative z-10 mx-auto max-w-7xl section-pad">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-5 justify-center text-caramel before:bg-caramel/50">
              Reservas
            </p>
            <RevealHeading className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Reserve a sua mesa
            </RevealHeading>
            <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">
              Contacte-nos para efetuar a sua reserva. Informação de contacto
              disponível na secção abaixo.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {hasPhone ? (
                <CTAButton href={reserveHref} variant="accent" external>
                  <Phone className="h-4 w-4" />
                  {company.phone}
                </CTAButton>
              ) : (
                <CTAButton href="/#contactos" variant="accent">
                  Ver Contactos
                </CTAButton>
              )}
              <CTAButton href="/menu" variant="ghost">
                Ver Ementa
              </CTAButton>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
