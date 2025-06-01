import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ImageIcon,
  AlignJustify,
  ListTodo,
  Type,
  Link,
  Link2,
  Edit,
  Settings,
  Layers,
  ChevronRight,
  Eye,
} from "lucide-react";

const FloatingToolbar = ({
  onAddPicture,
  onAddNote,
  onAddTodo,
  onAddText,
  onAddHyperlink,
  onAddImageHyperlink,
  onToggleSettings,
  onToggleLayers,
  onToggleEditMode,
  editMode,
  headerRotation,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`absolute ${
        headerRotation === 0 ? "top-20" : "top-4"
      } right-4 ${
        !isCollapsed ? "bg-white rounded-lg shadow-md" : ""
      } z-40 overflow-hidden`}
    >
      <AnimatePresence mode="wait">
        {isCollapsed ? (
          <motion.div
            key="collapsed"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-600 text-white shadow-md"
              onClick={toggleCollapse}
              title="Expand Toolbar"
            >
              <Eye size={18} />
            </motion.button>
          </motion.div>
        ) : (
          // Expanded state - show all icons
          <motion.div
            key="expanded"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-2 p-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-blue-500 text-white"
              onClick={onAddPicture}
              title="Add Picture"
            >
              <ImageIcon size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-yellow-500 text-white"
              onClick={onAddNote}
              title="Add Note"
            >
              <AlignJustify size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-green-500 text-white"
              onClick={onAddTodo}
              title="Add Todo List"
            >
              <ListTodo size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-indigo-500 text-white"
              onClick={onAddText}
              title="Add Text"
            >
              <Type size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-pink-500 text-white"
              onClick={onAddHyperlink}
              title="Add Hyperlink"
            >
              <Link size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-rose-500 text-white"
              onClick={onAddImageHyperlink}
              title="Add Image Hyperlink"
            >
              <Link2 size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${
                editMode ? "bg-red-500" : "bg-gray-500"
              } text-white`}
              onClick={onToggleEditMode}
              title={editMode ? "Exit Edit Mode" : "Edit Mode"}
            >
              <Edit size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-purple-500 text-white"
              onClick={onToggleSettings}
              title="Canvas Settings"
            >
              <Settings size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-500 text-white"
              onClick={onToggleLayers}
              title="Layers"
            >
              <Layers size={18} />
            </motion.button>
            {/* Collapse button with right arrow */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-600 text-white"
              onClick={toggleCollapse}
              title="Collapse Toolbar"
            >
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FloatingToolbar;
