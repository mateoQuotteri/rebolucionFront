import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginBody from '../Components/LoginComponents/LoginBody';

const Login = () => {

    console.log("Estamos aca en el login");
    

  return (
      <LoginBody />


  );
};

export default Login;