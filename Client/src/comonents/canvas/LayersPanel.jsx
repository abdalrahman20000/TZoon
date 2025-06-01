import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ImageIcon,
  AlignJustify,
  List,
  Type,
  Link,
  Link2,
  Edit,
  Move,
  XCircle,
  X,
} from "lucide-react";

const LayersPanel = ({
  boxes,
  selectedBox,
  onSelectBox,
  onDeleteBox,
  onRenameBox,
  onMoveToCenter,
  onClose,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const handleRenameStart = (id, currentName) => {
    setEditingId(id);
    setEditName(""); // Start with empty string so placeholder shows
  };

  const handleRenameSave = (id, originalName) => {
    // If editName is empty or just whitespace, keep the original name
    const newName = editName.trim() || originalName;
    onRenameBox(id, newName);
    setEditingId(null);
    setEditName("");
  };

  const handleRenameCancel = () => {
    setEditingId(null);
    setEditName("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute top-20 right-4 bg-white rounded-lg max-h-96 overflow-auto shadow-xl border border-gray-200 p-4 z-50 w-64"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Layers</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </motion.button>
      </div>

      <div className="space-y-2 overflow-x-hidden">
        {boxes.map((box) => (
          <motion.div
            key={box.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group px-2 py-1 rounded-md cursor-pointer flex items-center justify-between gap-2 ${
              selectedBox === box.id ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelectBox(box.id);
            }}
          >
            <div className="flex items-center gap-2 flex-grow">
              {box.type === "picture" && (
                <ImageIcon size={16} className="shrink-0" />
              )}
              {box.type === "note" && (
                <AlignJustify size={16} className="shrink-0" />
              )}
              {box.type === "todo" && <List size={16} className="shrink-0" />}
              {box.type === "text" && <Type size={16} className="shrink-0" />}
              {box.type === "hyperlink" && (
                <Link size={16} className="shrink-0" />
              )}
              {box.type === "hyperlink-image" && (
                <Link2 size={16} className="shrink-0" />
              )}

              {editingId === box.id ? (
                <div className="flex gap-1 flex-grow">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder={box.name}
                    className="w-full px-1 text-sm border rounded placeholder-gray-400"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRenameSave(box.id, box.name);
                      if (e.key === "Escape") handleRenameCancel();
                    }}
                    onBlur={() => handleRenameSave(box.id, box.name)}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-1 flex-grow">
                  <span className="truncate">{box.name}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRenameStart(box.id, box.name);
                    }}
                    title="Rename"
                  >
                    <Edit size={14} />
                  </motion.button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 ml-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 hover:text-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveToCenter(box.id);
                }}
                title="Move to center"
              >
                <Move size={14} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteBox(box.id);
                }}
                title="Delete"
              >
                <XCircle size={14} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LayersPanel;
