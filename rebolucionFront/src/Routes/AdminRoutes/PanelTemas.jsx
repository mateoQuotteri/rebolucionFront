import React, { useEffect, useState } from "react";

const PanelTemas = () => {
  const [temas, setTemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchTemas();
  }, []);

  const handleAgregarTema = async () => {
    const nombre = prompt("Ingrese el nombre del tema:");
    const icono = prompt("Ingrese el ícono del tema:");
    const hecho = prompt("¿Está hecho? (true o false):");

    if (nombre && icono && hecho !== null) {
      try {
        const jwt = localStorage.getItem("jwt");
        const nuevoTema = {
          nombre,
          icono,
          hecho: hecho === "true",
        };

        const response = await fetch("http://localhost:8080/temas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(nuevoTema),
        });

        if (!response.ok) {
          throw new Error("Error al agregar el tema.");
        }

        const temaCreado = await response.json();
        setTemas([...temas, temaCreado]);

        console.log("Tema agregado correctamente");
      } catch (error) {
        console.error("Error al agregar el tema:", error);
        alert("No se pudo agregar el tema.");
      }
    } else {
      alert("Todos los campos son obligatorios.");
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
    onClick={handleAgregarTema}
    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
  >
    Agregar Tema
  </button>
</div>

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
