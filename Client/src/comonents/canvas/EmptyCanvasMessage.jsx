import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const EmptyCanvasMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute inset-0 flex items-center justify-center text-gray-400"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white p-6 rounded-lg shadow-md text-center max-w-md"
      >
        <Plus size={32} className="mx-auto mb-2" />
        <p>Your canvas is empty! Use the buttons above to add elements.</p>
      </motion.div>
    </motion.div>
  );
};

export default EmptyCanvasMessage;
