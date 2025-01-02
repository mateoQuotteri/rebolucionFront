import './App.css'
import Home from './Routes/Home'
import Login from './Routes/Login'
import Register from './Routes/Register'

import '../src/Utils/colores.css'
import './index.css'
import Layout  from './Layout/Layout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modulos from './Routes/ModulosRoutes/Modulos'
import EditProfile from './Routes/UserRoutes/EditProfile'
import EditPassword from './Routes/UserRoutes/EditPassword'
import PanelAdmin from './Routes/AdminRoutes/PanelAdmin'
import PanelUsers from './Routes/AdminRoutes/PanelUsers'
import PanelModulos from './Routes/AdminRoutes/PanelModulos'
import PanelUnidades from './Routes/AdminRoutes/PanelUnidades'
import PanelTemas from './Routes/AdminRoutes/PanelTemas'
import ModuloDetail from './Routes/ModulosRoutes/ModuloDetail'


function App() {

  return (
    <>

  
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/modulos" element={<Modulos/>} />
          <Route path="/modulos/:id" element={<ModuloDetail/>} />

          <Route path="/modificar-usuario" element={<EditProfile/>} />
          <Route path="/modificar-contraseña" element={<EditPassword/>} />
          <Route path="/admin/panel" element={<PanelAdmin/>} />
          <Route path="/admin/usuarios" element={<PanelUsers/>} />
          <Route path="/admin/modulos" element={<PanelModulos/>} />
          <Route path="/admin/unidades" element={<PanelUnidades/>} />
          <Route path="/admin/temas" element={<PanelTemas/>} />






          <Route path="*" element={<h1>No encontramos tu ruta </h1>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
