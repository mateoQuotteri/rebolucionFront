import React, { useState, useEffect } from "react";
import Input from "../../Components/UI/InputForm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
      const token = localStorage.getItem("jwt"); // Obtén el JWT del localStorage
      try {
        const response = await fetch(`http://localhost:8080/usuario/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Incluye el token en los headers
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const userData = await response.json();
        setFormData(userData || {});
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al obtener los datos del usuario.",
        });
      }
    };

    fetchUserData();
  }, [user.id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos antes de enviar
    if (Object.values(errors).some((err) => err) || Object.values(formData).some((v) => !v)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, corrige los errores antes de guardar.",
      });
      return;
    }

    const token = localStorage.getItem("jwt");
    const userId = JSON.parse(atob(token.split(".")[1])).id; // Decodifica el JWT para obtener el ID

    try {
      const response = await fetch(`http://localhost:8080/modificar-usuario/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluye el JWT como header
        },
        body: JSON.stringify(formData), // Datos del formulario
      });

      if (!response.ok) {
        throw new Error("Error al actualizar los datos del usuario");
      }

      const updatedUser = await response.json();
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Perfil actualizado con éxito.",
      }).then(() => navigate("/modificar-usuario")); // Redirige después de aceptar
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar los datos.",
      });
    }
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
