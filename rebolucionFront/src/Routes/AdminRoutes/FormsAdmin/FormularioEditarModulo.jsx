import React, { useState } from "react";

const FormularioEditarModulo = ({ modulo, cerrarFormulario, fetchModulos }) => {
  const [formData, setFormData] = useState({ ...modulo });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <div className="bg-white rounded-lg shadow-md w-full max-w-lg mx-4">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-bold">Editar Módulo</h2>
        <button 
          onClick={cerrarFormulario}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <input
              type="number"
              name="dificultad"
              placeholder="Dificultad (1-10)"
              value={formData.dificultad}
              onChange={handleChange}
              min="1"
              max="10"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="profesor"
              placeholder="Profesor"
              value={formData.profesor}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <input
              type="number"
              name="temaId"
              placeholder="ID del Tema"
              value={formData.temaSalidaDto.id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="mt-3">
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded h-20"
            required
          />
        </div>

        <div className="mt-3">
          <input
            type="text"
            name="imagen"
            placeholder="URL de la Imagen"
            value={formData.imagen}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Actualizar
          </button>
          <button
            type="button"
            onClick={cerrarFormulario}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioEditarModulo;