// src/pages/RegistrationForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { addUser } = useApp();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre es requerido";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo que se está editando
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Por favor completá todos los campos correctamente");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("🎯 Guardando usuario en Firebase...");

      // Guardar directamente en Firebase (sin Mercado Pago por ahora)
      const newUser = await addUser({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        paymentId: "SIMULADO-" + Date.now(),
        registrationDate: new Date().toISOString(),
        status: "paid",
        amount: 1000,
      });

      console.log("✅ Usuario guardado:", newUser);
      toast.success(`¡Registro exitoso! Tu número es #${newUser.raffleNumber}`);

      // Guardar en localStorage para la página de éxito
      localStorage.setItem(
        "pending_user",
        JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        })
      );

      // Redirigir a página de éxito
      setTimeout(() => {
        navigate(`/payment-success?payment_id=SIMULADO&status=approved`);
      }, 1500);
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Error al procesar el registro");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-4xl">🎟️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ¡Participa del Sorteo!
            </h1>
            <p className="text-gray-600">
              Completa tus datos y asegura tu número de la suerte.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nombre Completo"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              placeholder="Ej: Juan Pérez"
              required
            />

            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="tu-email@gmail.com"
              required
            />

            <Input
              label="Teléfono"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="341-234-5678"
              required
            />

            {/* Info del costo */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
              <p className="text-blue-800 text-sm">
                💰 <strong>Costo de participación: $1.000 ARS</strong>
                <br />
                <span className="text-xs">
                  (Pago simulado para pruebas - En producción: Mercado Pago)
                </span>
              </p>
            </div>

            {/* Botón de envío */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Procesando..." : "Registrarse →"}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Al continuar, aceptas nuestros términos y condiciones.
            </p>
          </form>
        </Card>

        {/* Footer info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            <span className="inline-block mr-2">✅</span>
            Registro seguro y rápido
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
