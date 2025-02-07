import React, { useState, useEffect } from "react";
import FormularioModulo from "./FormsAdmin/FormularioModulo";
import FormularioEditarModulo from "./FormsAdmin/FormularioEditarModulo";

const PanelModulos = () => {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  const [moduloSeleccionado, setModuloSeleccionado] = useState(null);

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

  const fetchModuloDetalles = async (id) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No se encontró el token de autenticación");
      }

      const response = await fetch(`http://localhost:8080/modulo/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los detalles del módulo");
      }

      const data = await response.json();
      setModuloSeleccionado(data);
      setMostrarEdicion(true);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const eliminarModulo = async (id) => {
    if (!window.confirm(`¿Seguro que querés eliminar el módulo con ID ${id}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No se encontró el token de autenticación");
      }

      const response = await fetch(`http://localhost:8080/api/admin/eliminar-modulo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el módulo");
      }

      alert("Módulo eliminado correctamente");
      fetchModulos();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchModulos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta p-6">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold blanco">Administrar Módulos</h1>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() => setMostrarFormulario(true)}
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
                    onClick={() => eliminarModulo(id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => fetchModuloDetalles(id)}
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

      {mostrarFormulario && (
        <FormularioModulo cerrarFormulario={() => setMostrarFormulario(false)} fetchModulos={fetchModulos} />
      )}

      {mostrarEdicion && moduloSeleccionado && (
        <FormularioEditarModulo modulo={moduloSeleccionado} cerrarFormulario={() => setMostrarEdicion(false)} fetchModulos={fetchModulos} />
      )}
    </div>
  );
};

export default PanelModulos;
