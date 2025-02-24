import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Cargar el estado del usuario desde localStorage al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    
    if (token) {
      try {
        // Decodificar el token
        const decoded = jwtDecode(token);
        
        // Establecer el estado de autenticación
        setAuth({
          token,
          user: {
            email: decoded.email,
            name: decoded.name,
            role: decoded.role
          }
        });

        // Establecer el usuario y estado de login
        setUser(decoded);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        // Limpiar localStorage si hay error
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
      }
    }
  }, []);

  // Función de login mejorada
  const login = (jwt) => {
    try {
      // Decodificar el JWT
      const decodedUser = jwtDecode(jwt.token);

      // Actualizar estados
      setUser(decodedUser);
      setIsLoggedIn(true);
      setAuth({
        token: jwt.token,
        user: {
          email: decodedUser.email,
          name: decodedUser.name,
          role: decodedUser.role
        }
      });

      // Guardar en localStorage
      localStorage.setItem("jwt", jwt.token);
      localStorage.setItem("user", JSON.stringify(decodedUser));
    } catch (error) {
      console.error("Error al decodificar el JWT:", error);
      throw error; // Propagar el error para manejarlo en el componente
    }
  };

  // Función de logout mejorada
  const logout = () => {
    // Limpiar estados
    setUser(null);
    setAuth(null);
    setIsLoggedIn(false);
    
    // Limpiar localStorage
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    
    // Redirigir al inicio
    navigate('/');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user,
        auth,
        setAuth,
        isLoggedIn,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;