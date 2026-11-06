import { ArrowUpRight, Check } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { menuCategories } from '@/data/menu'

const sections = [
  { label: 'Pizzaria', ids: ['pizzas', 'calzones', 'pasta'] },
  { label: 'Da cozinha', ids: ['starters', 'salads', 'meat', 'fish', 'francesinhas', 'burgers', 'omelettes', 'sandwiches', 'sides', 'extras'] },
  { label: 'Para acompanhar', ids: ['drinks', 'wines'] },
]

export default function MenuCategoryNav({ selected, searching, onSelect, allFirst = false }: {
  selected: string; searching: boolean; onSelect: (id: string) => void; allFirst?: boolean
}) {
  const { t } = useLanguage()
  const all = <button type="button" className="menu-index-all" aria-pressed={!searching && selected === 'all'} onClick={() => onSelect('all')}>
    <span>{t('A ementa toda')}</span>{!searching && selected === 'all' ? <Check size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}
  </button>
  return <nav aria-label={t('Categorias da ementa')}>
    {allFirst && all}
    {sections.map(section => <div className="menu-index-group" key={section.label}>
      <p>{t(section.label)}</p>
      {section.ids.map(id => {
        const category = menuCategories.find(category => category.id === id)!
        return <button key={id} type="button" aria-pressed={!searching && selected === id} onClick={() => onSelect(id)}>
          <span>{t(category.title)}</span><Check className="menu-category-check" size={14} aria-hidden="true" />
        </button>
      })}
    </div>)}
    {!allFirst && all}
  </nav>
}
