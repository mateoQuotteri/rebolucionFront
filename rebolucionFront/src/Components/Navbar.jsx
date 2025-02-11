import { Link } from "react-router-dom";
import ButtonUser from "./UI/ButtonUser";
import { useAuth } from "../Context/AuthContext";
import {jwtDecode} from "jwt-decode";

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
      className="back-violeta w-full flex flex-col sm:flex-row items-center justify-between p-3 md:p-4 shadow-md gap-3 sm:gap-0"
      style={{ boxShadow: "0px 4px 25px #ff9002" }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src="../../public/images/LOGO - REBOLUCION - ORIGINAL-1 BANNER WEB 2500X750.png"
            alt="Logo"
            className="h-12 md:h-16 lg:h-20 cursor-pointer"
          />
        </Link>
      </div>

      {/* Botones */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {isLoggedIn ? (
          <>
            {isAdmin && (
              <ButtonUser
                to="/admin/panel"
                className="min-w-[90px] sm:min-w-[100px]"
              >
                Panel
              </ButtonUser>
            )}
            <ButtonUser
              to="/modificar-usuario"
              className="min-w-[120px] sm:min-w-[140px]"
            >
              Modificar usuario
            </ButtonUser>
            <button
  onClick={logout}
  className="
    px-3 
    py-2 md:py-3
    back-naranja 
    text-white 
    rounded-md 
    font-bold 
    transition-all 
    duration-200 
    hover:opacity-90
    text-sm md:text-base
    min-w-[100px] md:min-w-[120px]
    shadow-md
  "
>
  Cerrar sesión
</button>
          </>
        ) : (
          <>
            <ButtonUser
              to="/login"
              className="min-w-[100px] sm:min-w-[120px]"
            >
              Inicia sesión
            </ButtonUser>
            <ButtonUser
              to="/register"
              className="min-w-[100px] sm:min-w-[120px]"
            >
              Regístrate
            </ButtonUser>
          </>
        )}
      </div>
    </nav>
  );
}