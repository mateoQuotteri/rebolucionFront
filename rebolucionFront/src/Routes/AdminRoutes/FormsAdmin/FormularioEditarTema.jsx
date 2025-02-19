import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const FormularioEditarTema = ({ cerrarFormulario, fetchTemas, temaId, temaActual }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    icono: "",
    hecho: false
  });

  useEffect(() => {
    if (temaActual) {
      setFormData({
        nombre: temaActual.nombre,
        icono: temaActual.icono,
        hecho: temaActual.hecho
      });
    }
  }, [temaActual]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
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
      const response = await fetch(`http://localhost:8080/api/admin/modificar-tema/${temaId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al modificar el tema");

      Swal.fire({
        icon: 'success',
        title: '¡Tema Modificado!',
        text: 'El tema se ha modificado correctamente.',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        fetchTemas();
        cerrarFormulario();
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al modificar el tema.',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-lg mx-4">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-bold">Editar Tema</h2>
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
              type="text"
              name="icono"
              placeholder="Ícono (emoji)"
              value={formData.icono}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="mt-3 flex items-center">
          <input
            type="checkbox"
            name="hecho"
            checked={formData.hecho}
            onChange={handleChange}
            className="mr-2"
          />
          <label>¿Está hecho?</label>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Guardar Cambios
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

export default FormularioEditarTema;