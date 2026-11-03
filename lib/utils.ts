import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | null | undefined, locale = 'pt-PT'): string {
  if (price == null) return '—'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

export function hasContactPhone(phoneRaw: string): boolean {
  return phoneRaw.replace(/\D/g, '').length >= 9
}
