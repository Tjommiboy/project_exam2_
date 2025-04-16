function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-semibold text-white bg-[#4E928A] hover:bg-[#3b756e] transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
