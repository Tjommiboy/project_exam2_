function Button({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "ghost",
  style = {},
}) {
  const baseStyles =
    "px-4 py-2 rounded-md font-semibold transition duration-200 appearance-none forced-colors:none";

  const variantStyles = {
    primary:
      "bg-[#4E928A] text-white hover:bg-[#3b756e] hover:text-white border-0",
    outline:
      "bg-transparent text-[#4E928A] border border-[#4E928A] hover:bg-[#e0f2f1] hover:text-[#4E928A] hover:border-[#4E928A]",
    ghost:
      "bg-transparent text-[#e0f2f1] hover:bg-[#e0f2f1] hover:text-[#4E928A] border-0",
    discriptive: "rounded-md font-semibold transition forced-colors:none",
    active: "bg-[#e0f2f1] text-[#4E928A] border-0",
    inactive:
      "bg-transparent text-[#e0f2f1] hover:bg-[#e0f2f1] hover:text-[#4E928A] border-0",
    profileDetailActive: "hover:bg-[#3d746e] hover:text-white m-2 border-0",
    profileDetailInactive: "bg-[#4E928A] text-white rounded border-0",
  };

  const fallbackVariant = "primary";

  // Merge the color scheme fix with any custom styles passed in
  const mergedStyles = {
    colorScheme: "normal",
    WebkitColorScheme: "normal",
    ...style,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={mergedStyles}
      className={`${baseStyles} ${
        variantStyles[variant] || variantStyles[fallbackVariant]
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
