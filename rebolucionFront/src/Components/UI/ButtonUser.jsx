import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonUser = ({ children, to, className }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`
        px-3 
        py-2 md:py-3
        back-naranja 
        text-white 
        rounded-md 
        font-bold 
        transition-all 
        duration-200 
        hover:opacity-90
        text-sm md:text-base
        min-w-[100px] md:min-w-[120px]
        shadow-md
        ${className}`}
      onClick={() => navigate(to)}
    >
      {children}
    </button>
  );
};

export default ButtonUser;