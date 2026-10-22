import type { Category, Product } from '../types'

export const categories: Category[] = [
  { slug: 'smartphone', name: 'Smartphone', description: 'Smartphone nuovi, ricondizionati e usati delle migliori marche.' },
  { slug: 'sim-telefonia', name: 'SIM e telefonia', description: 'SIM, ricariche e servizi di telefonia mobile.' },
  { slug: 'accessori', name: 'Accessori', description: 'Caricabatterie, cavi, cover, pellicole, cuffie e power bank.' },
  { slug: 'componenti', name: 'Componenti elettronici', description: 'Strumenti per SIM e piccoli componenti elettronici, se disponibili.' },
]

const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString()

type Seed = Omit<Product, 'currency' | 'images' | 'published'> & { images?: string[]; published?: boolean }

/**
 * DATI DIMOSTRATIVI: nomi, prezzi, codici e quantità sono inventati a scopo illustrativo.
 * Non rappresentano l'inventario reale del negozio.
 */
const seed: Seed[] = [
  {
    id: 'p1', slug: 'apple-iphone-15-128gb-nero', name: 'Apple iPhone 15 128 GB Nero', brand: 'Apple', model: 'iPhone 15',
    category: 'smartphone', sku: 'DEMO-APL-15-128-BK', price: 729, previousPrice: 799, condition: 'Nuovo',
    stockQuantity: 4, orderable: true, featured: true, updatedAt: daysAgo(1),
    description: 'Smartphone con display Super Retina XDR da 6,1", chip A16 Bionic e fotocamera principale da 48 MP.',
    specifications: { Display: '6,1" OLED', Memoria: '128 GB', Chip: 'A16 Bionic', Connettività: '5G', Connettore: 'USB-C' },
  },
  {
    id: 'p2', slug: 'apple-iphone-13-128gb-ricondizionato', name: 'Apple iPhone 13 128 GB Ricondizionato', brand: 'Apple', model: 'iPhone 13',
    category: 'smartphone', sku: 'DEMO-APL-13-128-RF', price: 449, condition: 'Ricondizionato',
    stockQuantity: 1, orderable: false, featured: true, updatedAt: daysAgo(2),
    description: 'iPhone 13 ricondizionato, testato in ogni funzione. Condizioni estetiche: molto buone.',
    specifications: { Display: '6,1" OLED', Memoria: '128 GB', Chip: 'A15 Bionic', Connettività: '5G', Batteria: 'Da verificare in negozio' },
  },
  {
    id: 'p3', slug: 'samsung-galaxy-s24-256gb', name: 'Samsung Galaxy S24 256 GB', brand: 'Samsung', model: 'Galaxy S24',
    category: 'smartphone', sku: 'DEMO-SAM-S24-256', price: 679, previousPrice: 819, condition: 'Nuovo',
    stockQuantity: 0, orderable: true, featured: true, updatedAt: daysAgo(2),
    description: 'Smartphone Android con display Dynamic AMOLED 2X da 6,2" e funzioni Galaxy AI.',
    specifications: { Display: '6,2" AMOLED 120 Hz', Memoria: '256 GB', RAM: '8 GB', Connettività: '5G' },
  },
  {
    id: 'p4', slug: 'samsung-galaxy-a54-128gb-usato', name: 'Samsung Galaxy A54 128 GB Usato', brand: 'Samsung', model: 'Galaxy A54',
    category: 'smartphone', sku: 'DEMO-SAM-A54-128-US', price: 219, condition: 'Usato',
    stockQuantity: 2, orderable: false, featured: false, updatedAt: daysAgo(4),
    description: 'Galaxy A54 usato in buone condizioni, con piccoli segni d\'uso. Caricabatterie non incluso.',
    specifications: { Display: '6,4" Super AMOLED', Memoria: '128 GB', RAM: '6 GB', Connettività: '5G' },
  },
  {
    id: 'p5', slug: 'xiaomi-redmi-note-13-256gb', name: 'Xiaomi Redmi Note 13 256 GB', brand: 'Xiaomi', model: 'Redmi Note 13',
    category: 'smartphone', sku: 'DEMO-XIA-RN13-256', price: 229, condition: 'Nuovo',
    stockQuantity: 1, orderable: true, featured: true, updatedAt: daysAgo(3),
    description: 'Display AMOLED da 6,67", fotocamera da 108 MP e ricarica rapida da 33 W.',
    specifications: { Display: '6,67" AMOLED 120 Hz', Memoria: '256 GB', RAM: '8 GB', Ricarica: '33 W' },
  },
  {
    id: 'p6', slug: 'xiaomi-redmi-12-128gb', name: 'Xiaomi Redmi 12 128 GB', brand: 'Redmi', model: 'Redmi 12',
    category: 'smartphone', sku: 'DEMO-RED-12-128', price: 139, condition: 'Nuovo',
    stockQuantity: null, orderable: true, featured: false, updatedAt: daysAgo(60),
    description: 'Smartphone entry level con display da 6,79" a 90 Hz e batteria da 5000 mAh.',
    specifications: { Display: '6,79" LCD 90 Hz', Memoria: '128 GB', RAM: '4 GB', Batteria: '5000 mAh' },
  },
  {
    id: 'p7', slug: 'motorola-moto-g84-256gb', name: 'Motorola Moto G84 256 GB', brand: 'Motorola', model: 'Moto G84',
    category: 'smartphone', sku: 'DEMO-MOT-G84-256', price: 199, previousPrice: 249, condition: 'Nuovo',
    stockQuantity: 7, orderable: true, featured: false, updatedAt: daysAgo(1),
    description: 'Display pOLED da 6,5" a 120 Hz, Android quasi puro e batteria da 5000 mAh.',
    specifications: { Display: '6,5" pOLED 120 Hz', Memoria: '256 GB', RAM: '12 GB', Connettività: '5G' },
  },
  {
    id: 'p8', slug: 'sim-prepagata-attivazione', name: 'SIM prepagata (esempio)', brand: 'Operatore generico', model: 'SIM prepagata',
    category: 'sim-telefonia', sku: 'DEMO-SIM-001', price: 10, condition: 'Nuovo',
    stockQuantity: 25, orderable: false, featured: false, updatedAt: daysAgo(5),
    description: 'Esempio di scheda SIM prepagata. Offerte, operatori e documenti richiesti vanno confermati in negozio.',
    specifications: { Formato: 'Triplo formato', Documento: 'Richiesto per attivazione' },
  },
  {
    id: 'p9', slug: 'caricatore-usb-c-30w', name: 'Caricabatterie USB-C 30 W', brand: 'Generico', model: 'GaN 30W',
    category: 'accessori', sku: 'DEMO-ACC-CH30', price: 19.9, condition: 'Nuovo',
    stockQuantity: 12, orderable: false, featured: true, updatedAt: daysAgo(2),
    description: 'Caricabatterie compatto USB-C da 30 W per smartphone e tablet.',
    specifications: { Potenza: '30 W', Porta: 'USB-C', Tecnologia: 'GaN' },
  },
  {
    id: 'p10', slug: 'cavo-usb-c-lightning-1m', name: 'Cavo USB-C a Lightning 1 m', brand: 'Generico', model: 'USB-C/Lightning',
    category: 'accessori', sku: 'DEMO-ACC-CAV1', price: 12.5, condition: 'Nuovo',
    stockQuantity: 2, orderable: false, featured: false, updatedAt: daysAgo(1),
    description: 'Cavo di ricarica e sincronizzazione lungo 1 metro.',
    specifications: { Lunghezza: '1 m', Connettori: 'USB-C / Lightning' },
  },
  {
    id: 'p11', slug: 'power-bank-10000-mah', name: 'Power bank 10.000 mAh', brand: 'Generico', model: 'PB10K',
    category: 'accessori', sku: 'DEMO-ACC-PB10', price: 24.9, condition: 'Nuovo',
    stockQuantity: 0, orderable: false, featured: false, updatedAt: daysAgo(3),
    description: 'Batteria esterna da 10.000 mAh con uscita USB-C e USB-A.',
    specifications: { Capacità: '10.000 mAh', Porte: 'USB-C, USB-A' },
  },
  {
    id: 'p12', slug: 'pellicola-vetro-temperato-universale', name: 'Pellicola in vetro temperato', brand: 'Generico', model: 'Vetro 9H',
    category: 'accessori', sku: 'DEMO-ACC-PEL1', price: 9.9, condition: 'Nuovo',
    stockQuantity: 30, orderable: true, featured: false, updatedAt: daysAgo(6),
    description: 'Pellicola protettiva in vetro temperato. Indicare il modello di telefono al momento della richiesta.',
    specifications: { Durezza: '9H', Compatibilità: 'In base al modello' },
  },
  {
    id: 'p13', slug: 'cuffie-bluetooth-in-ear', name: 'Cuffie Bluetooth in-ear', brand: 'Generico', model: 'BT-Air',
    category: 'accessori', sku: 'DEMO-ACC-CUF1', price: 29.9, condition: 'Nuovo',
    stockQuantity: 5, orderable: true, featured: true, updatedAt: daysAgo(2),
    description: 'Cuffie wireless con custodia di ricarica.',
    specifications: { Connettività: 'Bluetooth 5.3', Custodia: 'Ricaricabile' },
  },
  {
    id: 'p14', slug: 'estrattore-carrellino-sim', name: 'Estrattore carrellino SIM', brand: 'Generico', model: 'SIM Tool',
    category: 'componenti', sku: 'DEMO-CMP-SIMT', price: 1.5, condition: 'Nuovo',
    stockQuantity: 40, orderable: false, featured: false, updatedAt: daysAgo(7),
    description: 'Strumento per aprire il carrellino SIM della maggior parte degli smartphone.',
    specifications: { Materiale: 'Metallo' },
  },
  {
    id: 'p15', slug: 'circuito-integrato-esempio', name: 'Circuito integrato (esempio)', brand: 'Generico', model: 'IC demo',
    category: 'componenti', sku: 'DEMO-CMP-IC01', price: 3.2, condition: 'Nuovo',
    stockQuantity: null, orderable: true, featured: false, updatedAt: daysAgo(90),
    description: 'Scheda di esempio per i componenti elettronici. Tipologie e disponibilità reali da confermare con il negozio.',
    specifications: { Tipo: 'Da definire' },
  },
]

export const products: Product[] = seed.map((p) => ({
  currency: 'EUR',
  images: [],
  published: true,
  ...p,
}))
