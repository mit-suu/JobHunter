import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import Logo from '../common/Logo';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const findJobsRef = useRef(null);
  const companiesRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, visible: false });

  useEffect(() => {
    if (location.pathname === '/findjobs' && findJobsRef.current) {
      const { offsetLeft, offsetWidth } = findJobsRef.current;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth, visible: true });
    } else if (location.pathname === '/companies' && companiesRef.current) {
      const { offsetLeft, offsetWidth } = companiesRef.current;
      setIndicatorStyle({ left: offsetLeft, width: offsetWidth, visible: true });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, visible: false })); // Hide on /home or others
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/login');
    setTimeout(() => {
      alert('Bạn đã logout thành công!');
    }, 100);
  };

  const handleGoToSettings = () => {
    navigate('/settings');
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Left - Logo + Nav */}
        <div className="flex items-center space-x-12">
          <Logo />
          <nav className="relative flex space-x-8 text-sm font-medium">
            {/* Underline bar (always rendered but toggled) */}
            <span
              className={`absolute bottom-[-5px] h-[3px] bg-[#4640DE] transition-all duration-300 ${
                indicatorStyle.visible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            />
            <NavLink
              to="/findjobs"
              ref={findJobsRef}
              className={({ isActive }) =>
                isActive
                  ? 'text-[#4640DE]'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#4640DE] transition-colors'
              }
            >
              Find Jobs
            </NavLink>
            <NavLink
              to="/companies"
              ref={companiesRef}
              className={({ isActive }) =>
                isActive
                  ? 'text-[#4640DE]'
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#4640DE] transition-colors'
              }
            >
              Browse Companies
            </NavLink>
          </nav>
        </div>

        {/* Right - Settings + Logout */}
        <div className="flex items-center space-x-4 p-5">
          <button
            onClick={handleGoToSettings}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            title="Settings"
          >
            {/* Icon SVG nếu có */}
          </button>
          <button
            className="px-6 py-2 bg-gradient-to-r from-[#6A5AE0] via-[#4640DE] to-[#3a35c9] text-white font-semibold rounded-md hover:opacity-90 transition-all duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
