export const COOKIE_CONSENT_STORAGE_KEY = 'tiofredo-cookie-consent-v1'
export const COOKIE_PREFERENCES_UPDATED_EVENT = 'cookie-preferences-updated'
export const COOKIE_OPEN_PREFERENCES_EVENT = 'open-cookie-preferences'

export type CookiePreferences = {
  necessary: true
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

export function getStoredCookiePreferences(): CookiePreferences | null {
  if (typeof window === 'undefined') {
    return null
  }

  const rawValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
  if (!rawValue) {
    return null
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<CookiePreferences>

    if (
      typeof parsedValue.analytics !== 'boolean' ||
      typeof parsedValue.marketing !== 'boolean'
    ) {
      return null
    }

    return {
      necessary: true,
      analytics: parsedValue.analytics,
      marketing: parsedValue.marketing,
      updatedAt: parsedValue.updatedAt ?? new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function saveCookiePreferences(
  preferences: Omit<CookiePreferences, 'necessary' | 'updatedAt'>,
): void {
  if (typeof window === 'undefined') {
    return
  }

  const completePreferences: CookiePreferences = {
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    updatedAt: new Date().toISOString(),
  }

  window.localStorage.setItem(
    COOKIE_CONSENT_STORAGE_KEY,
    JSON.stringify(completePreferences),
  )
  window.dispatchEvent(
    new CustomEvent(COOKIE_PREFERENCES_UPDATED_EVENT, {
      detail: completePreferences,
    }),
  )
}

export function openCookiePreferences(): void {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new CustomEvent(COOKIE_OPEN_PREFERENCES_EVENT))
}
