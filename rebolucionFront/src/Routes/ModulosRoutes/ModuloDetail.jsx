import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ModuloDetail = () => {
  const { id } = useParams(); // Obtener el id de los parámetros de la URL
  const [modulo, setModulo] = useState(null);
  const [unidades, setUnidades] = useState([]);
  const [error, setError] = useState("");

  // Fetch para obtener las unidades por módulo
  const fetchUnidadesPorModulo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/unidad/modulo/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Token JWT del localStorage
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener las unidades del módulo");
      }

      const data = await response.json();
      setUnidades(data || []);
    } catch (error) {
      console.error("Error al obtener las unidades:", error);
      setError("No se pudieron cargar las unidades.");
    }
  };

  // Fetch para obtener los detalles del módulo
  const fetchModulo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/modulo/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos del módulo");
      }

      const data = await response.json();
      setModulo(data || null);
    } catch (error) {
      console.error("Error al obtener los datos del módulo:", error);
      setError("No se pudo cargar el módulo.");
    }
  };

  // Ejecutar los fetch al montar el componente
  useEffect(() => {
    fetchModulo();
    fetchUnidadesPorModulo();
  }, [id]);

  if (error) {
    return (
      <div className="py-16 px-4 back-violeta">
        <h1 className="text-3xl font-bold naranja text-center">{error}</h1>
      </div>
    );
  }

  if (!modulo) {
    return (
      <div className="py-16 px-4 back-violeta">
        <h1 className="text-3xl font-bold naranja text-center">Cargando módulo...</h1>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 back-violeta">
      {/* Detalle del módulo */}
      <div className="flex flex-col md:flex-row items-center back-blanco shadow-lg rounded-lg p-6 mb-8">
        <img
          src={modulo.imagen || "https://via.placeholder.com/600x400"}
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
      <h3 className="text-2xl font-bold naranja mb-4 text-center">Unidades</h3>
      {unidades.length === 0 ? (
        <p className="text-center  blanco ">No hay unidades disponibles para este módulo.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {unidades.map((unidad) => (
            <div
              key={unidad.id}
              className="relative group w-full sm:w-[48%] md:w-[30%] lg:w-[23%] h-[200px]"
            >
              {/* Card principal */}
              <div
                className="bg-gradient-to-b from-orange-400 to-purple-600 p-6 
                rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-102 transition-all
                duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <h4 className="text-lg font-bold text-white mb-2 truncate">{unidad.nombre}</h4>
                  <p className="text-sm text-gray-200 mb-4 line-clamp-2">{unidad.descripcion}</p>
                </div>
                <a
                  href={unidad.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white text-orange-500 font-bold rounded-md hover:bg-opacity-90 text-center"
                >
                  Ver Video
                </a>
              </div>

              {/* Overlay que aparece al hover */}
              <div
                className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"
              >
                <h4 className="text-xl font-bold text-white text-center">{unidad.nombre}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuloDetail;
