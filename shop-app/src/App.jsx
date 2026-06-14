import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {Route,Routes} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import CartPage from './pages/CartPage.jsx/CartPage'
import ProtectedRoute from './components/ProtectedRotue'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ProductPage from './pages/ProductPage/ProductPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
      <Routes>  
        <Route path='/regist' element={<RegisterPage/>}/>
        <Route path='/catalog' element={<CatalogPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/product/:id' element={<ProductPage/>}/>
        <Route path='/cart' element={ <ProtectedRoute> <CartPage/> </ProtectedRoute>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;
