import { useLanguage } from '@/lib/i18n'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Facebook } from 'lucide-react'
import { company, socialLinks } from '@/data/content'
import { openCookiePreferences } from '@/lib/cookieConsent'
import Brand from '@/components/ui/Brand'
import logoByteBloom from '@/src/logo_bb/svg/white_logo.svg'

export default function Footer() {
  const { t } = useLanguage()
  return <footer className="site-footer"><div className="page-width"><div className="footer-top"><div><Link to="/" aria-label={t("Tio Fredo — início")}><Brand large /></Link><p>{t("Boa comida. Boa companhia. Sempre.")}</p></div><div className="footer-links"><Link to="/menu">{t("A ementa ")}<ArrowUpRight size={15} /></Link><Link to="/#sobre">{t("A nossa casa ")}<ArrowUpRight size={15} /></Link><Link to="/#contactos">{t("Visite-nos ")}<ArrowUpRight size={15} /></Link><a href={socialLinks[0].href} target="_blank" rel="noreferrer"><Facebook size={15} />{t(" Facebook ")}<ArrowUpRight size={15} /></a></div><div className="footer-location"><span>{t("COM CARINHO, DE")}</span><p>{t("Ponte da Barca,")}<br /><em>{t("Portugal.")}</em></p></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {company.name}</p><div><Link to="/politica-de-cookies">{t("Política de cookies")}</Link><button type="button" onClick={openCookiePreferences}>{t("Definições de cookies")}</button></div><a href="https://bytebloom.pt" target="_blank" rel="noreferrer" className="footer-credit">{t("Feito por ")}<img src={logoByteBloom} alt={t("ByteBloom")} width="90" height="24" /></a></div></div></footer>
}
