function Button({ type = 'button', onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-[#4640DE] text-white font-semibold py-3 rounded-sm hover:bg-[#3a35c9] transition-colors duration-200 dark:bg-[#4640DE] dark:hover:bg-[#3a35c9]"
    >
      {children}
    </button>
  );
}

export default Button;
