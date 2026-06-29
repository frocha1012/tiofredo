import { motion, useScroll, useTransform } from 'framer-motion'
import { company, hero } from '@/data/content'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { hasContactPhone } from '@/lib/utils'
import CTAButton from '@/components/ui/CTAButton'
import AppImage from '@/components/ui/AppImage'

export default function HeroSection() {
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 600], [0, 120])
  const contentY = useTransform(scrollY, [0, 600], [0, 60])
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4])
  const hasPhone = hasContactPhone(company.phoneRaw)
  const reserveHref = hasPhone ? `tel:${company.phoneRaw}` : '/#contactos'

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
      aria-label="Apresentação"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <AppImage
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
        />
      </motion.div>

      <div className="absolute inset-0 bg-espresso/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/40 to-espresso/15" />

      <motion.div
        style={{ y: contentY, opacity }}
        className="container-px relative z-10 mx-auto max-w-7xl pb-28 pt-32 md:pb-36 md:pt-40"
      >
        <motion.div
          variants={staggerContainer(0.12, 0.3)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUp}
            className="eyebrow mb-6 text-caramel before:bg-caramel/50"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <CTAButton href={reserveHref} variant="accent" external={hasPhone}>
              Reservar Mesa
            </CTAButton>
            <CTAButton href="/menu" variant="ghost">
              Ver Ementa
            </CTAButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
