import React, { useState } from "react";
import Input from "../Components/UI/InputForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 
  const [loading, setLoading] = useState(false); // Declarar y manejar el estado de carga

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar estado de carga

    const usuarioEntradaDto = {
      correo: email,
      contra: password,
    };

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioEntradaDto),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("Usuario logueado:", userData);
        login(userData)
        navigate("/"); // Redirige al home
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setErrorMessage("Error de conexión con el servidor");
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setEmailError("El correo electrónico no es válido");
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta">
     <a href="/">
      <img
        src="../../public/images/LOGO - REBOLUCION - ORIGINAL-1 BANNER WEB 2500X750.png"
        alt="Logo"
        className="w-40 sm:w-44 md:w-48 lg:w-56 h-auto mb-8"
      />
      </a>

      <form
        onSubmit={handleLogin}
        className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-[468px] p-4 sm:p-6 back-blanco rounded-md shadow-md"
      >
        <h2 className="text-center violeta text-xl sm:text-2xl font-bold mb-4">
          Inicia sesión
        </h2>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="naranja text-sm mt-1">{emailError}</p>}
        </div>
        <div className="mb-4">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleVisibility={() => setShowPassword(!showPassword)}
          />
        </div>
        {errorMessage && (
          <p className="naranja text-sm mb-4 text-center">{errorMessage}</p>
        )}
        <button
          type="submit"
          disabled={loading} // Desactiva el botón si está cargando
          className={`w-full p-2 sm:p-3 rounded-md font-bold ${
            loading
              ? "back-naranja cursor-not-allowed opacity-70"
              : "back-naranja hover:bg-opacity-90"
          }`}
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
        <div className="mt-4 text-center">
          <button className="font-bold naranja hover:underline">
            Sign in with Google
          </button>
        </div>
        <p className="mt-4 text-center violeta">
          Si aún no tienes cuenta,{" "}
          <a href="/register" className="violeta font-bold hover:underline">
            crea una
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
