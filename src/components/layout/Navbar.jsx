<<<<<<< HEAD
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
=======
import React from "react";
import Button from "../common/Button";

const Navbar = ({ currentView, setCurrentView, isAdmin, setIsAdmin }) => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🎲 Sorteo App
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isAdmin ? (
              <>
                <button
                  onClick={() => setCurrentView("home")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentView === "home"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Inicio
                </button>
                <button
                  onClick={() => setCurrentView("login")}
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Admin
                </button>
              </>
            ) : (
              <>
                <span className="text-gray-600">Panel Admin</span>
                <Button
                  onClick={() => {
                    setIsAdmin(false);
                    setCurrentView("home");
                  }}
                  variant="outline"
                  size="sm"
                >
                  Salir
                </Button>
              </>
            )}
          </div>
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
