import React from "react";
import { useNavigate } from "react-router-dom";

const Modulos = () => {
  // Hook para la navegación
  const navigate = useNavigate();

  // Datos de los módulos
  const modulos = [
    {
      id: 1,
      nombre: "Introducción a Bitcoin",
      dificultad: 2,
      profesor: "Satoshi Nakamoto",
      descripcion:
        "Explorá los fundamentos de Bitcoin, la primera criptomoneda descentralizada.",
      imagen: "https://via.placeholder.com/600x400",
    },
    {
      id: 2,
      nombre: "Smart Contracts en Ethereum",
      dificultad: 3,
      profesor: "Vitalik Buterin",
      descripcion:
        "Aprendé cómo funcionan los contratos inteligentes en Ethereum y su impacto.",
      imagen: "https://via.placeholder.com/600x400",
    },
  ];

  // Función para manejar la navegación al módulo específico
  const handleCardClick = (id) => {
    navigate(`/modulos/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center back-violeta p-6">
      <h1 className="text-3xl font-bold naranja mb-6">Módulos Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {modulos.map(({ id, nombre, dificultad, imagen }) => (
          <div
            key={id}
            className="back-blanco rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform cursor-pointer"
            onClick={() => handleCardClick(id)} // Manejo del clic
          >
            <img
              src={imagen}
              alt={nombre}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{nombre}</h2>
              <p className="text-gray-600">Dificultad: {dificultad}/10</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modulos;
