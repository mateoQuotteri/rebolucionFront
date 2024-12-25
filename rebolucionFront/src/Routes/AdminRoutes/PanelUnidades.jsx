import React, { useState } from "react";

const PanelUnidades = () => {
  // Simulación de unidades traídas directamente en el front
  const [unidades, setUnidades] = useState([
    {
      id: 1,
      nombre: "Unidad 1",
      descripcion: "Introducción al tema",
      video: "video1.mp4",
      modulo: { id: 1, nombre: "Módulo 1" },
    },
    {
      id: 2,
      nombre: "Unidad 2",
      descripcion: "Profundización del tema",
      video: "video2.mp4",
      modulo: { id: 2, nombre: "Módulo 2" },
    },
  ]);
/*
  const handleEliminarUnidad = (id) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que querés eliminar la unidad con ID ${id}?`
    );
    if (confirmacion) {
      setUnidades(unidades.filter((unidad) => unidad.id !== id));
      console.log(`Unidad con ID ${id} eliminada`);
    }
  };

  const handleEditarUnidad = (id) => {
    const unidad = unidades.find((unidad) => unidad.id === id);
    if (unidad) {
      const nuevoNombre = prompt("Ingrese el nuevo nombre de la unidad:", unidad.nombre);
      const nuevaDescripcion = prompt(
        "Ingrese la nueva descripción:",
        unidad.descripcion
      );
      const nuevoVideo = prompt("Ingrese el nuevo video:", unidad.video);
      const nuevoModuloId = prompt(
        "Ingrese el nuevo ID del módulo:",
        unidad.modulo.id
      );

      if (nuevoNombre && nuevaDescripcion && nuevoVideo && nuevoModuloId) {
        setUnidades(
          unidades.map((unidad) =>
            unidad.id === id
              ? {
                  ...unidad,
                  nombre: nuevoNombre,
                  descripcion: nuevaDescripcion,
                  video: nuevoVideo,
                  modulo: { id: parseInt(nuevoModuloId), nombre: `Módulo ${nuevoModuloId}` },
                }
              : unidad
          )
        );
        console.log(`Unidad con ID ${id} actualizada`);
      } else {
        alert("Todos los campos son obligatorios.");
      }
    }
  };*/

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
              <td className="p-4">{modulo.nombre} (ID: {modulo.id})</td>
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
