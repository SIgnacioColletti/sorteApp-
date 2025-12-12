// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      toast.success("¡Bienvenido Admin!");
      navigate("/EL-ADMIN-SE-LA-COME/dashboard");
    } catch (error) {
      console.error("Error de login:", error);
      toast.error("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setCredentials({
      email: "admin@sorteo.com",
      password: "admin123",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-4xl">🔐</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Panel de Administración
            </h1>
            <p className="text-gray-600 text-sm">
              Acceso exclusivo para administradores
            </p>
          </div>

          {showDemo && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 mb-3 font-medium">
                🎯 Modo demo activado
              </p>
              <div className="text-xs text-blue-700 space-y-1">
                <p>
                  <strong>Usuario demo:</strong> admin
                </p>
                <p>
                  <strong>Contraseña demo:</strong> admin123
                </p>
              </div>
              <button
                onClick={handleDemoLogin}
                className="mt-3 text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Usar credenciales demo
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Usuario"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="admin@sorteo.com"
              required
            />

            <Input
              label="Contraseña"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••••••"
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              ← Volver al inicio
            </button>
          </div>
        </Card>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">
            Acceso restringido - Credenciales requeridas
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
