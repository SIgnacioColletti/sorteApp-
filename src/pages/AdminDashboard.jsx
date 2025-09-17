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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
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
              </div>
            </div>
          </Card>

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
              </div>
            </div>
          </Card>

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
              </div>
            </div>
          </Card>

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
              </div>
            </div>
          </Card>
        </div>

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
                  </div>
                )}
              </div>
            </Card>
          </div>

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

        <Modal
          isOpen={showWinnerModal}
          onClose={() => setShowWinnerModal(false)}
          title="🎉 ¡Tenemos Ganador!"
        >
          {selectedWinner && (
            <div className="text-center">
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
