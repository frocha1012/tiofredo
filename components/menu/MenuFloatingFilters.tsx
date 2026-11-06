import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { useLanguage } from '@/lib/i18n'
import MenuCategoryNav from './MenuCategoryNav'

export default function MenuFloatingFilters({ query, onQueryChange, selected, onSelect, onReveal }: {
  query: string; onQueryChange: (query: string) => void; selected: string
  onSelect: (id: string) => void; onReveal: () => void
}) {
  const { t } = useLanguage()
  const lenis = useLenis()
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [choice, setChoice] = useState<string | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const gesture = useRef<{ x: number; y: number } | null>(null)
  const outsideStart = useRef(false)
  const openingClick = useRef(false)
  const dirty = useRef(false)
  const pendingSelection = useRef<string | null>(null)
  const exitAnimation = useRef<Animation | null>(null)
  const isClosing = useRef(false)
  const select = useRef(onSelect)
  select.current = onSelect
  const reveal = useRef(onReveal)
  reveal.current = onReveal

  useEffect(() => {
    if (!open) return
    setChoice(null)
    const panel = dialog.current!
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    panel.showModal()
    const media = window.matchMedia('(max-width: 639px)')
    const resize = () => { if (!media.matches) setOpen(false) }
    media.addEventListener('change', resize)
    return () => {
      panel.close()
      exitAnimation.current?.cancel()
      exitAnimation.current = null
      isClosing.current = false
      openingClick.current = false
      setClosing(false)
      document.body.style.overflow = previousOverflow
      lenis?.start()
      media.removeEventListener('change', resize)
      if (media.matches) trigger.current?.focus({ preventScroll: true })
      const id = pendingSelection.current
      pendingSelection.current = null
      if (id) requestAnimationFrame(() => select.current(id))
      else if (dirty.current) requestAnimationFrame(() => reveal.current())
      dirty.current = false
    }
  }, [open, lenis])

  function close() {
    if (isClosing.current) return
    const panel = dialog.current
    const actions = panel?.querySelector('.menu-floating-actions')
    if (!panel || !actions || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpen(false)
      return
    }
    isClosing.current = true
    setClosing(true)
    const animation = actions.animate([
      { opacity: 1, transform: 'translate(0,0) scale(1)' },
      { opacity: 0, transform: 'translate(18px,20px) scale(.95)' },
    ], { duration: 180, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' })
    exitAnimation.current = animation
    animation.finished.then(() => { panel.close(); setOpen(false) }).catch(() => {})
  }

  return createPortal(<>
    <button ref={trigger} type="button" className="menu-filter-fab" aria-label={t('Abrir filtros da ementa')} aria-expanded={open} aria-controls="menu-filters" aria-haspopup="dialog"
      onClick={event => { if (event.detail === 0) openingClick.current = false; setOpen(true) }}
      onPointerDown={event => { gesture.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId) }}
      onPointerUp={event => {
        if (gesture.current) {
          const dx = gesture.current.x - event.clientX, dy = Math.abs(gesture.current.y - event.clientY)
          if ((dx > 28 && dy < 60) || (Math.abs(dx) < 12 && dy < 12)) { openingClick.current = true; setOpen(true) }
        }
        gesture.current = null
      }} onPointerCancel={() => { gesture.current = null }}>
      <SlidersHorizontal size={23} /><span>{t('Filtrar')}</span>
      {query.trim() && <i className="menu-filter-dot" aria-hidden="true" />}
    </button>
    <dialog ref={dialog} id="menu-filters" className="menu-floating-filters" aria-labelledby="menu-filters-title" data-closing={closing} data-lenis-prevent
      onCancel={event => { event.preventDefault(); close() }}
      onClickCapture={event => {
        if (openingClick.current) { openingClick.current = false; event.preventDefault(); event.stopPropagation() }
      }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return
        const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled])'))
        const first = items[0], last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }}
      onPointerDown={event => { openingClick.current = false; outsideStart.current = event.target === event.currentTarget }}
      onClick={event => {
        if (event.target === event.currentTarget && outsideStart.current) { outsideStart.current = false; close() }
      }}>
      <h2 id="menu-filters-title" className="sr-only">{t('Categorias da ementa')}</h2>
      <button type="button" className="menu-filter-fab menu-floating-close" autoFocus aria-label={t('Fechar filtros')} onClick={close}><X size={27} /></button>
      <div className="menu-floating-actions">
        <form className="menu-floating-search" onSubmit={event => { event.preventDefault(); close() }}>
          <label className="menu-find"><Search size={18} />
            <input ref={input} type="search" enterKeyHint="search" value={query} placeholder={t('Pesquisar na ementa')} aria-label={t('Pesquisar pratos')} onChange={event => { dirty.current = true; onQueryChange(event.target.value) }} />
          </label>
          <button type="submit" aria-label={t('Ver resultados')}><ArrowRight size={20} /></button>
        </form>
        <div className="menu-floating-categories">
          <MenuCategoryNav allFirst selected={choice ?? selected} searching={!choice && Boolean(query.trim())} onSelect={id => {
            pendingSelection.current = id; setChoice(id); dirty.current = false; close()
          }} />
        </div>
      </div>
      {query && <button type="button" className="menu-floating-reset" aria-label={t('Limpar pesquisa')} onClick={() => { dirty.current = true; onQueryChange(''); input.current?.focus() }}><RotateCcw size={19} /></button>}
    </dialog>
  </>, document.body)
}
