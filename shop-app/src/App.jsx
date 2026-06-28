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
import FooterPage from './pages/FooterPage/FooterPage'
import HeaderPage from './pages/Header/HeaderPage'
import ProductPage from './pages/ProductPage/ProductPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <HeaderPage/>
      <Routes>  
        <Route path='/product/:id'element={<ProductPage />} />
        <Route path='/footer' element={<FooterPage/>}/>
        <Route path='/regist' element={<RegisterPage/>}/>
        <Route path='/catalog' element={<ProtectedRoute><div><CatalogPage/><FooterPage /></div></ProtectedRoute>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/cart' element={<ProtectedRoute><div><CartPage /><FooterPage /></div></ProtectedRoute>}/>
        <Route path='/product/:id' element={<ProtectedRoute><div><ProductPage /><FooterPage /></div></ProtectedRoute>}/>
        <Route path='/cart' element={ <ProtectedRoute> <CartPage/> </ProtectedRoute>}/>
      </Routes>
    </div>
  )
}

export default App;
