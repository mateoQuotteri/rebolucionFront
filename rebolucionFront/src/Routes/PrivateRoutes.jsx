import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivatesRoute = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem("jwt");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
