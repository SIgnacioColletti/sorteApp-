// src/firebase/users.js
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

const USERS_COLLECTION = "users";
const STARTING_NUMBER = 30; // ⭐ Números empiezan desde 30

// Obtener el último número usado
const getLastNumber = async () => {
  try {
    const q = query(
      collection(db, USERS_COLLECTION),
      orderBy("raffleNumber", "desc")
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return STARTING_NUMBER - 1; // Retorna 29, el próximo será 30
    }

    const lastUser = querySnapshot.docs[0].data();
    return lastUser.raffleNumber;
  } catch (error) {
    console.error("Error getting last number:", error);
    return STARTING_NUMBER - 1;
  }
};

// Generar el siguiente número consecutivo
const generateNextNumber = async () => {
  try {
    const lastNumber = await getLastNumber();
    const nextNumber = lastNumber + 1;

    // Asegurar que nunca sea menor al número inicial
    if (nextNumber < STARTING_NUMBER) {
      return STARTING_NUMBER;
    }

    return nextNumber;
  } catch (error) {
    console.error("Error generating next number:", error);
    throw new Error("No se pudo generar el siguiente número");
  }
};

// Verificar si un número ya existe
export const checkNumberExists = async (raffleNumber) => {
  try {
    const q = query(
      collection(db, USERS_COLLECTION),
      where("raffleNumber", "==", raffleNumber)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking number:", error);
    return false;
  }
};

// Agregar nuevo usuario con número consecutivo
export const addUser = async (userData) => {
  try {
    const raffleNumber = await generateNextNumber();

    const newUser = {
      ...userData,
      raffleNumber, // Número natural consecutivo (30, 31, 32...)
      createdAt: Timestamp.now(),
      isWinner: false,
      status: "paid",
      amount: userData.amount || 1000,
    };

    const docRef = await addDoc(collection(db, USERS_COLLECTION), newUser);

    return {
      id: docRef.id,
      ...newUser,
      createdAt: newUser.createdAt.toDate().toISOString(),
    };
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const q = query(
      collection(db, USERS_COLLECTION),
      orderBy("raffleNumber", "asc")
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate().toISOString() ||
        new Date().toISOString(),
      winDate: doc.data().winDate?.toDate().toISOString() || null,
    }));
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

// Marcar ganador
export const setWinner = async (userId) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      isWinner: true,
      winDate: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error setting winner:", error);
    throw error;
  }
};

// Resetear todos los ganadores (para nuevo sorteo)
export const resetWinners = async () => {
  try {
    const q = query(
      collection(db, USERS_COLLECTION),
      where("isWinner", "==", true)
    );

    const querySnapshot = await getDocs(q);

    const updatePromises = querySnapshot.docs.map((document) => {
      return updateDoc(doc(db, USERS_COLLECTION, document.id), {
        isWinner: false,
        winDate: null,
      });
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error("Error resetting winners:", error);
    throw error;
  }
};

// Obtener cantidad total de participantes
export const getTotalUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
    return querySnapshot.size;
  } catch (error) {
    console.error("Error getting total users:", error);
    return 0;
  }
};

// Obtener el número inicial
export const getStartingNumber = () => {
  return STARTING_NUMBER;
};
