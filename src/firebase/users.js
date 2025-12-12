// src/firebase/users.js
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const USERS_COLLECTION = "users";

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, orderBy("raffleNumber", "asc"));
    const querySnapshot = await getDocs(q);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return users;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw error;
  }
};

// Obtener siguiente número de sorteo
export const getNextRaffleNumber = async () => {
  try {
    const users = await getUsers();

    if (users.length === 0) {
      return 0; // Primer número
    }

    const maxNumber = Math.max(...users.map((u) => u.raffleNumber));
    return maxNumber + 1;
  } catch (error) {
    console.error("Error obteniendo siguiente número:", error);
    throw error;
  }
};

// Agregar nuevo usuario
export const addUser = async (userData) => {
  try {
    const raffleNumber = await getNextRaffleNumber();

    const newUser = {
      ...userData,
      raffleNumber,
      createdAt: new Date().toISOString(),
      isWinner: false,
      status: "paid",
    };

    const docRef = await addDoc(collection(db, USERS_COLLECTION), newUser);

    return {
      id: docRef.id,
      ...newUser,
    };
  } catch (error) {
    console.error("Error agregando usuario:", error);
    throw error;
  }
};

// Marcar ganador
export const markWinner = async (userId) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      isWinner: true,
      winDate: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error marcando ganador:", error);
    throw error;
  }
};

// Resetear todos los ganadores
export const resetAllWinners = async () => {
  try {
    const users = await getUsers();
    const winners = users.filter((u) => u.isWinner);

    const updatePromises = winners.map((winner) => {
      const userRef = doc(db, USERS_COLLECTION, winner.id);
      return updateDoc(userRef, {
        isWinner: false,
        winDate: null,
      });
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error("Error reseteando ganadores:", error);
    throw error;
  }
};
