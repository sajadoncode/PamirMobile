import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CategoryPage from './pages/CategoryPage'
import ProductDetail from './pages/ProductDetail'
import StoreInfo from './pages/StoreInfo'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="prodotti" element={<Catalog />} />
        <Route path="prodotti/:slug" element={<ProductDetail />} />
        <Route path="categoria/:slug" element={<CategoryPage />} />
        <Route path="negozio" element={<StoreInfo />} />
        <Route path="contatti" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
