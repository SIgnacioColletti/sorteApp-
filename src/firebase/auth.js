// src/firebase/auth.js
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./config";

// Login
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);

    if (error.code === "auth/invalid-credential") {
      throw new Error("Email o contraseña incorrectos");
    } else if (error.code === "auth/user-not-found") {
      throw new Error("Usuario no encontrado");
    } else if (error.code === "auth/wrong-password") {
      throw new Error("Contraseña incorrecta");
    } else {
      throw new Error("Error al iniciar sesión");
    }
  }
};

// Logout
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Escuchar cambios de autenticación
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// ⭐ Crear usuario admin (USAR SOLO UNA VEZ)
export const createAdmin = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("✅ Usuario admin creado:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};
