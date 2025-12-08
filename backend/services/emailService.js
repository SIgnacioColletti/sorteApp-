// backend/services/emailService.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = null;
let etherealCredentials = null;

// Crear transporter con Ethereal
const initializeTransporter = async () => {
  try {
    console.log("📧 Creando cuenta de prueba Ethereal...");

    // Crear cuenta de prueba
    const testAccount = await nodemailer.createTestAccount();
    etherealCredentials = testAccount;

    // Crear transporter
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    console.log("\n✅ ==========================================");
    console.log("✅ ETHEREAL EMAIL CONFIGURADO");
    console.log("✅ ==========================================");
    console.log("📧 Usuario:", testAccount.user);
    console.log("📧 Password:", testAccount.pass);
    console.log("📧 Ver emails en: https://ethereal.email/login");
    console.log("✅ ==========================================\n");
  } catch (error) {
    console.error("❌ Error inicializando Ethereal:", error);
    throw error;
  }
};

// Inicializar
await initializeTransporter();

// Email de confirmación
export const sendConfirmationEmail = async (userData) => {
  const { fullName, email, raffleNumber } = userData;

  const mailOptions = {
    from: '"Sorteo App" <sorteo@ethereal.email>',
    to: email,
    subject: "🎟️ ¡Confirmación de Participación en el Sorteo!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .number-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px;
            margin: 20px 0;
          }
          .number {
            font-size: 48px;
            font-weight: bold;
            margin: 10px 0;
          }
          .info-box {
            background: white;
            padding: 20px;
            border-left: 4px solid #667eea;
            margin: 20px 0;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 ¡Bienvenido al Sorteo!</h1>
        </div>
        
        <div class="content">
          <p>Hola <strong>${fullName}</strong>,</p>
          
          <p>¡Tu participación ha sido confirmada exitosamente! 🎊</p>
          
          <div class="number-box">
            <p style="margin: 0; font-size: 18px;">Tu número de la suerte es:</p>
            <div class="number">#${raffleNumber}</div>
            <p style="margin: 0; font-size: 14px;">¡Guárdalo bien!</p>
          </div>
          
          <div class="info-box">
            <h3 style="margin-top: 0;">📋 Detalles:</h3>
            <p><strong>Nombre:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Número:</strong> #${raffleNumber}</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    const previewUrl = nodemailer.getTestMessageUrl(info);

    console.log("✅ Email de confirmación enviado");
    console.log("📧 Para:", email);
    console.log("📧 Ver en:", previewUrl);

    return {
      success: true,
      messageId: info.messageId,
      previewUrl: previewUrl,
    };
  } catch (error) {
    console.error("❌ Error enviando email:", error);
    throw error;
  }
};

// Email de ganador
export const sendWinnerEmail = async (winnerData) => {
  const { fullName, email, raffleNumber } = winnerData;

  const mailOptions = {
    from: '"Sorteo App" <sorteo@ethereal.email>',
    to: email,
    subject: "🏆 ¡FELICITACIONES! ¡ERES EL GANADOR!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
            color: white;
            padding: 40px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .trophy { font-size: 80px; margin: 20px 0; }
          .winner-number {
            font-size: 64px;
            font-weight: bold;
            color: #f59e0b;
            text-align: center;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="trophy">🏆</div>
          <h1>¡GANADOR!</h1>
        </div>
        <div style="padding: 30px; background: #fffbeb;">
          <h2 style="text-align: center;">¡${fullName.toUpperCase()}!</h2>
          <p style="text-align: center; font-size: 18px;">
            ¡FELICITACIONES! ¡Has ganado el sorteo!
          </p>
          <div class="winner-number">#${raffleNumber}</div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    const previewUrl = nodemailer.getTestMessageUrl(info);

    console.log("✅ Email de ganador enviado");
    console.log("🏆 Para:", email);
    console.log("📧 Ver en:", previewUrl);

    return {
      success: true,
      messageId: info.messageId,
      previewUrl: previewUrl,
    };
  } catch (error) {
    console.error("❌ Error enviando email de ganador:", error);
    throw error;
  }
};

export default {
  sendConfirmationEmail,
  sendWinnerEmail,
};
