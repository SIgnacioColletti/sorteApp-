// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentsRouter from "./routes/payments.js";
import emailsRouter from "./routes/emails.js"; // ⭐ NUEVO

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use("/api/payments", paymentsRouter);
app.use("/api/emails", emailsRouter); // ⭐ NUEVO

// Ruta de health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend funcionando correctamente",
    timestamp: new Date().toISOString(),
  });
});

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "🎟️ Sorteo App API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      createPreference: "/api/payments/create_preference",
      webhook: "/api/payments/webhook",
      verifyPayment: "/api/payments/payment/:id",
      sendConfirmation: "/api/emails/send-confirmation", // ⭐ NUEVO
      sendWinner: "/api/emails/send-winner", // ⭐ NUEVO
    },
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Error interno del servidor",
    message: err.message,
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 ======================================`);
  console.log(`🚀 Backend corriendo en puerto ${PORT}`);
  console.log(`🚀 http://localhost:${PORT}`);
  console.log(`🚀 ======================================\n`);
  console.log(`📡 CORS permitido: ${process.env.FRONTEND_URL}`);
  console.log(
    `💳 Mercado Pago: ${
      process.env.MP_ACCESS_TOKEN ? "Configurado ✅" : "NO configurado ❌"
    }`
  );
  console.log(
    `📧 Email: ${
      process.env.EMAIL_USER ? "Configurado ✅" : "NO configurado ❌"
    }`
  ); // ⭐ NUEVO
  console.log("");
});

export default app;
