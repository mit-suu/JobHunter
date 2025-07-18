import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roleRequired }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" />;
  }
  const isAuthorized =
    roleRequired === "user"
      ? role === "user" || role === "admin"
      : role === roleRequired;

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
