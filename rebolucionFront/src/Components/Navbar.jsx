import { Link } from "react-router-dom";
import ButtonUser from "./UI/ButtonUser";
import { useAuth } from "../Context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  
  const token = localStorage.getItem("jwt");
  let isAdmin = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAdmin = decodedToken.role && decodedToken.role.includes("ADMIN");
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  return (
    <nav
      className="back-violeta w-full p-3 md:p-4 shadow-md"
      style={{ boxShadow: "0px 4px 25px #ff9002" }}
    >
      {/* Contenedor flexible */}
      <div className="w-full flex flex-row items-center justify-between">
        {/* Logo - Visible solo en desktop */}
        <div className="hidden sm:block">
          <Link to="/">
            <img
              src="../../public/images/LOGO - REBOLUCION - ORIGINAL-1 BANNER WEB 2500X750.png"
              alt="Logo"
              className="h-12 md:h-16 lg:h-20 cursor-pointer"
            />
          </Link>
        </div>

        {/* Botones */}
        <div className="w-full sm:w-auto flex flex-row justify-around sm:justify-end sm:gap-3">
          {isLoggedIn ? (
            <>
              {isAdmin && (
                <ButtonUser
                  to="/admin/panel"
                  className="px-3 py-1.5"
                >
                  Panel
                </ButtonUser>
              )}
              <ButtonUser
                to="/modificar-usuario"
                className="px-3 py-1.5"
              >
                Modificar usuario
              </ButtonUser>
              <button
                onClick={logout}
                className="
                  px-3 
                  py-1.5
                  back-naranja 
                  text-white 
                  rounded-md 
                  font-bold 
                  transition-all 
                  duration-200 
                  hover:opacity-90
                  text-sm
                  shadow-md
                  flex items-center justify-center
                "
              >
                {/* Texto en desktop, icono de logout en móvil */}
                <span className="hidden sm:inline">Cerrar sesión</span>
                <span className="sm:hidden">
                  {/* Icono de logout (usar un SVG de cierre de sesión) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </span>
              </button>
            </>
          ) : (
            <>
              <ButtonUser
                to="/login"
                className="px-3 py-1.5"
              >
                Inicia sesión
              </ButtonUser>
              <ButtonUser
                to="/register"
                className="px-3 py-1.5"
              >
                Regístrate
              </ButtonUser>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}