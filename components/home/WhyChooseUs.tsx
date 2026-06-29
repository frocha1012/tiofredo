import { Flame, Heart, Home, Leaf } from 'lucide-react'
import { features } from '@/data/content'
import SectionHeader from '@/components/ui/SectionHeader'
import FadeInWhenVisible, {
  FadeInItem,
  FadeInStagger,
} from '@/components/motion/FadeInWhenVisible'
import type { Feature } from '@/types'

const iconMap = {
  leaf: Leaf,
  heart: Heart,
  flame: Flame,
  home: Home,
}

function FeatureIcon({ feature }: { feature: Feature }) {
  const Icon = iconMap[feature.icon]
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface text-coffee transition-colors duration-300 group-hover:border-caramel/30 group-hover:bg-caramel/10 group-hover:text-caramel">
      <Icon className="h-6 w-6" />
    </span>
  )
}

export default function WhyChooseUsSection() {
  return (
    <section className="section-pad bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <FadeInWhenVisible className="mb-14 md:mb-20">
          <SectionHeader
            eyebrow="Porquê escolher-nos"
            title="Mais do que um restaurante"
            subtitle="Somos um refúgio de sabores, tradição e calor humano — onde cada visita parece um jantar em família."
          />
        </FadeInWhenVisible>

        <FadeInStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FadeInItem key={feature.id}>
              <article className="group h-full rounded-3xl border border-border bg-white p-7 shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-card">
                <FeatureIcon feature={feature} />
                <h3 className="mt-5 font-display text-xl font-bold text-espresso">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </article>
            </FadeInItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  )
}
