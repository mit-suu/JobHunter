import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/userService";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import Logo from "../../components/common/Logo";
import { motion } from "framer-motion";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const users = await getUsers();

    const matchedUser = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (matchedUser) {
      localStorage.setItem("role", matchedUser.isAdmin ? "admin" : "user");
      localStorage.setItem("username", matchedUser.username);
      localStorage.setItem("userId", matchedUser.id);

      if (matchedUser.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } else {
      alert("Sai username hoặc password!");
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
              alt="Login Visual"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Rectangle overlay (gray) */}
            <div className="absolute inset-0 bg-[#F8F8FD] opacity-10"></div>
            {/* logo */}
            <div className="absolute left-[70px] top-10 z-20">
              <Logo active={false} />
            </div>
            {/* Text Content */}
            <div className="relative z-10 rounded-xl bg-white/60 p-12 text-center shadow-md backdrop-blur">
              <h2 className="mb-6 text-4xl font-bold text-gray-800">
                Welcome Back!
              </h2>
              <p className="text-lg text-gray-700">
                Login to continue your journey
              </p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="flex w-1/2 flex-col justify-center px-20">
            <h2 className="mb-6 font-poppins text-3xl font-bold text-gray-800">
              Login to your account
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">
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

              <Button type="submit">Login</Button>

              <p className="mt-4 text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginPage;
