export default function Brand({ large = false }: { large?: boolean }) {
  return <span className={'brand' + (large ? ' brand-large' : '')}>
    <img className="brand-logo" src="/images/tio-fredo-logo.png" alt="Tio Fredo — Ponte da Barca" width="357" height="365" decoding="async" />
  </span>
}
