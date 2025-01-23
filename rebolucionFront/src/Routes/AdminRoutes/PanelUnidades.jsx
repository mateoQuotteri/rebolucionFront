import React, { useEffect, useState } from "react";

const PanelUnidades = () => {
  const [unidades, setUnidades] = useState([]);

  // Obtener las unidades del backend al cargar el componente
  useEffect(() => {
    const fetchUnidades = async () => {
      try {
        const jwt = localStorage.getItem("jwt"); // Asumiendo que guardás el JWT en localStorage
        const response = await fetch("http://localhost:8080/unidades", {
          headers: { Authorization: `Bearer ${jwt}` },
        });
    
        if (!response.ok) {
          throw new Error(`Error al obtener unidades: ${response.statusText}`);
        }
    
        const data = await response.json();
        const unidadesConModulos = data.map((unidad) => ({
          ...unidad,
          modulo: unidad.moduloSalidaDto,
        }));
        setUnidades(unidadesConModulos);
      } catch (error) {
        console.error("Error al obtener las unidades:", error);
      }
    };
    
    fetchUnidades();
  }, []);



  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta p-6">
      <h1 className="text-3xl font-bold blanco mb-6">Administrar Unidades</h1>
      <table className="table-auto w-full bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-4">ID</th>
            <th className="p-4">Nombre</th>
            <th className="p-4">Descripción</th>
            <th className="p-4">Video</th>
            <th className="p-4">Módulo</th>
            <th className="p-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {unidades.map(({ id, nombre, descripcion, video, modulo }) => (
            <tr key={id} className="border-b hover:bg-gray-100">
              <td className="p-4">{id}</td>
              <td className="p-4">{nombre}</td>
              <td className="p-4">{descripcion}</td>
              <td className="p-4">{video}</td>
              <td className="p-4">{modulo?.nombre || "Sin módulo"} (ID: {modulo?.id || "N/A"})</td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => handleEliminarUnidad(id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleEditarUnidad(id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PanelUnidades;
