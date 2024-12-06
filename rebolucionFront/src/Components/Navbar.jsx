import ButtonUser from "./UI/ButtonUser";

export default function Navbar() {
  
  const handleClick = () => {
    alert('¡Hiciste clic en el botón!');
  };
  return (
   
<nav className="back-violeta w-full flex items-center justify-between p-4 shadow-md"
style={{ boxShadow: "0px 4px 25px #ff9002" }} >  
    <div className="flex items-center">
      <img
        src="../../public/images/rebolucionLogoWebHeader-removebg-preview.png"
        alt="Logo"
        className="h-10 sm:h-12 md:h-16 lg:h-20" 
      />
    </div>
    
  
    {/* Botones a la derecha */}
    <div className="flex space-x-4">
      <ButtonUser onClick={handleClick} className="back-orange px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm lg:px-4 lg:py-3 lg:text-base">
        Inicia sesion
      </ButtonUser>
      <ButtonUser onClick={handleClick} className="back-orange px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm lg:px-4 lg:py-3 lg:text-base">
        Registrate
      </ButtonUser>
    </div>
  </nav>
  
  );
}
