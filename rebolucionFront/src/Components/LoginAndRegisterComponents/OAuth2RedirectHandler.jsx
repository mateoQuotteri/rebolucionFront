import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const processOAuthRedirect = async () => {
      const params = new URLSearchParams(location.search);
      const jwt = params.get("jwt");

      if (jwt) {
        try {
          console.log("Procesando redirección OAuth2 con JWT:", jwt);
          await login(jwt);
          navigate("/");
        } catch (error) {
          console.error("Error al procesar el token JWT:", error);
          navigate("/login", { 
            state: { 
              error: "No se pudo completar la autenticación con Google. Por favor, inténtalo de nuevo." 
            } 
          });
        }
      } else {
        console.error("No se encontró token JWT en la URL de redirección");
        navigate("/login", { 
          state: { 
            error: "No se recibió token de autenticación. Por favor, inténtalo de nuevo." 
          } 
        });
      }
    };

    processOAuthRedirect();
  }, [location, login, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center back-violeta">
      <div className="back-blanco p-8 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4 violeta text-center">Procesando tu inicio de sesión</h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violeta"></div>
        </div>
      </div>
    </div>
  );
};

export default OAuth2RedirectHandler;