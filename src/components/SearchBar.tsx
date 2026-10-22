import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  initial?: string
  large?: boolean
  /** Se presente, la ricerca è gestita dal chiamante invece di navigare al catalogo. */
  onSearch?: (q: string) => void
  id?: string
}

export default function SearchBar({ initial = '', large = false, onSearch, id = 'search' }: Props) {
  const [value, setValue] = useState(initial)
  const navigate = useNavigate()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = value.trim()
    if (onSearch) onSearch(q)
    else navigate(q ? `/prodotti?q=${encodeURIComponent(q)}` : '/prodotti')
  }

  return (
    <form onSubmit={submit} role="search" className="flex w-full gap-2">
      <label htmlFor={id} className="sr-only">Cerca per nome, marca, modello o codice</label>
      <div className="relative flex-1">
        <Search aria-hidden size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Cerca: iPhone 15, Samsung Galaxy, Redmi, codice SKU…"
          className={`input pl-10 ${large ? 'py-3.5 text-base' : ''}`}
        />
      </div>
      <button type="submit" className={`btn-primary ${large ? 'px-6' : ''}`}>Cerca</button>
    </form>
  )
}
