import React, { useState } from "react";

const PanelUsers = () => {
  // Simulación de usuarios traídos directamente en el front
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      correo: "usuario1@mail.com",
      nombre: "Juan",
      apellido: "Pérez",
      edad: 30,
      contra: "123456",
      genero: "Masculino",
      username: "juanperez",
      rol: "USUARIO",
    },
    {
      id: 2,
      correo: "admin@mail.com",
      nombre: "Ana",
      apellido: "Gómez",
      edad: 25,
      contra: "admin123",
      genero: "Femenino",
      username: "anagomez",
      rol: "ADMIN",
    },
  ]);

  /*const handleEliminarUsuario = (id) => {
    const confirmacion = window.confirm(
      `¿Estás seguro de que querés eliminar al usuario con ID ${id}?`
    );
    if (confirmacion) {
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      console.log(`Usuario con ID ${id} eliminado`);
    }
  };

  const handleCambiarRol = async (id) => {
    const nuevoRol = prompt("Ingrese el nuevo rol (ADMIN o USUARIO):");
    if (nuevoRol === "ADMIN" || nuevoRol === "USUARIO") {
      try {
        // Lógica para llamar al backend
        const response = await fetch(`/modificar-role/${id}/role`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rol: nuevoRol }),
        });

        if (response.ok) {
          // Actualiza el usuario en el estado local
          setUsuarios(
            usuarios.map((usuario) =>
              usuario.id === id ? { ...usuario, rol: nuevoRol } : usuario
            )
          );
          console.log(`Usuario con ID ${id} ahora tiene el rol de ${nuevoRol}`);
        } else {
          console.error("Error al cambiar el rol");
        }
      } catch (error) {
        console.error("Error al comunicarse con el backend:", error);
      }
    } else {
      alert("Rol inválido. Debe ser ADMIN o USUARIO.");
    }
  };*/

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
                  onClick={() => handleEliminarUsuario(id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleCambiarRol(id)}
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
