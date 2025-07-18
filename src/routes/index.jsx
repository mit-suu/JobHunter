import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import MainLayout from "../layouts/MainLayout";
import CompanyLayout from "../layouts/CompanyLayout";

import ScrollToTop from "../ScrollToTop";
import PrivateRoute from "./PrivateRoute";

import LoginPage from "../pages/authen/LoginPage";
import RegisterPage from "../pages/authen/RegisterPage";
import HomePage from "../pages/home/HomePage";
import AdminPage from "../pages/admin/AdminPage";
import FindJobsPage from "../pages/jobs/FindJobsPage";
import BrowseCompanyPage from "../pages/jobs/BrowseCompanyPage";
import CompanyJobsList from "../pages/jobs/CompanyJobsList";
import CategoryPage from "../pages/jobs/CategoryPage";
import SettingsPage from "../pages/settings/SettingPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import CompanyDashboardPage from "../pages/company/CompanyDashboardPage";
import JobDetailPage from "../pages/jobs/JobDetailPage";
import ApplicantsPage from "../pages/company/ApplicantsPage";

function AppRoutes() {
  const location = useLocation(); 

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route element={<MainLayout />}>
            <Route path="/home" element={<PrivateRoute roleRequired="user"><HomePage /></PrivateRoute>} />
            <Route path="/findjobs" element={<PrivateRoute roleRequired="user"><FindJobsPage /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute roleRequired="user"><SettingsPage /></PrivateRoute>} />
            <Route path="/companies" element={<PrivateRoute roleRequired="user"><BrowseCompanyPage /></PrivateRoute>} />
            <Route path="/companies/:companyName" element={<PrivateRoute roleRequired="user"><CompanyJobsList /></PrivateRoute>} />
            <Route path="/category/:categoryName" element={<PrivateRoute roleRequired="user"><CategoryPage /></PrivateRoute>} />
            <Route path="/profile/:id" element={<PrivateRoute roleRequired="user"><ProfilePage /></PrivateRoute>} />
            <Route path="/jobs/:jobId" element={<PrivateRoute roleRequired="user"><JobDetailPage /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute roleRequired="admin"><AdminPage /></PrivateRoute>} />
          </Route>

          <Route element={<CompanyLayout />}>
            <Route
              path="/company-dashboard"
              element={
                <PrivateRoute roleRequired="Company">
                  <CompanyDashboardPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/company-dashboard/job/:jobId/applicants"
              element={
                <PrivateRoute roleRequired="Company">
                  <ApplicantsPage />
                </PrivateRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
