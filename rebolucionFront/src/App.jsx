import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Routes/Home'
import Register from './Routes/Register'
import Login from './Routes/Login'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Router>
        <Routes>
         <Route path="/register" element={<Register />} />

         <Route path="/login" element={<Login />} />


          <Route path="/" element={<Home />} />


        </Routes>
      </Router>
    </>
  )
}

export default App
