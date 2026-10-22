import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import WhatsAppButton from '../components/WhatsAppButton'
import { store } from '../config/store'
import { useSeo } from '../lib/seo'
import { generalInquiryUrl } from '../lib/whatsapp'
import { StoreDetails } from './StoreInfo'

interface Values { nome: string; email: string; telefono: string; messaggio: string; privacy: boolean }
type Errors = Partial<Record<keyof Values, string>>
type Status = { type: 'idle' } | { type: 'sending' } | { type: 'success'; text: string } | { type: 'error'; text: string }

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.nome.trim().length < 2) e.nome = 'Inserisci il tuo nome.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Inserisci un indirizzo e-mail valido.'
  if (v.telefono.trim() && !/^\+?[\d\s]{6,18}$/.test(v.telefono.trim())) e.telefono = 'Inserisci un numero di telefono valido.'
  if (v.messaggio.trim().length < 10) e.messaggio = 'Il messaggio deve contenere almeno 10 caratteri.'
  if (!v.privacy) e.privacy = 'Devi prendere visione dell\'informativa privacy.'
  return e
}

export default function Contact() {
  useSeo('Contatti', 'Contatta il negozio per prezzi e disponibilità: telefono, WhatsApp o modulo di richiesta.')
  const [sp] = useSearchParams()
  const product = sp.get('prodotto')
  const sku = sp.get('sku')
  const [v, setV] = useState<Values>({
    nome: '', email: '', telefono: '', privacy: false,
    messaggio: product ? `Buongiorno, vorrei informazioni sulla disponibilità di ${product}${sku ? `, codice ${sku}` : ''}.` : '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ type: 'idle' })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(v)
    setErrors(errs)
    if (Object.keys(errs).length) {
      setStatus({ type: 'error', text: 'Controlla i campi evidenziati e riprova.' })
      return
    }
    if (store.formEndpoint) {
      setStatus({ type: 'sending' })
      try {
        const res = await fetch(store.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ nome: v.nome, email: v.email, telefono: v.telefono, messaggio: v.messaggio }),
        })
        if (!res.ok) throw new Error()
        setStatus({ type: 'success', text: 'Messaggio inviato. Ti risponderemo il prima possibile.' })
      } catch {
        setStatus({ type: 'error', text: 'Invio non riuscito. Riprova più tardi o contattaci direttamente.' })
      }
    } else if (store.email) {
      const body = `${v.messaggio}\n\n${v.nome}\n${v.telefono}`
      window.location.href = `mailto:${store.email}?subject=${encodeURIComponent('Richiesta informazioni')}&body=${encodeURIComponent(body)}`
      setStatus({ type: 'success', text: 'Abbiamo aperto il tuo programma di posta: il messaggio sarà inviato solo dopo la tua conferma.' })
    } else {
      setStatus({ type: 'error', text: 'L\'invio dei messaggi dal sito non è ancora attivo. Il messaggio NON è stato inviato: contattaci per telefono o in negozio.' })
    }
  }

  const field = (k: keyof Values) => ({
    'aria-invalid': Boolean(errors[k]),
    'aria-describedby': errors[k] ? `${k}-err` : undefined,
  })
  const err = (k: keyof Values) => errors[k] && <p id={`${k}-err`} className="mt-1 text-sm text-red-700">{errors[k]}</p>

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">Contatti</h1>
      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <section className="card space-y-4 p-6" aria-labelledby="info">
          <h2 id="info" className="text-lg font-semibold">Informazioni</h2>
          <StoreDetails />
          <WhatsAppButton href={generalInquiryUrl()} />
        </section>

        <section className="card p-6" aria-labelledby="form">
          <h2 id="form" className="mb-4 text-lg font-semibold">Richiedi informazioni</h2>
          <form onSubmit={submit} noValidate className="space-y-4">
            <div>
              <label htmlFor="nome" className="mb-1 block text-sm font-medium">Nome *</label>
              <input id="nome" className="input" autoComplete="name" value={v.nome} onChange={(e) => setV({ ...v, nome: e.target.value })} {...field('nome')} />
              {err('nome')}
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">E-mail *</label>
              <input id="email" type="email" className="input" autoComplete="email" value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} {...field('email')} />
              {err('email')}
            </div>
            <div>
              <label htmlFor="telefono" className="mb-1 block text-sm font-medium">Telefono (facoltativo)</label>
              <input id="telefono" type="tel" className="input" autoComplete="tel" value={v.telefono} onChange={(e) => setV({ ...v, telefono: e.target.value })} {...field('telefono')} />
              {err('telefono')}
            </div>
            <div>
              <label htmlFor="messaggio" className="mb-1 block text-sm font-medium">Messaggio *</label>
              <textarea id="messaggio" rows={5} className="input" value={v.messaggio} onChange={(e) => setV({ ...v, messaggio: e.target.value })} {...field('messaggio')} />
              {err('messaggio')}
            </div>
            <div>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-0.5 h-4 w-4" checked={v.privacy} onChange={(e) => setV({ ...v, privacy: e.target.checked })} {...field('privacy')} />
                <span>Ho letto l'<Link to="/privacy" className="underline">informativa privacy</Link> *</span>
              </label>
              {err('privacy')}
            </div>
            <button type="submit" className="btn-primary" disabled={status.type === 'sending'}>
              {status.type === 'sending' ? 'Invio in corso…' : 'Invia richiesta'}
            </button>
            <div role="status" aria-live="polite">
              {status.type === 'success' && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">{status.text}</p>}
              {status.type === 'error' && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-900">{status.text}</p>}
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
