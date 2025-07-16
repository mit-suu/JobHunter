// src/App.jsx
import { useEffect } from "react";
import AppRoutes from "./routes";

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
    <div className="App">
      <div className="mouse-aura " />
      <AppRoutes />
    </div>
  );
}

export default App;
