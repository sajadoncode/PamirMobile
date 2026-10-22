const eur = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' })
const dateFmt = new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })

export const formatPrice = (value: number) => eur.format(value)

export const formatDate = (iso: string) => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? 'data non disponibile' : dateFmt.format(d)
}
