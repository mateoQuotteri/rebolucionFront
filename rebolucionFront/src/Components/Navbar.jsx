import ButtonUser from "./UI/ButtonUser";

export default function Navbar() {
  
  const handleClick = () => {
    alert('¡Hiciste clic en el botón!');
  };
  return (
   
    <nav className="back-violeta container flex items-center justify-between p-4">
  
    <div className="flex items-center">
      <img
        src="../../public/rebolucionLogoWebHeader-removebg-preview.png"
        alt="Logo"
        className="h-10 sm:h-12 md:h-16 lg:h-20" 
      />
    </div>
    
  
    {/* Botones a la derecha */}
    <div className="flex space-x-4">
      <ButtonUser onClick={handleClick} className="back-orange px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base">
        Inicia sesion
      </ButtonUser>
      <ButtonUser onClick={handleClick} className="back-orange px-2 py-1 text-sm sm:px-4 sm:py-2 sm:text-base">
        Registrate
      </ButtonUser>
    </div>
  </nav>
  
  );
}
