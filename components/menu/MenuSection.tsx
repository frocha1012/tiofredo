import MenuListItem from '@/components/ui/MenuListItem'
import type { MenuCategory } from '@/types'

interface MenuSectionProps {
  category: MenuCategory
  isLast?: boolean
}

export default function MenuSection({ category, isLast }: MenuSectionProps) {
  return (
    <section id={category.id} className="menu-section min-w-0">
      <header className="menu-section-header">
        <h2 className="menu-section-title">{category.title}</h2>
        {category.subtitle && (
          <p className="menu-section-subtitle">{category.subtitle}</p>
        )}
      </header>

      <div className="menu-section-items">
        {category.items.map((item) => (
          <MenuListItem key={item.id} item={item} />
        ))}
      </div>

      {!isLast && <hr className="menu-section-divider lg:hidden" />}
    </section>
  )
}
