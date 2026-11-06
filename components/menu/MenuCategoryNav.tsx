import { ArrowUpRight, Check } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { menuCategories } from '@/data/menu'

const sections = [
  { label: 'À sua mesa', categories: menuCategories.filter(category => !['drinks', 'wines'].includes(category.id)) },
  { label: 'Para acompanhar', categories: menuCategories.filter(category => ['drinks', 'wines'].includes(category.id)) },
]

export default function MenuCategoryNav({ selected, searching, onSelect, allFirst = false }: {
  selected: string; searching: boolean; onSelect: (id: string) => void; allFirst?: boolean
}) {
  const { t } = useLanguage()
  const all = <button type="button" className="menu-index-all" aria-pressed={!searching && selected === 'all'} onClick={() => onSelect('all')}>
    <span>{t('A ementa completa')}</span>{!searching && selected === 'all' ? <Check size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}
  </button>
  return <nav aria-label={t('Categorias da ementa')}>
    {allFirst && all}
    {sections.map(section => <div className="menu-index-group" key={section.label}>
      <p>{t(section.label)}</p>
      {section.categories.map(category => {
        return <button key={category.id} type="button" data-filter-tone={menuCategories.indexOf(category) % 2 === 0 ? 'alternate' : 'base'} aria-pressed={!searching && selected === category.id} onClick={() => onSelect(category.id)}>
          <span>{t(category.title)}</span><Check className="menu-category-check" size={14} aria-hidden="true" />
        </button>
      })}
    </div>)}
    {!allFirst && all}
  </nav>
}
