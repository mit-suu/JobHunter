import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRoutes from "./routes";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = `${e.clientX}px`;
      const y = `${e.clientY}px`;
      document.documentElement.style.setProperty("--mouse-x", x);
      document.documentElement.style.setProperty("--mouse-y", y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <Router>
          <div className="App">
            <div className="mouse-aura" />
            <AppRoutes />
          </div>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;