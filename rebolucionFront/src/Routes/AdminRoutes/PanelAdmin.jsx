import React from "react";
import { useNavigate } from "react-router-dom";

const PanelAdmin = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta">
      <div className="w-full max-w-4xl p-8 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Panel de Administración
        </h1>
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => handleNavigation("/admin/temas")}
            className="p-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Administrar Temas
          </button>
          <button
            onClick={() => handleNavigation("/admin/usuarios")}
            className="p-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
          >
            Administrar Usuarios
          </button>
          <button
            onClick={() => handleNavigation("/admin/modulos")}
            className="p-4 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600"
          >
            Administrar Módulos
          </button>
          <button
            onClick={() => handleNavigation("/admin/unidades")}
            className="p-4 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
          >
            Administrar Unidades
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanelAdmin;
