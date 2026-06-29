import { menuCategories, menuHero } from '@/data/menu'
import { company } from '@/data/content'
import MenuSection from '@/components/menu/MenuSection'
import CTAButton from '@/components/ui/CTAButton'
import { hasContactPhone } from '@/lib/utils'

export function MenuHeader() {
  return (
    <header className="border-b border-border bg-ivory pt-28 md:pt-32">
      <div className="container-px mx-auto max-w-3xl py-14 text-center md:py-20">
        <p className="eyebrow mb-5 justify-center">{menuHero.eyebrow}</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-espresso md:text-5xl lg:text-6xl">
          {menuHero.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {menuHero.subtitle}
        </p>
        <div className="mx-auto mt-8 h-px w-16 bg-caramel/40" />
      </div>
    </header>
  )
}

export function MenuCategories() {
  return (
    <div className="bg-ivory pb-20 pt-4 md:pb-28 md:pt-8">
      <div className="container-px mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-24">
          {menuCategories.map((category, index) => (
            <MenuSection
              key={category.id}
              category={category}
              isLast={index === menuCategories.length - 1}
            />
          ))}

          <p className="col-span-1 mt-6 text-center text-xs leading-relaxed text-muted lg:col-span-2 lg:mt-8">
            Ementa de demonstração — pratos e preços ilustrativos.
            <br />
            Informe-nos sobre alergias ou intolerâncias alimentares.
          </p>
        </div>
      </div>
    </div>
  )
}

export function MenuCTA() {
  const hasPhone = hasContactPhone(company.phoneRaw)

  return (
    <section className="border-t border-border bg-surface py-14 md:py-16">
      <div className="container-px mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl font-bold text-espresso md:text-3xl">
          Mais informações?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
          Contacte-nos para saber mais sobre a ementa ou para reservar mesa.
        </p>
        <div className="mt-7">
          {hasPhone ? (
            <CTAButton href={`tel:${company.phoneRaw}`} variant="primary" external>
              {company.phone}
            </CTAButton>
          ) : (
            <CTAButton href="/#contactos" variant="primary">
              Ver Contactos
            </CTAButton>
          )}
        </div>
      </div>
    </section>
  )
}
