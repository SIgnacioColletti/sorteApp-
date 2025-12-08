// backend/routes/payments.js
import express from "express";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const preferenceClient = new Preference(client);
const paymentClient = new Payment(client);

console.log("💳 Mercado Pago configurado");

router.post("/create_preference", async (req, res) => {
  const { fullName, email, phone, ticketPrice = 1000 } = req.body;

  console.log("📝 Creando preferencia para:", fullName, email);

  try {
    const preferenceData = {
      items: [
        {
          title: "Número de Sorteo",
          unit_price: Number(ticketPrice),
          quantity: 1,
          currency_id: "ARS",
        },
      ],
      payer: {
        email: email,
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/payment-success`,
        failure: `${process.env.FRONTEND_URL}/payment-failure`,
        pending: `${process.env.FRONTEND_URL}/payment-pending`,
      },
      // ⭐ REMOVER auto_return TEMPORALMENTE
      // auto_return: 'approved',
      external_reference: email,
      metadata: {
        user_name: fullName,
        user_email: email,
        user_phone: phone,
      },
    };

    console.log("📤 Enviando a MP:", JSON.stringify(preferenceData, null, 2));

    const response = await preferenceClient.create({ body: preferenceData });

    console.log("✅ ÉXITO! ID:", response.id);
    console.log("🔗 Link:", response.init_point);

    res.json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error("❌ Error completo:", error);
    res.status(500).json({
      error: "Error al crear preferencia de pago",
      details: error.message,
    });
  }
});

router.post("/webhook", async (req, res) => {
  console.log("🔔 Webhook:", req.body);
  res.sendStatus(200);
});

router.get("/payment/:id", async (req, res) => {
  try {
    const payment = await paymentClient.get({ id: req.params.id });
    res.json({ status: payment.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
