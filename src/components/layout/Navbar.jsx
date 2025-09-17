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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
