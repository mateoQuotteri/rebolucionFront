import React, { useState } from "react";
import Input from "../Components/UI/InputForm";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [contra, setContra] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contra: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Nombre:", nombre, "Apellido:", apellido, "Email:", email, "Contraseña:", contra);
  };

  const validateField = (field, value) => {
    let error = "";
    const regex = {
      nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,}$/,
      apellido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,}$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      contra: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]|;:'",.<>?/]).{8,35}$/,
    };

    if (!regex[field].test(value)) {
      if (field === "nombre" || field === "apellido") {
        error = "Debe contener al menos 2 letras y solo caracteres válidos.";
      } else if (field === "email") {
        error = "El correo electrónico no es válido.";
      } else if (field === "contra") {
        error = "La contraseña debe tener mas de 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleChange = (field, value) => {
    if (field === "nombre") setNombre(value);
    if (field === "apellido") setApellido(value);
    if (field === "email") setEmail(value);
    if (field === "contra") setContra(value);
    validateField(field, value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta">
      <img 
        src="../../public/images/rebolucionLogoWebHeader-removebg-preview.png" 
        alt="Logo" 
        className="w-48 h-auto mb-8"
      />      
      <form onSubmit={handleRegister} className="w-96 p-6 back-blanco rounded-md shadow-md">
        <h2 className="text-center violeta text-2xl font-bold mb-4">Regístrate</h2>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />
          {errors.nombre && <p className="naranja text-sm mt-1">{errors.nombre}</p>}
        </div>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => handleChange("apellido", e.target.value)}
          />
          {errors.apellido && <p className="naranja text-sm mt-1">{errors.apellido}</p>}
        </div>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && <p className="naranja text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={contra}
            onChange={(e) => handleChange("contra", e.target.value)}
            toggleVisibility={() => setShowPassword(!showPassword)}
          />
          {errors.contra && <p className="naranja text-sm mt-1">{errors.contra}</p>}
        </div>
        <button
          type="submit"
          className="w-full p-2 back-naranja blanco font-bold rounded-md hover:bg-opacity-90"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
