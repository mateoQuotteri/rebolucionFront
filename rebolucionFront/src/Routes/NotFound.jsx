import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen back-violeta flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-lg">
        <div className="relative">
          <h1 className="text-9xl font-bold  naranja">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xl  back-blanco violeta px-4 py-2 rounded-lg shadow-lg">
              Página no encontrada
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-lg naranja">
            ¡Oops! Parece que te has perdido. La página que buscas no existe.
          </p>
          
          <div className="animate-bounce">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 back-naranja text-white px-6 py-3 rounded-full hover:bg-violet-900 transition-colors duration-200 shadow-lg"
            >
              <HomeIcon size={20} />
              Volver al inicio
            </Link>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <div className="text-sm blanco">
            ¿Necesitas ayuda? Contáctanos en
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline ml-1">
            rebolucionapp@gmail.com

            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;