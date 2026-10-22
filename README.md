# Negozio di elettronica – Roma (MVP)

Sito vetrina per un negozio di smartphone ed elettronica: catalogo con ricerca e filtri, prezzi, disponibilità e contatto via WhatsApp.
Stack: Vite, React, TypeScript, Tailwind CSS v4, React Router, Lucide React.

> **Dati dimostrativi.** Prodotti, prezzi, codici e quantità in `src/data/mock.ts` sono inventati e non rappresentano l'inventario reale. Nome, indirizzo, telefono e orari sono segnaposto finché non vengono configurati.

## Avvio

```bash
npm install
cp .env.example .env   # poi compila i dati reali del negozio
npm run dev            # sviluppo
npm run build          # build di produzione (controllo TypeScript incluso)
npm run preview        # anteprima della build
```

## Variabili d'ambiente

| Variabile | Descrizione |
|---|---|
| `VITE_STORE_NAME` | Nome del negozio |
| `VITE_STORE_ADDRESS` | Indirizzo a Roma |
| `VITE_STORE_PHONE` | Telefono |
| `VITE_STORE_WHATSAPP` | Numero WhatsApp in formato internazionale, senza spazi né "+" (es. `39…`). Se vuoto il pulsante è disabilitato |
| `VITE_STORE_EMAIL` | E-mail di contatto |
| `VITE_STORE_MAPS_URL` | Link Google Maps |
| `VITE_SITE_URL` | URL pubblico del sito |
| `VITE_CONTACT_FORM_ENDPOINT` | Endpoint POST JSON (es. Formspree). Senza endpoint il modulo usa `mailto:` se c'è l'e-mail, altrimenti dichiara che l'invio non è attivo |

Gli orari si impostano in `src/config/store.ts` (`hours`).

## Struttura

- `src/config/store.ts` – impostazioni del negozio (separate dalla UI)
- `src/types` – modelli dati (`Product`, ecc.)
- `src/data/mock.ts` – prodotti demo; `src/data/repository.ts` – interfaccia asincrona del livello dati: per passare a Supabase basta implementare `ProductRepository`
- `src/lib/availability.ts` – la disponibilità è **derivata** da quantità, regola d'ordine e data di verifica (oltre 30 giorni o quantità ignota → "Disponibilità da confermare")
- `src/lib/filters.ts` – ricerca, filtri, ordinamento, sincronizzazione con i parametri URL
- `src/components`, `src/pages` – UI

## Admin futuro

Non esiste alcuna area admin. Il modello (`published`, `featured`, `stockQuantity`, `images`) e il repository sono predisposti per un futuro pannello protetto da password (CRUD prodotti, prezzi, stock, immagini, pubblicazione).

## Deploy su Vercel

1. `git init`, commit e push su GitHub.
2. Importa il repository in Vercel (preset Vite, build `npm run build`, output `dist`).
3. Aggiungi le variabili d'ambiente sopra.
4. `vercel.json` gestisce il rewrite verso `index.html` per le rotte React Router.

## Prima della pubblicazione

- Sostituire dati demo e segnaposto con dati verificati; aggiungere foto reali.
- Revisione legale di privacy/cookie (`/privacy` è una bozza). Il sito non usa cookie né analytics; aggiungendoli (o mappe incorporate) serve aggiornare informativa e consenso.
- Aggiungere dati strutturati LocalBusiness e `sitemap.xml` con i dati reali e l'URL definitivo.
