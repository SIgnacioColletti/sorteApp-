// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { onAuthChange } from "./firebase/auth";
import Navbar from "./components/layout/Navbar";
import RegistrationForm from "./pages/RegistrationForm";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PaymentSuccess from "./pages/PaymentSuccess"; // ⭐ NUEVO
import PaymentFailure from "./pages/PaymentFailure"; // ⭐ NUEVO
import PaymentPending from "./pages/PaymentPending"; // ⭐ NUEVO
import toast from "react-hot-toast";

const SECRET_ADMIN_PATH = "EL-ADMIN-SE-LA-COME";

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    toast.error("Debes iniciar sesión para acceder");
    return <Navigate to={`/${SECRET_ADMIN_PATH}/login`} replace />;
  }
  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const App = () => {
    const [currentView, setCurrentView] = useState("home");
    const [isAdmin, setIsAdmin] = useState(false);

    const handleAdminLogin = () => {
      setIsAdmin(true);
      setCurrentView("admin");
    };
  };
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        {window.location.pathname.includes(SECRET_ADMIN_PATH) && (
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            secretPath={SECRET_ADMIN_PATH}
          />
        )}

        <Routes>
          {/* Ruta pública - Registro */}
          <Route path="/" element={<RegistrationForm />} />

          {/* ⭐ NUEVAS RUTAS DE PAGO */}
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          <Route path="/payment-pending" element={<PaymentPending />} />

          {/* Rutas admin */}
          <Route
            path={`/${SECRET_ADMIN_PATH}/login`}
            element={
              isAuthenticated ? (
                <Navigate to={`/${SECRET_ADMIN_PATH}/dashboard`} replace />
              ) : (
                <AdminLogin secretPath={SECRET_ADMIN_PATH} />
              )
            }
          />

          <Route
            path={`/${SECRET_ADMIN_PATH}/dashboard`}
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Cualquier otra ruta */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />

        {currentView === "home" && <RegistrationForm />}
        {currentView === "login" && <AdminLogin onLogin={handleAdminLogin} />}
        {currentView === "admin" && isAdmin && <AdminDashboard />}
      </div>
    </AppProvider>
  );
};

export default App;
