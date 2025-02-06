import { useState } from "react";

const FormularioModulo = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    dificultad: "",
    profesor: "",
    descripcion: "",
    imagen: "",
    temaId: "", // tema_id en la entidad backend
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      alert("No estás autenticado.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/admin/agregar-modulo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al crear el módulo");

      alert("Módulo creado con éxito");
      setFormData({ nombre: "", dificultad: "", profesor: "", descripcion: "", imagen: "", temaId: "" });

      if (onClose) onClose(); // Cierra el formulario si está embebido en un modal
    } catch (error) {
      console.error(error);
      alert("Hubo un error al crear el módulo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Agregar Nuevo Módulo</h2>

      <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />

      <input type="number" name="dificultad" placeholder="Dificultad (1-10)" value={formData.dificultad} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />

      <input type="text" name="profesor" placeholder="Profesor" value={formData.profesor} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />

      <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />

      <input type="text" name="imagen" placeholder="URL de la Imagen" value={formData.imagen} onChange={handleChange} className="w-full p-2 border rounded mb-2" />

      <input type="number" name="temaId" placeholder="ID del Tema" value={formData.temaId} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Guardar Módulo</button>
    </form>
  );
};

export default FormularioModulo;
