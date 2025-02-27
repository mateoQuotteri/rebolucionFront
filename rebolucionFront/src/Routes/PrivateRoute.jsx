import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, requireAdmin = false, requireNonGoogle = false }) => {
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
    console.log("🔴 No hay token en localStorage. Redirigiendo a login...");
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    console.log("🔍 Token decodificado:", decodedToken);

    const isAdmin = decodedToken.role && decodedToken.role.includes("ADMIN");
    const isGoogleUser = decodedToken.authProvider === "google";
    
    console.log("✅ Usuario admin:", isAdmin);
    console.log("✅ Usuario de Google:", isGoogleUser);
    console.log("🌎 Ruta actual:", location.pathname);

    if (requireAdmin && !isAdmin) {
      console.log("🚫 Bloqueo: Usuario sin permisos de admin intentó entrar.");
      return <Navigate to="/" />;
    }

    if (requireAdmin && isMobile) {
      console.log("🚫 Bloqueo: Usuario admin en versión mobile intentó acceder.");
      return <Navigate to="/no-permitido" />;
    }

    if (requireNonGoogle && isGoogleUser) {
      console.log("🚫 Bloqueo: Usuario de Google intentando modificar la contraseña.");
      return <Navigate to="/" />;
    }

    return children;
  } catch (error) {
    console.error("⚠️ Error al decodificar el token:", error);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
