import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>¡Oops! La página que buscás no existe.</p>
      <Link to="/" style={styles.link}>
        Volver al inicio
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    color: "#333",
  },
  title: {
    fontSize: "8rem",
    margin: 0,
  },
  message: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  link: {
    fontSize: "1.2rem",
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default NotFound;
