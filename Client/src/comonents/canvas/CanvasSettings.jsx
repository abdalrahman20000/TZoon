import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, Upload, Download, FileUp, AlertTriangle } from "lucide-react";
import Swal from "sweetalert2";

const CanvasSettings = ({
  canvasStyle,
  onCanvasStyleChange,
  onClose,
  onExportData,
  onImportData,
  onClearData,
  currentDataSize = 0,
  storageInfo = { used: 0, canvasData: 0 },
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const estimatedLimit = 5120; // 5MB in KB
  const storageUsagePercent = Math.min(
    (storageInfo.used / estimatedLimit) * 100,
    100
  );

  // Check if data size is large (over 5MB)
  const isDataSizeLarge = currentDataSize > 5000;

  const backgroundOptions = [
    {
      name: "Grid",
      value:
        "linear-gradient(to right, rgba(156,163,175,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(156,163,175,0.1) 1px, transparent 1px)",
      size: "20px 20px",
    },
    {
      name: "Dots",
      value:
        "radial-gradient(circle, rgba(156,163,175,0.3) 1px, transparent 1px)",
      size: "20px 20px",
    },
    {
      name: "None",
      value: "none",
      size: "auto",
    },
  ];

  const handleBackgroundUpload = (event) => {
    console.log("handleBackgroundUpload called");
    const file = event.target.files?.[0];
    console.log("File selected:", file);

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.log("Invalid file type:", file.type);
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Please select an image file",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      console.log("File too large:", file.size);
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "File size must be less than 10MB",
      });
      return;
    }

    console.log("Starting file upload...");
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("FileReader completed successfully");

      const newStyle = {
        ...canvasStyle,
        backgroundImage: `url(${e.target.result})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };

      console.log("Calling onCanvasStyleChange with:", newStyle);
      onCanvasStyleChange(newStyle);
      setIsUploading(false);

      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: "Background image uploaded successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    };

    reader.onerror = (error) => {
      console.error("FileReader error:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Error reading the selected file",
      });
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Upload click triggered");

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      console.log("File input changed");
      handleBackgroundUpload(event);
    };
    input.click();
  };

  const handleImportClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Import click triggered");

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    input.onchange = (event) => {
      console.log("Import file selected");
      onImportData(event);
    };
    input.click();
  };

  const handleClearOtherDataClick = () => {
    Swal.fire({
      title: "Clear Other Website Data",
      text: "This will remove data from other websites stored in your browser, but keep your canvas data. Continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear other data",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const canvasData = localStorage.getItem("canvas_app_data");
          // Clear all localStorage except canvas data
          localStorage.clear();
          if (canvasData) {
            localStorage.setItem("canvas_app_data", canvasData);
          }

          Swal.fire({
            icon: "success",
            title: "Storage Cleared",
            text: "Other website data has been cleared. Your canvas data is preserved.",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Clear Failed",
            text: "Failed to clear storage data",
          });
        }
      }
    });
  };

  const handleColorChange = (color) => {
    console.log("Color change:", color);
    const newStyle = {
      ...canvasStyle,
      backgroundColor: color,
      backgroundImage: "none",
      backgroundSize: "auto",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
    console.log("Calling onCanvasStyleChange with color:", newStyle);
    onCanvasStyleChange(newStyle);
  };

  const handlePatternChange = (option) => {
    console.log("Pattern change:", option);
    const newStyle = {
      ...canvasStyle,
      backgroundImage: option.value,
      backgroundSize: option.size,
      backgroundPosition: option.value === "none" ? "center" : "0 0",
      backgroundRepeat: option.value === "none" ? "no-repeat" : "repeat",
      // Keep the current background color when applying patterns
      backgroundColor: canvasStyle.backgroundColor,
    };
    console.log("Calling onCanvasStyleChange with pattern:", newStyle);
    onCanvasStyleChange(newStyle);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      className="absolute top-20 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-[1000] w-64"
      data-canvas-settings
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Canvas Settings</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </motion.button>
      </div>

      {/* Storage Usage Info */}
      {/* <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Storage Usage
          </span>
          <span className="text-xs text-gray-500">
            {storageInfo.used}KB / ~{estimatedLimit}KB
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              storageUsagePercent > 90
                ? "bg-red-500"
                : storageUsagePercent > 70
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${storageUsagePercent}%` }}
          />
        </div>
        {storageUsagePercent > 80 && (
          <p className="text-xs text-amber-700 mt-1">
            Storage is nearly full. Consider exporting data or clearing browser
            storage.
          </p>
        )}
      </div> */}

      {/* Data Size Warning */}
      {isDataSizeLarge && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 text-amber-800">
            <AlertTriangle size={16} />
            <span className="text-sm font-medium">Large Canvas Data</span>
          </div>
          <p className="text-xs text-amber-700 mt-1">
            Canvas data is {currentDataSize}KB. Export regularly as backup.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <div className="flex gap-2 flex-wrap">
            {[
              "#f9fafb",
              "#ffffff",
              "#f1f5f9",
              "#e5e7eb",
              "#f0f9ff",
              "#f0fdf4",
              "#fffbeb",
            ].map((color) => (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={color}
                className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                style={{
                  backgroundColor: color,
                  outline:
                    canvasStyle.backgroundColor === color
                      ? "2px solid #3b82f6"
                      : "none",
                  outlineOffset: "2px",
                }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Pattern
          </label>
          <div className="space-y-2">
            {backgroundOptions.map((option) => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={option.name}
                className={`block w-full text-left px-3 py-2 border ${
                  canvasStyle.backgroundImage === option.value ||
                  (option.value === "none" &&
                    canvasStyle.backgroundImage === "none")
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                } rounded-md`}
                onClick={() => handlePatternChange(option)}
              >
                {option.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Image
          </label>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
            onClick={handleUploadClick}
            disabled={isUploading}
          >
            <Upload size={16} />
            <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
          </motion.button>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Canvas Data
            </label>
            <span className="text-xs text-gray-500">{currentDataSize}KB</span>
          </div>
          <div className="space-y-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition-colors"
              onClick={onExportData}
              title="Export canvas data to file"
            >
              <Download size={16} />
              <span>Export Data</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
              onClick={handleImportClick}
              title="Import canvas data from file"
            >
              <FileUp size={16} />
              <span>Import Data</span>
            </motion.button>

            {/* <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
              onClick={onClearData}
              title="Clear all canvas data"
            >
              <X size={16} />
              <span>Clear All Data</span>
            </motion.button> */}
          </div>
          {/* <p className="text-xs text-gray-500 mt-2">
            Export saves all your canvas data as a backup file. Import replaces
            current data with imported file. Clear removes everything. Free Up
            Storage clears other website data when storage is nearly full.
          </p> */}
        </div>
      </div>
    </motion.div>
  );
};

export default CanvasSettings;
