import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Modulos = () => {
  // Hook para la navegación
  const navigate = useNavigate();

  // Estado para los módulos
  const [modulos, setModulos] = useState([]);

  // Función para obtener los datos de los módulos
  const fetchModulos = async () => {
    try {
      const response = await fetch("http://localhost:8080/modulos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Asegúrate de tener un token almacenado
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos de los módulos");
      }

      const data = await response.json();
      setModulos(data || []);
    } catch (error) {
      console.error("Error al obtener los datos de los módulos:", error);
    }
  };

  // Ejecutar fetch al montar el componente
  useEffect(() => {
    fetchModulos();
  }, []);

  // Función para manejar la navegación al módulo específico
  const handleCardClick = (id) => {
    navigate(`/modulos/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center back-violeta p-6">
      <h1 className="text-3xl font-bold naranja mb-6">Módulos Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {modulos.length > 0 ? (
          modulos.map(({ id, nombre, dificultad, imagen }) => (
            <div
              key={id}
              className="back-blanco rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handleCardClick(id)} // Manejo del clic
            >
              <img
                src={imagen || "https://via.placeholder.com/600x400"} // Imagen por defecto si no hay URL
                alt={nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{nombre}</h2>
                <p className="text-gray-600">Dificultad: {dificultad}/10</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay módulos disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

export default Modulos;
