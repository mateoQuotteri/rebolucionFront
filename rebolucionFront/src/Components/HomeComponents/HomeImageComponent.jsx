import React from 'react'

const HomeImageComponent = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[600px] overflow-hidden back-violeta">
    <img
      src="../../../public/images/HomeImages/2.png" // Usa una imagen de alta resolución
      alt="Carrusel"
      className="absolute w-full h-full object-cover"
    />
  </div>
  
  )
}

export default HomeImageComponent
