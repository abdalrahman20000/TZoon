import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Square } from "lucide-react";
import FloatingControls from "./FloatingControls";
import PictureBox from "./PictureBox";
import NoteBox from "./NoteBox";
import TodoBox from "./TodoBox";
import TextBox from "./TextBox";
import HyperlinkBox from "./HyperlinkBox";
import HyperlinkImageBox from "./HyperlinkImageBox";

const CustomBox = ({
  id,
  type,
  position,
  size,
  rotation,
  content,
  onUpdate,
  onDelete,
  isSelected,
  onSelect,
  zIndex,
  backgroundColor,
  imageSrc,
  tasks = [],
  fontSize = 16,
  textColor = "#374151",
  url,
  editMode,
}) => {
  const boxRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [localEditMode, setLocalEditMode] = useState(false);

  // Reference to measure text size for auto-resizing
  const measureRef = useRef(null);

  // Function to measure text size (same logic as in TextBox)
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

  // Calculate completion percentage for TodoBox
  const completionPercentage =
    type === "todo" && tasks.length > 0
      ? Math.round(
          (tasks.filter((task) => task.completed).length / tasks.length) * 100
        )
      : 0;

  const handleUrlClick = (e) => {
    if (!editMode && !localEditMode && url) {
      e.preventDefault();
      e.stopPropagation();
      window.open(url, "_blank");
    }
  };

  const handleDragStart = (e) => {
    if (!editMode && !localEditMode) return;
    e.stopPropagation();
    setIsDragging(true);
    const rect = boxRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setStartPosition({ ...position });
    onSelect(id);
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    setStartSize({ ...size });
    setStartPoint({ x: e.clientX, y: e.clientY });
  };

  // Check if resize handle should be shown (not for text or hyperlink types)
  const showResizeHandle = type !== "text" && type !== "hyperlink";

  // Function to handle font size changes with automatic resizing
  const handleFontSizeChange = (newSize) => {
    if (type === "text" || type === "hyperlink") {
      // Calculate new dimensions based on current content and new font size
      const newDimensions = measureTextSize(content, newSize);
      onUpdate(id, {
        fontSize: newSize,
        size: newDimensions,
      });
    } else {
      // Fallback for other components
      onUpdate(id, { fontSize: newSize });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        onUpdate(id, {
          position: {
            x: e.clientX - dragOffset.x,
            y: e.clientY - dragOffset.y,
          },
        });
      } else if (isResizing && showResizeHandle) {
        const dx = e.clientX - startPoint.x;
        const dy = e.clientY - startPoint.y;
        const newWidth = Math.max(100, startSize.width + dx);
        const newHeight = Math.max(100, startSize.height + dy);

        onUpdate(id, {
          size: {
            width: newWidth,
            height: newHeight,
          },
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("selectstart", (e) => e.preventDefault());
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("selectstart", (e) => e.preventDefault());
    };
  }, [
    isDragging,
    isResizing,
    id,
    onUpdate,
    dragOffset,
    startPosition,
    startSize,
    startPoint,
    type,
    size.width,
    fontSize,
    showResizeHandle,
  ]);

  return (
    <>
      {/* Hidden element for text measurement */}
      {(type === "text" || type === "hyperlink") && (
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
            zIndex: -1000,
          }}
        />
      )}

      {/* Floating Percentage Bar for TodoBox - Outside the main box */}
      {type === "todo" && tasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-20"
          style={{
            left: `${position.x}px`,
            top: `${position.y - 50}px`,
            width: `${size.width}px`,
            transform: `rotate(${rotation}deg)`,
            transformOrigin: `${size.width / 2}px 40px`,
          }}
        >
          <div className="px-3 py-1 mx-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span
                className="font-bold text-sm"
                style={{
                  color: backgroundColor || "#fffbeb",
                  textShadow:
                    "0 0 3px rgba(0,0,0,0.5), 1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                {completionPercentage}%
              </span>
              <span
                className="font-medium text-xs"
                style={{
                  color: backgroundColor || "#fffbeb",
                  textShadow:
                    "0 0 3px rgba(0,0,0,0.5), 1px 1px 0 rgba(0,0,0,0.3), -1px -1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3), -1px 1px 0 rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                {tasks.filter((task) => task.completed).length}/{tasks.length}
              </span>
            </div>
            <div
              className="w-full rounded-full h-2 shadow-sm"
              style={{
                backgroundColor: `${backgroundColor || "#fffbeb"}40`, // 25% opacity
              }}
            >
              <motion.div
                className="h-2 rounded-full shadow-sm"
                style={{
                  backgroundColor: backgroundColor || "#fffbeb",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        ref={boxRef}
        className={`absolute rounded-lg shadow-lg overflow-hidden transition-shadow duration-200 ${
          isSelected ? "ring-2 ring-blue-500" : ""
        } ${
          type === "text" || type === "hyperlink"
            ? "bg-transparent shadow-none"
            : ""
        }`}
        style={{
          width: `${size.width}px`,
          height: `${size.height}px`,
          zIndex,
          backgroundColor:
            type === "text" || type === "hyperlink"
              ? "transparent"
              : backgroundColor || (type === "note" ? "#fffbeb" : "#ffffff"),
          cursor:
            (type === "hyperlink" || type === "hyperlink-image") &&
            !editMode &&
            !localEditMode
              ? "pointer"
              : "default",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: position.x,
          y: position.y,
          rotate: rotation, // MOVED ROTATION HERE FROM STYLE
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.2,
          },
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!isSelected) onSelect(id);
          if (
            (type === "hyperlink" || type === "hyperlink-image") &&
            !editMode &&
            !localEditMode
          ) {
            handleUrlClick(e);
          }
        }}
        onDoubleClick={() =>
          (type === "note" ||
            type === "todo" ||
            type === "text" ||
            type === "hyperlink") &&
          setLocalEditMode(true)
        }
        onMouseDown={handleDragStart}
      >
        <div className="w-full h-full">
          {type === "picture" ? (
            <PictureBox imageSrc={imageSrc} />
          ) : type === "todo" ? (
            <TodoBox
              id={id}
              tasks={tasks}
              onUpdate={onUpdate}
              editMode={editMode}
              localEditMode={localEditMode}
            />
          ) : type === "text" ? (
            <TextBox
              id={id}
              content={content}
              fontSize={fontSize}
              textColor={textColor}
              onUpdate={onUpdate}
              isSelected={isSelected}
              editMode={editMode}
              localEditMode={localEditMode}
              setLocalEditMode={setLocalEditMode}
              type={type}
            />
          ) : type === "hyperlink" ? (
            <HyperlinkBox
              id={id}
              content={content}
              fontSize={fontSize}
              textColor={textColor}
              onUpdate={onUpdate}
              isSelected={isSelected}
              editMode={editMode}
              localEditMode={localEditMode}
              setLocalEditMode={setLocalEditMode}
              type={type}
            />
          ) : type === "hyperlink-image" ? (
            <HyperlinkImageBox imageSrc={imageSrc} />
          ) : (
            <NoteBox
              id={id}
              content={content}
              onUpdate={onUpdate}
              isSelected={isSelected}
              editMode={editMode}
              localEditMode={localEditMode}
              setLocalEditMode={setLocalEditMode}
            />
          )}
        </div>

        {/* Show resize handle only for non-text/hyperlink types when selected */}
        {isSelected && (editMode || localEditMode) && (
          <>
            {/* Only show resize handle for non-text/hyperlink types */}
            {showResizeHandle && (
              <motion.div
                className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize bg-blue-500 text-white rounded-tl-md"
                onMouseDown={handleResizeStart}
              >
                <Square size={12} className="mx-auto mt-1" />
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      {isSelected && (editMode || localEditMode) && (
        <FloatingControls
          id={id}
          type={type}
          onDelete={onDelete}
          onColorChange={(color) => onUpdate(id, { backgroundColor: color })}
          onImageChange={(src) => onUpdate(id, { imageSrc: src })}
          onEditText={() => setLocalEditMode(true)}
          backgroundColor={backgroundColor}
          position={position}
          rotation={rotation}
          onUrlChange={(newUrl) => onUpdate(id, { url: newUrl })}
          url={url}
          fontSize={fontSize}
          onFontSizeChange={handleFontSizeChange}
          textColor={textColor}
          onTextColorChange={(color) => onUpdate(id, { textColor: color })}
        />
      )}
    </>
  );
};

export default CustomBox;
