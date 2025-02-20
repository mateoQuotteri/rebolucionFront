import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-lg">
        <div className="relative">
          <h1 className="text-9xl font-bold text-blue-600 opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xl text-gray-800 bg-white px-4 py-2 rounded-lg shadow-lg">
              Página no encontrada
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-lg text-gray-600">
            ¡Oops! Parece que te has perdido. La página que buscas no existe.
          </p>
          
          <div className="animate-bounce">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-lg"
            >
              <HomeIcon size={20} />
              Volver al inicio
            </Link>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <div className="text-sm text-gray-500">
            ¿Necesitas ayuda? Contáctanos en
            <a href="mailto:support@example.com" className="text-blue-600 hover:underline ml-1">
              support@example.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;