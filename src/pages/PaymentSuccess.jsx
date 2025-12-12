// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addUser } = useApp();
  const [processing, setProcessing] = useState(true);
  const [userData, setUserData] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [alreadyProcessed, setAlreadyProcessed] = useState(false); // ⭐ NUEVO

  useEffect(() => {
    // ⭐ EVITAR MÚLTIPLES EJECUCIONES
    if (alreadyProcessed) {
      console.log("⚠️ Ya procesado, saltando...");
      return;
    }

    const processPayment = async () => {
      try {
        const pendingUser = localStorage.getItem("pending_user");

        if (!pendingUser) {
          console.log("⚠️ No hay datos pendientes");
          setAlreadyProcessed(true); // ⭐ MARCAR COMO PROCESADO
          setProcessing(false);
          return;
        }

        const userInfo = JSON.parse(pendingUser);
        const paymentId = searchParams.get("payment_id");
        const status = searchParams.get("status");

        console.log("💳 Payment ID:", paymentId);
        console.log("📊 Status:", status);

        if (status === "approved" && paymentId) {
          // ⭐ MARCAR COMO PROCESADO ANTES DE HACER NADA
          setAlreadyProcessed(true);
          localStorage.removeItem("pending_user"); // ⭐ LIMPIAR INMEDIATAMENTE

          // Guardar usuario en Firebase
          const newUser = await addUser({
            ...userInfo,
            paymentId: paymentId,
            registrationDate: new Date().toISOString(),
            status: "paid",
            amount: 1000,
          });

          setUserData(newUser);

          // ⭐ ENVIAR EMAIL SOLO UNA VEZ
          try {
            console.log("📧 Enviando email de confirmación...");

            const emailResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/api/emails/send-confirmation`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  fullName: newUser.fullName,
                  email: newUser.email,
                  raffleNumber: newUser.raffleNumber,
                }),
              }
            );

            if (emailResponse.ok) {
              console.log("✅ Email enviado correctamente");
              setEmailSent(true);
              toast.success("¡Email de confirmación enviado!");
            } else {
              console.warn("⚠️ No se pudo enviar el email");
              setEmailSent(false);
            }
          } catch (emailError) {
            console.error("⚠️ Error en servicio de email:", emailError);
            setEmailSent(false);
          }

          toast.success("¡Pago exitoso! Ya tenés tu número");
        } else {
          toast.error("El pago no fue aprobado");
          navigate("/payment-failure");
        }
      } catch (error) {
        console.error("Error procesando pago:", error);
        toast.error("Error al procesar el pago");
      } finally {
        setProcessing(false);
      }
    };

    processPayment();
  }, []); // ⭐ DEPENDENCIAS VACÍAS - SOLO EJECUTAR UNA VEZ

  if (processing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Procesando tu pago...</p>
          <p className="text-gray-500 text-sm mt-2">No cierres esta ventana</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="p-8">
          <div className="text-center">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-green-600 text-6xl">✅</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              ¡Pago Exitoso!
            </h1>

            {userData && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                <p className="text-sm text-blue-700 mb-2">
                  Tu número de la suerte es:
                </p>
                <p className="text-6xl font-bold text-blue-600 mb-4">
                  #{userData.raffleNumber}
                </p>
                <p className="text-gray-700 font-semibold mb-1">
                  {userData.fullName}
                </p>
                <p className="text-gray-600 text-sm">{userData.email}</p>
              </div>
            )}

            <div
              className={`border-l-4 p-4 mb-6 text-left ${
                emailSent
                  ? "bg-green-50 border-green-400"
                  : "bg-yellow-50 border-yellow-400"
              }`}
            >
              <p
                className={`text-sm ${
                  emailSent ? "text-green-800" : "text-yellow-800"
                }`}
              >
                {emailSent ? (
                  <>
                    ✅ <strong>Email enviado exitosamente</strong>
                    <br />
                    Revisá tu bandeja de entrada (y spam) en {userData?.email}
                  </>
                ) : (
                  <>
                    📧 <strong>Próximamente recibirás un email</strong> con la
                    confirmación y tu número.
                  </>
                )}
                <br />
                <br />
                📱 <strong>Guardá tu número</strong> para el sorteo.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 text-left">
              <p className="text-sm text-blue-800">
                💡 <strong>Consejos:</strong>
                <br />• Anota tu número:{" "}
                <strong>#{userData?.raffleNumber}</strong>
                <br />• Estate atento al anuncio del sorteo
                <br />• Seguinos en redes sociales
              </p>
            </div>

            <Button onClick={() => navigate("/")} className="w-full">
              Volver al Inicio
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
