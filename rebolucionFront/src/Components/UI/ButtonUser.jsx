const ButtonUser = ({ children, onClick, className }) => {
  return (
    <button
      className={`px-4 py-2 back-naranja text-white rounded  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonUser;