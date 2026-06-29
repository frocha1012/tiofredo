import { Link } from 'react-router-dom'
import { Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import { company, footerLinks, socialLinks } from '@/data/content'
import { hasContactPhone } from '@/lib/utils'
import { openCookiePreferences } from '@/lib/cookieConsent'
import logoByteBloom from '@/src/logo_bb/svg/white_logo.svg'

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
}

function parseFooterHref(href: string) {
  const hashIndex = href.indexOf('#')
  if (hashIndex === -1) {
    return href
  }

  const pathname = href.slice(0, hashIndex) || '/'
  const hash = href.slice(hashIndex)
  return `${pathname}${hash}`
}

export default function Footer() {
  const year = new Date().getFullYear()
  const hasPhone = hasContactPhone(company.phoneRaw)

  return (
    <footer className="bg-espresso text-white">
      <div className="container-px mx-auto max-w-7xl section-pad !pb-12 !pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="font-display text-2xl font-bold text-white">
              {company.shortName}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              {company.tagline}. {company.description}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon]
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:border-caramel hover:bg-caramel"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
              Links Rápidos
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={parseFooterHref(link.href)}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
              Horário
            </h3>
            <p className="text-sm text-white/65">{company.schedule.weekdays}</p>
            {company.schedule.weekend && (
              <p className="mt-2 text-sm text-white/65">{company.schedule.weekend}</p>
            )}
            {company.schedule.note && (
              <p className="pt-2 text-sm text-caramel/90">{company.schedule.note}</p>
            )}
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-caramel">
              Contactos
            </h3>
            <ul className="space-y-3 text-sm text-white/65">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                <span>
                  {company.address}
                  <br />
                  {company.city}
                </span>
              </li>
              <li>
                {hasPhone ? (
                  <a
                    href={`tel:${company.phoneRaw}`}
                    className="flex items-center gap-2.5 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-caramel" />
                    {company.phone}
                  </a>
                ) : (
                  <span className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 shrink-0 text-caramel" />
                    {company.phone}
                  </span>
                )}
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors hover:text-white"
                >
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/45 sm:flex-row">
            <p>
              © {year} {company.name}. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/politica-de-cookies"
                className="transition-colors hover:text-white"
              >
                Política de Cookies
              </Link>
              <span className="opacity-30" aria-hidden="true">
                |
              </span>
              <button
                type="button"
                onClick={openCookiePreferences}
                className="cursor-pointer border-0 bg-transparent p-0 text-xs text-white/45 transition-colors hover:text-white"
              >
                Definições de Cookies
              </button>
            </div>
          </div>
          <p className="mt-3 flex items-center justify-start gap-1.5 text-xs text-white/45">
            Desenvolvido por{' '}
            <a
              href="https://bytebloom.pt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ByteBloom"
              className="inline-flex items-center transition-opacity hover:opacity-80"
            >
              <img
                src={logoByteBloom}
                alt="ByteBloom"
                className="h-7 w-auto opacity-60 transition-opacity hover:opacity-100"
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
