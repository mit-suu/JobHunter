import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/common/Logo";

// Header đơn giản dành cho Company
function CompanyHeader() {
    const navigate = useNavigate();
    const companyName = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Logo />
                <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700 dark:text-white">
                        {companyName}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}


function CompanyLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 transition-colors duration-300 dark:bg-gray-900">
      <CompanyHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default CompanyLayout;
