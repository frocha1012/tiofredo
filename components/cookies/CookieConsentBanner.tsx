import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  COOKIE_OPEN_PREFERENCES_EVENT,
  getStoredCookiePreferences,
  saveCookiePreferences,
} from '@/lib/cookieConsent'
import './CookieConsentBanner.css'

const initialPreferences = {
  analytics: false,
  marketing: false,
}

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false)
  const [preferences, setPreferences] = useState(initialPreferences)

  useEffect(() => {
    const storedPreferences = getStoredCookiePreferences()

    if (storedPreferences) {
      setPreferences({
        analytics: storedPreferences.analytics,
        marketing: storedPreferences.marketing,
      })
      return
    }

    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleOpenPreferences = () => {
      const storedPreferences = getStoredCookiePreferences()
      setPreferences({
        analytics: storedPreferences?.analytics ?? false,
        marketing: storedPreferences?.marketing ?? false,
      })
      setIsCustomizeOpen(true)
      setIsVisible(true)
    }

    window.addEventListener(COOKIE_OPEN_PREFERENCES_EVENT, handleOpenPreferences)
    return () =>
      window.removeEventListener(COOKIE_OPEN_PREFERENCES_EVENT, handleOpenPreferences)
  }, [])

  const closeBanner = () => {
    setIsVisible(false)
    setIsCustomizeOpen(false)
  }

  const acceptAllCookies = () => {
    saveCookiePreferences({ analytics: true, marketing: true })
    closeBanner()
  }

  const rejectOptionalCookies = () => {
    saveCookiePreferences({ analytics: false, marketing: false })
    closeBanner()
  }

  const saveCustomPreferences = () => {
    saveCookiePreferences(preferences)
    closeBanner()
  }

  if (!isVisible) {
    return null
  }

  return (
    <aside
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Preferências de cookies"
    >
      <div className="cookie-banner-content">
        <h3>Preferências de Cookies</h3>
        <p>
          Utilizamos cookies essenciais para o funcionamento do site e, mediante o
          seu consentimento, cookies para estatísticas e marketing. Pode aceitar,
          recusar os opcionais, ou personalizar as suas preferências.
        </p>
        <p className="cookie-banner-link-line">
          Consulte a nossa{' '}
          <Link to="/politica-de-cookies" onClick={closeBanner}>
            Política de Cookies
          </Link>
          .
        </p>

        {isCustomizeOpen && (
          <div className="cookie-options">
            <label className="cookie-option">
              <span>
                <strong>Cookies estritamente necessários</strong>
                <small>Sempre ativos para segurança e funcionalidades essenciais.</small>
              </span>
              <input
                type="checkbox"
                checked
                readOnly
                aria-label="Cookies estritamente necessários"
              />
            </label>

            <label className="cookie-option">
              <span>
                <strong>Cookies analíticos</strong>
                <small>Ajudam-nos a compreender como os visitantes utilizam o site.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) =>
                  setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                }
              />
            </label>

            <label className="cookie-option">
              <span>
                <strong>Cookies de marketing</strong>
                <small>
                  Utilizados para campanhas e conteúdos promocionais personalizados.
                </small>
              </span>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) =>
                  setPreferences((prev) => ({ ...prev, marketing: e.target.checked }))
                }
              />
            </label>
          </div>
        )}
      </div>

      <div className="cookie-banner-actions">
        <button
          type="button"
          className="cookie-secondary-button"
          onClick={rejectOptionalCookies}
        >
          Recusar opcionais
        </button>
        <button
          type="button"
          className="cookie-secondary-button"
          onClick={() => setIsCustomizeOpen(true)}
        >
          Personalizar
        </button>
        <button
          type="button"
          className="cookie-primary-button"
          onClick={isCustomizeOpen ? saveCustomPreferences : acceptAllCookies}
        >
          {isCustomizeOpen ? 'Guardar preferências' : 'Aceitar todos'}
        </button>
      </div>
    </aside>
  )
}
