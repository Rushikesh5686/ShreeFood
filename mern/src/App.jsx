import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './screens/Home'
import {BrowserRouter} from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Login from './screens/Login.jsx'
import './../node_modules/bootstrap/dist/js/bootstrap.bundle'
import './../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import './screens/Signup.jsx'
import Signup from './screens/Signup.jsx'
import { Cardprovider } from './components/contextreducer.jsx'
import Cart from './screens/Cart.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Cardprovider>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home></Home>} /> 
      <Route path='/login' element={<Login></Login>} />
      <Route path='/createuser' element={<Signup></Signup>} />
      <Route path='/cart' element={<Cart></Cart>} />
       
     </Routes>
    </BrowserRouter>
    </Cardprovider> 
     
    
    </>
  )
}

export default App
