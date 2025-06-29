import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function Logo({ active = true }) {
  const { theme } = useTheme();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/home") {
      window.scrollTo({ top: 0, behavior: "smooth" }); // cuộn lên đầu
    }
  };

  return (
    <Link
      to="/home"
      onClick={handleClick}
      className={`cursor-pointer font-poppins text-4xl font-black italic transition-colors duration-200 ${theme === "dark" ? "text-white" : active ? "text-[#25324B]" : "text-white"} `}
    >
      JobHunter
    </Link>
  );
}

export default Logo;
