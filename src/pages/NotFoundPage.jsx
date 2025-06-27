import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

function NotFoundPage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('role') !== null;

  const handleGoBack = () => {
    if (isLoggedIn) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
      <h1 className="text-7xl font-bold text-[#4640DE] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button className="py-3 px-6 bg-gradient-to-r from-[#6A5AE0] via-[#4640DE] to-[#3a35c9] text-white font-semibold rounded-md hover:opacity-90 transition-all duration-200" onClick={handleGoBack}>Go Home</button>
    </div>
  );
}

export default NotFoundPage;
