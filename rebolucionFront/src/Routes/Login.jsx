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
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("El correo electrónico es obligatorio");
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError("El formato del correo electrónico no es válido");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("La contraseña es obligatoria");
      return false;
    }
    if (value.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setEmailError("");
    setPasswordError("");
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);

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
        login(userData);
        navigate("/");
      } else {
        try {
          const errorData = await response.text();
          
          if (errorData.includes("Bad credentials")) {
            setPasswordError("La contraseña es incorrecta");
          } 
          else if (errorData.includes("User not found")) {
            setEmailError("No existe una cuenta con este correo electrónico");
          }
          else if (errorData.includes("disabled")) {
            setEmailError("Tu cuenta está desactivada. Por favor, contacta con soporte");
          }
          else if (errorData.includes("locked")) {
            setEmailError("Tu cuenta ha sido bloqueada temporalmente por múltiples intentos fallidos");
          }
          else {
            setEmailError("Error al intentar iniciar sesión. Por favor, verifica tus credenciales");
          }
        } catch (parseError) {
          setEmailError("Error al procesar la respuesta del servidor");
        }
      }
    } catch (error) {
      setEmailError("Error de conexión. Por favor, verifica tu conexión a internet");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) validatePassword(value);
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
            error={emailError}
          />
          {emailError && <p className="naranja text-sm mt-1">{emailError}</p>}
        </div>
        <div className="mb-4">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            toggleVisibility={() => setShowPassword(!showPassword)}
            error={passwordError}
          />
          {passwordError && <p className="naranja text-sm mt-1">{passwordError}</p>}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 sm:p-3 rounded-md font-bold ${
            loading
            ? "back-naranja cursor-not-allowed opacity-70"
            : "back-naranja hover:bg-opacity-90"
        }`}
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>

      <div className="mt-4">
        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="bg-white px-2 text-sm text-gray-500">O</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 p-2 sm:p-3 border border-gray-300 rounded-md font-bold hover:bg-gray-50 transition-colors"
        >
          <img
            src="/images/google-icon.svg"
            alt="Google icon"
            className="w-5 h-5"
          />
          Continuar con Google
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