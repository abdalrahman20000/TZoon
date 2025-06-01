import React from "react";
import { Upload, Link } from "lucide-react";

const ImageSelector = ({ onSelectImage, onUploadImage }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      if (dataUrl) {
        onUploadImage(dataUrl);
      }
    };
    reader.onerror = () => alert("Error reading file");
    reader.readAsDataURL(file);
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleFileUpload;
    input.click();
  };

  const handleUrlSubmit = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      onSelectImage(e.target.value.trim());
      e.target.value = "";
    }
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 w-64">
      <div className="space-y-3">
        {/* Upload from device */}
        <button
          onClick={handleUploadClick}
          className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
        >
          <Upload size={20} className="text-gray-500" />
          <span className="text-sm text-gray-600">Upload from device</span>
        </button>

        {/* Divider */}
        {/* <div className="flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-2 text-xs text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div> */}

        {/* URL input */}
        {/* <div>
          <div className="flex items-center gap-2 mb-2">
            <Link size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">From URL</span>
          </div>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            className="w-full p-2 text-sm border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
            onKeyDown={handleUrlSubmit}
          />
          <p className="text-xs text-gray-500 mt-1">Press Enter to add</p>
        </div> */}
      </div>
    </div>
  );
};

export default ImageSelector;
