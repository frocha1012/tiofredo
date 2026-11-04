import { useLanguage } from '@/lib/i18n'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Clock3, MapPin, Phone, Pizza, ShoppingBag, Utensils } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { company } from '@/data/content'
import LocationMap from '@/components/home/LocationMap'

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65 }}>{children}</motion.div>
}

const dishes = [
  { number: '01', title: 'Um clássico italiano.', category: 'As nossas pizzas', description: 'Massa fina, sabores generosos e aquela primeira fatia que pede outra.', image: 'pizza', alt: 'Pizza de tomate e mozzarella com manjericão fresco', href: 'pizzas' },
  { number: '02', title: 'Conforto em cada garfada.', category: 'As nossas massas', description: 'Dos clássicos italianos às receitas da casa. Para saborear sem pressa.', image: 'pasta', alt: 'Massa com pesto e tomates frescos', href: 'pasta' },
  { number: '03', title: 'De coração português.', category: 'A nossa cozinha', description: 'Bacalhau à Tio Fredo, posta e os sabores da tradição que nos sabem a casa.', image: 'grill', alt: 'Carne grelhada servida com acompanhamentos', href: 'meat' },
]

export default function HomePage() {
  const { t } = useLanguage()
  return (
    <main id="conteudo" tabIndex={-1}>
      <section className="hero-section page-width" id="inicio">
        <div className="hero-copy">
          <p className="overline">{t("À MESA EM PONTE DA BARCA")}</p>
          <h1>{t("À mesa,")}<br />{t("sabe sempre")}<br /><em>{t("melhor.")}</em></h1>
          <p className="hero-description">{t("Um bocadinho de Itália. Um coração português.")}<br className="desktop-break" />{t(" Pizzas artesanais, sabores de casa e boa companhia.")}</p>
          <div className="hero-actions"><Link to="/menu" className="button">{t("Descubra a ementa ")}<ArrowUpRight size={18} /></Link><Link to="/#sobre" className="text-link">{t("Conheça a nossa casa ")}<ArrowDown size={16} /></Link></div>
          <div className="hero-footnote"><span className="hand-line" aria-hidden="true" /><span>{t("Feito para partilhar.")}<br /><strong>{t("Desde a primeira fatia.")}</strong></span><ArrowDownRight size={32} strokeWidth={1} /></div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo"><img src="/images/pizza.jpg" alt={t("Pizza artesanal com mozzarella, tomate e folhas de manjericão")} fetchPriority="high" width="1500" height="1001" /><div className="photo-caption"><span>{t("PIZZA, AMORE & BOA COMPANHIA")}</span><span>{t("01 / TIO FREDO")}</span></div></div>
          <div className="pizza-stamp"><span>{t("BOA MASSA.")}</span><Pizza size={43} strokeWidth={1.3} /><span>{t("BOA VIDA.")}</span></div>
          <span className="visual-note">{t("O melhor ingrediente? Estar juntos.")}</span>
        </div>
      </section>
      <div className="flavour-strip" aria-label={t("Pizza artesanal, cozinha portuguesa e take away")}><div><span>{t("PIZZA ARTESANAL")}</span><span>{t("CORAÇÃO PORTUGUÊS")}</span><span>{t("BOA COMPANHIA")}</span><span>{t("TAKE AWAY")}</span></div></div>
      <section className="food-section section-space page-width" aria-labelledby="food-title">
        <Reveal className="section-heading"><div><p className="overline">{t("DA NOSSA COZINHA PARA A SUA MESA")}</p><h2 id="food-title">{t("O difícil é ")}<em>{t("escolher.")}</em></h2></div><Link to="/menu" className="text-link">{t("Ver a ementa completa ")}<ArrowUpRight size={18} /></Link></Reveal>
        <div className="food-grid">{dishes.map(dish => <Reveal key={dish.href}>
          <Link to={'/menu#' + dish.href} className="food-card"><div className="food-photo"><img src={'/images/' + dish.image + '.jpg'} alt={t(dish.alt)} loading="lazy" width="1000" height="750" /><span className="food-category">{t(dish.category)}</span><span className="food-arrow"><ArrowUpRight size={22} /></span></div><div className="food-card-title"><span>{dish.number}</span><h3>{t(dish.title)}</h3></div><p>{t(dish.description)}</p></Link>
        </Reveal>)}</div>
        <p className="food-note"><Utensils size={15} />{t(" Entradas, pizzas, massas, carnes e peixe. Há lugar para todos os gostos.")}</p>
      </section>
      <section className="about-section" id="sobre" aria-labelledby="about-title">
        <div className="page-width about-grid">
          <Reveal className="about-visual"><img src="/images/restaurant.jpg" alt={t("Ambiente acolhedor de restaurante, com mesas preparadas para receber")} loading="lazy" width="1400" height="933" /><span className="image-label">{t("A CASA É NOSSA. A MESA É SUA.")}</span><div className="about-note">{t("Entre.")}<br /><em>{t("Sinta-se em casa.")}</em></div></Reveal>
          <Reveal className="about-copy"><p className="overline">{t("MUITO GOSTO. SOMOS O TIO FREDO.")}</p><h2 id="about-title">{t("Sabores de sempre.")}<br />{t("À nossa ")}<em>{t("mesa.")}</em></h2><p>{t("No coração de Ponte da Barca, juntamos o melhor de dois mundos: o conforto da cozinha portuguesa e a paixão pelas pizzas e massas italianas.")}</p><p>{t("Uma casa informal, uma mesa bem composta e tempo para estar com quem mais gosta. É assim que gostamos de receber.")}</p><div className="about-signature">{t("Até já, ")}<span>{t("Tio Fredo")}</span><span aria-hidden="true">♡</span></div><a href={company.mapsUrl} target="_blank" rel="noreferrer" className="text-link">{t("Encontre a nossa casa ")}<ArrowUpRight size={18} /></a></Reveal>
        </div>
      </section>
      <section className="reservation-section section-space page-width" id="reservas" aria-labelledby="reserve-title">
        <Reveal className="reservation-heading"><p className="overline">{t("OS BONS MOMENTOS COMEÇAM À MESA")}</p><h2 id="reserve-title">{t("A sua companhia.")}<br /><em>{t("A nossa cozinha.")}</em></h2></Reveal>
        <div className="occasion-grid"><Reveal className="occasion"><span className="occasion-icon"><Utensils size={24} strokeWidth={1.4} /></span><div><h3>{t("Fique para a refeição.")}</h3><p>{t("A dois, em família ou com os amigos. Ligue-nos e guarde o seu lugar à mesa.")}</p><a className="text-link" href={'tel:' + company.phoneRaw}>{t("Reservar mesa ")}<ArrowUpRight size={17} /></a></div></Reveal><Reveal className="occasion"><span className="occasion-icon"><ShoppingBag size={24} strokeWidth={1.4} /></span><div><h3>{t("Leve um bocadinho de nós.")}</h3><p>{t("Hoje a mesa é em sua casa? Faça o seu pedido por telefone e venha levantar.")}</p><a className="text-link" href={'tel:' + company.phoneRaw}>{t("Pedir take away ")}<ArrowUpRight size={17} /></a></div></Reveal></div>
        <div className="reservation-phone"><span>{t("UMA CHAMADA. UM BOM PLANO.")}</span><a href={'tel:' + company.phoneRaw}>{company.phone.replace('+351 ', '')} <ArrowUpRight /></a><small>{t("Chamada para a rede fixa nacional.")}</small></div>
      </section>
      <section className="contact-section" id="contactos" aria-labelledby="contact-title"><div className="page-width contact-grid"><Reveal><p className="overline">{t("ESTAMOS MESMO AQUI")}</p><h2 id="contact-title">{t("No coração")}<br />{t("da ")}<em>{t("Barca.")}</em></h2><p>{t("Um passeio pela vila. Uma boa refeição.")}<br />{t("O seu próximo plano está feito.")}</p><a href={company.mapsUrl} className="button" target="_blank" rel="noreferrer">{t("Como chegar ")}<ArrowUpRight size={18} /></a></Reveal><Reveal className="contact-details"><div><MapPin size={21} strokeWidth={1.5} /><div><h3>{t("Venha ter connosco")}</h3><p>{company.address}<br />{company.city}, {company.country}</p></div></div><div><Clock3 size={21} strokeWidth={1.5} /><div><h3>{t("Há sempre tempo para uma visita")}</h3><dl className="hours-list"><div><dt>{t("Segunda a sexta")}</dt><dd>{company.schedule.weekdayHours}</dd></div><div><dt>{t("Fins de semana e feriados")}</dt><dd>{company.schedule.weekendHours}</dd></div><div><dt>{t("Cozinha · todos os dias")}</dt><dd>{company.schedule.kitchenHours}</dd></div></dl><small>{t("Horário sujeito a alterações.")}</small></div></div><div><Phone size={21} strokeWidth={1.5} /><div><h3>{t("Vamos conversar?")}</h3><a href={'tel:' + company.phoneRaw}>{company.phone}</a><a className="contact-email" href={'mailto:' + company.email}>{company.email}</a></div></div></Reveal></div><LocationMap /></section>
      <div className="checker-strip" aria-hidden="true" />
    </main>
  )
}
