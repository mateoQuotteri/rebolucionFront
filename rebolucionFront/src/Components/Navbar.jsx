import { Link } from "react-router-dom";
import ButtonUser from "./UI/ButtonUser";
import { useAuth } from "../Context/AuthContext"; // Importamos el hook del contexto

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth(); // Extraemos los datos necesarios del contexto

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
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <ButtonUser
              to="/modificar-usuario"
              className="back-orange px-2 font-bold py-1 text-xs sm:px-3 sm:py-2 sm:text-sm lg:px-4 lg:py-3 lg:text-base"
            >
              Modificar Usuario
            </ButtonUser>
            <button
  onClick={logout}
  className="back-naranja text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-200 shadow-md"
>
  Cerrar Sesión
</button>

          </>
        ) : (
          <>
            <ButtonUser
              to="/login"
              className="back-orange px-2  font-bold py-1 text-xs sm:px-3 sm:py-2 sm:text-sm lg:px-4 lg:py-3 lg:text-base"
            >
              Inicia sesión
            </ButtonUser>
            <ButtonUser
              to="/register"
              className="back-orange px-2 font-bold py-1 text-xs sm:px-3 sm:py-2 sm:text-sm lg:px-4 lg:py-3 lg:text-base"
            >
              Regístrate
            </ButtonUser>
          </>
        )}
      </div>
    </nav>
  );
}
