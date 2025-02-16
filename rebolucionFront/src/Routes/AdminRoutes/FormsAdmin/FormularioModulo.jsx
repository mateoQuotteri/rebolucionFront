import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const FormularioModulo = ({ cerrarFormulario, fetchModulos }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    dificultad: "",
    profesor: "",
    descripcion: "",
    imagen: "",
    temaId: "",
  });

  const [temas, setTemas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemas();
  }, []);

  const fetchTemas = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/temas", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTemas(data);
      } else {
        throw new Error("Error al cargar los temas");
      }
    } catch (error) {
      console.error("Error al cargar los temas:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los temas.',
        confirmButtonColor: '#3085d6'
      });
    } finally {
      setLoading(false);
    }
  };

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
      const response = await fetch("http://localhost:8080/api/admin/agregar-modulo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al crear el módulo");

      Swal.fire({
        icon: 'success',
        title: '¡Módulo Creado!',
        text: 'El módulo se ha creado correctamente.',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        fetchModulos();
        cerrarFormulario();
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear el módulo.',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-lg mx-4">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-bold">Agregar Nuevo Módulo</h2>
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
            <select
              name="temaId"
              value={formData.temaId}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              disabled={loading}
            >
              <option value="">Seleccionar Tema</option>
              {temas.map((tema) => (
                <option key={tema.id} value={tema.id}>
                  {tema.nombre}
                </option>
              ))}
            </select>
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
            Guardar
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

export default FormularioModulo;