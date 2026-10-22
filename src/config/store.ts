const env = import.meta.env

const clean = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined)

/** Unica fonte dei dati del negozio. Valorizzare tramite variabili d'ambiente (vedi .env.example). */
export const store = {
  name: clean(env.VITE_STORE_NAME) ?? 'PamirMobile',
  address: clean(env.VITE_STORE_ADDRESS) ?? 'Via Emanuele Filiberto, 255, 00185',
  city: 'Roma',
  phone: clean(env.VITE_STORE_PHONE) ?? '06 8983 0610',
  whatsapp: clean(env.VITE_STORE_WHATSAPP)?.replace(/[^\d]/g, ''),
  email: clean(env.VITE_STORE_EMAIL),
  mapsUrl: clean(env.VITE_STORE_MAPS_URL) ?? 'https://maps.app.goo.gl/8X9W2iP7bC8oKGUB7',
  siteUrl: clean(env.VITE_SITE_URL),
  formEndpoint: clean(env.VITE_CONTACT_FORM_ENDPOINT),
  /** Orari tratti dalla scheda Google Maps: da confermare con il titolare. */
  hours: [
    { day: 'Lunedì', hours: '09:00–20:00' },
    { day: 'Martedì', hours: '09:00–20:00' },
    { day: 'Mercoledì', hours: '09:00–20:00' },
    { day: 'Giovedì', hours: '09:00–20:00' },
    { day: 'Venerdì', hours: '09:00–20:00' },
    { day: 'Sabato', hours: '09:00–20:00' },
    { day: 'Domenica', hours: '10:00–19:30' },
  ] as { day: string; hours: string }[],
  /** Dopo quanti giorni la disponibilità è considerata non verificata. */
  stockFreshnessDays: 30,
}

export const PLACEHOLDER = '[Da confermare]'
