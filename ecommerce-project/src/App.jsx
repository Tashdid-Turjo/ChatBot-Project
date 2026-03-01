import { Routes, Route } from 'react-router'
import './App.css'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/CheckOutPage'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
    </Routes>
  )
}

export default App
