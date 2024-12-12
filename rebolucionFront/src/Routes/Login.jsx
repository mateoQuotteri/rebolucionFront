import React, { useState } from "react";
import Input from "../Components/UI/InputForm";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="min-h-screen back-violeta flex items-center justify-center bg-back-violeta">
      <form onSubmit={handleLogin} className="w-96 p-6 back-blanco rounded-md shadow-md">
        <h2 className="text-center violeta text-2xl font-bold mb-4">Inicia sesion</h2>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleVisibility={() => setShowPassword(!showPassword)}
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 back-naranja blanco font-bold rounded-md hover:bg-opacity-90"
        >
          Iniciar sesión
        </button>
        <div className="mt-4 text-center">
          <button className="font-bold naranja hover:underline">Sign in with Google</button>
        </div>
        <p className="mt-4 text-center violeta">
          Si aún no tienes cuenta, <a href="#" className="violeta font-bold hover:underline">crea una</a>
        </p>
      </form>
    </div>
  );
};


export default Login;