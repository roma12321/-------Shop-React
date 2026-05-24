import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {Route,Routes} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import CatalogPage from './pages/CatalogPage/CatalogPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>  
        <Route path='/regist' element={<RegisterPage/>}/>
        <Route path='/catalog' element={<CatalogPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default App;
