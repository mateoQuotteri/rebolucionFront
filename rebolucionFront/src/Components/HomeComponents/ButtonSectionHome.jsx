import React from 'react'

const ButtonSectionHome = () => {
  return (
    <div className="bg-gradient-to-b  back-naranja from-back-naranja to-back-violeta py-16 px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold blanco mb-8">
      ¡Explorá nuestras opciones!
    </h2>
    <div className="flex flex-col md:flex-row justify-center gap-4">
      <button
        className="back-blanco violeta font-bold py-3 px-6 rounded-md shadow-md hover:back-naranja hover:blanco focus:outline-none focus:ring-4 focus:ring-naranja transition"
        onClick={() => navigate('/modulos')}
      >
        Acceder a los módulos
      </button>
      <button
        className="back-blanco violeta font-bold py-3 px-6 rounded-md shadow-md hover:back-violeta hover:blanco focus:outline-none focus:ring-4 focus:ring-violeta transition"
        onClick={() => navigate('/contacto')}
      >
        Contactate con nosotros
      </button>
    </div>
  </div>
  )
}

export default ButtonSectionHome
