import { ArrowUpRight } from 'lucide-react'
import { company } from '@/data/content'
import { useLanguage } from '@/lib/i18n'

export default function LocationMap() {
  const { language, t } = useLanguage()
  const mapUrl = new URL(company.mapsEmbedUrl)
  const parameters = mapUrl.searchParams.get('pb')
  if (parameters) mapUrl.searchParams.set('pb', parameters.replace(/!1spt!2spt/g, `!1s${language}!2spt`))
  mapUrl.searchParams.set('hl', language)

  return (
    <figure className="location-map page-width">
      <div className="location-map-frame" data-lenis-prevent>
        <iframe
          key={language}
          src={mapUrl.toString()}
          title={t('Localização do Tio Fredo no Google Maps')}
          width="1328"
          height="400"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <figcaption>
        <span>Tio Fredo · {company.city}</span>
        <a href={company.mapsUrl} target="_blank" rel="noreferrer">
          {t('Abrir no Google Maps')} <ArrowUpRight size={15} />
        </a>
      </figcaption>
    </figure>
  )
}
