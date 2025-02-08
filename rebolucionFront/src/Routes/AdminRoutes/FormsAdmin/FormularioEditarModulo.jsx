import React, { useState } from "react";

const FormularioEditarModulo = ({ modulo, cerrarFormulario, fetchModulos }) => {

  
  const [formData, setFormData] = useState({ ...modulo });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("No estás autenticado.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/admin/modificar-modulo/${modulo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al actualizar el módulo");

      alert("Módulo actualizado con éxito");
      fetchModulos();
      cerrarFormulario();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al actualizar el módulo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Editar Módulo</h2>

      <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
      
      <input type="number" name="dificultad" placeholder="Dificultad (1-10)" value={formData.dificultad} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
      
      <input type="text" name="profesor" placeholder="Profesor" value={formData.profesor} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
      
      <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
      
      <input type="text" name="imagen" placeholder="URL de la Imagen" value={formData.imagen} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
      
      <input type="number" name="temaId" placeholder="ID del Tema" value={formData.temaSalidaDto.id} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
      
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Actualizar Módulo</button>
    </form>
  );
};

export default FormularioEditarModulo;
