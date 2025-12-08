<<<<<<< HEAD
// src/services/mercadopago.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

console.log("🔗 API URL:", API_URL);

export const mercadoPagoService = {
  createPreference: async (userData) => {
    try {
      console.log("📤 Enviando datos al backend:", userData);
      console.log("🌐 URL:", `${API_URL}/api/payments/create_preference`);

      const response = await fetch(
        `${API_URL}/api/payments/create_preference`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...userData,
            ticketPrice: 1000,
          }),
        }
      );

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error del backend:", errorData);
        throw new Error(
          errorData.details || errorData.error || "Error al crear preferencia"
        );
      }

      const data = await response.json();
      console.log("📥 Respuesta exitosa:", data);

      return data;
    } catch (error) {
      console.error("❌ Error en createPreference:", error);
      throw error;
    }
  },

  verifyPayment: async (paymentId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/payments/payment/${paymentId}`
      );

      if (!response.ok) {
        throw new Error("Error al verificar pago");
      }

      return await response.json();
    } catch (error) {
      console.error("❌ Error en verifyPayment:", error);
      throw error;
    }
  },
};

export default mercadoPagoService;
=======
export const mercadoPagoService = {
  createPreference: async (userData) => {
    const preference = {
      id: "MP-" + Date.now(),
      init_point: `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=MP-${Date.now()}`,
      userData,
      amount: 1000,
    };

    return new Promise((resolve) => {
      setTimeout(() => resolve(preference), 1000);
    });
  },

  simulatePayment: async (preferenceId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: "approved",
          payment_id: "PAY-" + Date.now(),
          raffle_number: Math.floor(Math.random() * 9000) + 1000,
        });
      }, 2000);
    });
  },
};
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
