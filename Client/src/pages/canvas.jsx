import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import Header from "../comonents/canvas/Header";
import Footer from "../comonents/canvas/Footer";
import DragHandle from "../comonents/canvas/DragHandle";
import FloatingToolbar from "../comonents/canvas/FloatingToolbar";
import CanvasSettings from "../comonents/canvas/CanvasSettings";
import LayersPanel from "../comonents/canvas/LayersPanel";
import EmptyCanvasMessage from "../comonents/canvas/EmptyCanvasMessage";
import CustomBox from "../comonents/canvas/boxtypes/CustomBox";

const STORAGE_KEY = "canvas_app_data";

const Canvas = () => {
  const [boxes, setBoxes] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [nextId, setNextId] = useState(1);
  const canvasRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [canvasStyle, setCanvasStyle] = useState({
    backgroundColor: "#f9fafb",
    backgroundImage: "none",
    backgroundSize: "auto",
    backgroundRepeat: "repeat",
  });
  const [headerRotation, setHeaderRotation] = useState(0);
  const [footerRotation, setFooterRotation] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);

  const boxCounters = useRef({
    picture: 0,
    note: 0,
    todo: 0,
    text: 0,
    hyperlink: 0,
    "hyperlink-image": 0,
  });

  // Optimization: Use refs to track save state
  const saveTimeoutRef = useRef(null);
  const needsSaveRef = useRef(false);
  const lastSaveDataRef = useRef(null);

  // Check if localStorage is available
  const isLocalStorageAvailable = () => {
    try {
      const test = "__localStorage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Get localStorage usage info
  const getStorageInfo = () => {
    try {
      let totalSize = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalSize += localStorage[key].length;
        }
      }
      return {
        used: Math.round(totalSize / 1024), // KB
        canvasData: localStorage.getItem(STORAGE_KEY)
          ? Math.round(localStorage.getItem(STORAGE_KEY).length / 1024)
          : 0,
      };
    } catch (error) {
      return { used: 0, canvasData: 0 };
    }
  };

  // Get current data size for display in settings
  const getCurrentDataSize = () => {
    try {
      const dataToSave = {
        boxes: JSON.parse(JSON.stringify(boxes)),
        canvasStyle: JSON.parse(JSON.stringify(canvasStyle)),
        nextId: nextId,
        boxCounters: { ...boxCounters.current },
        headerRotation: headerRotation,
        footerRotation: footerRotation,
        editMode: editMode,
        timestamp: new Date().toISOString(),
      };
      const dataString = JSON.stringify(dataToSave);
      return Math.round(dataString.length / 1024); // Size in KB
    } catch (error) {
      return 0;
    }
  };

  // Export canvas data
  const exportCanvasData = () => {
    try {
      const canvasData = {
        boxes,
        canvasStyle,
        nextId,
        boxCounters: boxCounters.current,
        headerRotation,
        footerRotation,
        editMode,
        exportDate: new Date().toISOString(),
      };

      const dataStr = JSON.stringify(canvasData, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `canvas-data-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      Swal.fire({
        icon: "success",
        title: "Export Successful",
        text: "Canvas data has been exported successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error exporting canvas data:", error);
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text: "Failed to export canvas data",
      });
    }
  };

  // Memoized save function to prevent recreating it constantly
  const saveToLocalStorage = useCallback(() => {
    try {
      // Check if localStorage is available
      if (!isLocalStorageAvailable()) {
        console.warn("⚠️ localStorage is not available");
        return;
      }

      // Create clean data object (avoid circular references)
      const dataToSave = {
        boxes: JSON.parse(JSON.stringify(boxes)), // Deep clone to avoid references
        canvasStyle: JSON.parse(JSON.stringify(canvasStyle)),
        nextId: nextId,
        boxCounters: { ...boxCounters.current }, // Shallow clone
        headerRotation: headerRotation,
        footerRotation: footerRotation,
        editMode: editMode,
        timestamp: new Date().toISOString(),
      };

      // Optimization: Check if data actually changed before saving
      const dataString = JSON.stringify(dataToSave);
      if (lastSaveDataRef.current === dataString) {
        return; // No changes, skip save
      }

      const dataSizeKB = Math.round(dataString.length / 1024);

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, dataString);
      lastSaveDataRef.current = dataString;
      needsSaveRef.current = false;
    } catch (error) {
      // Handle quota exceeded error specifically
      if (
        error.name === "QuotaExceededError" ||
        error.message.includes("quota")
      ) {
        const storageInfo = getStorageInfo();

        Swal.fire({
          icon: "warning",
          title: "Storage Quota Exceeded",
          html: `
            <p>Your browser's storage is full (${storageInfo.used}KB used).</p>
            <p>Canvas data size: ${getCurrentDataSize()}KB</p>
            <br>
            <p><strong>Recommended action:</strong></p>
            <p>• Export your canvas data as backup</p>
            <p>• Clear browser storage manually</p>
            <p>• Use a different browser</p>
          `,
          confirmButtonText: "Export Data Now",
          confirmButtonColor: "#10b981",
        }).then((result) => {
          if (result.isConfirmed) {
            exportCanvasData();
          }
        });
      } else {
        // Other types of errors
        Swal.fire({
          icon: "error",
          title: "Save Error",
          text: `Failed to save canvas data: ${error.message}`,
          footer: "Try exporting your data as backup",
        });
      }
    }
  }, [boxes, canvasStyle, nextId, headerRotation, footerRotation, editMode]);

  // Simple load function with better error handling
  const loadFromLocalStorage = () => {
    try {
      if (!isLocalStorageAvailable()) {
        console.warn("⚠️ localStorage is not available");
        return;
      }

      const savedData = localStorage.getItem(STORAGE_KEY);

      if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Validate data before loading
        if (parsedData && typeof parsedData === "object") {
          // Load all data with fallbacks
          if (Array.isArray(parsedData.boxes)) setBoxes(parsedData.boxes);
          if (
            parsedData.canvasStyle &&
            typeof parsedData.canvasStyle === "object"
          ) {
            setCanvasStyle(parsedData.canvasStyle);
          }
          if (typeof parsedData.nextId === "number" && parsedData.nextId > 0) {
            setNextId(parsedData.nextId);
          }
          if (
            parsedData.boxCounters &&
            typeof parsedData.boxCounters === "object"
          ) {
            boxCounters.current = parsedData.boxCounters;
          }
          if (typeof parsedData.headerRotation === "number") {
            setHeaderRotation(parsedData.headerRotation);
          }
          if (typeof parsedData.footerRotation === "number") {
            setFooterRotation(parsedData.footerRotation);
          }
          if (typeof parsedData.editMode === "boolean") {
            setEditMode(parsedData.editMode);
          }
        } else {
        }
      } else {
      }
    } catch (error) {
      console.error("❌ Error loading from localStorage:", error);
      Swal.fire({
        icon: "error",
        title: "Load Error",
        text: `Failed to load canvas data: ${error.message}`,
        footer: "Starting with empty canvas",
      });
    }
  };

  // Load data when component mounts
  useEffect(() => {
    loadFromLocalStorage();
    setHasLoadedInitialData(true);
  }, []);

  // Optimized: Mark when save is needed (runs much less frequently)
  useEffect(() => {
    if (!hasLoadedInitialData) return;
    needsSaveRef.current = true;
  }, [
    boxes,
    canvasStyle,
    nextId,
    headerRotation,
    footerRotation,
    editMode,
    hasLoadedInitialData,
  ]);

  // Optimized: Single timer-based auto-save (much lighter)
  useEffect(() => {
    if (!hasLoadedInitialData) return;

    const interval = setInterval(() => {
      if (needsSaveRef.current) {
        saveToLocalStorage();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [hasLoadedInitialData, saveToLocalStorage]);

  const handleDragHandleClick = () => {
    const newRotation = headerRotation === 0 ? 90 : 0;
    setHeaderRotation(newRotation);
    setFooterRotation(newRotation);
  };

  const handleRenameBox = (id, newName) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => (box.id === id ? { ...box, name: newName } : box))
    );
  };

  const handleMoveToCenter = (id) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) =>
        box.id === id
          ? {
              ...box,
              position: {
                x: canvasRect.width / 2 - box.size.width / 2,
                y: canvasRect.height / 2 - box.size.height / 2,
              },
            }
          : box
      )
    );
  };

  const handleSelectBox = (id) => {
    setSelectedBox(id);

    setBoxes((prevBoxes) => {
      const maxZIndex = Math.max(...prevBoxes.map((box) => box.zIndex), 0);
      return prevBoxes.map((box) =>
        box.id === id ? { ...box, zIndex: maxZIndex + 1 } : box
      );
    });
  };

  const handleCanvasClick = () => {
    setSelectedBox(null);
    setShowSettings(false);
    setShowLayers(false);
  };

  const updateBox = (id, updates) => {
    setBoxes((prevBoxes) =>
      prevBoxes.map((box) => (box.id === id ? { ...box, ...updates } : box))
    );
  };

  const deleteBox = (id) => {
    setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
    if (selectedBox === id) {
      setSelectedBox(null);
    }
  };

  const addBox = (type) => {
    boxCounters.current[type] += 1;
    const count = boxCounters.current[type];

    const newBox = {
      id: `${type}-${nextId}`,
      type,
      position: { x: 100 + nextId * 20, y: 100 + nextId * 20 },
      size:
        type === "picture"
          ? { width: 300, height: 200 }
          : type === "todo"
          ? { width: 250, height: 250 }
          : type === "text"
          ? { width: 200, height: 100 }
          : type === "hyperlink"
          ? { width: 200, height: 40 }
          : type === "hyperlink-image"
          ? { width: 200, height: 150 }
          : { width: 250, height: 180 },
      rotation: 0,
      content: "",
      zIndex: Math.max(...boxes.map((box) => box.zIndex), 0) + 1,
      backgroundColor:
        type === "note"
          ? "#fffbeb"
          : type === "text" || type === "hyperlink"
          ? "transparent"
          : "#ffffff",
      imageSrc: type === "picture" || type === "hyperlink-image" ? "" : null,
      fontSize: type === "text" || type === "hyperlink" ? 16 : undefined,
      textColor:
        type === "text" || type === "hyperlink" ? "#374151" : undefined,
      tasks: type === "todo" ? [] : undefined,
      url: type === "hyperlink" || type === "hyperlink-image" ? "" : undefined,
      name: `${
        type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")
      } ${count}`,
    };

    setBoxes([...boxes, newBox]);
    setNextId(nextId + 1);
    setSelectedBox(newBox.id);
  };

  const updateCanvasStyle = (newStyle) => {
    setCanvasStyle((prevStyle) => ({
      ...prevStyle,
      ...newStyle,
    }));
  };

  // Import canvas data with immediate save
  const importCanvasData = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("json")) {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please select a JSON file",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        if (!importedData || typeof importedData !== "object") {
          throw new Error("Invalid data format");
        }

        Swal.fire({
          title: "Import Canvas Data",
          text: "This will replace all current canvas data. Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, import it!",
        }).then((result) => {
          if (result.isConfirmed) {
            // Import data
            setBoxes(importedData.boxes || []);
            setCanvasStyle(
              importedData.canvasStyle || {
                backgroundColor: "#f9fafb",
                backgroundImage: "none",
                backgroundSize: "auto",
                backgroundRepeat: "repeat",
              }
            );
            setNextId(importedData.nextId || 1);
            boxCounters.current = importedData.boxCounters || {
              picture: 0,
              note: 0,
              todo: 0,
              text: 0,
              hyperlink: 0,
              "hyperlink-image": 0,
            };
            setHeaderRotation(importedData.headerRotation || 0);
            setFooterRotation(importedData.footerRotation || 0);
            setEditMode(importedData.editMode || false);
            setSelectedBox(null);

            // Force immediate save to localStorage after import
            setTimeout(() => {
              try {
                const dataToSave = {
                  boxes: importedData.boxes || [],
                  canvasStyle: importedData.canvasStyle || {
                    backgroundColor: "#f9fafb",
                    backgroundImage: "none",
                    backgroundSize: "auto",
                    backgroundRepeat: "repeat",
                  },
                  nextId: importedData.nextId || 1,
                  boxCounters: importedData.boxCounters || {
                    picture: 0,
                    note: 0,
                    todo: 0,
                    text: 0,
                    hyperlink: 0,
                    "hyperlink-image": 0,
                  },
                  headerRotation: importedData.headerRotation || 0,
                  footerRotation: importedData.footerRotation || 0,
                  editMode: importedData.editMode || false,
                  timestamp: new Date().toISOString(),
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
                console.log(
                  "✅ Imported data saved to localStorage immediately"
                );
              } catch (error) {
                console.error("❌ Error saving imported data:", error);
              }
            }, 100);

            Swal.fire({
              icon: "success",
              title: "Import Successful",
              text: "Canvas data has been imported and saved successfully!",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
      } catch (error) {
        console.error("Error importing canvas data:", error);
        Swal.fire({
          icon: "error",
          title: "Import Failed",
          text: "Invalid file format or corrupted data",
        });
      }
    };

    reader.onerror = () => {
      Swal.fire({
        icon: "error",
        title: "File Read Error",
        text: "Failed to read the selected file",
      });
    };

    reader.readAsText(file);
    event.target.value = "";
  };

  // Clear all data (for testing)
  const clearAllData = () => {
    Swal.fire({
      title: "Clear All Data",
      text: "This will remove all boxes and reset the canvas. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear all!",
    }).then((result) => {
      if (result.isConfirmed) {
        setBoxes([]);
        setNextId(1);
        boxCounters.current = {
          picture: 0,
          note: 0,
          todo: 0,
          text: 0,
          hyperlink: 0,
          "hyperlink-image": 0,
        };
        setSelectedBox(null);
        localStorage.removeItem(STORAGE_KEY);

        Swal.fire({
          icon: "success",
          title: "Cleared!",
          text: "All data has been cleared.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const hasCanvasBackground = () => {
    return (
      canvasStyle.backgroundImage &&
      canvasStyle.backgroundImage !== "none" &&
      canvasStyle.backgroundImage.trim() !== ""
    );
  };

  const computedCanvasStyle = {
    height: "100%",
    backgroundColor: canvasStyle.backgroundColor,
    backgroundImage: canvasStyle.backgroundImage,
    backgroundSize: canvasStyle.backgroundSize,
    backgroundRepeat: canvasStyle.backgroundRepeat,
    backgroundPosition: canvasStyle.backgroundPosition || "center",
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden relative">
      <Header rotation={headerRotation} />

      <DragHandle onClick={handleDragHandleClick} rotation={headerRotation} />

      <motion.div
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-grow relative overflow-auto z-10"
        style={{
          ...computedCanvasStyle,
          overflow: headerRotation === 90 ? "hidden" : "auto",
        }}
        onClick={handleCanvasClick}
      >
        <FloatingToolbar
          onAddPicture={() => addBox("picture")}
          onAddNote={() => addBox("note")}
          onAddTodo={() => addBox("todo")}
          onAddText={() => addBox("text")}
          onAddHyperlink={() => addBox("hyperlink")}
          onAddImageHyperlink={() => addBox("hyperlink-image")}
          onToggleSettings={(e) => {
            e.stopPropagation();
            setShowSettings(!showSettings);
            setShowLayers(false);
          }}
          onToggleLayers={(e) => {
            e.stopPropagation();
            setShowLayers(!showLayers);
            setShowSettings(false);
          }}
          onToggleEditMode={(e) => {
            e.stopPropagation();
            setEditMode(!editMode);
          }}
          editMode={editMode}
          headerRotation={headerRotation}
          className="z-50"
        />

        {/* Make sure all panels have appropriate z-index that's still below header */}
        <AnimatePresence>
          {showSettings && (
            <CanvasSettings
              canvasStyle={canvasStyle}
              onCanvasStyleChange={updateCanvasStyle}
              onClose={() => setShowSettings(false)}
              onExportData={exportCanvasData}
              onImportData={importCanvasData}
              onClearData={clearAllData}
              currentDataSize={getCurrentDataSize()}
              storageInfo={getStorageInfo()}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showLayers && (
            <LayersPanel
              boxes={boxes}
              selectedBox={selectedBox}
              onSelectBox={handleSelectBox}
              onDeleteBox={deleteBox}
              onRenameBox={handleRenameBox}
              onMoveToCenter={handleMoveToCenter}
              onClose={() => setShowLayers(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {boxes.length === 0 && !hasCanvasBackground() && (
            <EmptyCanvasMessage />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {boxes.map((box) => (
            <CustomBox
              key={box.id}
              {...box}
              onUpdate={updateBox}
              onDelete={deleteBox}
              isSelected={selectedBox === box.id}
              onSelect={handleSelectBox}
              editMode={editMode}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Canvas;

//:)
