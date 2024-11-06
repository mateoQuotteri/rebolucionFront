import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeMain = () => {
  const navigate = useNavigate();

  console.log("skskk");

  return (
    <div>
      <h1 style={{ color: "black" }}>Estas en el home</h1>
      
      {/* Botones para redirigir a /login y /register */}
      <button onClick={() => navigate('/login')} className="btn btn-primary m-2">
        Ir a Login
      </button>
      <button onClick={() => navigate('/register')} className="btn btn-secondary m-2">
        Ir a Register
      </button>
    </div>
  );
};

export default HomeMain;

