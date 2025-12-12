
// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getUsers,
  addUser as addUserToFirebase,
  setWinner,
  resetWinners,
} from "../firebase/users";
import toast from "react-hot-toast";

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

  const [loading, setLoading] = useState(true);

  // Cargar usuarios al montar
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
      console.log("✅ Usuarios cargados:", fetchedUsers.length);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Error al cargar participantes");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (userData) => {
    try {
      const newUser = await addUserToFirebase(userData);
      setUsers((prev) => [newUser, ...prev]);
      toast.success(`¡Número asignado: #${newUser.raffleNumber}!`);
      return newUser;
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error(error.message || "Error al agregar participante");
      throw error;
    }
  };

  const markWinner = async (userId) => {
    try {
      await setWinner(userId);
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? { ...user, isWinner: true, winDate: new Date().toISOString() }
            : user
        )
      );
      toast.success("¡Ganador guardado!");
    } catch (error) {
      console.error("Error marking winner:", error);
      toast.error("Error al guardar ganador");
      throw error;
    }
  };

  const resetAllWinners = async () => {
    try {
      await resetWinners();
      setUsers((prev) =>
        prev.map((user) => ({
          ...user,
          isWinner: false,
          winDate: null,
        }))
      );
      toast.success("Sorteo reiniciado");
    } catch (error) {
      console.error("Error resetting winners:", error);
      toast.error("Error al reiniciar sorteo");
      throw error;
    }

  const [currentView, setCurrentView] = useState("home");

  const addUser = (user) => {
    setUsers((prev) => [...prev, user]);

  };

  const value = {
    users,
    setUsers,
    addUser,

    loading,
    refreshUsers: loadUsers,
    markWinner,
    resetAllWinners,

    currentView,
    setCurrentView,

  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
