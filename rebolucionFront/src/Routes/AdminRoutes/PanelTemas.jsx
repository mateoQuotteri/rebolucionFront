import React, { useEffect, useState } from "react";
import FormularioTema from "./FormsAdmin/FormularioTema";
import Swal from 'sweetalert2';

const PanelTemas = () => {
  const [temas, setTemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const fetchTemas = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:8080/temas", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los temas");
      }

      const data = await response.json();
      setTemas(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Hubo un problema al cargar los temas.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemas();
  }, []);

  const handleEliminarTema = async (id) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`http://localhost:8080/api/admin/eliminar-tema/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) throw new Error('Error al eliminar el tema');

      Swal.fire({
        icon: 'success',
        title: 'Tema eliminado',
        text: 'El tema se ha eliminado correctamente',
      });

      fetchTemas();
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el tema',
      });
    }
  };

  if (loading) {
    return <p>Cargando temas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta p-6">
      <h1 className="text-3xl font-bold blanco mb-6">Administrar Temas</h1>
      
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={() => setMostrarFormulario(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Agregar Tema
        </button>
      </div>

      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <FormularioTema
            cerrarFormulario={() => setMostrarFormulario(false)}
            fetchTemas={fetchTemas}
          />
        </div>
      )}

      <table className="table-auto w-full bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-4">ID</th>
            <th className="p-4">Nombre</th>
            <th className="p-4">Ícono</th>
            <th className="p-4">Hecho</th>
            <th className="p-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {temas.map(({ id, nombre, icono, hecho }) => (
            <tr key={id} className="border-b hover:bg-gray-100">
              <td className="p-4">{id}</td>
              <td className="p-4">{nombre}</td>
              <td className="p-4 text-2xl">{icono}</td>
              <td className="p-4">{hecho ? "Sí" : "No"}</td>
              <td className="p-4 flex gap-2">
                <button
                  onClick={() => handleEliminarTema(id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleEditarTema(id)}
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

export default PanelTemas;