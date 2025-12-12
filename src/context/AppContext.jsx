// src/context/AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getUsers,
  addUser as addUserToFirebase,
  markWinner as markWinnerInFirebase,
  resetAllWinners as resetAllWinnersInFirebase,
} from "../firebase/users";
import toast from "react-hot-toast";
import {
  createRaffle,
  getActiveRaffle,
  getAllRaffles,
  finalizeRaffle,
  getArchivedUsers,
} from "../firebase/raffles";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe usarse dentro de AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentRaffle, setCurrentRaffle] = useState(null);
  const [raffleHistory, setRaffleHistory] = useState([]);
  // Cargar usuarios
  const refreshUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      toast.error("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  // Agregar usuario
  const addUser = async (userData) => {
    try {
      const newUser = await addUserToFirebase(userData);
      await refreshUsers();
      return newUser;
    } catch (error) {
      console.error("Error agregando usuario:", error);
      toast.error("Error al agregar usuario");
      throw error;
    }
  };

  // Marcar ganador
  const markWinner = async (userId) => {
    try {
      await markWinnerInFirebase(userId);
      await refreshUsers();
      toast.success("¡Ganador registrado!");
    } catch (error) {
      console.error("Error marcando ganador:", error);
      toast.error("Error al marcar ganador");
      throw error;
    }
  };

  // Resetear ganadores
  const resetAllWinners = async () => {
    try {
      await resetAllWinnersInFirebase();
      await refreshUsers();
      toast.success("Ganadores reseteados");
    } catch (error) {
      console.error("Error reseteando ganadores:", error);
      toast.error("Error al resetear");
      throw error;
    }
  };
  // Inicializar sorteo activo
  const initializeRaffle = async () => {
    try {
      let activeRaffle = await getActiveRaffle();

      if (!activeRaffle) {
        // Si no hay sorteo activo, crear uno
        activeRaffle = await createRaffle();
        toast.success("Nuevo sorteo iniciado");
      }

      setCurrentRaffle(activeRaffle);
    } catch (error) {
      console.error("Error inicializando sorteo:", error);
    }
  };

  // Cargar historial de sorteos
  const loadRaffleHistory = async () => {
    try {
      const history = await getAllRaffles();
      setRaffleHistory(history);
    } catch (error) {
      console.error("Error cargando historial:", error);
    }
  };

  // Nuevo sorteo (archivar actual y crear nuevo)
  const startNewRaffle = async () => {
    try {
      if (!currentRaffle) return;

      const winner = users.find((u) => u.isWinner);

      if (winner) {
        // Finalizar sorteo actual y archivar participantes
        await finalizeRaffle(currentRaffle.id, winner, users);
      }

      // Crear nuevo sorteo
      const newRaffle = await createRaffle();
      setCurrentRaffle(newRaffle);

      // Resetear ganadores (esto limpiará la colección actual)
      await resetAllWinners();

      // Recargar historial
      await loadRaffleHistory();

      toast.success(
        "¡Nuevo sorteo iniciado! Los participantes anteriores fueron archivados."
      );

      return newRaffle;
    } catch (error) {
      console.error("Error iniciando nuevo sorteo:", error);
      toast.error("Error al iniciar nuevo sorteo");
      throw error;
    }
  };

  // Cargar al montar
  useEffect(() => {
    initializeRaffle();
    loadRaffleHistory();
    refreshUsers();
  }, []);
  const value = {
    users,
    loading,
    refreshUsers,
    addUser,
    markWinner,
    resetAllWinners,
    currentRaffle, // ⭐ NUEVO
    raffleHistory, // ⭐ NUEVO
    startNewRaffle, // ⭐ NUEVO
    getArchivedUsers, // ⭐ NUEVO
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
