// backend/routes/emails.js
import express from "express";
import {
  sendConfirmationEmail,
  sendWinnerEmail,
} from "../services/emailService.js";

const router = express.Router();

// Enviar email de confirmación
router.post("/send-confirmation", async (req, res) => {
  const { fullName, email, raffleNumber } = req.body;

  console.log("📧 Solicitud de email de confirmación para:", email);

  // Validar datos
  if (!fullName || !email || !raffleNumber) {
    console.error("❌ Datos incompletos:", { fullName, email, raffleNumber });
    return res.status(400).json({
      error: "Datos incompletos",
      details: "Se requieren: fullName, email, raffleNumber",
    });
  }

  try {
    const result = await sendConfirmationEmail({
      fullName,
      email,
      raffleNumber,
    });

    console.log("✅ Email de confirmación enviado exitosamente");

    res.json({
      success: true,
      message: "Email de confirmación enviado",
      messageId: result.messageId,
    });
  } catch (error) {
    console.error("❌ Error enviando email de confirmación:", error);

    res.status(500).json({
      error: "Error al enviar email",
      details: error.message,
    });
  }
});

// Enviar email de ganador
router.post("/send-winner", async (req, res) => {
  const { fullName, email, raffleNumber } = req.body;

  console.log("🏆 Solicitud de email de ganador para:", email);

  // Validar datos
  if (!fullName || !email || !raffleNumber) {
    console.error("❌ Datos incompletos:", { fullName, email, raffleNumber });
    return res.status(400).json({
      error: "Datos incompletos",
      details: "Se requieren: fullName, email, raffleNumber",
    });
  }

  try {
    const result = await sendWinnerEmail({
      fullName,
      email,
      raffleNumber,
    });

    console.log("✅ Email de ganador enviado exitosamente");

    res.json({
      success: true,
      message: "Email de ganador enviado",
      messageId: result.messageId,
    });
  } catch (error) {
    console.error("❌ Error enviando email de ganador:", error);

    res.status(500).json({
      error: "Error al enviar email",
      details: error.message,
    });
  }
});

// Test de configuración de emails
router.get("/test", async (req, res) => {
  console.log("🧪 Test de configuración de emails");

  const config = {
    emailConfigured: !!process.env.EMAIL_USER,
    emailUser: process.env.EMAIL_USER || "NO CONFIGURADO",
  };

  console.log("📊 Configuración:", config);

  res.json({
    message: "Endpoint de emails funcionando",
    config,
  });
});

export default router;
