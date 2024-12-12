import React, { useState } from "react";

const InputForm = ({ type, placeholder, value, onChange, toggleVisibility }) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded-md border border-blanco text-violeta placeholder-blanco bg-back-violeta focus:outline-none focus:ring-2 focus:ring-naranja"
      />
      {toggleVisibility && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-2 top-2 text-naranja focus:outline-none"
        >
          👁️
        </button>
      )}
    </div>
  );
};


export default InputForm;