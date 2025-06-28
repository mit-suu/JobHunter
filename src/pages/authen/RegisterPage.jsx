import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../services/userService";
import { Link } from "react-router-dom";
import { createDefaultUser } from "../../utils/entitiesUtils";
import Button from "../../components/common/Button";
import Logo from "../../components/common/Logo";

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const newUser = createDefaultUser({
      username,
      email,
      password,
      isAdmin: false,
    });

    const createdUser = await addUser(newUser);

    if (createdUser) {
      alert("Đăng ký thành công! Mời bạn đăng nhập.");
      navigate("/login");
    } else {
      alert("Có lỗi xảy ra khi đăng ký!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex w-full min-h-screen bg-white shadow-lg overflow-hidden">
          {/* Left side - Image / Info */}
          <div className="w-1/2 bg-[#f9fafb] relative flex items-center justify-center">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Register Visual"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Rectangle overlay (gray) */}
            <div className="absolute inset-0 bg-[#F8F8FD] opacity-10"></div>
            {/* LOGO */}
            <div className="absolute top-10 left-[70px] z-20">
              <Logo active={false} />
            </div>
            {/* Text Content */}
            <div className="relative z-10 text-center p-12 bg-white/60 rounded-xl shadow-md backdrop-blur">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Join JobHunter!
              </h2>
              <p className="text-lg text-gray-700">
                Over 100K+ people got hired
              </p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-1/2 flex flex-col justify-center px-20">
            <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-6">
              Create your account
            </h2>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <Button type="submit">Register</Button>

              <p className="text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default RegisterPage;
