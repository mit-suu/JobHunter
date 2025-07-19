import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { handleGoogleLogin } from "../../services/authService";
import { getUsers } from "../../services/userService";
import Button from "../../components/common/Button";
import Logo from "../../components/common/Logo";
import GoogleCustomLogin from "../../components/authen/GoogleCustomLogin";

function LoginPage() {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("user");
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const users = await getUsers();
    const matchedUser = users.find(
      (u) => u.username === userUsername && u.password === userPassword,
    );
    if (matchedUser) {
      localStorage.setItem("role", matchedUser.isAdmin ? "admin" : "user");
      localStorage.setItem("username", matchedUser.username);
      localStorage.setItem("userId", matchedUser.id);
      if (matchedUser.isAdmin) navigate("/admin");
      else navigate("/home");
    } else {
      alert("Sai username hoặc password!");
    }
  };

  const onGoogleLogin = async (userDataFromGoogle) => {
    const user = await handleGoogleLogin(userDataFromGoogle);
    if (user) {
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.username);
      localStorage.setItem("userId", user.id);
      if (user.isAdmin) navigate("/admin");
      else navigate("/home");
    } else {
      alert("Đăng nhập bằng Google thất bại.");
    }
  };
  const onGoogleLoginError = () => {
    alert("Đăng nhập bằng Google thất bại.");
  };

  const handleCompanyLogin = async (e) => {
    e.preventDefault();
    const users = await getUsers();
    const matchedCompany = users.find(
      (u) =>
        u.email === companyEmail &&
        u.password === companyPassword &&
        u.role === "Company",
    );
    if (matchedCompany) {
      localStorage.setItem("role", "Company");
      localStorage.setItem("username", matchedCompany.username);
      localStorage.setItem("userId", matchedCompany.id);
      navigate("/company-dashboard");
    } else {
      alert("Email hoặc mật khẩu của công ty không đúng!");
    }
  };

  const formVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex min-h-screen w-full overflow-hidden bg-white shadow-lg">
          {/* Left side */}
          <div className="relative hidden w-1/2 items-center justify-center bg-[#f9fafb] md:flex">
            <AnimatePresence>
              <motion.img
                key={formType}
                src={
                  formType === "user"
                    ? "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    : "https://images.unsplash.com/photo-1554232456-8727aae0cfa4?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt="Login Visual"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gray-800 opacity-20"></div>
            <div className="absolute left-[70px] top-10 z-20">
              <Logo active={false} />
            </div>
            <div className="relative z-10 rounded-xl bg-white/70 p-12 text-center shadow-md backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={formType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="mb-6 text-4xl font-bold text-gray-800">
                    {formType === "user"
                      ? "Welcome Back!"
                      : "Empower Your Team!"}
                  </h2>
                  <p className="text-lg text-gray-700">
                    {formType === "user"
                      ? "Login to continue your journey"
                      : "Find the best candidates"}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right side - Form container */}
          <div className="flex w-full flex-col justify-center overflow-hidden px-8 sm:px-12 md:w-1/2 md:px-20">
            <AnimatePresence mode="wait">
              {formType === "user" && (
                <motion.div
                  key="user-form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <h2 className="mb-6 font-poppins text-3xl font-bold text-gray-800 dark:text-white">
                    Login to your account
                  </h2>
                  <form onSubmit={handleUserLogin} className="space-y-5">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Username
                      </label>
                      <input
                        type="text"
                        value={userUsername}
                        onChange={(e) => setUserUsername(e.target.value)}
                        placeholder="Enter username"
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </label>
                      <input
                        type="password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    <Button type="submit">Login</Button>
                  </form>
                  <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    <span className="mx-4 flex-shrink text-sm text-gray-400">
                      Or continue with
                    </span>
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="flex justify-center">
                    <GoogleCustomLogin
                      onLoginSuccess={onGoogleLogin}
                      onLoginError={onGoogleLoginError}
                    />
                  </div>
                  <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    Are you an employer?{" "}
                    <button
                      onClick={() => setFormType("company")}
                      className="font-semibold text-blue-600 hover:underline dark:text-purple-400"
                    >
                      Login here
                    </button>
                  </p>
                  <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don’t have an account?{" "}
                    <Link
                      to="/register"
                      className="font-semibold text-purple-600 hover:underline dark:text-purple-400"
                    >
                      Register
                    </Link>
                  </p>
                </motion.div>
              )}

              {formType === "company" && (
                <motion.div
                  key="company-form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="rounded-lg bg-gray-50 p-8 shadow-inner dark:bg-gray-700/50">
                    <h2 className="mb-6 font-poppins text-3xl font-bold text-gray-800 dark:text-white">
                      Company Login
                    </h2>
                    <form onSubmit={handleCompanyLogin} className="space-y-5">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Company Email
                        </label>
                        <input
                          type="email"
                          value={companyEmail}
                          onChange={(e) => setCompanyEmail(e.target.value)}
                          placeholder="Enter company email"
                          className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Password
                        </label>
                        <input
                          type="password"
                          value={companyPassword}
                          onChange={(e) => setCompanyPassword(e.target.value)}
                          placeholder="Enter password"
                          className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="!bg-purple-600 hover:!bg-purple-700"
                      >
                        Login as Company
                      </Button>
                    </form>
                    <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                      Not a company?{" "}
                      <button
                        onClick={() => setFormType("user")}
                        className="font-semibold text-purple-600 hover:underline dark:text-purple-400"
                      >
                        Login as User
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginPage;
