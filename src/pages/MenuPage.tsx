import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Search, X } from 'lucide-react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import { useLenis } from 'lenis/react'
import { EASE } from '@/lib/motion'
import { useLanguage } from '@/lib/i18n'
import { menuCategories } from '@/data/menu'
import { company } from '@/data/content'
import MenuSheet from '@/components/menu/MenuSheet'
import AllergenLegend from '@/components/menu/AllergenLegend'
import MenuCategoryNav from '@/components/menu/MenuCategoryNav'
import MenuFloatingFilters from '@/components/menu/MenuFloatingFilters'

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-PT')

export default function MenuPage() {
  const { t } = useLanguage()
  const { hash } = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [switching, setSwitching] = useState(false)
  const results = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const selection = useRef(0)
  const controls = useAnimationControls()
  const reduced = useReducedMotion()
  const lenis = useLenis()
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

  useEffect(() => { setQuery('') }, [hash])
  useEffect(() => () => { selection.current++ }, [])

  function changeQuery(value: string) {
    selection.current++
    controls.stop()
    controls.set({ opacity: 1, y: 0 })
    setSwitching(false)
    setQuery(value)
  }

  function revealResults() {
    const target = content.current ?? results.current
    if (!target) return Promise.resolve()
    const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 110
    const offset = window.matchMedia('(max-width: 639px)').matches
      ? (document.querySelector('.site-header')?.getBoundingClientRect().height ?? 79) + 12 : padding
    return new Promise<void>(resolve => {
      const finish = () => { window.clearTimeout(timer); resolve() }
      const timer = window.setTimeout(finish, 550)
      if (lenis) {
        lenis.resize()
        lenis.scrollTo(target, { offset: padding - offset, duration: .45, immediate: Boolean(reduced), onComplete: finish })
      } else {
        window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset), behavior: reduced ? 'instant' : 'smooth' })
        if (reduced) finish()
      }
    })
  }

  async function selectCategory(id: string) {
    const token = ++selection.current
    if (!query && id === selected) {
      setSwitching(false)
      if (reduced) controls.set({ opacity: 1, y: 0 })
      else void controls.start({ opacity: 1, y: 0, transition: { duration: .2 } })
      void revealResults()
      return
    }
    setSwitching(true)
    if (!reduced) {
      await Promise.all([
        controls.start({ opacity: .45, transition: { duration: .16 } }),
        revealResults(),
      ])
      if (token !== selection.current) return
      await controls.start({ opacity: 0, y: 6, transition: { duration: .1 } })
      if (token !== selection.current) return
    }
    setQuery('')
    navigate('/menu#' + id, { replace: true, state: { preserveScroll: true } })
    requestAnimationFrame(() => {
      if (token !== selection.current) return
      setSwitching(false)
      if (reduced) { controls.set({ opacity: 1, y: 0 }); void revealResults() }
      else void controls.start({ opacity: 1, y: 0, transition: { duration: .32, ease: EASE } })
    })
  }

  return <main id="conteudo" className="menu-page menu-editorial" tabIndex={-1}>
    <MenuFloatingFilters query={query} onQueryChange={changeQuery} selected={selected} onSelect={selectCategory} onReveal={revealResults} />
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
      <div className="menu-browse-bar">
        <div><span className="overline">{t('À SUA ESCOLHA')}</span><p>{t('Encontre o seu favorito.')}</p></div>
        <label className="menu-find">
          <Search size={17} />
          <input type="search" value={query} onChange={event => changeQuery(event.target.value)} placeholder={t('Pesquisar na ementa')} aria-label={t('Pesquisar pratos')} />
          {query && <button type="button" aria-label={t('Limpar pesquisa')} onClick={() => changeQuery('')}><X size={16} /></button>}
        </label>
      </div>

      <div className="menu-book-layout">
        <aside className="menu-index" data-lenis-prevent>
          <MenuCategoryNav selected={selected} searching={searching} onSelect={selectCategory} />
        </aside>

        <div className="menu-book" ref={results}>
          <div className="menu-book-results" aria-live="polite" aria-atomic="true">
            <AllergenLegend />
            {searching && <div className="menu-search-summary"><p>{t('Resultados da pesquisa')}</p><button type="button" onClick={() => changeQuery('')}>{t('Limpar pesquisa')} <X size={14} /></button></div>}
            <motion.div className="menu-category-content" ref={content} animate={controls} initial={false} aria-busy={switching}>
            {categories.length ? categories.map(category => <MenuSheet category={category} key={category.id} />) : <div className="menu-search-empty">
              <h2>{t('Ainda não encontrámos esse sabor.')}</h2>
              <p>{t('Experimente outro nome ou explore a ementa completa.')}</p>
              <button type="button" className="text-link" onClick={() => selectCategory('all')}>{t('Ver todos os pratos')} <ArrowUpRight size={16} /></button>
            </div>}
            </motion.div>
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
