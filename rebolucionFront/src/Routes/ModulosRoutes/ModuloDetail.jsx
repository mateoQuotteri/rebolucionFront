import React from "react";

const ModuloDetail = () => {
  const modulo = {
    id: 1,
    nombre: "Bitcoin I",
    dificultad: 1,
    profesor: "Satoshi Nakamoto",
    descripcion: "Introducción a Bitcoin y los fundamentos de la blockchain.",
    imagen: "https://via.placeholder.com/150",
  };

  const unidades = [
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
  ];

  return (
    <div className="py-16 px-4 back-violeta">
      {/* Detalle del módulo */}
      <div className="flex flex-col md:flex-row items-center back-blanco  shadow-lg rounded-lg p-6 mb-8">
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
