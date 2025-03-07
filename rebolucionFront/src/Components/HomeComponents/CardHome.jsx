import React from "react";
import { useNavigate } from 'react-router-dom';

const temas = [
  {
    icono: "📜",
    nombre: "Ethereum",
    hecho: true,
  },
  {
    icono: "₿",
    nombre: "Bitcoin",
    hecho: false,
  },
  {
    icono: "💹",
    nombre: "Finanzas",
    hecho: true,
  },
  {
    icono: "🔗",
    nombre: "Blockchain",
    hecho: true,
  },
  {
    icono: "🖼️",
    nombre: "Nfts",
    hecho: true,
  },
  {
    icono: "📈",
    nombre: "DeFi",
    hecho: false,
  },
  {
    icono: "🏦",
    nombre: "Economia",
    hecho: true,
  },
];

const CardHome = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-back-naranja back-violeta to-back-violeta py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold blanco text-center mb-8">
        Aprenderás sobre cosas como...
      </h2>
      <div className="flex flex-wrap back-violeta justify-center gap-6 p-6">
        {temas.map((tema, index) => (
          <div
            key={index}
            className={`back-blanco rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-6 w-full sm:w-[48%] md:w-[30%] lg:w-[23%] flex flex-col items-center ${
              tema.hecho ? "cursor-pointer" : "cursor-not-allowed"
            }`}

                         /*{/*CAMBIAR ACA ESTO}*/

            onClick={() => tema.hecho && navigate(`/modulos`)}
          >
            <div className="text-5xl mb-4">{tema.icono}</div>
            <h3 className="text-2xl font-bold text-naranja">{tema.nombre}</h3>
            <p
              className={`mt-2 text-lg font-medium ${
                tema.hecho ? "text-green-500" : "text-red-500"
              }`}
            >
              {tema.hecho ? "Disponible" : "Pendiente"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardHome;
