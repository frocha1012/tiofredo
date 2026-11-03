import { useLanguage } from '@/lib/i18n'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import { company } from '@/data/content'
import { useLenis } from 'lenis/react'
import Brand from '@/components/ui/Brand'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

const links = [
  { label: 'A nossa casa', href: '/#sobre' },
  { label: 'A ementa', href: '/menu' },
  { label: 'À sua mesa', href: '/#reservas' },
  { label: 'Visite-nos', href: '/#contactos' },
]

export default function Navbar() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const lenis = useLenis()
  const toggle = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => { setOpen(false) }, [pathname, hash])
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    panel.current?.querySelector('a')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
      if (event.key === 'Tab') {
        const items = [...Array.from(document.querySelectorAll<HTMLElement>('.language-switcher button')), toggle.current, ...Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter(Boolean) as HTMLElement[]
        const first = items[0], last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = previous; lenis?.start(); window.removeEventListener('keydown', onKey) }
  }, [open, lenis])

  return (
    <header className="site-header">
      <a href="#conteudo" className="skip-link">{t("Saltar para o conteúdo")}</a>
      <div className="nav-shell page-width">
        <Link to="/" aria-label={t("Tio Fredo — página inicial")} onClick={() => setOpen(false)}><Brand /></Link>
        <nav className="desktop-nav" aria-label={t("Navegação principal")}>
          {links.map(link => <Link className={pathname === '/menu' && link.href === '/menu' ? 'active' : ''} key={link.href} to={link.href} aria-current={pathname === '/menu' && link.href === '/menu' ? 'page' : undefined}>{t(link.label)}</Link>)}
        </nav>
        <a className="button button-small nav-reserve" href={'tel:' + company.phoneRaw}>{t("Reserve a sua mesa ")}<ArrowUpRight size={16} /></a>
        <LanguageSwitcher />
        <button ref={toggle} type="button" className="mobile-toggle" aria-label={t(open ? 'Fechar navegação' : 'Abrir navegação')} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div id="mobile-navigation" className="mobile-panel" ref={panel}>
        <nav aria-label={t("Navegação móvel")}>{links.map((link, i) => <Link onClick={() => setOpen(false)} to={link.href} key={link.href}><small>0{i + 1}</small>{t(link.label)}<ArrowUpRight /></Link>)}</nav>
        <a className="button" href={'tel:' + company.phoneRaw}><Phone size={17} />{company.phone}</a>
        <p>{t("Boa comida. Boa companhia.")}<br />{t("Ponte da Barca, Portugal.")}</p>
      </div>}
    </header>
  )
}
