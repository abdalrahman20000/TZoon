import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  ImageIcon,
  Type,
  Link2,
  X,
  Plus,
  Minus,
  Paintbrush,
} from "lucide-react";
import ColorPicker from "./ColorPicker";
import ImageSelector from "./ImageSelector";

const FloatingControls = ({
  id,
  type,
  onDelete,
  onColorChange,
  onImageChange,
  onEditText,
  backgroundColor,
  position,
  rotation,
  onUrlChange,
  url,
  fontSize,
  onFontSizeChange,
  textColor,
  onTextColorChange,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [urlValue, setUrlValue] = useState(url || "");

  const handleUrlSave = () => {
    onUrlChange(urlValue);
    setShowUrlInput(false);
  };

  const increaseFontSize = () => {
    const newSize = Math.min(72, fontSize + 2);
    onFontSizeChange(newSize);
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(8, fontSize - 2);
    onFontSizeChange(newSize);
  };

  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        transform: `translate(${position.x - 290}px, ${
          position.y - 40
        }px) rotate(${-rotation}deg)`,
      }}
    >
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: 287,
          y: -25,
          rotate: -rotation,
        }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="absolute bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors z-50 pointer-events-auto"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
      >
        <X size={14} />
      </motion.button>

      <motion.div
        className="absolute top-1 left-72 flex gap-1"
        style={{ zIndex: 1000 }}
      >
        {type !== "text" && type !== "hyperlink" && (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-violet-500 text-white p-1 rounded shadow-md hover:bg-violet-600 transition-colors pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(!showColorPicker);
                setShowImageSelector(false);
                setShowUrlInput(false);
                setShowTextColorPicker(false);
              }}
            >
              <Palette size={16} />
            </motion.button>
            <AnimatePresence>
              {showColorPicker && (
                <div className="absolute bottom-8 left-0 z-50 pointer-events-auto">
                  <ColorPicker
                    currentColor={backgroundColor}
                    onColorChange={onColorChange}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {(type === "picture" || type === "hyperlink-image") && (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-amber-500 text-white p-1 rounded shadow-md hover:bg-amber-600 transition-colors pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                setShowImageSelector(!showImageSelector);
                setShowColorPicker(false);
                setShowUrlInput(false);
                setShowTextColorPicker(false);
              }}
            >
              <ImageIcon size={16} />
            </motion.button>
            <AnimatePresence>
              {showImageSelector && (
                <div className="absolute bottom-8 left-0 z-50 pointer-events-auto">
                  <ImageSelector
                    onSelectImage={onImageChange}
                    onUploadImage={onImageChange}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {(type === "note" || type === "text" || type === "hyperlink") && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-teal-500 text-white p-1 rounded shadow-md hover:bg-teal-600 transition-colors pointer-events-auto"
            onClick={onEditText}
          >
            <Type size={16} />
          </motion.button>
        )}

        {(type === "text" || type === "hyperlink") && (
          <>
            {/* Font Size Controls */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-purple-500 text-white p-1 rounded shadow-md hover:bg-purple-600 transition-colors pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                decreaseFontSize();
              }}
              title="Decrease font size"
            >
              <Minus size={16} />
            </motion.button>

            <div className="flex items-center bg-gray-800 text-white px-2 py-1 rounded text-xs font-mono pointer-events-auto">
              {fontSize}px
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-purple-500 text-white p-1 rounded shadow-md hover:bg-purple-600 transition-colors pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                increaseFontSize();
              }}
              title="Increase font size"
            >
              <Plus size={16} />
            </motion.button>

            {/* Text Color Picker */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-pink-500 text-white p-1 rounded shadow-md hover:bg-pink-600 transition-colors pointer-events-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTextColorPicker(!showTextColorPicker);
                  setShowColorPicker(false);
                  setShowImageSelector(false);
                  setShowUrlInput(false);
                }}
                title="Change text color"
              >
                <Paintbrush size={16} />
              </motion.button>
              <AnimatePresence>
                {showTextColorPicker && (
                  <div className="absolute bottom-8 left-0 z-50 pointer-events-auto">
                    <ColorPicker
                      currentColor={textColor}
                      onColorChange={onTextColorChange}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}

        {(type === "hyperlink" || type === "hyperlink-image") && (
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 text-white p-1 rounded shadow-md hover:bg-blue-600 transition-colors pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation();
                setShowUrlInput(!showUrlInput);
                setShowColorPicker(false);
                setShowImageSelector(false);
                setShowTextColorPicker(false);
              }}
            >
              <Link2 size={16} />
            </motion.button>
            <AnimatePresence>
              {showUrlInput && (
                <div className="absolute bottom-8 left-0 z-50 pointer-events-auto bg-white p-2 rounded shadow-lg border border-gray-200 w-64">
                  <input
                    type="text"
                    value={urlValue}
                    onChange={(e) => setUrlValue(e.target.value)}
                    placeholder="Enter URL (e.g., https://example.com)"
                    className="w-full p-2 border rounded mb-2"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowUrlInput(false)}
                      className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUrlSave}
                      className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FloatingControls;
