import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Search, X } from 'lucide-react'
import { useLanguage } from '@/lib/i18n'
import { menuCategories } from '@/data/menu'
import { company } from '@/data/content'
import MenuSheet from '@/components/menu/MenuSheet'
import AllergenLegend from '@/components/menu/AllergenLegend'

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-PT')
const menuSections = [
  { label: 'Pizzaria', ids: ['pizzas', 'calzones', 'pasta'] },
  { label: 'Da cozinha', ids: ['starters', 'salads', 'meat', 'fish', 'francesinhas', 'burgers', 'omelettes', 'sandwiches', 'sides', 'extras'] },
  { label: 'Para acompanhar', ids: ['drinks', 'wines'] },
]

export default function MenuPage() {
  const { t } = useLanguage()
  const { hash } = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const results = useRef<HTMLDivElement>(null)
  const toolbar = useRef<HTMLDivElement>(null)
  const searchInput = useRef<HTMLInputElement>(null)
  const searchToggle = useRef<HTMLButtonElement>(null)
  const selected = hash === '#all' ? 'all' : menuCategories.some(category => '#' + category.id === hash) ? hash.slice(1) : 'pizzas'
  const searching = Boolean(query.trim())
  const categories = menuCategories
    .filter(category => searching || selected === 'all' || category.id === selected)
    .map(category => ({
      ...category,
      items: category.items.filter(item => normalize([
        item.name, item.description, item.group, category.title, t(category.title), t(item.name), t(item.description ?? ''), t(item.group ?? ''),
      ].filter(Boolean).join(' ')).includes(normalize(query.trim()))),
    }))
    .filter(category => category.items.length)
  const count = categories.reduce((sum, category) => sum + category.items.length, 0)

  useEffect(() => { setQuery('') }, [hash])

  useEffect(() => {
    if (!query.trim() || !window.matchMedia('(max-width: 639px)').matches) return
    const frame = requestAnimationFrame(revealResults)
    return () => cancelAnimationFrame(frame)
  }, [query])

  function revealResults() {
    const top = results.current?.getBoundingClientRect().top ?? 0
    if (window.matchMedia('(max-width: 639px)').matches) {
      const offset = (document.querySelector('.site-header')?.getBoundingClientRect().height ?? 79) + (toolbar.current?.getBoundingClientRect().height ?? 66) + 12
      if (top < offset) window.scrollBy({ top: top - offset, behavior: 'instant' })
    } else if (top < 110) results.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
  }

  function selectCategory(id: string) {
    setQuery('')
    navigate('/menu#' + id, { replace: true, state: { preserveScroll: true } })
    requestAnimationFrame(revealResults)
  }

  function toggleSearch() {
    if (searchOpen) {
      setQuery('')
      setSearchOpen(false)
    } else {
      setSearchOpen(true)
      requestAnimationFrame(() => searchInput.current?.focus({ preventScroll: true }))
    }
  }

  return <main id="conteudo" className="menu-page menu-editorial" tabIndex={-1}>
    <section className="menu-intro page-width">
      <div className="menu-intro-copy">
        <Link to="/" className="menu-return"><ArrowLeft size={14} /> Tio Fredo</Link>
        <p className="overline">{t('PIZZARIA & RESTAURANTE')}</p>
        <h1>{t('A nossa')} <em>{t('ementa.')}</em></h1>
        <p className="menu-intro-description">{t('Sabores italianos e portugueses, à mesma mesa.')}</p>
        <a className="text-link" href="/ementa-tio-fredo-julho-2026.pdf" target="_blank" rel="noreferrer" aria-label={t('Ver ementa original (PDF)')}>
          <span className="menu-pdf-desktop">{t('Ver ementa original (PDF)')}</span><span className="menu-pdf-mobile">PDF</span> <ArrowUpRight size={15} />
        </a>
      </div>
      <figure className="menu-intro-photo">
        <img src="/images/pizza.jpg" alt={t('Pizza artesanal com mozzarella, tomate e folhas de manjericão')} width="1500" height="1001" fetchPriority="high" />
        <figcaption><span>{t('Feito para partilhar.')}</span><span>PONTE DA BARCA, PORTUGAL</span></figcaption>
      </figure>
    </section>

    <section className="menu-browse page-width" aria-label={t('Pratos da ementa')}>
      <div className={'menu-browse-bar' + (searchOpen ? ' menu-search-open' : '')} ref={toolbar}>
        <div><span className="overline">{t('À SUA ESCOLHA')}</span><p>{t('Encontre o seu favorito.')}</p></div>
        <label className="menu-mobile-category">
          <span className="sr-only">{t('Escolha uma categoria')}</span>
          <select aria-label={t('Escolha uma categoria')} value={searching ? 'search' : selected} onChange={event => selectCategory(event.target.value)}>
            {searching && <option value="search" disabled>{t('Resultados da pesquisa')}</option>}
            {menuSections.map(section => <optgroup label={t(section.label)} key={section.label}>
              {section.ids.map(id => <option key={id} value={id}>{t(menuCategories.find(category => category.id === id)!.title)}</option>)}
            </optgroup>)}
            <option value="all">{t('A ementa toda')}</option>
          </select>
        </label>
        <button type="button" className="menu-search-toggle" ref={searchToggle} aria-label={t(searchOpen ? 'Fechar pesquisa' : 'Pesquisar pratos')} aria-expanded={searchOpen} aria-controls="menu-search-field" onClick={toggleSearch}>
          {searchOpen ? <X size={20} /> : <Search size={20} />}
        </button>
        <label className="menu-find" id="menu-search-field">
          <Search size={17} />
          <input ref={searchInput} type="search" value={query} onChange={event => { setQuery(event.target.value); setSearchOpen(true) }} placeholder={t('Pesquisar na ementa')} aria-label={t('Pesquisar pratos')} onKeyDown={event => {
            if (event.key === 'Escape' && searchOpen) {
              setQuery(''); setSearchOpen(false); searchToggle.current?.focus()
            }
          }} />
          {query && <button type="button" aria-label={t('Limpar pesquisa')} onClick={() => setQuery('')}><X size={16} /></button>}
        </label>
      </div>

      <div className="menu-book-layout">
        <aside className="menu-index" data-lenis-prevent>
          <nav aria-label={t('Categorias da ementa')}>
            {menuSections.map(section => <div className="menu-index-group" key={section.label}>
              <p>{t(section.label)}</p>
              {section.ids.map(id => {
                const category = menuCategories.find(category => category.id === id)!
                return <button key={id} type="button" aria-pressed={!searching && selected === id} onClick={() => selectCategory(id)}>
                  <span>{t(category.title)}</span><span>{String(category.items.length).padStart(2, '0')}</span>
                </button>
              })}
            </div>)}
            <button type="button" className="menu-index-all" aria-pressed={!searching && selected === 'all'} onClick={() => selectCategory('all')}>
              {t('A ementa toda')} <ArrowUpRight size={13} />
            </button>
          </nav>
        </aside>

        <div className="menu-book" ref={results}>
          <div className="menu-book-results" aria-live="polite" aria-atomic="true">
            <AllergenLegend />
            {searching && <p className="menu-search-summary">{count === 1 ? t('1 opção para saborear') : t('{count} opções para saborear', { count })}</p>}
            {categories.length ? categories.map(category => <MenuSheet category={category} key={category.id} />) : <div className="menu-search-empty">
              <h2>{t('Ainda não encontrámos esse sabor.')}</h2>
              <p>{t('Experimente outro nome ou explore a ementa completa.')}</p>
              <button type="button" className="text-link" onClick={() => selectCategory('all')}>{t('Ver todos os pratos')} <ArrowUpRight size={16} /></button>
            </div>}
          </div>
          <div className="menu-fineprint"><p>{t('Ementa de julho de 2026')}</p><p>{t('IVA incluído à taxa legal em vigor. Para informações sobre alergénios e intolerâncias alimentares, contacte a nossa equipa.')}</p></div>
        </div>
      </div>
    </section>

    <section className="menu-booking"><div className="page-width">
      <div><p className="overline">{t('A mesa está posta.')}</p><h2>{t('Falta a sua')} <em>{t('companhia.')}</em></h2></div>
      <a className="button" href={'tel:' + company.phoneRaw}>{t('Reserve a sua mesa')} <ArrowUpRight size={18} /></a>
    </div></section>
  </main>
}
