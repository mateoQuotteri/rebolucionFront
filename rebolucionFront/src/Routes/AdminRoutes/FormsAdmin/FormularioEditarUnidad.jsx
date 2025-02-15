import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const FormularioEditarUnidad = ({ unidad, cerrarFormulario, fetchUnidades }) => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    video: "",
    moduloId: "",
  });
  
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Cargar datos de la unidad y la lista de módulos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Inicializar form data con los datos de la unidad
        setFormData({
          id: unidad.id,
          nombre: unidad.nombre,
          descripcion: unidad.descripcion,
          video: unidad.video || "",
          moduloId: unidad.modulo?.id || "",
        });
        
        // Obtener la lista de módulos para el selector
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
          throw new Error("No estás autenticado");
        }
        
        const response = await fetch("http://localhost:8080/modulos", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
          },
        });
        
        if (!response.ok) {
          throw new Error("Error al obtener los módulos");
        }
        
        const modulosData = await response.json();
        setModulos(modulosData);
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los datos necesarios.',
          confirmButtonColor: '#d33'
        });
      } finally {
        setLoading(false);
      }
    };
    
    cargarDatos();
  }, [unidad]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No estás autenticado.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/admin/modificar-unidad/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al actualizar la unidad");

      Swal.fire({
        icon: 'success',
        title: '¡Unidad Actualizada!',
        text: 'La unidad se ha actualizado correctamente.',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        fetchUnidades();
        cerrarFormulario();
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar la unidad.',
        confirmButtonColor: '#d33'
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg mx-4 p-6 flex justify-center items-center">
        <p className="text-gray-600">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-lg mx-4">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-bold">Editar Unidad</h2>
        <button 
          onClick={cerrarFormulario}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <input type="hidden" name="id" value={formData.id} />
        
        <div className="mb-3">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la unidad"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded h-20"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="video"
            placeholder="URL del video"
            value={formData.video}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <select
            name="moduloId"
            value={formData.moduloId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccionar Módulo</option>
            {modulos.map(modulo => (
              <option key={modulo.id} value={modulo.id}>
                {modulo.nombre} (ID: {modulo.id})
              </option>
            ))}
          </select>
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

export default FormularioEditarUnidad;