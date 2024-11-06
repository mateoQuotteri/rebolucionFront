import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {

  console.log("Estas en el fofeifnejne");
  
  const navigate = useNavigate();

  return (
   <form action="">
    <h1 style={{ color: "black" }}>Estas en el Register</h1>

    <label htmlFor="">Email:</label>
    <input type="email" name="" id="" />

       {/* Botones para redirigir a /login y /register */}
       <button onClick={() => navigate('/login')} className="btn btn-primary m-2">
        Ir a Login
      </button>
      <button onClick={() => navigate('/')} className="btn btn-secondary m-2">
        Ir a Home
      </button>
   </form>
  );
};

export default RegisterForm;