import './App.css'
import './Utils/colores.css'
import './index.css'

// Component imports
import Home from './Routes/Home'
import Login from './Routes/Login'
import Register from './Routes/Register'
import Layout from './Layout/Layout'
import Modulos from './Routes/ModulosRoutes/Modulos'
import EditProfile from './Routes/UserRoutes/EditProfile'
import EditPassword from './Routes/UserRoutes/EditPassword'
import PanelAdmin from './Routes/AdminRoutes/PanelAdmin'
import PanelUsers from './Routes/AdminRoutes/PanelUsers'
import PanelModulos from './Routes/AdminRoutes/PanelModulos'
import PanelUnidades from './Routes/AdminRoutes/PanelUnidades'
import PanelTemas from './Routes/AdminRoutes/PanelTemas'
import ModuloDetail from './Routes/ModulosRoutes/ModuloDetail'
import NoPermitido from './Routes/NoPermitido'
import NotFound from './Routes/NotFound'
import OAuth2RedirectHandler from './Components/LoginAndRegisterComponents/OAuth2RedirectHandler'
// Context and route utilities
import { AuthProvider } from './Context/AuthContext'
import PrivateRoute from './Routes/PrivateRoute'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'



function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Ruta OAuth2 */}
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

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
    <PrivateRoute requireNonGoogle={true}>
      <EditPassword />
    </PrivateRoute>
  }
/>


          {/* Rutas de administrador */}
          <Route
            path="/admin/panel"
            element={
              <PrivateRoute requireAdmin={true}>
                <PanelAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <PrivateRoute requireAdmin={true}>
                <PanelUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/modulos"
            element={
              <PrivateRoute requireAdmin={true}>
                <PanelModulos />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/unidades"
            element={
              <PrivateRoute requireAdmin={true}>
                <PanelUnidades />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/temas"
            element={
              <PrivateRoute requireAdmin={true}>
                <PanelTemas />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Rutas de error */}
        <Route path="/no-permitido" element={<NoPermitido />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;