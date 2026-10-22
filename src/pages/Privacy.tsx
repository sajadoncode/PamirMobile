import { useSeo } from '../lib/seo'
import { store } from '../config/store'

export default function Privacy() {
  useSeo('Privacy e cookie', 'Informazioni sul trattamento dei dati personali e sull\'uso dei cookie di questo sito.')
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">Privacy e cookie</h1>
      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
        Bozza informativa: prima della pubblicazione è necessaria una revisione legale (GDPR) con i dati reali del titolare del trattamento.
      </p>
      <h2 className="text-lg font-semibold">Titolare del trattamento</h2>
      <p>{store.name} — [Ragione sociale, P. IVA e indirizzo da inserire].</p>
      <h2 className="text-lg font-semibold">Cookie</h2>
      <p>Questo sito non utilizza cookie di profilazione né strumenti di analisi di terze parti. Non è quindi previsto un banner per il consenso. Se in futuro verranno aggiunti analytics, mappe incorporate o altri servizi di terze parti, sarà necessario aggiornare questa informativa e raccogliere il consenso dove richiesto.</p>
      <h2 className="text-lg font-semibold">Modulo di contatto e WhatsApp</h2>
      <p>I dati inseriti nel modulo (nome, e-mail, telefono, messaggio) sono usati solo per rispondere alla tua richiesta. Se scegli di scriverci su WhatsApp, la conversazione è gestita da WhatsApp secondo le sue condizioni.</p>
      <h2 className="text-lg font-semibold">Diritti dell'interessato</h2>
      <p>Puoi chiedere accesso, rettifica o cancellazione dei tuoi dati contattando il titolare ai recapiti indicati nella pagina Contatti.</p>
    </div>
  )
}
