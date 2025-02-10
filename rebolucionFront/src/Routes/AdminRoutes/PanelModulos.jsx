import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
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

  const handleEliminarModulo = async (moduloId) => {
    // Mostrar SweetAlert de confirmación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      html: `Al eliminar este módulo, se eliminarán <strong>TODAS las unidades relacionadas</strong>. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    // Si el usuario confirma
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          throw new Error("No estás autenticado");
        }

        // Primero eliminar unidades del módulo
        const responseUnidades = await fetch(`http://localhost:8080/api/admin/eliminar-unidad/modulo/${moduloId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!responseUnidades.ok) {
          throw new Error('Error al eliminar unidades');
        }

        // Luego eliminar el módulo
        const responseModulo = await fetch(`http://localhost:8080/api/admin/eliminar-modulo/${moduloId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!responseModulo.ok) {
          throw new Error('Error al eliminar el módulo');
        }

        // Mostrar mensaje de éxito
        Swal.fire(
          'Eliminado',
          'El módulo y sus unidades han sido eliminados correctamente.',
          'success'
        );

        // Actualizar lista de módulos
        fetchModulos();

      } catch (error) {
        // Mostrar error
        Swal.fire(
          'Error',
          error.message,
          'error'
        );
      }
    }
  };

  useEffect(() => {
    fetchModulos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta p-6 relative">
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
              <th className="p-4">Tema ID/Nombre</th>
              <th className="p-4">Descripción</th>
              <th className="p-4">Imagen</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {modulos.map((modulo) => (
              <tr key={modulo.id} className="border-b hover:bg-gray-100">
                <td className="p-4">{modulo.id}</td>
                <td className="p-4">{modulo.nombre}</td>
                <td className="p-4">{modulo.dificultad}</td>
                <td className="p-4">{modulo.profesor}</td>
                <td className="p-4">{modulo.temaSalidaDto.id}, {modulo.temaSalidaDto.nombre}</td>
                <td className="p-4">{modulo.descripcion}</td>
                <td className="p-4">{modulo.imagen}</td>
                <td className="p-4 flex gap-2">
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleEliminarModulo(modulo.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => fetchModuloDetalles(modulo.id)}
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
          <FormularioModulo cerrarFormulario={() => setMostrarFormulario(false)} fetchModulos={fetchModulos} />
        </div>
      )}

      {mostrarEdicion && moduloSeleccionado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <FormularioEditarModulo modulo={moduloSeleccionado} cerrarFormulario={() => setMostrarEdicion(false)} fetchModulos={fetchModulos} />
        </div>
      )}
    </div>
  );
};

export default PanelModulos;