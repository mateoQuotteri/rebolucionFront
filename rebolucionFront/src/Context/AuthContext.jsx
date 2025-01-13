import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cargar el estado del usuario desde localStorage al iniciar la app
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  // Guardar el estado del usuario en localStorage al iniciar sesión
  const login = (jwt) => {
    try {
      // Decodificar el JWT
      const decodedUser = jwtDecode(jwt.token);

      // Guardar los datos decodificados en el estado y en localStorage
      setUser(decodedUser);
      setIsLoggedIn(true);

      localStorage.setItem("jwt", jwt.token); // Guardar el JWT original
      localStorage.setItem("user", JSON.stringify(decodedUser)); // Guardar datos del usuario
    } catch (error) {
      console.error("Error al decodificar el JWT:", error);
    }
  };

  // Eliminar el estado del usuario de localStorage al cerrar sesión
  const logout = () => {
    console.log("deslogueo");
    
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
