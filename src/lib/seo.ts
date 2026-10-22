import { useEffect } from 'react'
import { store } from '../config/store'

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export function useSeo(title: string, description: string, noindex = false) {
  useEffect(() => {
    const full = `${title} | ${store.name}`
    document.title = full
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', full)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex' : 'index,follow')
  }, [title, description, noindex])
}
