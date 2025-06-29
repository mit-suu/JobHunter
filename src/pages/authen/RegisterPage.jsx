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
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex min-h-screen w-full overflow-hidden bg-white shadow-lg">
          {/* Left side - Image / Info */}
          <div className="relative flex w-1/2 items-center justify-center bg-[#f9fafb]">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Register Visual"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Rectangle overlay (gray) */}
            <div className="absolute inset-0 bg-[#F8F8FD] opacity-10"></div>
            {/* LOGO */}
            <div className="absolute left-[70px] top-10 z-20">
              <Logo active={false} />
            </div>
            {/* Text Content */}
            <div className="relative z-10 rounded-xl bg-white/60 p-12 text-center shadow-md backdrop-blur">
              <h2 className="mb-6 text-4xl font-bold text-gray-800">
                Join JobHunter!
              </h2>
              <p className="text-lg text-gray-700">
                Over 100K+ people got hired
              </p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex w-1/2 flex-col justify-center px-20">
            <h2 className="mb-6 font-poppins text-3xl font-bold text-gray-800">
              Create your account
            </h2>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  required
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <Button type="submit">Register</Button>

              <p className="mt-4 text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:underline"
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
