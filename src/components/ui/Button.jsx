function Button({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "ghost",
}) {
  const baseStyles = "px-4 py-2 rounded-md font-semibold transition";

  const variantStyles = {
    primary: "bg-[#4E928A] text-white hover:bg-[#3b756e]",
    outline: "hover:bg-[#e0f2f1] hover:text-[#4E928A]",
    ghost:
      "bg-transparent text-[#e0f2f1] hover:bg-[#e0f2f1] hover:text-[#4E928A]",
    discriptive: "rounded-md font-semibold transition",
    active: "bg-[#e0f2f1] text-[#4E928A]",
    inactive:
      "bg-transparent text-[#e0f2f1] hover:bg-[#e0f2f1] hover:text-[#4E928A] ",
  };

  const fallbackVariant = "ghost";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${
        variantStyles[variant] || variantStyles[fallbackVariant]
      } ${className}`}
    >
      {children}
    </button>
  );
}
export default Button;
