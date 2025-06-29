// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white transition-colors duration-300 dark:bg-gray-900">
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
