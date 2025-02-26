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
  const login = (data) => {
    console.log("Ejecutando login con datos:", data);
    try {
      // Manejar varios formatos posibles
      let tokenString;
      if (typeof data === 'string') {
        tokenString = data;
        console.log("Token recibido como string");
      } else if (data.token) {
        tokenString = data.token;
        console.log("Token recibido como objeto con propiedad token");
      } else if (data.jwt) {
        tokenString = data.jwt;
        console.log("Token recibido como objeto con propiedad jwt");
      } else {
        console.error("Formato de token no reconocido:", data);
        throw new Error("Formato de token no válido");
      }
      
      console.log("Token a decodificar:", tokenString);
      
      // Decodificar el JWT
      const decodedUser = jwtDecode(tokenString);
      console.log("Usuario decodificado:", decodedUser);
  
      // Guardar en localStorage ANTES de actualizar estados
      console.log("Guardando token en localStorage");
      localStorage.setItem("jwt", tokenString);
      localStorage.setItem("user", JSON.stringify(decodedUser));
      
      // Actualizar estados
      setUser(decodedUser);
      setIsLoggedIn(true);
      setAuth({
        token: tokenString,
        user: decodedUser
      });
      
      console.log("Login completado con éxito");
    } catch (error) {
      console.error("Error en proceso de login:", error);
      throw error;
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
    localStorage.removeItem("token");

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