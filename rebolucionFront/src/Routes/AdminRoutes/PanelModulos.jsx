import React, { useState } from "react";

const PanelModulos = () => {
  // Simulación de módulos traídos directamente en el front
  const [modulos, setModulos] = useState([
    {
      id: 1,
      nombre: "Modulo 1",
      dificultad: 2,
      profesor: "Carlos",
      temaId: 5,
      descripcion: "Un módulo introductorio",
      imagen: "imagen1.jpg",
    },
    {
      id: 2,
      nombre: "Modulo 2",
      dificultad: 3,
      profesor: "Pipon",
      temaId: 6,
      descripcion: "Modulo muy loquillo",
      imagen: "imagen2.jpg",
    },
  ]);

  const handleEliminarModulo = (id) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que querés eliminar el módulo con ID ${id}?`
    );
    if (confirmacion) {
      setModulos(modulos.filter((modulo) => modulo.id !== id));
      console.log(`Módulo con ID ${id} eliminado`);
    }
  };

  const handleEditarModulo = (id) => {
    const modulo = modulos.find((modulo) => modulo.id === id);
    if (modulo) {
      const nuevoNombre = prompt("Ingrese el nuevo nombre del módulo:", modulo.nombre);
      const nuevaDificultad = prompt(
        "Ingrese la nueva dificultad (1-5):",
        modulo.dificultad
      );
      const nuevoProfesor = prompt("Ingrese el nuevo profesor:", modulo.profesor);
      const nuevaDescripcion = prompt(
        "Ingrese la nueva descripción:",
        modulo.descripcion
      );
      const nuevaImagen = prompt("Ingrese la nueva imagen:", modulo.imagen);

      if (nuevoNombre && nuevaDificultad && nuevoProfesor && nuevaDescripcion && nuevaImagen) {
        setModulos(
          modulos.map((modulo) =>
            modulo.id === id
              ? {
                  ...modulo,
                  nombre: nuevoNombre,
                  dificultad: parseInt(nuevaDificultad),
                  profesor: nuevoProfesor,
                  descripcion: nuevaDescripcion,
                  imagen: nuevaImagen,
                }
              : modulo
          )
        );
        console.log(`Módulo con ID ${id} actualizado`);
      } else {
        alert("Todos los campos son obligatorios.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta p-6">
      <h1 className="text-3xl font-bold blanco mb-6">Administrar Módulos</h1>
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
                  onClick={() => handleEliminarModulo(id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleEditarModulo(id)}
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

export default PanelModulos;
