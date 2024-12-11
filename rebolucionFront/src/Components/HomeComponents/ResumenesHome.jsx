import React from 'react';

const ResumenesHome = () => {
  return (
    <div className="back-violeta p-10 pb-20 md:pb-24 text-center text-blanco">
      <h2 className="text-2xl font-bold mb-6">Sumate a una comunidad educativa</h2>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <div>
          <p className="text-4xl font-extrabold naranja">+100</p>
          <p className="text-lg">Episodios en Spotify y YouTube</p>
        </div>
        <div>
          <p className="text-4xl font-extrabold naranja">+8hs</p>
          <p className="text-lg">De contenido educativo en esta plataforma</p>
        </div>
        <div>
          <p className="text-4xl font-extrabold naranja">+50</p>
          <p className="text-lg">Charlas con expertos</p>
        </div>
      </div>
    </div>
  );
};

export default ResumenesHome;
