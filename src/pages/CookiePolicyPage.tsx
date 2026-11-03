import { useLanguage } from '@/lib/i18n'
import { Link } from 'react-router-dom'
import { company } from '@/data/content'
import { openCookiePreferences } from '@/lib/cookieConsent'

export default function CookiePolicyPage() {
  const { t } = useLanguage()
  return (
    <main id="conteudo" tabIndex={-1} className="bg-ivory">
      <section className="container-px mx-auto max-w-3xl section-pad !pt-12">
        <p className="eyebrow mb-6">{t("Legal")}</p>
        <h1 className="font-display text-4xl font-bold tracking-tight text-espresso md:text-5xl">{t("Política de Cookies")}</h1>
        <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">{t("Esta política explica como a ")}{company.name}{t(" utiliza cookies no website. Ao visitar o nosso site, pode escolher quais os cookies opcionais que autoriza, sem prejuízo dos cookies estritamente necessários ao funcionamento.")}</p>

        <div className="prose-policy mt-12 space-y-10 text-muted">
          <section>
            <h2 className="font-display text-2xl font-bold text-espresso">{t("1. O que são cookies?")}</h2>
            <p className="mt-4 text-base leading-relaxed">{t("Cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita um site. Permitem guardar preferências, melhorar a experiência de navegação e, quando autorizado, recolher dados estatísticos e de marketing.")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-espresso">{t("2. Tipos de cookies utilizados")}</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-relaxed">
              <li>
                <strong className="text-charcoal">{t("Estritamente necessários:")}</strong>{' '}{t("essenciais para funcionalidades básicas, segurança e gestão das preferências de consentimento.")}</li>
              <li>
                <strong className="text-charcoal">{t("Analíticos (opcionais):")}</strong>{' '}{t("ajudam-nos a analisar a utilização do site para melhorar os conteúdos e o desempenho.")}</li>
              <li>
                <strong className="text-charcoal">{t("Marketing (opcionais):")}</strong>{' '}{t("utilizados para medir campanhas e personalizar comunicações promocionais.")}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-espresso">{t("3. Base legal e consentimento")}</h2>
            <p className="mt-4 text-base leading-relaxed">{t("Em conformidade com o RGPD e regras aplicáveis em Portugal, os cookies não essenciais são apenas ativados após o seu consentimento. Pode recusar ou alterar as preferências a qualquer momento.")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-espresso">{t("4. Gestão das preferências")}</h2>
            <p className="mt-4 text-base leading-relaxed">{t("Pode gerir as preferências através da opção")}{' '}
              <button
                type="button"
                onClick={openCookiePreferences}
                className="font-semibold text-coffee underline underline-offset-2 transition-colors hover:text-caramel"
              >{t("Definições de Cookies")}</button>{t(", disponível no rodapé do site. Também pode eliminar cookies através das definições do seu navegador.")}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-espresso">{t("5. Contacto")}</h2>
            <p className="mt-4 text-base leading-relaxed">{t("Para questões relacionadas com privacidade e cookies, contacte-nos através de")}{' '}
              <a
                href={`mailto:${company.email}`}
                className="font-semibold text-coffee underline underline-offset-2 transition-colors hover:text-caramel"
              >
                {company.email}
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <Link
            to="/"
            className="text-sm font-semibold text-coffee transition-colors hover:text-caramel"
          >{t("← Voltar ao início")}</Link>
        </div>
      </section>
    </main>
  )
}
