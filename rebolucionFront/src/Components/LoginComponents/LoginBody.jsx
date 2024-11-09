
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginBody.css'
import '../Utils/colores.css'
import LoginForm from './LoginForm'; 


const LoginBody = () => {
  


  return (
    <body className='back-violeta'>
        <LoginForm/>
    </body>
  );
};


export default LoginBody;