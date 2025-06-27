import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from "../ScrollToTop"; 
import LoginPage from '../pages/authen/LoginPage';
import RegisterPage from '../pages/authen/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import AdminPage from '../pages/admin/AdminPage';
import HomePage from '../pages/home/HomePage';
import FindJobsPage from '../pages/jobs/FindJobsPage';
import SettingsPage from '../pages/settings/SettingPage';
import MainLayout from '../layouts/MainLayout';
import BrowseCompanyPage from '../pages/jobs/BrowseCompanyPage';
const AppRoutes = () => {
  return (
    
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Routes có layout dùng MainLayout */}
        <Route element={<MainLayout />}>
          <Route
            path="/home"
            element={
              <PrivateRoute roleRequired="user">
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/findjobs"
            element={
              <PrivateRoute roleRequired="user">
                <FindJobsPage/>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute roleRequired="user">
                <SettingsPage />
              </PrivateRoute>
            }
          /><Route
            path="/companies"
            element={
              <PrivateRoute roleRequired="user">
                <BrowseCompanyPage/>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute roleRequired="admin">
                <AdminPage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
