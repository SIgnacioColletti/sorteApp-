// src/firebase/raffles.js
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

const RAFFLES_COLLECTION = "raffles";
const ARCHIVED_USERS_COLLECTION = "archivedUsers";

// Crear nuevo sorteo
export const createRaffle = async () => {
  try {
    const newRaffle = {
      startDate: new Date().toISOString(),
      status: "active",
      totalParticipants: 0,
      winner: null,
      endDate: null,
    };

    const docRef = await addDoc(collection(db, RAFFLES_COLLECTION), newRaffle);

    return {
      id: docRef.id,
      ...newRaffle,
    };
  } catch (error) {
    console.error("Error creando sorteo:", error);
    throw error;
  }
};

// Obtener sorteo activo
export const getActiveRaffle = async () => {
  try {
    const rafflesRef = collection(db, RAFFLES_COLLECTION);
    const q = query(rafflesRef, orderBy("startDate", "desc"));
    const querySnapshot = await getDocs(q);

    let activeRaffle = null;
    querySnapshot.forEach((doc) => {
      if (doc.data().status === "active" && !activeRaffle) {
        activeRaffle = {
          id: doc.id,
          ...doc.data(),
        };
      }
    });

    return activeRaffle;
  } catch (error) {
    console.error("Error obteniendo sorteo activo:", error);
    throw error;
  }
};

// Obtener todos los sorteos (historial)
export const getAllRaffles = async () => {
  try {
    const rafflesRef = collection(db, RAFFLES_COLLECTION);
    const q = query(rafflesRef, orderBy("startDate", "desc"));
    const querySnapshot = await getDocs(q);

    const raffles = [];
    querySnapshot.forEach((doc) => {
      raffles.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return raffles;
  } catch (error) {
    console.error("Error obteniendo sorteos:", error);
    throw error;
  }
};

// Finalizar sorteo y archivar participantes
export const finalizeRaffle = async (raffleId, winnerData, allUsers) => {
  try {
    // Actualizar estado del sorteo
    const raffleRef = doc(db, RAFFLES_COLLECTION, raffleId);
    await updateDoc(raffleRef, {
      status: "completed",
      endDate: new Date().toISOString(),
      winner: {
        id: winnerData.id,
        fullName: winnerData.fullName,
        email: winnerData.email,
        raffleNumber: winnerData.raffleNumber,
      },
      totalParticipants: allUsers.length,
    });

    // Archivar todos los participantes de este sorteo
    const archivePromises = allUsers.map((user) => {
      return addDoc(collection(db, ARCHIVED_USERS_COLLECTION), {
        ...user,
        raffleId: raffleId,
        archivedAt: new Date().toISOString(),
      });
    });

    await Promise.all(archivePromises);

    return true;
  } catch (error) {
    console.error("Error finalizando sorteo:", error);
    throw error;
  }
};

// Obtener participantes archivados de un sorteo
export const getArchivedUsers = async (raffleId) => {
  try {
    const archivedRef = collection(db, ARCHIVED_USERS_COLLECTION);
    const q = query(archivedRef, orderBy("raffleNumber", "asc"));
    const querySnapshot = await getDocs(q);

    const users = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.raffleId === raffleId) {
        users.push({
          id: doc.id,
          ...data,
        });
      }
    });

    return users;
  } catch (error) {
    console.error("Error obteniendo usuarios archivados:", error);
    throw error;
  }
};
