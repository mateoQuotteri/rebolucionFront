import React from 'react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 p-2 sm:p-3 border border-gray-300 rounded-md font-bold hover:bg-gray-50 transition-colors"
    >
      <img 
        src="/images/google-icon.svg" 
        alt="Google icon" 
        className="w-5 h-5"
      />
      Continuar con Google
    </button>
  );
};

export default GoogleLoginButton;