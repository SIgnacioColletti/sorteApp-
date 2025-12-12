// src/App.jsx - SIN NAVBAR TEMPORALMENTE
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext";

import RegistrationForm from "./pages/RegistrationForm";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import PaymentPending from "./pages/PaymentPending";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Navbar comentado temporalmente */}

          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failure" element={<PaymentFailure />} />
            <Route path="/payment-pending" element={<PaymentPending />} />
            <Route path="/EL-ADMIN-SE-LA-COME/login" element={<AdminLogin />} />
            <Route
              path="/EL-ADMIN-SE-LA-COME/dashboard"
              element={<AdminDashboard />}
            />
          </Routes>

          <Toaster position="top-right" />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
