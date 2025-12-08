// src/pages/RegistrationForm.jsx
import React, { useState } from "react";
import { useFormValidation } from "../hooks/useFormValidation";
import { mercadoPagoService } from "../services/mercadopago";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Card from "../components/common/Card";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validationRules = {
    fullName: { required: true, label: "Nombre completo" },
    email: { required: true, email: true, label: "Email" },
    phone: { required: true, phone: true, label: "Teléfono" },
  };

  const { values, errors, isValid, setValue, validate } = useFormValidation(
    { fullName: "", email: "", phone: "" },
    validationRules
  );

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Por favor completa todos los campos correctamente");
      return;
    }

    setIsLoading(true);

    try {
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
              placeholder="+54 341 123-4567"
              required
            />

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-center">
                <div className="text-blue-500 mr-3 text-2xl">💳</div>
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Costo de participación: $1.000 ARS
                  </p>
                  <p className="text-xs text-blue-600">
                    Pago seguro con Mercado Pago
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full"
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
      </div>
    </div>
  );
};

export default RegistrationForm;
