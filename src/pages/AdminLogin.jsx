// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../firebase/auth";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Card from "../components/common/Card";
import toast from "react-hot-toast";

const AdminLogin = ({ secretPath }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      await signIn(credentials.email, credentials.password);
      toast.success("¡Bienvenido!");
      navigate(`/${secretPath}/dashboard`);
    } catch (error) {
      toast.error(error.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="p-8 bg-gray-800 border border-gray-700">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-gray-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Acceso Restringido
            </h2>
            <p className="text-gray-400">Panel de administración</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="admin@sorteo.com"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="animate-spin">⏳</span>
                  <span>Verificando...</span>
                </span>
              ) : (
                "Ingresar"
              )}
            </button>
          </form>

          {/* Botón oculto para volver */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
            >
              ←
            </button>
          </div>

          {/* Instrucciones para crear admin (solo visible en desarrollo) */}
          <div className="mt-6 bg-yellow-900 bg-opacity-30 border border-yellow-700 p-4 rounded-lg">
            <p className="text-xs text-yellow-300 mb-2">
              <strong>⚠️ Primera vez:</strong> Crea tu usuario admin
            </p>
            <p className="text-xs text-yellow-400 font-mono">
              Abre la consola (F12) y ejecuta:
            </p>
            <pre className="text-xs text-yellow-200 bg-gray-900 p-2 rounded mt-2 overflow-x-auto">
              {`import { createAdmin } from './src/firebase/auth';
createAdmin('admin@sorteo.com', 'TuPassword123!');`}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
