import React, { useState, useEffect } from "react";

const PanelUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener el JWT desde el almacenamiento local (localStorage) o cualquier fuente.
  const getToken = () => {
    return localStorage.getItem("jwt"); // Asegúrate de haber almacenado el token bajo la clave "jwt".
  };

  // Función para cargar usuarios desde el backend
  const fetchUsuarios = async () => {
    const token = getToken(); // Obtener el JWT
    if (!token) {
      alert("No hay token disponible. Inicia sesión.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/admin/usuarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Enviar el JWT en el encabezado
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsuarios(data); // Actualizar usuarios con los datos recibidos
      } else {
        console.error("Error al obtener los usuarios:", response.statusText);
        alert("No se pudieron cargar los usuarios. Revisa tus permisos.");
      }
    } catch (error) {
      console.error("Error al comunicarse con el backend:", error);
      alert("Error al cargar los usuarios. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect para cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  if (loading) {
    return <p className="text-center text-white">Cargando usuarios...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta p-6">
      <h1 className="text-3xl font-bold blanco mb-6">Administrar Usuarios</h1>
      <table className="table-auto w-full bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-4">ID</th>
            <th className="p-4">Nombre</th>
            <th className="p-4">Apellido</th>
            <th className="p-4">Correo</th>
            <th className="p-4">Username</th>
            <th className="p-4">Rol</th>
            <th className="p-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
  {usuarios.map(({ id, nombre, apellido, correo, username, rol }) => (
    <tr key={id} className="border-b hover:bg-gray-100">
      <td className="p-4">{id}</td>
      <td className="p-4">{nombre}</td>
      <td className="p-4">{apellido}</td>
      <td className="p-4">{correo}</td>
      <td className="p-4">{username}</td>
      <td className="p-4">{rol}</td>
      <td className="p-4 flex gap-2">
        <button
          onClick={() => console.log("hola")} // Acción al hacer clic en "Eliminar"
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Eliminar
        </button>
        <button
          onClick={() => console.log("hola")} // Acción al hacer clic en "Cambiar Rol"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Cambiar Rol
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default PanelUsers;
