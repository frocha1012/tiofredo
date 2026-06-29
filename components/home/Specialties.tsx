import CTAButton from '@/components/ui/CTAButton'
import { ArrowRight } from 'lucide-react'
import { specialties } from '@/data/content'
import SectionHeader from '@/components/ui/SectionHeader'
import SpecialtyCard, {
  getSpecialtyGridClass,
} from '@/components/ui/SpecialtyCard'
import FadeInWhenVisible, {
  FadeInItem,
  FadeInStagger,
} from '@/components/motion/FadeInWhenVisible'
import { cn } from '@/lib/utils'

export default function SpecialtiesSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-px mx-auto max-w-7xl">
        <FadeInWhenVisible className="mb-14 md:mb-20">
          <SectionHeader
            eyebrow="Especialidades"
            title="O melhor da nossa cozinha"
            subtitle="Pizza, cozinha portuguesa, peixe, carnes, massas e sobremesas — consulte a ementa completa."
          />
        </FadeInWhenVisible>

        <FadeInStagger
          className={cn(
            'grid grid-cols-1 grid-flow-dense gap-6',
            'auto-rows-[220px]',
            'md:grid-cols-2 md:gap-6',
            'lg:grid-cols-3 lg:gap-7',
          )}
        >
          {specialties.map((specialty) => (
            <FadeInItem
              key={specialty.id}
              className={cn('h-full', getSpecialtyGridClass(specialty.id))}
            >
              <SpecialtyCard
                specialty={specialty}
                featured={specialty.id === 'pizza'}
              />
            </FadeInItem>
          ))}
        </FadeInStagger>

        <FadeInWhenVisible className="mt-14 text-center md:mt-16" delay={0.2}>
          <CTAButton
            href="/menu"
            variant="accent"
            className="px-10 py-4 text-base shadow-elevated"
          >
            Ver ementa completa
            <ArrowRight className="h-5 w-5" />
          </CTAButton>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
