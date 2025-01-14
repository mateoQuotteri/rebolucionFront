import './App.css'
import Home from './Routes/Home'
import Login from './Routes/Login'
import Register from './Routes/Register'

import '../src/Utils/colores.css'
import './index.css'
import Layout from './Layout/Layout'
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
import { AuthProvider } from './Context/AuthContext'
import PrivateRoute from './Routes/PrivateRoutes'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route 
            path="/modulos" 
            element={
              <PrivateRoute>
                <Modulos />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/modulos/:id" 
            element={
              <PrivateRoute>
                <ModuloDetail />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/modificar-usuario" 
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/modificar-contraseña" 
            element={
              <PrivateRoute>
                <EditPassword />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/panel" 
            element={
              <PrivateRoute>
                <PanelAdmin />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/usuarios" 
            element={
              <PrivateRoute>
                <PanelUsers />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/modulos" 
            element={
              <PrivateRoute>
                <PanelModulos />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/unidades" 
            element={
              <PrivateRoute>
                <PanelUnidades />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/temas" 
            element={
              <PrivateRoute>
                <PanelTemas />
              </PrivateRoute>
            } 
          />

          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<h1>No encontramos tu ruta</h1>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
