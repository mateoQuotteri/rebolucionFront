import React, { useState } from "react";

const PanelTemas = () => {
  const [temas, setTemas] = useState([
    {
      id: 1,
      nombre: "Tema 1",
      icono: "📘",
      hecho: true,
    },
    {
      id: 2,
      nombre: "Tema 2",
      icono: "📗",
      hecho: false,
    },
  ]);

 /* const handleEliminarTema = (id) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que querés eliminar el tema con ID ${id}?`
    );
    if (confirmacion) {
      setTemas(temas.filter((tema) => tema.id !== id));
      console.log(`Tema con ID ${id} eliminado`);
    }
  };

  const handleEditarTema = (id) => {
    const tema = temas.find((tema) => tema.id === id);
    if (tema) {
      const nuevoNombre = prompt("Ingrese el nuevo nombre del tema:", tema.nombre);
      const nuevoIcono = prompt("Ingrese el nuevo ícono del tema:", tema.icono);
      const nuevoHecho = prompt(
        "¿Está hecho? (true o false):",
        tema.hecho
      );

      if (nuevoNombre && nuevoIcono && nuevoHecho !== null) {
        setTemas(
          temas.map((tema) =>
            tema.id === id
              ? {
                  ...tema,
                  nombre: nuevoNombre,
                  icono: nuevoIcono,
                  hecho: nuevoHecho === "true",
                }
              : tema
          )
        );
        console.log(`Tema con ID ${id} actualizado`);
      } else {
        alert("Todos los campos son obligatorios.");
      }
    }
  };*/

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta p-6">
      <h1 className="text-3xl font-bold blanco mb-6">Administrar Temas</h1>
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
