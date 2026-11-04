import { allergenLegend } from '@/data/menu-allergens'
import { useLanguage } from '@/lib/i18n'
import AllergenIcon from './AllergenIcon'

export default function AllergenLegend() {
  const { t } = useLanguage()
  return <details className="menu-allergen-legend" open>
    <summary><span>{t('Alergénios e símbolos')}</span><span className="menu-legend-hint">{t('Ver legenda')}</span></summary>
    <div className="menu-legend-content">
      <p>{t('Símbolos da ementa original. A ausência de um símbolo não indica que o prato esteja isento de alergénios. Consulte a nossa equipa sobre alergias e intolerâncias.')}</p>
      <ul className="menu-legend-grid">
        {allergenLegend.map(symbol => <li key={symbol.id}><AllergenIcon allergen={symbol.id} /><span>{t(symbol.label)}</span></li>)}
        <li><img className="menu-chef-icon" src="/images/menu/chef-original.svg" alt="" width="22" height="26" /><span>{t('Preferência do chefe')}</span></li>
      </ul>
    </div>
  </details>
}
