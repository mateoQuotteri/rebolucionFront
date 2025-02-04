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
    username: "",
  });

  const [errors, setErrors] = useState({});

  // Configuración de campos del formulario
  const fieldsConfig = [
    { name: "correo", label: "Correo", type: "email", placeholder: "Correo electrónico" },
    { name: "nombre", label: "Nombre", type: "text", placeholder: "Nombre" },
    { name: "apellido", label: "Apellido", type: "text", placeholder: "Apellido" },
    { name: "username", label: "Username", type: "text", placeholder: "Username" },
    { name: "edad", label: "Edad", type: "number", placeholder: "Edad" },
    {
      name: "genero",
      label: "Género",
      type: "select",
      options: ["", "Masculino", "Femenino"], // Opciones para género
    },
    { name: "pais", label: "País", type: "text", placeholder: "País" },
  ];

  // Fetch inicial de datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("jwt");
      try {
        const response = await fetch(`http://localhost:8080/usuario/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

  const validateField = (field, value) => {
    let error = "";
    const regex = {
      correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,}$/,
      apellido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,}$/,
      username: /^[A-Za-z-]{3,30}$/,
    };

    if (regex[field] && !regex[field].test(value)) {
      error =
        field === "correo"
          ? "Correo inválido."
          : field === "username"
          ? "El username debe tener entre 3 y 30 caracteres y solo puede contener letras y guiones."
          : "Debe contener al menos 2 letras.";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    validateField(field, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar campos obligatorios
    const requiredFields = ["nombre", "apellido", "correo", "username"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "Este campo es obligatorio.",
        }));
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, completa los campos obligatorios antes de guardar.",
        });
        return;
      }
    }

    const token = localStorage.getItem("jwt");
    const userId = JSON.parse(atob(token.split(".")[1])).id;

    try {
      const response = await fetch(`http://localhost:8080/modificar-usuario/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar los datos del usuario");
      }

      const updatedUser = await response.json();
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Perfil actualizado con éxito.",
      }).then(() => navigate("/modificar-usuario"));
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
        {fieldsConfig.map(({ name, label, type, placeholder, options }) => (
          <div className="mb-4" key={name}>
            {type === "select" ? (
              <select
                value={formData[name] || ""}
                onChange={(e) => handleChange(name, e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option || "Seleccionar"}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                value={formData[name] || ""}
                onChange={(e) => handleChange(name, e.target.value)}
              />
            )}
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
