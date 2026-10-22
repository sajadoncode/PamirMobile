import { MessageCircle } from 'lucide-react'
import { hasWhatsApp } from '../lib/whatsapp'

interface Props {
  href: string | null
  label?: string
  className?: string
}

export default function WhatsAppButton({ href, label = 'Scrivici su WhatsApp', className = '' }: Props) {
  if (!hasWhatsApp() || !href) {
    return (
      <button type="button" disabled className={`btn-outline ${className}`} title="Numero WhatsApp non ancora configurato">
        <MessageCircle size={18} aria-hidden /> WhatsApp non ancora attivo
      </button>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn bg-emerald-700 text-white hover:bg-emerald-800 ${className}`}
    >
      <MessageCircle size={18} aria-hidden /> {label}
    </a>
  )
}
