
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  const navigate = useNavigate();


  return (
    <div>
      <h1>Estas en el Login</h1>
         {/* Botones para redirigir a /login y /register */}
         <button onClick={() => navigate('/')} className="btn btn-primary m-2">
        Ir a Home
      </button>
      <button onClick={() => navigate('/register')} className="btn btn-secondary m-2">
        Ir a Register
      </button>
    </div>
  );
};

export default LoginForm;