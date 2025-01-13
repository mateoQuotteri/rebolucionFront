import React, { useState, useEffect } from "react";
import Input from "../../Components/UI/InputForm";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Estado del formulario
  const [formData, setFormData] = useState({
    correo: "",
    nombre: "",
    apellido: "",
    edad: "",
    genero: "",
    pais: "",
  });

  const [errors, setErrors] = useState({});

  // Configuración de campos del formulario
  const fieldsConfig = [
    { name: "correo", label: "Correo", type: "email", placeholder: "Correo electrónico" },
    { name: "nombre", label: "Nombre", type: "text", placeholder: "Nombre" },
    { name: "apellido", label: "Apellido", type: "text", placeholder: "Apellido" },
    { name: "edad", label: "Edad", type: "number", placeholder: "Edad" },
    { name: "genero", label: "Género", type: "text", placeholder: "Género" },
    { name: "pais", label: "País", type: "text", placeholder: "País" },
  ];

  // Fetch inicial de datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      console.log(user);
      
      const userData = await getUserData(user.id);
      setFormData(userData || {});
    };

    fetchUserData();
  }, [user.id]);

  // Función para obtener datos del usuario con JWT
  const getUserData = (id) => {
    const token = localStorage.getItem("jwt"); // Obtén el JWT del localStorage

    console.log(token);
    console.log(id);
    
    

    return fetch(`http://localhost:8080/usuario/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Incluye el token en los headers
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  };

  // Validación de campos individuales
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

  // Manejo de cambios en el formulario
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some((err) => err) || Object.values(formData).some((v) => !v)) {
      alert("Por favor, corrige los errores antes de guardar.");
      return;
    }

    console.log("Datos enviados:", formData);
    // Aquí enviarías los datos al backend
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
