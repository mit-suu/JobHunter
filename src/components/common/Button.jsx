function Button({ type = "button", onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full rounded-sm bg-[#4640DE] py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#3a35c9] dark:bg-[#4640DE] dark:hover:bg-[#3a35c9]"
    >
      {children}
    </button>
  );
}

export default Button;
