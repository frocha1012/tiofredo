import { languages, useLanguage } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  return <div className="language-switcher" role="group" aria-label={t('Idioma')}>
    {languages.map(item => <button
      key={item.code}
      type="button"
      lang={item.locale}
      aria-label={item.label}
      aria-pressed={language === item.code}
      onClick={() => setLanguage(item.code)}
    >{item.code.toUpperCase()}</button>)}
  </div>
}
