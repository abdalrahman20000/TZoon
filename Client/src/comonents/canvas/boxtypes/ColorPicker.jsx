import React from "react";
import { motion } from "framer-motion";

const ColorPicker = ({ currentColor, onColorChange }) => {
  const colors = [
    "#ffffff",
    "#f8fafc",
    "#f0f9ff",
    "#ecfeff",
    "#f0fdf4",
    "#fffbeb",
    "#fef2f2",
    "#fdf4ff",
    "#eef2ff",
    "#f5f5f5",
    "#bae6fd",
    "#bef264",
    "#fde047",
    "#fed7aa",
    "#fda4af",
    "#000000",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-2 p-2 bg-white rounded shadow-lg border border-gray-200"
    >
      {colors.map((color) => (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          key={color}
          className="w-6 h-6 rounded-full border border-gray-300"
          style={{
            backgroundColor: color,
            outline: currentColor === color ? "2px solid #3b82f6" : "none",
            outlineOffset: "2px",
          }}
          onClick={() => onColorChange(color)}
        />
      ))}
    </motion.div>
  );
};

export default ColorPicker;
