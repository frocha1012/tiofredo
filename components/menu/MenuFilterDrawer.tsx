import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { useLanguage } from '@/lib/i18n'
import MenuCategoryNav from './MenuCategoryNav'

export default function MenuFilterDrawer({ query, onQueryChange, selected, onSelect, onReveal }: {
  query: string; onQueryChange: (query: string) => void; selected: string
  onSelect: (id: string) => void; onReveal: () => void
}) {
  const { t } = useLanguage()
  const lenis = useLenis()
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [choice, setChoice] = useState<string | null>(null)
  const [drag, setDrag] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const gesture = useRef<{ x: number; y: number } | null>(null)
  const backdropStart = useRef(false)
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
    if (!panel || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDrag(0); setOpen(false)
      return
    }
    isClosing.current = true
    setClosing(true)
    const animation = panel.animate([
      { transform: getComputedStyle(panel).transform },
      { transform: 'translateX(100%)' },
    ], { duration: 230, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' })
    exitAnimation.current = animation
    animation.finished.then(() => { panel.close(); setDrag(0); setOpen(false) }).catch(() => {})
  }
  function startGesture(event: PointerEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest('input, a, button')) return
    gesture.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  return createPortal(<>
    <button ref={trigger} type="button" className="menu-filter-tab" aria-label={t('Abrir filtros da ementa')} aria-expanded={open} aria-controls="menu-filters" aria-haspopup="dialog"
      onClick={event => { if (event.detail === 0) openingClick.current = false; setOpen(true) }}
      onPointerDown={event => { gesture.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId) }}
      onPointerUp={event => {
        if (gesture.current) {
          const dx = gesture.current.x - event.clientX, dy = Math.abs(gesture.current.y - event.clientY)
          if ((dx > 28 && dy < 60) || (Math.abs(dx) < 12 && dy < 12)) { openingClick.current = true; setOpen(true) }
        }
        gesture.current = null
      }} onPointerCancel={() => { gesture.current = null }}>
      <SlidersHorizontal size={17} /><span>{t('Filtrar')}</span>
      {query.trim() && <i className="menu-filter-dot" aria-hidden="true" />}
    </button>
    <dialog ref={dialog} id="menu-filters" className="menu-filter-drawer" aria-labelledby="menu-filters-title" data-closing={closing} data-lenis-prevent
      style={drag ? { transform: `translateX(${drag}px)`, transition: 'none' } : undefined}
      onCancel={event => { event.preventDefault(); close() }}
      onClickCapture={event => {
        // Mobile browsers can send the opener's click to the newly exposed card.
        if (openingClick.current) { openingClick.current = false; event.preventDefault(); event.stopPropagation() }
      }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return
        const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled])'))
        const first = items[0], last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }}
      onClick={event => {
        if (event.target !== event.currentTarget || !backdropStart.current) return
        backdropStart.current = false
        const rect = event.currentTarget.getBoundingClientRect()
        if (event.clientX < rect.left || event.clientX > rect.right) close()
      }}
      onPointerDown={event => {
        openingClick.current = false
        const rect = event.currentTarget.getBoundingClientRect()
        backdropStart.current = event.target === event.currentTarget && (event.clientX < rect.left || event.clientX > rect.right)
        if (!backdropStart.current) startGesture(event)
      }}
      onPointerMove={event => {
        if (!gesture.current) return
        const dx = event.clientX - gesture.current.x, dy = event.clientY - gesture.current.y
        if (dx > 8 && Math.abs(dx) > Math.abs(dy)) setDrag(dx)
      }}
      onPointerUp={event => {
        if (gesture.current && event.clientX - gesture.current.x > 72 && Math.abs(event.clientY - gesture.current.y) < 60) close()
        setDrag(0); gesture.current = null
      }}
      onPointerCancel={() => { setDrag(0); gesture.current = null }}>
      <div className="menu-drawer-header">
        <div><p className="overline">TIO FREDO</p><h2 id="menu-filters-title">{t('A ementa')}</h2></div>
        <button type="button" className="menu-drawer-close" autoFocus aria-label={t('Fechar filtros')} onClick={close}><X size={22} /></button>
      </div>
      <form className="menu-drawer-search" onSubmit={event => { event.preventDefault(); close() }}>
        <label className="menu-find"><Search size={18} />
          <input type="search" enterKeyHint="search" value={query} placeholder={t('Pesquisar na ementa')} aria-label={t('Pesquisar pratos')} onChange={event => { dirty.current = true; onQueryChange(event.target.value) }} />
          {query && <button type="button" aria-label={t('Limpar pesquisa')} onClick={() => { dirty.current = true; onQueryChange('') }}><X size={17} /></button>}
        </label>
      </form>
      <div className="menu-drawer-categories">
        <MenuCategoryNav allFirst selected={choice ?? selected} searching={!choice && Boolean(query.trim())} onSelect={id => {
          pendingSelection.current = id; setChoice(id); dirty.current = false; close()
        }} />
      </div>
      <div className="menu-drawer-footer"><button type="button" className="button" onClick={close}>
        <span>{t('Ver resultados')}</span><ArrowRight size={18} />
      </button></div>
    </dialog>
  </>, document.body)
}
