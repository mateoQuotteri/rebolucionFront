import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const PanelUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    return localStorage.getItem("jwt");
  };

  const fetchUsuarios = async () => {
    const token = getToken();
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'No hay token disponible. Inicia sesión.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/admin/usuarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      } else {
        console.error("Error al obtener los usuarios:", response.statusText);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los usuarios. Revisa tus permisos.',
          confirmButtonColor: '#d33'
        });
      }
    } catch (error) {
      console.error("Error al comunicarse con el backend:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al cargar los usuarios. Inténtalo nuevamente.',
        confirmButtonColor: '#d33'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeRole = async (id, currentRole) => {
    const newRole = currentRole === "ADMIN" ? "USUARIO" : "ADMIN";
    const token = getToken();

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'No hay token disponible. Inicia sesión.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/modificar-role/${id}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newRole),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Rol actualizado',
          text: `Rol cambiado a ${newRole} correctamente`,
          confirmButtonColor: '#3085d6'
        });
        fetchUsuarios();
      } else {
        console.error("Error al cambiar el rol:", response.statusText);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cambiar el rol.',
          confirmButtonColor: '#d33'
        });
      }
    } catch (error) {
      console.error("Error al comunicarse con el backend:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al cambiar el rol. Inténtalo nuevamente.',
        confirmButtonColor: '#d33'
      });
    }
  };

  const handleDeleteUser = async (id) => {
    const token = getToken();

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'No hay token disponible. Inicia sesión.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas eliminar este usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/admin/eliminar-usuario/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Usuario eliminado',
          text: 'Usuario eliminado correctamente',
          confirmButtonColor: '#3085d6'
        });
        fetchUsuarios();
      } else {
        console.error("Error al eliminar el usuario:", response.statusText);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el usuario.',
          confirmButtonColor: '#d33'
        });
      }
    } catch (error) {
      console.error("Error al comunicarse con el backend:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al eliminar el usuario. Inténtalo nuevamente.',
        confirmButtonColor: '#d33'
      });
    }
  };

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
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => handleChangeRole(id, rol)}
                >
                  Cambiar Rol
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleDeleteUser(id)}
                >
                  Eliminar
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