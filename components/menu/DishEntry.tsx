import { useLanguage } from '@/lib/i18n'
import { formatPrice } from '@/lib/utils'
import type { MenuItem } from '@/types'
import AllergenIcon from './AllergenIcon'

export default function DishEntry({ item, hideVariantLabels = false }: { item: MenuItem; hideVariantLabels?: boolean }) {
  const { t, locale } = useLanguage()
  const variants = item.variants
  const Heading = item.group ? 'h4' : 'h3'
  return <article className={'menu-dish' + (variants ? ' menu-dish-with-variants' : '') + (variants && variants.length > 2 ? ' menu-dish-many-prices' : '') + (t(item.name).length > 38 ? ' menu-dish-long-name' : '')} data-dish-id={item.id}>
    <div className="menu-dish-heading">
      <Heading className="menu-dish-name">{t(item.name)}</Heading>
      <span className="menu-dish-leader" aria-hidden="true" />
      {variants ? <dl className={'menu-dish-prices' + (hideVariantLabels ? ' menu-dish-prices-aligned' : '')}>
        {variants.map(variant => <div key={variant.label}>
          <dt className={hideVariantLabels ? 'sr-only' : undefined}>{t(variant.label)}</dt>
          <dd>{formatPrice(variant.price, locale)}</dd>
        </div>)}
      </dl> : <span className="menu-dish-price">
        {formatPrice(item.price, locale)}
        {item.priceMax !== undefined && <><span className="price-range-dash"> – </span>{formatPrice(item.priceMax, locale)}</>}
      </span>}
    </div>
    {item.description && <p className="menu-dish-description">{t(item.description)}</p>}
    {(item.allergens?.length || item.chefRecommended) && <div className="menu-dish-symbols">
      {item.allergens?.map(allergen => <AllergenIcon key={allergen} allergen={allergen} />)}
      {item.chefRecommended && <span className="menu-dish-chef" title={t('Preferência do chefe')}>
        <img className="menu-chef-icon" src="/images/menu/chef-original.svg" alt="" width="22" height="26" />
        <span>{t('Preferência do chefe')}</span>
      </span>}
    </div>}
  </article>
}
