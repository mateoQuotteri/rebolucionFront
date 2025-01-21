import { Link } from "react-router-dom";
import ButtonUser from "./UI/ButtonUser";
import { useAuth } from "../Context/AuthContext";
import {jwtDecode} from "jwt-decode"; // Importamos jwt-decode

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth(); // Extraemos los datos necesarios del contexto

  // Obtener el rol del usuario desde el token
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
      className="back-violeta w-full flex items-center justify-between p-4 shadow-md"
      style={{ boxShadow: "0px 4px 25px #ff9002" }}
    >
      {/* Logo que redirige al Home */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src="../../public/images/rebolucionLogoWebHeader-removebg-preview.png"
            alt="Logo"
            className="h-10 sm:h-12 md:h-16 lg:h-20 cursor-pointer"
          />
        </Link>
      </div>

      {/* Botones a la derecha */}
      <div className="flex space-x-2">
        {isLoggedIn ? (
          <>
            {isAdmin && (
              <ButtonUser
                to="/admin/panel"
                className="back-orange font-bold px-2 py-1 text-xs sm:text-sm lg:text-base rounded w-full sm:max-w-[140px] md:max-w-[200px]"
              >
                Panel
              </ButtonUser>
            )}
            <ButtonUser
              to="/modificar-usuario"
              className="back-orange font-bold px-2 py-1 text-xs sm:text-sm lg:text-base rounded w-full sm:max-w-[140px] md:max-w-[200px]"
            >
              Modificar usuario
            </ButtonUser>
            <button
              onClick={logout}
              className="back-naranja text-white font-bold px-2 py-1 text-xs sm:text-sm lg:text-base rounded w-full sm:max-w-[140px] md:max-w-[200px] hover:bg-orange-600 transition duration-200 shadow-md"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <ButtonUser
              to="/login"
              className="back-orange px-2 py-1 text-xs sm:text-sm lg:text-base rounded w-full sm:max-w-[140px] md:max-w-[200px]"
            >
              Inicia sesión
            </ButtonUser>
            <ButtonUser
              to="/register"
              className="back-orange px-2 py-1 text-xs sm:text-sm lg:text-base rounded w-full sm:max-w-[140px] md:max-w-[200px]"
            >
              Regístrate
            </ButtonUser>
          </>
        )}
      </div>
    </nav>
  );
}
