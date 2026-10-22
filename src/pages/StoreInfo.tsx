import { Clock, ExternalLink, MapPin, Phone } from 'lucide-react'
import WhatsAppButton from '../components/WhatsAppButton'
import { PLACEHOLDER, store } from '../config/store'
import { useSeo } from '../lib/seo'
import { generalInquiryUrl } from '../lib/whatsapp'

export function StoreDetails() {
  return (
    <div className="space-y-4 text-sm">
      <p className="flex gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
        <span><strong>{store.name}</strong><br />{store.address ?? `${PLACEHOLDER} Indirizzo`}, {store.city}</span></p>
      <p className="flex gap-3"><Phone size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
        <span>Telefono: {store.phone ? <a className="underline" href={`tel:${store.phone.replace(/\s/g, '')}`}>{store.phone}</a> : PLACEHOLDER}<br />
          WhatsApp: {store.whatsapp ? `+${store.whatsapp}` : PLACEHOLDER}<br />
          E-mail: {store.email ? <a className="underline" href={`mailto:${store.email}`}>{store.email}</a> : PLACEHOLDER}</span></p>
      <div className="flex gap-3"><Clock size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
        {store.hours.length ? (
          <ul>{store.hours.map((h) => <li key={h.day}>{h.day}: {h.hours}</li>)}</ul>
        ) : <span>Orari di apertura: {PLACEHOLDER}</span>}
      </div>
    </div>
  )
}

export default function StoreInfo() {
  useSeo('Il negozio', 'Indirizzo, orari, telefono e come raggiungere il negozio di elettronica e telefonia a Roma.')
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">Il negozio</h1>
      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
        Indirizzo, telefono e orari provengono dalla scheda Google Maps: confermali con il titolare. WhatsApp ed e-mail non sono ancora configurati.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <section className="card space-y-4 p-6" aria-labelledby="contatti-neg">
          <h2 id="contatti-neg" className="text-lg font-semibold">Contatti e orari</h2>
          <StoreDetails />
          <WhatsAppButton href={generalInquiryUrl()} />
        </section>
        <section className="card space-y-3 p-6" aria-labelledby="come">
          <h2 id="come" className="text-lg font-semibold">Come raggiungerci</h2>
          <p className="text-sm text-slate-600">
            Indicazioni stradali e mezzi pubblici: {PLACEHOLDER}. Verranno aggiunte quando sarà confermato l'indirizzo.
          </p>
          {store.mapsUrl ? (
            <a className="btn-primary" href={store.mapsUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} aria-hidden /> Apri su Google Maps
            </a>
          ) : (
            <button disabled className="btn-outline">Link Google Maps non ancora configurato</button>
          )}
        </section>
      </div>
    </div>
  )
}
