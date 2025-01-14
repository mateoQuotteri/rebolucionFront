import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  // Verificar si el user y jwt están en localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("jwt");

  // Si no está autenticado, redirige a login
  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderiza el componente hijo
  return children;
};

export default PrivateRoutes;
