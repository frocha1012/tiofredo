import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Pizza, Users, Wine } from 'lucide-react'
import AppImage from '@/components/ui/AppImage'
import CTAButton from '@/components/ui/CTAButton'
import { about, company } from '@/data/content'
import FadeInWhenVisible, {
  FadeInItem,
  FadeInStagger,
} from '@/components/motion/FadeInWhenVisible'
import { hasContactPhone } from '@/lib/utils'
import type { AboutHighlight } from '@/types'

const highlightIcons = {
  pizza: Pizza,
  wine: Wine,
  users: Users,
}

function FeatureRow({ highlight }: { highlight: AboutHighlight }) {
  const Icon = highlightIcons[highlight.icon]

  return (
    <li className="flex gap-5 border-t border-border/80 pt-8 first:border-t-0 first:pt-0">
      <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center text-caramel">
        <Icon className="h-[1.375rem] w-[1.375rem]" strokeWidth={1.5} />
      </span>
      <div>
        <h3 className="font-display text-xl font-semibold tracking-tight text-espresso">
          {highlight.title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-muted">
          {highlight.description}
        </p>
      </div>
    </li>
  )
}

function AboutImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  return (
    <div
      ref={ref}
      className="relative min-h-[22rem] overflow-hidden rounded-4xl sm:min-h-[26rem] lg:h-full lg:min-h-[38rem]"
    >
      <motion.div style={{ y }} className="absolute inset-[-6%] will-change-transform">
        <AppImage src={src} alt={alt} fill />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-espresso/10 lg:bg-gradient-to-r lg:from-espresso/15 lg:via-transparent lg:to-transparent" />
    </div>
  )
}

export default function AboutSection() {
  const hasPhone = hasContactPhone(company.phoneRaw)
  const reserveHref = hasPhone ? `tel:${company.phoneRaw}` : '/#reservas'

  return (
    <section id="sobre" className="section-pad bg-ivory">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid items-stretch gap-14 lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-20">
          <FadeInWhenVisible className="order-2 flex flex-col justify-center lg:order-1 lg:py-6 xl:py-10">
            <p className="eyebrow mb-8 lg:mb-10">{about.eyebrow}</p>

            <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-espresso sm:text-[2.75rem] lg:text-5xl xl:text-[3.25rem]">
              {about.title}
            </h2>

            <p className="mt-8 max-w-md text-lg leading-[1.8] text-muted lg:mt-10 lg:text-xl lg:leading-[1.75]">
              {about.description}
            </p>

            <FadeInStagger className="mt-12 lg:mt-14">
              <ul className="max-w-md">
                {about.highlights.map((highlight) => (
                  <FadeInItem key={highlight.id}>
                    <FeatureRow highlight={highlight} />
                  </FadeInItem>
                ))}
              </ul>
            </FadeInStagger>

            <div className="mt-12 lg:mt-14">
              <CTAButton
                href={reserveHref}
                variant="primary"
                external={hasPhone}
                className="px-8 py-3.5"
              >
                Reservar Mesa
              </CTAButton>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible
            delay={0.12}
            className="order-1 lg:order-2 lg:min-h-[38rem]"
          >
            <AboutImage src={about.image} alt={about.imageAlt} />
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}
