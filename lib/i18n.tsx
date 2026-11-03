import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { translations } from '@/data/translations'

export const languages = [
  { code: 'pt', label: 'Português', locale: 'pt-PT' },
  { code: 'en', label: 'English', locale: 'en-GB' },
  { code: 'fr', label: 'Français', locale: 'fr-FR' },
] as const

export type Language = typeof languages[number]['code']
type Translate = (text: string, values?: Record<string, string | number>) => string
const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
  t: Translate
  locale: string
} | null>(null)

function initialLanguage(): Language {
  try {
    const shared = new URLSearchParams(window.location.search).get('lang')
    const stored = window.localStorage.getItem('tiofredo-language')
    const value = shared ?? stored
    if (languages.some(item => item.code === value)) return value as Language
  } catch { /* The site also works when browser storage is unavailable. */ }
  return 'pt'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>(initialLanguage)
  const { pathname } = useLocation()
  const locale = languages.find(item => item.code === language)!.locale
  const t = useCallback<Translate>((text, values) => {
    const key = text.trim()
    const entry = translations[key]
    const translated = language === 'pt' || !entry ? key : entry[language]
    const result = translated.replace(/\{(\w+)\}/g, (match, name) => String(values?.[name] ?? match))
    return (text.startsWith(' ') ? ' ' : '') + result + (text.endsWith(' ') ? ' ' : '')
  }, [language])

  function setLanguage(value: Language) {
    updateLanguage(value)
    try { window.localStorage.setItem('tiofredo-language', value) } catch { /* Optional persistence. */ }
    // Keep a shared language URL consistent without changing the current route or scroll.
    const url = new URL(window.location.href)
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', value)
      window.history.replaceState(window.history.state, '', url)
    }
  }

  useEffect(() => {
    document.documentElement.lang = locale
    const title = pathname === '/menu' ? t('A ementa') : pathname === '/politica-de-cookies' ? t('Política de Cookies') : t('Pizzaria & Restaurante em Ponte da Barca')
    document.title = `${title} · Tio Fredo`
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('Pizzas artesanais, cozinha portuguesa e boa companhia no coração de Ponte da Barca. Conheça o Tio Fredo e reserve a sua mesa.'))
  }, [locale, pathname, t])

  return <LanguageContext.Provider value={{ language, setLanguage, t, locale }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
