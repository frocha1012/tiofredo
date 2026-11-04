import { useLanguage } from '@/lib/i18n'
import type { MenuCategory, MenuItem } from '@/types'
import DishEntry from './DishEntry'

function DishGroup({ items, label }: { items: MenuItem[]; label?: string }) {
  const { t } = useLanguage()
  const midpoint = items.length > 5 ? Math.ceil(items.length / 2) : items.length
  const columns = [items.slice(0, midpoint), items.slice(midpoint)].filter(column => column.length)
  const variants = items[0]?.variants
  const uniformVariants = variants && items.every(item => item.variants?.length === variants.length && item.variants.every((variant, index) => variant.label === variants[index].label))

  return <div className="menu-sheet-group">
    {label && <h3 className="menu-sheet-group-title">{t(label)}</h3>}
    <div className={'menu-sheet-columns' + (columns.length === 1 ? ' menu-sheet-columns-single' : '')}>
      {columns.map((column, index) => <div className="menu-sheet-column" key={index}>
        {uniformVariants && <div className="menu-price-guide" aria-hidden="true">
          {variants.map(variant => <span key={variant.label}>{t(variant.label)}</span>)}
        </div>}
        {column.map(item => <DishEntry key={item.id} item={item} hideVariantLabels={Boolean(uniformVariants)} />)}
      </div>)}
    </div>
  </div>
}

export default function MenuSheet({ category }: { category: MenuCategory }) {
  const { t } = useLanguage()
  const groups: { label?: string; items: MenuItem[] }[] = []
  for (const item of category.items) {
    const last = groups[groups.length - 1]
    if (last && last.label === item.group) last.items.push(item)
    else groups.push({ label: item.group, items: [item] })
  }

  return <section id={category.id} className="menu-sheet" aria-labelledby={'menu-title-' + category.id}>
    <div className="menu-sheet-masthead"><span>TIO FREDO</span><span>PONTE DA BARCA</span></div>
    <header className={'menu-sheet-heading' + (t(category.title).length > 11 ? ' menu-sheet-heading-long' : '')}>
      <p className="overline">{t('À sua mesa')}</p>
      <h2 id={'menu-title-' + category.id}>{t(category.title)}</h2>
      {category.subtitle && <p>{t(category.subtitle)}</p>}
    </header>
    {groups.map((group, index) => <DishGroup key={group.label ?? index} {...group} />)}
    <div className="menu-sheet-footer"><span>{t('Feito com gosto. Servido com alma.')}</span><span>Tio Fredo.</span></div>
  </section>
}
