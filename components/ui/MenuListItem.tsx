import { formatPrice } from '@/lib/utils'
import type { MenuItem } from '@/types'

interface MenuListItemProps {
  item: MenuItem
}

export default function MenuListItem({ item }: MenuListItemProps) {
  return (
    <article className="menu-entry">
      <div className="menu-entry-row">
        <h3 className="menu-entry-name">{item.name}</h3>
        <span className="menu-entry-leader" aria-hidden="true" />
        <span className="menu-entry-price">{formatPrice(item.price)}</span>
      </div>
      {item.description && (
        <p className="menu-entry-description">{item.description}</p>
      )}
    </article>
  )
}
