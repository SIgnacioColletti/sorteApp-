import React, { useState } from "react";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/layout/Navbar";
import RegistrationForm from "./pages/RegistrationForm";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setCurrentView("admin");
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
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
