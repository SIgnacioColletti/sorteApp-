<<<<<<< HEAD
// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import RouletteWheel from "../components/Wheel";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Modal from "../components/common/Modal";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { users, loading, refreshUsers, markWinner, resetAllWinners } =
    useApp();
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [showWheel, setShowWheel] = useState(false);

  // Actualizar lista cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      refreshUsers();
    }, 10000);

    return () => clearInterval(interval);
  }, [refreshUsers]);

  // ⭐ FUNCIÓN ACTUALIZADA CON EMAIL
  const handleWheelFinished = async (winner) => {
    try {
      // Marcar ganador en Firebase
      await markWinner(winner.id);
      setSelectedWinner(winner);
      setShowWinnerModal(true);
      setShowWheel(false);

      // ⭐ ENVIAR EMAIL AL GANADOR
      try {
        console.log("📧 Enviando email al ganador...");

        const emailResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/emails/send-winner`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName: winner.fullName,
              email: winner.email,
              raffleNumber: winner.raffleNumber,
            }),
          }
        );

        if (emailResponse.ok) {
          console.log("✅ Email de ganador enviado");
          toast.success("🏆 Email enviado al ganador!");
        } else {
          console.warn("⚠️ No se pudo enviar email al ganador");
          toast.error("Ganador seleccionado pero email falló");
        }
      } catch (emailError) {
        console.error("⚠️ Error enviando email:", emailError);
        toast.error("Ganador seleccionado pero email falló");
      }
    } catch (error) {
      toast.error("Error al guardar ganador");
    }
  };

  const handleNewRaffle = async () => {
    if (
      window.confirm(
        "¿Estás seguro de iniciar un nuevo sorteo? Esto reiniciará todos los ganadores."
      )
    ) {
      try {
        await resetAllWinners();
        setSelectedWinner(null);
        toast.success("Listo para nuevo sorteo");
      } catch (error) {
        toast.error("Error al reiniciar sorteo");
      }
    }
  };

  const totalUsers = users.length;
  const totalRevenue = totalUsers * 1000; // $1000 por ticket
  const winner = users.find((user) => user.isWinner);
  const paidUsers = users.filter((user) => user.status === "paid");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando datos...</p>
        </div>
      </div>
    );
  }
=======
import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Modal from "../components/common/Modal";

const AdminDashboard = () => {
  const { users, setUsers } = useApp();
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleRandomDraw = () => {
    if (users.length === 0) return;

    setIsDrawing(true);

    let counter = 0;
    const interval = setInterval(() => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      setSelectedWinner(randomUser);
      counter++;

      if (counter > 10) {
        clearInterval(interval);
        setIsDrawing(false);
        setShowWinnerModal(true);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === randomUser.id
              ? { ...user, isWinner: true, winDate: new Date().toISOString() }
              : user
          )
        );
      }
    }, 200);
  };

  const totalUsers = users.length;
  const totalRevenue = totalUsers * 10;
  const winner = users.find((user) => user.isWinner);
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
<<<<<<< HEAD
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Panel de Administración
              </h1>
              <p className="text-gray-600">
                Gestiona participantes y sorteos en tiempo real
              </p>
            </div>
            <button
              onClick={refreshUsers}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <span className="text-xl">🔄</span>
              <span>Actualizar</span>
            </button>
          </div>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Total Participantes
                </p>
                <p className="text-3xl font-bold text-blue-700">{totalUsers}</p>
                <p className="text-xs text-blue-500 mt-1">
                  {paidUsers.length} pagados
                </p>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <span className="text-blue-700 text-2xl">👥</span>
=======
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600">Gestiona participantes y sorteos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Participantes
                </p>
                <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-blue-600 text-xl">👥</span>
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
              </div>
            </div>
          </Card>

<<<<<<< HEAD
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  Ingresos Totales
                </p>
                <p className="text-3xl font-bold text-green-700">
                  ${totalRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-green-500 mt-1">ARS</p>
              </div>
              <div className="bg-green-200 p-3 rounded-full">
                <span className="text-green-700 text-2xl">💰</span>
=======
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Ingresos Totales
                </p>
                <p className="text-3xl font-bold text-green-600">
                  ${totalRevenue}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-green-600 text-xl">💰</span>
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
              </div>
            </div>
          </Card>

<<<<<<< HEAD
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">
                  Estado Sorteo
                </p>
                <p className="text-lg font-bold text-purple-700">
                  {winner ? "Finalizado" : "Pendiente"}
                </p>
                <p className="text-xs text-purple-500 mt-1">
                  {winner
                    ? new Date(winner.winDate).toLocaleDateString()
                    : "Sin sortear"}
                </p>
              </div>
              <div className="bg-purple-200 p-3 rounded-full">
                <span className="text-purple-700 text-2xl">🎲</span>
=======
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Estado Sorteo
                </p>
                <p className="text-lg font-bold text-purple-600">
                  {winner ? "Finalizado" : "Pendiente"}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-purple-600 text-xl">🎲</span>
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
              </div>
            </div>
          </Card>

<<<<<<< HEAD
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Ganador</p>
                <p className="text-2xl font-bold text-orange-700">
                  {winner ? `#${winner.raffleNumber}` : "Sin definir"}
                </p>
                <p className="text-xs text-orange-500 mt-1">
                  {winner ? winner.fullName.split(" ")[0] : "Esperando sorteo"}
                </p>
              </div>
              <div className="bg-orange-200 p-3 rounded-full">
                <span className="text-orange-700 text-2xl">🏆</span>
=======
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ganador</p>
                <p className="text-lg font-bold text-orange-600">
                  {winner ? `#${winner.raffleNumber}` : "Sin definir"}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <span className="text-orange-600 text-xl">🏆</span>
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
              </div>
            </div>
          </Card>
        </div>

<<<<<<< HEAD
        {/* Sección de Sorteo con Ruleta */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Ruleta o Control de Sorteo */}
          <div className="lg:col-span-2">
            {showWheel && !winner ? (
              <RouletteWheel users={users} onFinished={handleWheelFinished} />
            ) : (
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Control de Sorteo
                </h3>

                {!winner ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-600 text-4xl">🎲</span>
                      </div>
                      <p className="text-gray-700 text-lg font-semibold mb-2">
                        {totalUsers > 0
                          ? `${totalUsers} participante${
                              totalUsers > 1 ? "s" : ""
                            } registrado${totalUsers > 1 ? "s" : ""}`
                          : "Esperando participantes..."}
                      </p>
                      {totalUsers > 0 && (
                        <p className="text-gray-500 text-sm mb-4">
                          Números del #{users[0]?.raffleNumber} al #
                          {users[users.length - 1]?.raffleNumber}
                        </p>
                      )}
                    </div>

                    <Button
                      onClick={() => setShowWheel(true)}
                      disabled={totalUsers === 0}
                      className="w-full text-lg py-4"
                      variant="secondary"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <span className="text-2xl">🎡</span>
                        <span>Mostrar Ruleta y Sortear</span>
                      </span>
                    </Button>

                    {totalUsers === 0 && (
                      <p className="text-red-500 text-sm text-center">
                        No hay participantes para sortear
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="bg-yellow-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-yellow-600 text-4xl">🏆</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      ¡Sorteo Finalizado!
                    </h4>
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-4">
                      <p className="text-sm text-yellow-700 mb-1">
                        Número Ganador
                      </p>
                      <p className="text-4xl font-bold text-yellow-800 mb-2">
                        #{winner.raffleNumber}
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {winner.fullName}
                      </p>
                      <p className="text-sm text-gray-600">{winner.email}</p>
                      <p className="text-sm text-gray-600">{winner.phone}</p>
                    </div>
                    <Button
                      onClick={handleNewRaffle}
                      variant="outline"
                      size="sm"
                      className="mt-4"
                    >
                      Nuevo Sorteo
                    </Button>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Últimos participantes */}
          <div>
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Últimas Compras 🔥
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {users.slice(0, 10).map((user) => (
                  <div
                    key={user.id}
                    className={`p-3 rounded-lg border ${
                      user.isWinner
                        ? "bg-yellow-50 border-yellow-300"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-2xl font-bold ${
                            user.isWinner ? "text-yellow-600" : "text-blue-600"
                          }`}
                        >
                          #{user.raffleNumber}
                        </span>
                        {user.isWinner && <span className="text-xl">🏆</span>}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(user.createdAt).toLocaleTimeString("es-AR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mt-1">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                ))}
                {users.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <p className="text-4xl mb-2">👥</p>
                    <p className="text-sm">Sin participantes aún</p>
=======
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Lista de Participantes
                </h2>
                <span className="text-sm text-gray-600">
                  {totalUsers} registrados
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Número
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Participante
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Teléfono
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          user.isWinner ? "bg-yellow-50 border-yellow-200" : ""
                        }`}
                      >
                        <td className="py-4 px-4">
                          <span
                            className={`font-bold text-lg ${
                              user.isWinner
                                ? "text-yellow-600"
                                : "text-blue-600"
                            }`}
                          >
                            #{user.raffleNumber}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-800">
                              {user.fullName}
                            </span>
                            {user.isWinner && (
                              <span className="ml-2 text-yellow-500">🏆</span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {user.email}
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {user.phone}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.isWinner
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.isWinner ? "Ganador" : "Pagado"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {users.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">👥</div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      No hay participantes aún
                    </h3>
                    <p className="text-gray-500">
                      Los usuarios registrados aparecerán aquí
                    </p>
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
                  </div>
                )}
              </div>
            </Card>
          </div>
<<<<<<< HEAD
        </div>

        {/* Tabla de todos los participantes */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Lista Completa de Participantes
            </h2>
            <span className="text-sm text-gray-600">
              {totalUsers} registrados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Número
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Participante
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Teléfono
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Fecha
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      user.isWinner ? "bg-yellow-50 border-yellow-200" : ""
                    }`}
                  >
                    <td className="py-4 px-4">
                      <span
                        className={`font-bold text-2xl ${
                          user.isWinner ? "text-yellow-600" : "text-blue-600"
                        }`}
                      >
                        #{user.raffleNumber}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">
                          {user.fullName}
                        </span>
                        {user.isWinner && (
                          <span className="text-yellow-500">🏆</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">
                      {user.email}
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">
                      {user.phone}
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">
                      {new Date(user.createdAt).toLocaleDateString("es-AR")}
                      <br />
                      <span className="text-xs text-gray-400">
                        {new Date(user.createdAt).toLocaleTimeString("es-AR")}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.isWinner
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.isWinner ? "🏆 Ganador" : "✅ Pagado"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">👥</div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  No hay participantes aún
                </h3>
                <p className="text-gray-500">
                  Los usuarios registrados aparecerán aquí automáticamente
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Modal de ganador */}
=======

          <div>
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Control de Sorteo
              </h3>

              {!winner ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 text-3xl">🎲</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {totalUsers > 0
                        ? `${totalUsers} participante${
                            totalUsers > 1 ? "s" : ""
                          } registrado${totalUsers > 1 ? "s" : ""}`
                        : "Esperando participantes..."}
                    </p>
                  </div>

                  <Button
                    onClick={handleRandomDraw}
                    disabled={totalUsers === 0}
                    loading={isDrawing}
                    className="w-full"
                    variant="secondary"
                  >
                    {isDrawing ? "Sorteando..." : "🎲 Realizar Sorteo"}
                  </Button>

                  {isDrawing && selectedWinner && (
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 mb-2">Sorteando...</p>
                      <p className="text-2xl font-bold text-blue-800">
                        #{selectedWinner.raffleNumber}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-yellow-600 text-3xl">🏆</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    ¡Sorteo Finalizado!
                  </h4>
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-yellow-700 mb-1">
                      Número Ganador
                    </p>
                    <p className="text-3xl font-bold text-yellow-800">
                      #{winner.raffleNumber}
                    </p>
                    <p className="text-sm text-yellow-700 mt-2">
                      {winner.fullName}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setUsers(
                        users.map((user) => ({ ...user, isWinner: false }))
                      );
                      setSelectedWinner(null);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Nuevo Sorteo
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>

>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
        <Modal
          isOpen={showWinnerModal}
          onClose={() => setShowWinnerModal(false)}
          title="🎉 ¡Tenemos Ganador!"
        >
          {selectedWinner && (
            <div className="text-center">
<<<<<<< HEAD
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-6xl">🏆</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                ¡Felicitaciones!
              </h3>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 mb-6">
                <p className="text-sm text-yellow-700 mb-2">Número Ganador</p>
                <p className="text-6xl font-bold text-yellow-800 mb-4">
                  #{selectedWinner.raffleNumber}
                </p>
                <p className="text-2xl font-semibold text-gray-800 mb-2">
                  {selectedWinner.fullName}
                </p>
                <p className="text-gray-600 mb-1">{selectedWinner.email}</p>
                <p className="text-gray-600">{selectedWinner.phone}</p>
=======
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-4xl">🏆</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                ¡Felicitaciones!
              </h3>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
                <p className="text-sm text-yellow-700 mb-2">Número Ganador</p>
                <p className="text-4xl font-bold text-yellow-800 mb-3">
                  #{selectedWinner.raffleNumber}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {selectedWinner.fullName}
                </p>
                <p className="text-gray-600">{selectedWinner.email}</p>
>>>>>>> b8768e3d0b4e94956a6f974fa303fd65eb79f2fb
              </div>
              <Button onClick={() => setShowWinnerModal(false)}>
                ¡Excelente!
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AdminDashboard;
