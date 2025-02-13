import React, { useState, useEffect } from "react";
import Input from "../../Components/UI/InputForm";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);

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

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/region/South America,North America,Europe');
        if (!response.ok) {
          throw new Error('Error al obtener la lista de países');
        }
        const data = await response.json();
        // Filter for Latin American countries and Spain
        const filteredCountries = data
          .filter(country => 
            country.region === "Americas" || 
            (country.region === "Europe" && country.name.common === "Spain"))
          .map(country => country.name.common)
          .sort();
        setCountries(filteredCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
        // Fallback countries list in case API fails
        setCountries([
         "Argentina",
          "Brasil",
          "Estados Unidos",
          "Chile",
          "Colombia",
          "Ecuador",
          "España",
          "Italia",

          "Mexico",
          "Paraguay",
          "Peru",
          "Uruguay",
          "Venezuela"
        ]);
      }
    };

    fetchCountries();
  }, []);

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
      placeholder: "Género",
      options: ["Masculino", "Femenino"],
    },
    {
      name: "pais",
      label: "País",
      type: "select",
      placeholder: "País",
      options: countries,
    },
  ];

  // Fetch user data
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

    if (field === 'edad') {
      const edadNum = parseInt(value);
      if (isNaN(edadNum) || edadNum < 1 || edadNum > 100) {
        error = "La edad debe estar entre 1 y 100 años";
      }
    } else if (field === 'pais' && value && value !== "") {
      if (!countries.includes(value)) {
        error = "País no válido. Seleccione un país de la lista.";
      }
    } else if (regex[field] && !regex[field].test(value)) {
      error =
        field === "correo"
          ? "Correo inválido."
          : field === "username"
          ? "El username debe tener entre 3 y 30 caracteres y solo puede contener letras y guiones."
          : "Debe contener al menos 2 letras.";
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === "";
  };

  const handleChange = (field, value) => {
    if (field === 'edad') {
      if (value === '' || (/^\d+$/.test(value) && parseInt(value) <= 100)) {
        setFormData({ ...formData, [field]: value });
        validateField(field, value);
      }
    } else {
      setFormData({ ...formData, [field]: value });
      validateField(field, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["nombre", "apellido", "correo", "username"];
    let hasErrors = false;

    for (const field of requiredFields) {
      if (!formData[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "Este campo es obligatorio.",
        }));
        hasErrors = true;
      }
    }

    if (formData.edad) {
      const edadError = !validateField('edad', formData.edad);
      if (edadError) hasErrors = true;
    }

    if (formData.pais) {
      const paisError = !validateField('pais', formData.pais);
      if (paisError) hasErrors = true;
    }

    if (hasErrors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, revisa los campos con errores antes de guardar.",
      });
      return;
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
                <option value="">{placeholder}</option>
                {options && options.map((option) => (
                  option && (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  )
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