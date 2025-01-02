import React from "react";
import { useParams } from "react-router-dom";

const ModuloDetail = () => {
  const { id } = useParams(); // Obtener el id de los parámetros de la URL

  // Datos de prueba (simularían venir de una API o un backend)
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


  const unidadesPorModulo = {
    1: [
      {
        id: 3,
        descripcion: "Unidad muy de nazi",
        nombre: "Unidad nazi",
        video: "https://www.youtube.com/watch?v=yGLomFODKS0",
      },
      {
        id: 4,
        descripcion: "Unidad re loca chaval",
        nombre: "Unidad sobre como jugar al futbol",
        video: "https://www.youtube.com/watch?v=yGLomFODKS0",
      },
    ],
    2: [
      {
        id: 5,
        descripcion: "Entendé los contratos inteligentes desde cero.",
        nombre: "Introducción a Smart Contracts",
        video: "https://www.youtube.com/watch?v=yGLomFODKS0",
      },
      {
        id: 6,
        descripcion: "Aprendé a crear tu propio contrato inteligente.",
        nombre: "Creación de Smart Contracts",
        video: "https://www.youtube.com/watch?v=yGLomFODKS0",
      },
    ],
  };

  // Buscar módulo por ID
  const modulo = modulos.find((mod) => mod.id === parseInt(id));
  const unidades = unidadesPorModulo[id] || [];

  if (!modulo) {
    return (
      <div className="py-16 px-4 back-violeta">
        <h1 className="text-3xl font-bold naranja text-center">
          Módulo no encontrado
        </h1>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 back-violeta">
      {/* Detalle del módulo */}
      <div className="flex flex-col md:flex-row items-center back-blanco shadow-lg rounded-lg p-6 mb-8">
        <img
          src={modulo.imagen}
          alt={modulo.nombre}
          className="w-48 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-orange-500 mb-2">{modulo.nombre}</h2>
          <p className="text-gray-700 mb-2">Profesor: {modulo.profesor}</p>
          <p className="text-gray-700 mb-2">Dificultad: {modulo.dificultad}/10</p>
          <p className="text-gray-600">{modulo.descripcion}</p>
        </div>
      </div>

      {/* Unidades del módulo */}
      <h3 className="text-2xl font-bold text-orange-500 mb-4 text-center">Unidades</h3>
      <div className="flex flex-wrap justify-center gap-6">
        {unidades.map((unidad) => (
          <div
            key={unidad.id}
            className="bg-gradient-to-b from-orange-400 to-purple-600 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] flex flex-col"
          >
            <h4 className="text-lg font-bold text-white mb-2">{unidad.nombre}</h4>
            <p className="text-sm text-gray-200 mb-4">{unidad.descripcion}</p>
            <a
              href={unidad.video}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white text-orange-500 font-bold rounded-md hover:bg-opacity-90 text-center"
            >
              Ver Video
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuloDetail;
