// src/pages/PaymentFailure.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="p-8">
          <div className="text-center">
            <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-red-600 text-6xl">❌</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Pago Rechazado
            </h1>

            <p className="text-gray-600 mb-6">
              Lo sentimos, tu pago no pudo ser procesado.
              <br />
              Por favor intentá nuevamente.
            </p>

            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 text-left">
              <p className="text-sm text-red-800">
                <strong>Posibles causas:</strong>
                <br />
                • Fondos insuficientes
                <br />
                • Datos de tarjeta incorrectos
                <br />• Límite de compra excedido
              </p>
            </div>

            <div className="space-y-3">
              <Button onClick={() => navigate("/")} className="w-full">
                Intentar Nuevamente
              </Button>

              <button
                onClick={() => navigate("/")}
                className="w-full text-gray-600 hover:text-gray-800 text-sm"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentFailure;
