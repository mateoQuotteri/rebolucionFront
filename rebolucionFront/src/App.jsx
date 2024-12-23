import './App.css'
import Home from './Routes/Home'
import Login from './Routes/Login'
import Register from './Routes/Register'

import '../src/Utils/colores.css'
import './index.css'
import Layout  from './Layout/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modulos from './Routes/Modulos'
import EditProfile from './Routes/UserRoutes/EditProfile'
import EditPassword from './Routes/UserRoutes/EditPassword'
import PanelAdmin from './Routes/AdminRoutes/PanelAdmin'
import PanelUsers from './Routes/AdminRoutes/PanelUsers'
import PanelModulos from './Routes/AdminRoutes/PanelModulos'


function App() {

  return (
    <>

  
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/modulos" element={<Modulos/>} />
          <Route path="/modificar-usuario" element={<EditProfile/>} />
          <Route path="/modificar-contraseña" element={<EditPassword/>} />
          <Route path="/admin/panel" element={<PanelAdmin/>} />
          <Route path="/admin/usuarios" element={<PanelUsers/>} />
          <Route path="/admin/modulos" element={<PanelModulos/>} />






          <Route path="*" element={<h1>No encontramos tu ruta </h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
