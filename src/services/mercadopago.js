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
