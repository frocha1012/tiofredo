import { useLanguage } from '@/lib/i18n'
export default function Brand({ large = false }: { large?: boolean }) {
  const { t } = useLanguage()
  return <span className={'brand' + (large ? ' brand-large' : '')}>
    <span className="brand-name">{t("tio fredo")}<span className="brand-dot">.</span></span>
    <span className="brand-caption">{t("PIZZARIA & RESTAURANTE")}</span>
  </span>
}
