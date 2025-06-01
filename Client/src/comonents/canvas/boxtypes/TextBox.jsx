import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const TextBox = ({
  id,
  content,
  fontSize,
  textColor,
  onUpdate,
  isSelected,
  editMode,
  localEditMode,
  setLocalEditMode,
  type,
}) => {
  const [editContent, setEditContent] = useState(content);
  const [showFontSizeEditor, setShowFontSizeEditor] = useState(false);
  const [tempFontSize, setTempFontSize] = useState(fontSize);
  const textareaRef = useRef(null);
  const measureRef = useRef(null);

  const handleContentChange = (e) => setEditContent(e.target.value);

  const measureTextSize = (text, fontSize) => {
    if (!measureRef.current) return { width: 200, height: 100 };

    measureRef.current.style.fontSize = `${fontSize}px`;
    measureRef.current.style.width = "auto";
    measureRef.current.style.height = "auto";
    measureRef.current.textContent =
      text || (type === "hyperlink" ? "Link text" : "Add text");

    const rect = measureRef.current.getBoundingClientRect();

    // Add padding and minimum dimensions - unlimited width, extra height for hyperlinks
    const width = Math.max(150, rect.width + 40);
    const baseHeight = Math.max(50, rect.height + 40);
    const height = type === "hyperlink" ? baseHeight + 20 : baseHeight; // Extra height for hyperlinks

    return { width, height };
  };

  const saveContent = () => {
    const newSize = measureTextSize(editContent, fontSize);
    onUpdate(id, {
      content: editContent,
      size: newSize,
    });
    setLocalEditMode(false);
  };

  const cancelEdit = () => {
    setLocalEditMode(false);
    setEditContent(content);
  };

  const handleFontSizeChange = (e) => {
    const newSize = Math.max(
      8,
      Math.min(72, parseInt(e.target.value) || fontSize)
    );
    setTempFontSize(newSize);
  };

  const saveFontSize = () => {
    const newSize = measureTextSize(content, tempFontSize);
    onUpdate(id, {
      fontSize: tempFontSize,
      size: newSize,
    });
    setShowFontSizeEditor(false);
  };

  const cancelFontSizeEdit = () => {
    setTempFontSize(fontSize);
    setShowFontSizeEditor(false);
  };

  // Auto-resize when content changes
  useEffect(() => {
    if (localEditMode && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [editContent, localEditMode]);

  return (
    <div className="w-full h-full p-4 overflow-y-auto relative">
      {/* Hidden element for text measurement */}
      <div
        ref={measureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          fontFamily: "inherit",
          lineHeight: "1.5",
          padding: "8px",
          top: "-9999px",
          left: "-9999px",
        }}
      />

      <div className="w-full h-full flex flex-col">
        {localEditMode ? (
          <div className="w-full h-full flex flex-col relative">
            <textarea
              ref={textareaRef}
              className="flex-grow p-2 focus:outline-none resize-none bg-transparent whitespace-pre-wrap 
              scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300
              scrollbar-thumb-rounded-full scrollbar-track-rounded-full pr-0 min-h-full"
              value={editContent}
              onChange={handleContentChange}
              autoFocus
              placeholder={
                type === "hyperlink" ? "Add text" : "Enter text here..."
              }
              style={{
                fontSize: `${fontSize}px`,
                color: textColor,
                minHeight: "100%",
              }}
            />
            <div className="sticky bottom-2 right-2 flex gap-2 justify-end mt-[-40px] pr-2 z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600"
                onClick={saveContent}
                title="Save"
              >
                <Check size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                onClick={cancelEdit}
                title="Cancel"
              >
                <X size={18} />
              </motion.button>
            </div>
          </div>
        ) : showFontSizeEditor ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <input
                  type="number"
                  min="8"
                  max="72"
                  value={tempFontSize}
                  onChange={handleFontSizeChange}
                  className="w-20 p-2 border rounded text-center"
                  autoFocus
                />
                <span className="ml-2 text-sm text-gray-500">px</span>
              </div>
              <div className="flex justify-end gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  onClick={cancelFontSizeEdit}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={saveFontSize}
                >
                  Save
                </motion.button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="w-full h-full scrollbar-thin scrollbar-track-gray-100 
            scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full
            p-2 whitespace-pre-wrap overflow-auto"
            style={{
              fontSize: `${fontSize}px`,
              color: textColor,
            }}
          >
            {content || (
              <div className="text-gray-400 italic">
                {type === "hyperlink" ? "Add text" : "Add text"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextBox;
