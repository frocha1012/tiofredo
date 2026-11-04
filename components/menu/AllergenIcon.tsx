import { allergenLegend } from '@/data/menu-allergens'
import { useLanguage } from '@/lib/i18n'
import type { AllergenId } from '@/types'

export default function AllergenIcon({ allergen }: { allergen: AllergenId }) {
  const { t } = useLanguage()
  const symbol = allergenLegend.find(entry => entry.id === allergen)!
  const label = t(symbol.label)
  return <svg className="menu-allergen-icon" viewBox={symbol.viewBox} role="img" aria-label={label} data-allergen={allergen}>
    <title>{label}</title>
    <image href="/images/menu/allergens-original.png" width="480" height="184" aria-hidden="true" />
  </svg>
}
