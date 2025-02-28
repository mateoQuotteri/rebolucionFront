import React, { useState } from "react";
import Input from "../Components/UI/InputForm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contra, setContra] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    contra: "",
  });

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      Swal.fire({
        icon: "error",
        title: "Errores en el formulario",
        text: "Corregí los errores antes de continuar.",
      });
      return;
    }

    const usuario = {
      nombre,
      apellido,
      correo: email,
      username,
      contra,
      rol: "USUARIO",
      pais: null,
      edad: null,
      genero: null,
    };

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error al registrar",
          text: data.message || "Ocurrió un error al intentar registrar el usuario.",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "El usuario fue registrado correctamente.",
        showConfirmButton: true,
        confirmButtonText: "Iniciar sesión",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en la conexión",
        text: "Ocurrió un error en la conexión al servidor.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateField = (field, value) => {
    let error = "";
    const regex = {
      nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,}$/,
      apellido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,}$/,
      username: /^[a-zA-Z-]{3,}$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      contra:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]|;:'",.<>?/]).{8,35}$/,
    };

    if (!regex[field].test(value)) {
      if (field === "nombre" || field === "apellido") {
        error = "Debe contener al menos 2 letras y solo caracteres válidos.";
      } else if (field === "username") {
        error =
          "Debe tener al menos 3 caracteres y solo puede tener letras o guiones.";
      } else if (field === "email") {
        error = "El correo electrónico no es válido.";
      } else if (field === "contra") {
        error =
          "La contraseña debe tener entre 8 y 35 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleChange = (field, value) => {
    if (field === "nombre") setNombre(value);
    if (field === "apellido") setApellido(value);
    if (field === "username") setUsername(value);
    if (field === "email") setEmail(value);
    if (field === "contra") setContra(value);
    validateField(field, value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta pt-14 pb-20">
      <a href="/">
        <img
          src="../../public/images/LOGO - REBOLUCION - ORIGINAL-1 BANNER WEB 2500X750.png"
          alt="Logo"
          className="w-40 sm:w-44 md:w-48 lg:w-56 h-auto mb-8"
        />
      </a>

      <form
        onSubmit={handleRegister}
        className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-[468px] p-4 sm:p-6 back-blanco rounded-md shadow-md"
      >
        <h2 className="text-center violeta text-xl sm:text-2xl font-bold mb-4">
          Regístrate
        </h2>

        {isLoading && (
          <div className="text-center text-blue-500 font-bold mb-4">
            Cargando...
          </div>
        )}

        <div className="mb-4">
          <Input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />
          {errors.nombre && (
            <p className="naranja text-sm mt-1">{errors.nombre}</p>
          )}
        </div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => handleChange("apellido", e.target.value)}
          />
          {errors.apellido && (
            <p className="naranja text-sm mt-1">{errors.apellido}</p>
          )}
        </div>

        <div className="mb-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
          {errors.username && (
            <p className="naranja text-sm mt-1">{errors.username}</p>
          )}
        </div>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && (
            <p className="naranja text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={contra}
            onChange={(e) => handleChange("contra", e.target.value)}
            toggleVisibility={() => setShowPassword(!showPassword)}
          />
          {errors.contra && (
            <p className="naranja text-sm mt-1">{errors.contra}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-2 sm:p-3 back-naranja blanco font-bold rounded-md hover:bg-opacity-90"
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Registrarse"}
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
              src="../../public/images/IMG_0341-removebg-preview.png"
              alt="Google icon"
              className="w-5 h-5"
            />
            Continuar con Google
          </button>
        </div>

        <p className="mt-4 text-center violeta">
          Si ya tenes cuenta,{" "}
          <a href="/login" className="violeta font-bold hover:underline">
            inicia sesion
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;