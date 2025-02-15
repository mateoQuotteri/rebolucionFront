import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import FormularioUnidades from "./FormsAdmin/FormularioUnidades";
import FormularioEditarUnidad from "./FormsAdmin/FormularioEditarUnidad";

const PanelUnidades = () => {
  const [unidades, setUnidades] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUnidades = async () => {
    try {
      setLoading(true);
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        throw new Error("No se encontró el token de autenticación");
      }
      
      const response = await fetch("http://localhost:8080/unidades", {
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}` 
        },
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnidades();
  }, []);

  const handleEliminarUnidad = async (unidadId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
          throw new Error("No estás autenticado");
        }

        const response = await fetch(`http://localhost:8080/api/admin/eliminar-unidad/${unidadId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la unidad');
        }

        Swal.fire(
          'Eliminada',
          'La unidad ha sido eliminada correctamente.',
          'success'
        );

        fetchUnidades();
      } catch (error) {
        Swal.fire(
          'Error',
          error.message,
          'error'
        );
      }
    }
  };

  const handleEditarUnidad = (unidad) => {
    setUnidadSeleccionada(unidad);
    setMostrarEdicion(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta p-6">
      <div className="flex justify-between w-full mb-6">
        <h1 className="text-3xl font-bold blanco">Administrar Unidades</h1>
        <button 
          onClick={() => setMostrarFormulario(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Agregar una unidad
        </button>
      </div>
      
      {loading ? (
        <p className="text-white">Cargando unidades...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
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
            {unidades.map((unidad) => (
              <tr key={unidad.id} className="border-b hover:bg-gray-100">
                <td className="p-4">{unidad.id}</td>
                <td className="p-4">{unidad.nombre}</td>
                <td className="p-4">{unidad.descripcion}</td>
                <td className="p-4">{unidad.video}</td>
                <td className="p-4">{unidad.modulo?.nombre || "Sin módulo"} (ID: {unidad.modulo?.id || "N/A"})</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEliminarUnidad(unidad.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleEditarUnidad(unidad)}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <FormularioUnidades 
            cerrarFormulario={() => setMostrarFormulario(false)} 
            fetchUnidades={fetchUnidades} 
          />
        </div>
      )}

      {mostrarEdicion && unidadSeleccionada && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <FormularioEditarUnidad 
            unidad={unidadSeleccionada}
            cerrarFormulario={() => setMostrarEdicion(false)} 
            fetchUnidades={fetchUnidades} 
          />
        </div>
      )}
    </div>
  );
};

export default PanelUnidades;