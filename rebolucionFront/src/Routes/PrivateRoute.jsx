import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/auth";

const PrivateRoute = ({ children, requireAdmin = false, requireNonGoogle = false }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // getToken() ya valida expiración — retorna null si el token expiró
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const isAdmin = decodedToken.role && decodedToken.role.includes("ADMIN");
    const isGoogleUser = decodedToken.authProvider === "google";

    if (requireAdmin && !isAdmin) {
      return <Navigate to="/" replace />;
    }

    if (requireAdmin && isMobile) {
      return <Navigate to="/no-permitido" replace />;
    }

    if (requireNonGoogle && isGoogleUser) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
