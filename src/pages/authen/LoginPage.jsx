import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../services/userService';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Logo from "../../components/common/Logo";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const users = await getUsers();

    const matchedUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (matchedUser) {
      localStorage.setItem('role', matchedUser.isAdmin ? 'admin' : 'user');
      localStorage.setItem('username', matchedUser.username);

      if (matchedUser.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } else {
      alert('Sai username hoặc password!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full h-[850px] bg-white shadow-lg overflow-hidden">

        {/* Left side - Image / Info */}
        <div className="w-1/2 bg-[#f9fafb] relative flex items-center justify-center">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login Visual"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Rectangle overlay (gray) */}
          <div className="absolute inset-0 bg-[#F8F8FD] opacity-10"></div>
{/* logo */}
<div className="absolute top-10 left-[70px] z-20">
  <Logo active={false} />
</div>
          {/* Text Content */}
          <div className="relative z-10 text-center p-12 bg-white/60 rounded-xl shadow-md backdrop-blur">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
            <p className="text-lg text-gray-700">Login to continue your journey</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-1/2 flex flex-col justify-center px-20">
          <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-6">Login to your account</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <Button type="submit">Login</Button>

            <p className="text-sm text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
