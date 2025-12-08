// src/pages/PaymentPending.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const PaymentPending = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="p-8">
          <div className="text-center">
            <div className="bg-yellow-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-yellow-600 text-6xl">⏳</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Pago Pendiente
            </h1>

            <p className="text-gray-600 mb-6">
              Tu pago está siendo procesado.
              <br />
              Te notificaremos cuando se confirme.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
              <p className="text-sm text-yellow-800">
                <strong>¿Qué significa esto?</strong>
                <br />
                • El pago puede tardar hasta 48hs en acreditarse
                <br />
                • Recibirás un email cuando se confirme
                <br />• No es necesario volver a pagar
              </p>
            </div>

            <Button onClick={() => navigate("/")} className="w-full">
              Entendido
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPending;
