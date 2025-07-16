import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Logo from "../common/Logo";
import { HiCog, HiUserCircle, HiOutlineLogout, HiMenu } from "react-icons/hi"

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const findJobsRef = useRef(null);
  const companiesRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(""); // State mới để lưu tên

  // Lấy username từ localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/findjobs" && findJobsRef.current) {
      const { offsetLeft, offsetWidth } = findJobsRef.current;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
        visible: true,
      });
    } else if (location.pathname === "/companies" && companiesRef.current) {
      const { offsetLeft, offsetWidth } = companiesRef.current;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
        visible: true,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, visible: false }));
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    navigate("/login");
    setTimeout(() => {
      alert("Bạn đã logout thành công!");
    }, 100);
  };

  const handleGoToSettings = () => navigate("/settings");
  const handleGoToProfile = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      alert("Không tìm thấy userId!");
    }
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200 dark:bg-[#202430] dark:shadow-none dark:border-none">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left - Logo + Nav */}
        <div className="flex items-center space-x-12">
          <Logo />
          <nav className="relative hidden md:flex space-x-8 text-sm font-medium">
            <span
              className={`absolute bottom-[-5px] h-[3px] bg-[#4640DE] transition-all duration-300 ${
                indicatorStyle.visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            />
            <NavLink
              to="/findjobs"
              ref={findJobsRef}
              className={({ isActive }) =>
                isActive
                  ? "text-[#4640DE] dark:text-white"
                  : "text-gray-600 transition-colors hover:text-[#4640DE] dark:text-white"
              }
            >
              Find Jobs
            </NavLink>
            <NavLink
              to="/companies"
              ref={companiesRef}
              className={({ isActive }) =>
                isActive
                  ? "text-[#4640DE] dark:text-white"
                  : "text-gray-600 transition-colors hover:text-[#4640DE] dark:text-white"
              }
            >
              Browse Companies
            </NavLink>
          </nav>
        </div>

        {/* Right - Settings + Profile + Logout */}
        <div className="hidden md:flex items-center space-x-4 p-5 text-gray-600 dark:text-white">
           <span className="font-semibold text-[#4640DE]">
              Chào, {username}
            </span>
          <button
            onClick={handleGoToSettings}
            className="rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Settings"
          >
            {/* Settings icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>
          </button>

          <button
            onClick={handleGoToProfile}
            className="rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Profile"
          >
            {/* Profile icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>
          </button>

          <button
            onClick={handleLogout}
            className="rounded-md bg-gradient-to-r from-[#6A5AE0] via-[#4640DE] to-[#3a35c9] px-6 py-2 font-semibold text-white transition-all duration-200 hover:opacity-90"
          >
            Logout
          </button>
        </div>

        {/* Hamburger for sm/md */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="block md:hidden text-gray-600 dark:text-white p-2"
        >
          {/* Hamburger icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute right-6 top-full md:hidden bg-white dark:bg-[#202430] shadow-lg w-max text-center">
  <nav className="flex flex-col space-y-4 p-4 text-gray-600 dark:text-white">
    <NavLink to="/findjobs" onClick={() => setMenuOpen(false)}>Find Jobs</NavLink>
    <NavLink to="/companies" onClick={() => setMenuOpen(false)}>Browse Companies</NavLink>
    <button onClick={() => { handleGoToSettings(); setMenuOpen(false); }}>Settings</button>
    <button onClick={() => { handleGoToProfile(); setMenuOpen(false); }}>Profile</button>
    <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
  </nav>
</div>

      )}
    </header>
  );
}

export default Header;
