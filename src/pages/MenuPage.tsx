import { useLanguage } from '@/lib/i18n'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { menuCategories } from '@/data/menu'
import { company } from '@/data/content'
import { formatPrice } from '@/lib/utils'

export default function MenuPage() {
  const { t, locale } = useLanguage()
  const { hash } = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const selected = menuCategories.some(category => '#' + category.id === hash) ? hash.slice(1) : 'all'
  const normalized = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-PT')
  const categories = menuCategories.filter(category => selected === 'all' || category.id === selected).map(category => ({ ...category, items: category.items.filter(item => normalized(item.name + ' ' + (item.description ?? '') + ' ' + t(item.name) + ' ' + t(item.description ?? '')).includes(normalized(query.trim()))) })).filter(category => category.items.length)
  const count = categories.reduce((total, category) => total + category.items.length, 0)
  const resultsLabel = count === 1 ? t('1 opção para saborear') : t('{count} opções para saborear', { count })


  function selectCategory(id: string) {
    setQuery('')
    navigate(id === 'all' ? '/menu' : '/menu#' + id, { replace: true, state: { preserveScroll: true } })
  }

  return <main id="conteudo" className="menu-page" tabIndex={-1}>
    <section className="menu-hero page-width"><div><Link to="/" className="menu-breadcrumb">{t("Tio Fredo / ")}<span>{t("A ementa")}</span></Link><p className="overline">{t("ESCOLHA O SEU PRÓXIMO FAVORITO")}</p><h1>{t("Feito com gosto.")}<br /><em>{t("Servido com alma.")}</em></h1><p>{t("Da primeira fatia à última garfada.")}<br />{t("Sabores italianos e portugueses, à mesma mesa.")}</p></div><div className="menu-hero-image"><img src="/images/pasta.jpg" alt={t("Massa italiana com pesto e tomate")} width="1000" height="1000" /><span>{t("BUON APPETITO!")}</span></div></section>
    <div className="checker-strip" aria-hidden="true" />
    <section className="menu-content page-width" aria-label={t("Pratos da ementa")}><div className="menu-toolbar"><label className="menu-search"><Search size={18} /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={t("O que lhe apetece?")} aria-label={t("Pesquisar pratos")} />{query && <button type="button" aria-label={t("Limpar pesquisa")} onClick={() => setQuery('')}><X size={16} /></button>}</label><span>{resultsLabel}</span></div><div className="menu-layout"><aside className="menu-sidebar"><p className="overline">{t("À SUA ESCOLHA")}</p><nav aria-label={t("Categorias da ementa")}><button type="button" onClick={() => selectCategory('all')} aria-pressed={selected === 'all'}><span>{t("A ementa toda")}</span><span>{menuCategories.reduce((total, category) => total + category.items.length, 0)}</span></button>{menuCategories.map(category => <button key={category.id} type="button" aria-pressed={selected === category.id} onClick={() => selectCategory(category.id)}><span>{t(category.title)}</span><span>{String(category.items.length).padStart(2, '0')}</span></button>)}</nav><div className="menu-callout"><h3>{t("A mesa é em sua casa?")}</h3><p>{t("Encomende por telefone e venha levantar.")}</p><a href={'tel:' + company.phoneRaw}>{t("Pedir take away ")}<ArrowUpRight size={16} /></a></div></aside><div className="menu-results" aria-live="polite" aria-atomic="true">{categories.length ? categories.map(category => <section key={category.id} id={category.id} className="menu-category"><header><span className="menu-category-number">{String(menuCategories.findIndex(item => item.id === category.id) + 1).padStart(2, '0')}</span><div><h2>{t(category.title)}</h2><p>{t(category.subtitle ?? "")}</p></div></header><div className="menu-items-grid">{category.items.map(item => <article className="dish-entry" key={item.id}><div><h3>{t(item.name)}</h3><span>{formatPrice(item.price, locale)}</span></div>{item.description && <p>{t(item.description)}</p>}{item.name === 'Tio Fredo' && <span className="house-favourite">{t("ESPECIALIDADE DA CASA")}</span>}</article>)}</div></section>) : <div className="menu-empty"><Search size={30} /><h2>{t("Ainda não encontrámos esse sabor.")}</h2><p>{t("Experimente outro nome ou explore a ementa completa.")}</p><button type="button" className="button" onClick={() => { setQuery(''); selectCategory('all') }}>{t("Ver todos os pratos ")}<ArrowUpRight size={16} /></button></div>}<p className="menu-disclaimer">{t("Ementa de demonstração. Pratos e preços ilustrativos, sujeitos a confirmação junto do restaurante. Para informações sobre alergénios, contacte a nossa equipa.")}</p></div></div></section><section className="menu-bottom-cta"><div className="page-width"><div><p className="overline">{t("JÁ FICOU COM VONTADE?")}</p><h2>{t("Guardamos-lhe ")}<em>{t("um lugar.")}</em></h2></div><a className="button" href={'tel:' + company.phoneRaw}>{t("Reserve a sua mesa ")}<ArrowUpRight size={18} /></a></div></section>
  </main>
}
