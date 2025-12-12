// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../firebase/auth";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import toast from "react-hot-toast";

const AdminLogin = ({ secretPath, onLogin }) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // 🔐 LOGIN CON FIREBASE
  // -----------------------------
  const loginWithFirebase = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      await signIn(credentials.email, credentials.password);
      toast.success("¡Bienvenido!");
      navigate(`/${secretPath}/dashboard`);
    } catch (err) {
      toast.error("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // 🧪 LOGIN DEMO (sin Firebase)
  // -----------------------------
  const loginDemo = (e) => {
    e.preventDefault();

    if (
      credentials.username === "admin" &&
      credentials.password === "admin123"
    ) {
      setError("");
      onLogin?.();
      toast.success("Acceso permitido");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  // Selecciona modo automático
  const useFirebase = !!secretPath;

  const handleSubmit = useFirebase ? loginWithFirebase : loginDemo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="p-8 bg-gray-800 border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-gray-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🔐</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">Acceso Admin</h2>
            <p className="text-gray-400">
              {useFirebase
                ? "Ingresa tus credenciales para continuar"
                : "Modo demo activado"}
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            {useFirebase ? (
              <>
                <Input
                  label="Email"
                  type="email"
                  value={credentials.email}
                  onChange={(v) => setCredentials((p) => ({ ...p, email: v }))}
                  placeholder="admin@sorteo.com"
                  required
                />

                <Input
                  label="Contraseña"
                  type="password"
                  value={credentials.password}
                  onChange={(v) =>
                    setCredentials((p) => ({ ...p, password: v }))
                  }
                  placeholder="••••••••"
                  required
                />
              </>
            ) : (
              <>
                <Input
                  label="Usuario"
                  value={credentials.username}
                  onChange={(v) =>
                    setCredentials((p) => ({ ...p, username: v }))
                  }
                  placeholder="admin"
                  required
                />

                <Input
                  label="Contraseña"
                  type="password"
                  value={credentials.password}
                  onChange={(v) =>
                    setCredentials((p) => ({ ...p, password: v }))
                  }
                  placeholder="admin123"
                  required
                />

                {error && (
                  <div className="bg-red-900 border border-red-700 p-3 rounded mt-4 text-red-200 text-sm">
                    {error}
                  </div>
                )}

                <div className="bg-blue-900 border border-blue-700 p-3 rounded mt-4 text-blue-200 text-xs">
                  Usuario demo: <strong>admin</strong> <br />
                  Contraseña demo: <strong>admin123</strong>
                </div>
              </>
            )}

            {/* BOTÓN */}
            <Button type="submit" disabled={loading} className="w-full mt-6">
              {loading ? "Verificando..." : "Ingresar"}
            </Button>
          </form>

          {/* Volver */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
            >
              ← Volver al inicio
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
