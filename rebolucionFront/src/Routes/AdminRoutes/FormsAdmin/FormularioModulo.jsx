import React, { useState } from "react";

const FormularioModulo = ({ cerrarFormulario, fetchModulos }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    dificultad: "",
    profesor: "",
    descripcion: "",
    temaId: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.nombre || formData.nombre.length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
    }
    if (!formData.dificultad || isNaN(formData.dificultad) || formData.dificultad < 1 || formData.dificultad > 10) {
      newErrors.dificultad = "La dificultad debe ser un número entre 1 y 10.";
    }
    if (!formData.profesor || !/^[a-zA-Z ]+$/.test(formData.profesor)) {
      newErrors.profesor = "El profesor solo puede contener letras y espacios.";
    }
    if (!formData.descripcion || formData.descripcion.length < 10) {
      newErrors.descripcion = "La descripción debe tener al menos 10 caracteres.";
    }
    if (!formData.temaId || isNaN(formData.temaId) || formData.temaId <= 0) {
      newErrors.temaId = "El tema ID debe ser un número positivo.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("No se encontró el token de autenticación.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/admin/agregar-modulo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el módulo");
      }

      alert("Módulo agregado exitosamente!");
      fetchModulos(); // Recargar la lista de módulos
      cerrarFormulario(); // Cerrar el formulario
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Agregar Nuevo Módulo</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="nombre" 
            placeholder="Nombre"
            className="w-full p-2 mb-2 border rounded-md"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}

          <input 
            type="number" 
            name="dificultad" 
            placeholder="Dificultad"
            className="w-full p-2 mb-2 border rounded-md"
            value={formData.dificultad}
            onChange={handleChange}
            required
          />
          {errors.dificultad && <p className="text-red-500 text-sm">{errors.dificultad}</p>}

          <input 
            type="text" 
            name="profesor" 
            placeholder="Profesor"
            className="w-full p-2 mb-2 border rounded-md"
            value={formData.profesor}
            onChange={handleChange}
            required
          />
          {errors.profesor && <p className="text-red-500 text-sm">{errors.profesor}</p>}

          <textarea 
            name="descripcion" 
            placeholder="Descripción"
            className="w-full p-2 mb-2 border rounded-md"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
          {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion}</p>}

          <input 
            type="number" 
            name="temaId" 
            placeholder="Tema ID"
            className="w-full p-2 mb-2 border rounded-md"
            value={formData.temaId}
            onChange={handleChange}
            required
          />
          {errors.temaId && <p className="text-red-500 text-sm">{errors.temaId}</p>}

          <div className="flex justify-between mt-4">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Guardar</button>
            <button type="button" onClick={cerrarFormulario} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioModulo;
