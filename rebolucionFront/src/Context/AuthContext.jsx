import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getToken, setToken, clearAuth, isTokenExpired } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const applyToken = (token) => {
    const decoded = jwtDecode(token);
    setAuth({ token, user: { email: decoded.email, name: decoded.name, role: decoded.role } });
    setUser(decoded);
    setIsLoggedIn(true);
  };

  const forceLogout = () => {
    clearAuth();
    setUser(null);
    setAuth(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Cargar sesión al iniciar — valida expiración automáticamente
  useEffect(() => {
    const token = getToken(); // getToken() ya filtra tokens expirados
    if (token) {
      try {
        applyToken(token);
      } catch {
        clearAuth();
      }
    }
  }, []);

  // Verificación periódica: cada 60 segundos comprueba si el token expiró
  useEffect(() => {
    const interval = setInterval(() => {
      const token = getToken();
      if (isLoggedIn && !token) {
        forceLogout();
      }
    }, 60_000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const login = (data) => {
    try {
      let tokenString;
      if (typeof data === "string") {
        tokenString = data;
      } else if (data.token) {
        tokenString = data.token;
      } else if (data.jwt) {
        tokenString = data.jwt;
      } else {
        throw new Error("Formato de token no válido");
      }

      if (isTokenExpired(tokenString)) {
        throw new Error("El token recibido ya está expirado");
      }

      setToken(tokenString); // Guarda en sessionStorage
      applyToken(tokenString);
    } catch (error) {
      console.error("Error en proceso de login:", error);
      throw error;
    }
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    setAuth(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, auth, setAuth, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
