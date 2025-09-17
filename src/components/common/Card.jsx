import React from "react";

const Card = ({ children, className = "", hover = false }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${
        hover ? "hover:shadow-xl transition-shadow duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
