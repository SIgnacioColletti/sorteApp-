import React, { useEffect, useState } from "react";
import RouletteWheel from "./RouletteWheel";
import { refreshUsers, markWinner, resetAllWinners } from "../firebaseConfig"; // Ajustá la ruta si es necesario
import {
  sendWinnerEmail,
  exportUserDataToSheets,
} from "../services/adminService";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [activeDraws, setActiveDraws] = useState({});
  const [drawResult, setDrawResult] = useState(null);

  // Cargar usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await refreshUsers();
      setUsers(fetchedUsers || []);
    };

    fetchUsers();
  }, []);

  const handleSpinComplete = async (selectedUser) => {
    if (!selectedUser) return;

    await markWinner(selectedUser.email);
    await sendWinnerEmail(selectedUser.email);

    setDrawResult(selectedUser);

    const updatedUsers = await refreshUsers();
    setUsers(updatedUsers);
  };

  const handleResetUsers = async () => {
    await resetAllWinners();
    const updatedUsers = await refreshUsers();
    setUsers(updatedUsers);
    alert("Usuarios reiniciados correctamente.");
  };

  const handleExportData = async () => {
    try {
      const url = await exportUserDataToSheets();
      window.open(url, "_blank");
      alert("Datos exportados correctamente a Google Sheets.");
    } catch (error) {
      console.error("Error exportando datos:", error);
      alert("Hubo un error al exportar los datos.");
    }
  };

  // Activar/desactivar sorteos por categoría
  const handleToggleDraw = (category) => {
    setActiveDraws((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Panel de Administración</h2>

      {/* Botones principales */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleResetUsers}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Resetear Usuarios
        </button>

        <button
          onClick={handleExportData}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Exportar Datos
        </button>
      </div>

      {/* Categorías de sorteos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["100% OFF", "50% OFF", "25% OFF"].map((category) => (
          <div
            key={category}
            className={`p-4 border rounded shadow ${
              activeDraws[category] ? "border-green-500" : "border-gray-300"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{category}</h3>

            <button
              onClick={() => handleToggleDraw(category)}
              className={`px-4 py-2 rounded mb-4 ${
                activeDraws[category]
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {activeDraws[category] ? "Desactivar" : "Activar"}
            </button>

            {activeDraws[category] && (
              <RouletteWheel
                users={users.filter((u) => u.category === category)}
                onSpinComplete={handleSpinComplete}
              />
            )}
          </div>
        ))}
      </div>

      {/* Resultado del sorteo */}
      {drawResult && (
        <div className="mt-6 p-4 rounded bg-green-200 text-green-900">
          <h4 className="font-bold">🎉 Ganador:</h4>
          <p>
            {drawResult.name} ({drawResult.email})
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
