// src/components/Wheel.jsx
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const RouletteWheel = ({ users, onFinished }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // Convertir usuarios a formato de la ruleta
  const data = users.map((user) => ({
    option: `${user.raffleNumber}`,
    style: {
      backgroundColor: getRandomColor(),
      textColor: "white",
      fontSize: 20,
      fontWeight: "bold",
    },
  }));

  const handleSpinClick = () => {
    if (users.length === 0) return;

    const newPrizeNumber = Math.floor(Math.random() * users.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    const winner = users[prizeNumber];
    onFinished(winner);
  };

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
        <div className="text-6xl mb-4">🎡</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No hay participantes
        </h3>
        <p className="text-gray-500 text-center">
          Esperando que alguien compre un número para poder realizar el sorteo
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        🎯 Ruleta del Sorteo
      </h3>

      <div className="mb-8 relative">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={handleStopSpinning}
          backgroundColors={["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"]}
          textColors={["#ffffff"]}
          outerBorderColor="#1e293b"
          outerBorderWidth={8}
          innerBorderColor="#cbd5e1"
          innerBorderWidth={3}
          radiusLineColor="#1e293b"
          radiusLineWidth={2}
          fontSize={20}
          perpendicularText={false}
          textDistance={65}
        />

        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-600"></div>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-sm text-gray-600 mb-2">
          Total de participantes:{" "}
          <strong className="text-blue-600">{users.length}</strong>
        </p>
        <p className="text-sm text-gray-600">
          Números en juego:{" "}
          <strong className="text-purple-600">
            #{users[0]?.raffleNumber} - #{users[users.length - 1]?.raffleNumber}
          </strong>
        </p>
      </div>

      <button
        onClick={handleSpinClick}
        disabled={mustSpin}
        className={`px-12 py-4 rounded-xl font-bold text-white text-lg shadow-lg transform transition-all ${
          mustSpin
            ? "bg-gray-400 cursor-not-allowed scale-95"
            : "bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 hover:scale-105 active:scale-95"
        }`}
      >
        {mustSpin ? (
          <span className="flex items-center space-x-2">
            <span className="animate-spin">🎲</span>
            <span>Girando...</span>
          </span>
        ) : (
          <span className="flex items-center space-x-2">
            <span>🎯</span>
            <span>GIRAR RULETA</span>
          </span>
        )}
      </button>

      {mustSpin && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-gray-700 animate-pulse">
            Sorteando número ganador...
          </p>
        </div>
      )}
    </div>
  );
};

const getRandomColor = () => {
  const colors = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#ef4444",
    "#06b6d4",
    "#84cc16",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default RouletteWheel;
