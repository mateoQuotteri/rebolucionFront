import React, { useState, useEffect } from "react";

const PanelModulos = () => {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchModulos = async () => {
    try {
      const token = localStorage.getItem("jwt"); 
      if (!token) {
        throw new Error("No se encontró el token de autenticación");
      }

      const response = await fetch("http://localhost:8080/modulos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los módulos");
      }

      const data = await response.json();
      setModulos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModulos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta p-6">
      {/* Contenedor del título y el botón */}
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold blanco">Administrar Módulos</h1>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() => alert("Abrir formulario para agregar un módulo")}
        >
          Agregar un módulo
        </button>
      </div>

      {loading ? (
        <p className="text-white">Cargando módulos...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <table className="table-auto w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">ID</th>
              <th className="p-4">Nombre</th>
              <th className="p-4">Dificultad</th>
              <th className="p-4">Profesor</th>
              <th className="p-4">Tema ID</th>
              <th className="p-4">Descripción</th>
              <th className="p-4">Imagen</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {modulos.map(({ id, nombre, dificultad, profesor, temaId, descripcion, imagen }) => (
              <tr key={id} className="border-b hover:bg-gray-100">
                <td className="p-4">{id}</td>
                <td className="p-4">{nombre}</td>
                <td className="p-4">{dificultad}</td>
                <td className="p-4">{profesor}</td>
                <td className="p-4">{temaId}</td>
                <td className="p-4">{descripcion}</td>
                <td className="p-4">{imagen}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => alert(`Eliminar módulo con ID ${id}`)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => alert(`Editar módulo con ID ${id}`)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PanelModulos;
