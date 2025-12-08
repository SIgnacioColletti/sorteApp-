// src/components/layout/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../firebase/auth";
import toast from "react-hot-toast";

const Navbar = ({ isAuthenticated, setIsAuthenticated, secretPath }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      toast.success("Sesión cerrada");
      navigate("/");
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Título */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🎟️</span>
              </div>
              <span className="text-xl font-bold text-gray-800">
                Sorteo App
              </span>
            </button>
          </div>

          {/* Botones de navegación */}
          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/${secretPath}/dashboard`)}
                className="text-gray-600 hover:text-gray-800 font-medium flex items-center space-x-1"
              >
                <span>📊</span>
                <span>Dashboard</span>
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1"
              >
                <span>🚪</span>
                <span>Salir</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
