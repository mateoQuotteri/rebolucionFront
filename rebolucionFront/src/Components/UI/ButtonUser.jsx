import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonUser = ({ children, to, className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      className={`px-4 py-2 back-naranja text-white rounded ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default ButtonUser;
