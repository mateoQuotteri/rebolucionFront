import React, { useState } from "react";
import Input from "../../Components/UI/InputForm";
import { Eye, EyeOff } from "lucide-react";

const EditPassword = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateField = (field, value) => {
    let error = "";

    if (field === "newPassword") {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,25}$/;
      if (!passwordRegex.test(value)) {
        error =
          "La contraseña debe tener entre 8 y 25 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.";
      }
    }

    if (field === "confirmPassword") {
      if (value !== passwordData.newPassword) {
        error = "Las contraseñas no coinciden.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  const handleChange = (field, value) => {
    setPasswordData((prevData) => ({ ...prevData, [field]: value }));
    validateField(field, value);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (
      Object.values(errors).some((err) => err) ||
      Object.values(passwordData).some((val) => !val)
    ) {
      alert("Por favor, corrige los errores antes de guardar.");
      return;
    }

    try {
      // Obtener datos del usuario y token
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("jwt");

      if (!user || !token) {
        alert("Sesión no válida. Por favor, inicia sesión nuevamente.");
        return;
      }

      // Preparar datos para el backend
      const updateData = {
        contra: passwordData.oldPassword,    // contraseña actual
        nuevaContra: passwordData.newPassword  // nueva contraseña
      };

      // Realizar la petición al backend
      const response = await fetch(`http://localhost:8080/modificar-contraseña/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar la contraseña');
      }

      // Si todo sale bien, mostrar mensaje de éxito
      alert("Contraseña actualizada exitosamente");
      
      // Limpiar el formulario
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta">
      <form onSubmit={handleSubmit} className="w-96 p-6 back-blanco rounded-md shadow-md">
        <h2 className="text-center violeta text-2xl font-bold mb-4">Editar Contraseña</h2>
        <div className="mb-4">
          <div className="relative">
            <Input
              type={showPasswords.oldPassword ? "text" : "password"}
              placeholder="Contraseña actual"
              value={passwordData.oldPassword}
              onChange={(e) => handleChange("oldPassword", e.target.value)}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("oldPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPasswords.oldPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type={showPasswords.newPassword ? "text" : "password"}
              placeholder="Nueva contraseña"
              value={passwordData.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPasswords.newPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type={showPasswords.confirmPassword ? "text" : "password"}
              placeholder="Confirmar nueva contraseña"
              value={passwordData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPasswords.confirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-2 back-naranja blanco font-bold rounded-md hover:bg-opacity-90"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditPassword;