import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import React from "react";

const DragHandle = ({ onClick, rotation }) => {
  return (
    <motion.button
      className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 cursor-pointer flex flex-col items-center justify-center z-40`}
      style={{
        top: rotation === 0 ? "4rem" : "0.5rem",
      }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500 }}
    >
      {/* <ChevronUp size={12} className="text-gray-600" /> */}
      <ChevronDown size={12} className="text-gray-600 -mt-1" />
      <ChevronDown size={12} className="text-white -mt-1" />
    </motion.button>
  );
};

export default DragHandle;
