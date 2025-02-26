import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivatesRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem("jwt");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Comprobación específica para la ruta modificar-contraseña
    if (location.pathname === "/modificar-contraseña") {
      // Decodificar manualmente el JWT para obtener el valor real
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        console.log("JWT Payload for Google check:", payload);
        
        if (payload && payload.authProvider === "google") {
          console.log("Bloqueando acceso: Usuario de Google en ruta modificar-contraseña");
          return <Navigate to="/" />;
        }
      }
    }

    const decodedToken = jwtDecode(token);
    const isAdmin = decodedToken.role && decodedToken.role.includes("ADMIN");

    if (requireAdmin && !isAdmin) {
      return <Navigate to="/" />;
    }

    if (requireAdmin && isMobile) {
      return <Navigate to="/no-permitido" />;
    }

    return children;
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" />;
  }
};

export default PrivatesRoute;