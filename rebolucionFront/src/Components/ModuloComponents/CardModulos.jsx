import React from "react";
import { useNavigate } from "react-router-dom";

const modulos = [
  {
    id: 1,
    nombre: "Bitcoin I",
    dificultad: 1,
    profesor: "Satoshi Nakamoto",
    descripcion: "Introducción a Bitcoin y los fundamentos de la blockchain.",
    imagen: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    nombre: "Bitcoin II",
    dificultad: 2,
    profesor: "Andreas Antonopoulos",
    descripcion: "Profundización en Bitcoin y sus casos de uso.",
    imagen: "https://via.placeholder.com/150",
  },
];

const CardModulos = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-back-naranja back-violeta to-back-violeta py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold naranja text-center mb-8">
        Explora los módulos disponibles
      </h2>
      <div className="flex flex-wrap back-violeta justify-center gap-6 p-6">
        {modulos.map((modulo) => (
          <div
            key={modulo.id}
            className="back-blanco rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-6 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] flex flex-col"
          >
            <img
              src={modulo.imagen}
              alt={`Imagen de ${modulo.nombre}`}
              className="rounded-lg mb-4 w-full h-40 object-cover"
            />
            <h3 className="text-2xl font-bold text-naranja">{modulo.nombre}</h3>
            <p className="mt-2 text-sm text-gray-500">
              Profesor: <span className="font-medium">{modulo.profesor}</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Dificultad: <span className="font-medium">{modulo.dificultad}</span>
            </p>
            <button
              onClick={() => navigate(`/modulo/${modulo.id}`)}
              className="mt-4 p-2 back-naranja blanco font-bold rounded-md hover:bg-opacity-90"
            >
              Ingresar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardModulos;
