import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState("home");

  const addUser = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  const value = {
    users,
    setUsers,
    addUser,
    currentView,
    setCurrentView,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
