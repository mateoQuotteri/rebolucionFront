import './App.css'
import Home from './Routes/Home'
import '../src/Utils/colores.css'
import './index.css'
import Layout  from './Layout/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>

  
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>No encontramos tu ruta </h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
