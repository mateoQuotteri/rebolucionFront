import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const PrivatesRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const isAdmin = decodedToken.role && decodedToken.role.includes("ADMIN");

    if (requireAdmin && !isAdmin) {
      return <Navigate to="/" />;
    }

    return children;
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" />;
  }
};

export default PrivatesRoute;
