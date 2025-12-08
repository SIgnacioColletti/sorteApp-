<<<<<<< HEAD
// src/pages/RegistrationForm.jsx
import React, { useState } from "react";
=======
import React, { useState } from "react";
import { useApp } from "../context/AppContext";
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
import { useFormValidation } from "../hooks/useFormValidation";
import { mercadoPagoService } from "../services/mercadopago";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
<<<<<<< HEAD
import Card from "../components/common/Card";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
=======
import Modal from "../components/common/Modal";
import Card from "../components/common/Card";

const RegistrationForm = () => {
  const { addUser } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb

  const validationRules = {
    fullName: { required: true, label: "Nombre completo" },
    email: { required: true, email: true, label: "Email" },
    phone: { required: true, phone: true, label: "Teléfono" },
  };

<<<<<<< HEAD
  const { values, errors, isValid, setValue, validate } = useFormValidation(
    { fullName: "", email: "", phone: "" },
    validationRules
  );

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Por favor completa todos los campos correctamente");
      return;
    }
=======
  const { values, errors, isValid, setValue, validate, setValues } =
    useFormValidation({ fullName: "", email: "", phone: "" }, validationRules);

  const handleSubmit = async () => {
    if (!validate()) return;
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb

    setIsLoading(true);

    try {
<<<<<<< HEAD
      console.log("🎯 Iniciando proceso de pago...");

      // Crear preferencia en Mercado Pago
      const preference = await mercadoPagoService.createPreference(values);

      console.log("✅ Preferencia creada:", preference.id);

      // Guardar datos temporalmente (los usamos después del pago)
      localStorage.setItem("pending_user", JSON.stringify(values));

      console.log("🔗 Redirigiendo a Mercado Pago:", preference.init_point);

      // ⭐ REDIRIGIR INMEDIATAMENTE - No guardar en Firebase todavía
      window.location.href = preference.init_point;
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error(
        error.message || "Hubo un error. Por favor intentá nuevamente."
      );
=======
      const preference = await mercadoPagoService.createPreference(values);

      setTimeout(async () => {
        const paymentResult = await mercadoPagoService.simulatePayment(
          preference.id
        );

        if (paymentResult.status === "approved") {
          const newUser = {
            id: Date.now(),
            ...values,
            raffleNumber: paymentResult.raffle_number,
            paymentId: paymentResult.payment_id,
            registrationDate: new Date().toISOString(),
            status: "paid",
          };

          addUser(newUser);
          setShowSuccess(true);
          setValues({ fullName: "", email: "", phone: "" });
        }

        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error en el registro:", error);
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🎟️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              ¡Participa del Sorteo!
            </h2>
            <p className="text-gray-600">
              Completa tus datos y asegura tu número de la suerte
            </p>
          </div>

          <div>
            <Input
              label="Nombre Completo"
              value={values.fullName}
              onChange={(value) => setValue("fullName", value)}
              error={errors.fullName}
              placeholder="Ej: Juan Pérez"
              required
            />

            <Input
              label="Email"
              type="email"
              value={values.email}
              onChange={(value) => setValue("email", value)}
              error={errors.email}
              placeholder="tu@email.com"
              required
            />

            <Input
              label="Teléfono"
              type="tel"
              value={values.phone}
              onChange={(value) => setValue("phone", value)}
              error={errors.phone}
<<<<<<< HEAD
              placeholder="+54 341 123-4567"
=======
              placeholder="+54 11 1234-5678"
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
              required
            />

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-center">
<<<<<<< HEAD
                <div className="text-blue-500 mr-3 text-2xl">💳</div>
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Costo de participación: $1.000 ARS
                  </p>
                  <p className="text-xs text-blue-600">
                    Pago seguro con Mercado Pago
=======
                <div className="text-blue-500 mr-3">💳</div>
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Costo de participación: $10 USD
                  </p>
                  <p className="text-xs text-blue-600">
                    Serás redirigido a Mercado Pago para completar el pago
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full"
<<<<<<< HEAD
              disabled={!isValid || isLoading}
              loading={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="animate-spin">⏳</span>
                  <span>Redirigiendo a pago...</span>
                </span>
              ) : (
                "Continuar al Pago →"
              )}
            </Button>

            <div className="mt-4 flex items-center justify-center space-x-2">
              <img
                src="https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg"
                alt="Mercado Pago"
                className="h-6"
              />
              <span className="text-xs text-gray-500">Pago 100% seguro</span>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Al continuar, aceptás nuestros términos y condiciones
          </p>
        </div>
=======
              disabled={!isValid}
              loading={isLoading}
            >
              {isLoading ? "Procesando Pago..." : "Registrarse y Pagar"}
            </Button>
          </div>
        </Card>

        <Modal
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          title="¡Registro Exitoso!"
        >
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-2xl">✅</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              ¡Felicitaciones!
            </h3>
            <p className="text-gray-600 mb-6">
              Tu pago ha sido procesado exitosamente. Ya tienes tu número de
              participación para el sorteo.
            </p>
            <Button onClick={() => setShowSuccess(false)}>Entendido</Button>
          </div>
        </Modal>
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
      </div>
    </div>
  );
};

export default RegistrationForm;
