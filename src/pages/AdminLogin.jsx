import React, { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Card from "../components/common/Card";

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (
      credentials.username === "admin" &&
      credentials.password === "admin123"
    ) {
      onLogin();
      setError("");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-gray-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Panel Admin
            </h2>
            <p className="text-gray-600">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          <div>
            <Input
              label="Usuario"
              value={credentials.username}
              onChange={(value) =>
                setCredentials((prev) => ({ ...prev, username: value }))
              }
              placeholder="admin"
              required
            />

            <Input
              label="Contraseña"
              type="password"
              value={credentials.password}
              onChange={(value) =>
                setCredentials((prev) => ({ ...prev, password: value }))
              }
              placeholder="admin123"
              required
            />

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
              <p className="text-xs text-blue-600">
                <strong>Demo:</strong> usuario: admin, contraseña: admin123
              </p>
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Ingresar
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
