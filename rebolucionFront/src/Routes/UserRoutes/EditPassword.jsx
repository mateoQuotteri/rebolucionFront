import React, { useState } from "react";
import Input from "../../Components/UI/InputForm";

const EditPassword = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Object.values(errors).some((err) => err) ||
      Object.values(passwordData).some((val) => !val)
    ) {
      alert("Por favor, corrige los errores antes de guardar.");
      return;
    }
    console.log("Contraseña actualizada:", passwordData);
    // Aquí enviarías los datos al backend.
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta">
      <form onSubmit={handleSubmit} className="w-96 p-6 back-blanco rounded-md shadow-md">
        <h2 className="text-center violeta text-2xl font-bold mb-4">Editar Contraseña</h2>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Contraseña actual"
            value={passwordData.oldPassword}
            onChange={(e) => handleChange("oldPassword", e.target.value)}
          />
          {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Nueva contraseña"
            value={passwordData.newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
          />
          {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Confirmar nueva contraseña"
            value={passwordData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
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
