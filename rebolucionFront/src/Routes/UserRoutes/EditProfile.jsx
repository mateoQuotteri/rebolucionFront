import React, { useState, useEffect } from "react";
import Input from "../../Components/UI/InputForm";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  // Simulamos los datos que podrían venir de una API o la base de datos
  const [formData, setFormData] = useState({
    correo: "",
    nombre: "",
    apellido: "",
    edad: "",
    genero: "",
    pais: "",
  });

  const [errors, setErrors] = useState({});

  // Configuración dinámica de los campos
  const fieldsConfig = [
    { name: "correo", label: "Correo", type: "email", placeholder: "Correo electrónico" },
    { name: "nombre", label: "Nombre", type: "text", placeholder: "Nombre" },
    { name: "apellido", label: "Apellido", type: "text", placeholder: "Apellido" },
    { name: "edad", label: "Edad", type: "number", placeholder: "Edad" },
    { name: "genero", label: "Género", type: "text", placeholder: "Género" },
    { name: "pais", label: "País", type: "text", placeholder: "País" },
  ];

  // Simulación de fetch de datos de la API
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData(); // Función simulada
      setFormData(userData);
    };

    fetchUserData();
  }, []);

  const getUserData = () => {
    // Ejemplo: Datos simulados de la BD
    return Promise.resolve({
      correo: "usuario@example.com",
      nombre: "Juan",
      apellido: "Pérez",
      edad: 30,
      genero: "Masculino",
      pais: "Argentina",
    });
  };

  const validateField = (field, value) => {
    let error = "";
    const regex = {
      correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,}$/,
      apellido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,}$/,
      edad: /^[1-9][0-9]*$/,
    };

    if (regex[field] && !regex[field].test(value)) {
      error =
        field === "correo"
          ? "Correo inválido."
          : field === "edad"
          ? "La edad debe ser un número válido."
          : "Debe contener al menos 2 letras.";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some((err) => err) || Object.values(formData).some((v) => !v)) {
      alert("Por favor, corrige los errores antes de guardar.");
      return;
    }
    console.log("Datos enviados:", formData);
    // Aquí enviamos la información al backend.
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta">
      <form onSubmit={handleSubmit} className="w-96 p-6 back-blanco rounded-md shadow-md">
        <h2 className="text-center violeta text-2xl font-bold mb-4">Editar Perfil</h2>
        {fieldsConfig.map(({ name, label, type, placeholder }) => (
          <div className="mb-4" key={name}>
            <Input
              type={type}
              placeholder={placeholder}
              value={formData[name] || ""}
              onChange={(e) => handleChange(name, e.target.value)}
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}
        <button
          type="submit"
          className="w-full p-2 back-naranja blanco font-bold rounded-md hover:bg-opacity-90"
        >
          Guardar cambios
        </button>
        <button
          type="button"
          onClick={() => navigate("/modificar-contraseña")}
          className="w-full p-2 mt-4 back-naranja blanco font-bold rounded-md hover:bg-opacity-90"
        >
          Editar contraseña
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
