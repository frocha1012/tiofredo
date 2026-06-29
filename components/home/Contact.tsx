import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Facebook, Instagram } from 'lucide-react'
import { company, socialLinks, contactSection } from '@/data/content'
import SectionHeader from '@/components/ui/SectionHeader'
import FadeInWhenVisible, {
  FadeInItem,
  FadeInStagger,
} from '@/components/motion/FadeInWhenVisible'
import { hasContactPhone } from '@/lib/utils'

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
}

export default function ContactSection() {
  const hasPhone = hasContactPhone(company.phoneRaw)

  return (
    <section id="contactos" className="section-pad bg-surface">
      <div className="container-px mx-auto max-w-7xl">
        <FadeInWhenVisible className="mb-14 md:mb-20">
          <SectionHeader
            eyebrow="Contactos"
            title="Venha visitar-nos"
            subtitle={contactSection.subtitle}
          />
        </FadeInWhenVisible>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeInStagger className="space-y-4">
            <FadeInItem>
              <div className="flex gap-4 rounded-3xl border border-border bg-white p-6 shadow-soft">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-coffee">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-espresso">Morada</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {company.address}
                    <br />
                    {company.city}, {company.country}
                    {company.mapsUrl && (
                      <>
                        <br />
                        <a
                          href={company.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-coffee transition-colors hover:text-caramel"
                        >
                          Ver no Google Maps
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </FadeInItem>

            <FadeInItem>
              <div className="flex gap-4 rounded-3xl border border-border bg-white p-6 shadow-soft">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-coffee">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-espresso">Telefone</h3>
                  {hasPhone ? (
                    <a
                      href={`tel:${company.phoneRaw}`}
                      className="mt-1 block text-sm text-muted transition-colors hover:text-coffee"
                    >
                      {company.phone}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-muted">{company.phone}</p>
                  )}
                </div>
              </div>
            </FadeInItem>

            <FadeInItem>
              <div className="flex gap-4 rounded-3xl border border-border bg-white p-6 shadow-soft">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-coffee">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-espresso">Email</h3>
                  <a
                    href={`mailto:${company.email}`}
                    className="mt-1 block text-sm text-muted transition-colors hover:text-coffee"
                  >
                    {company.email}
                  </a>
                </div>
              </div>
            </FadeInItem>

            <FadeInItem>
              <div className="flex gap-4 rounded-3xl border border-border bg-white p-6 shadow-soft">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-coffee">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-espresso">Horário</h3>
                  <p className="mt-1 text-sm text-muted">
                    {company.schedule.weekdays}
                  </p>
                </div>
              </div>
            </FadeInItem>

            <FadeInItem>
              <div className="flex gap-3 pt-2">
                {socialLinks.map((social) => {
                  const Icon = socialIcons[social.icon]
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-espresso shadow-soft transition-all hover:border-espresso hover:bg-espresso hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </FadeInItem>
          </FadeInStagger>

          <FadeInWhenVisible delay={0.15}>
            {company.mapsEmbedUrl ? (
              <div className="overflow-hidden rounded-3xl border border-border shadow-card">
                <iframe
                  title="Localização da Pizzaria Tio Fredo"
                  src={company.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '420px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full"
                />
              </div>
            ) : (
              <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-border bg-white px-8 text-center shadow-soft">
                <p className="text-sm leading-relaxed text-muted">
                  Mapa de localização
                  <br />
                  <span className="text-muted/80">A definir</span>
                </p>
              </div>
            )}
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}
