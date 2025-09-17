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
