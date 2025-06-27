import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roleRequired }) => {
  const role = localStorage.getItem('role');

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && role !== roleRequired) {
        return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
