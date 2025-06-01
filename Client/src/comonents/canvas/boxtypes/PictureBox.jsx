import React from "react";
import { ImageIcon } from "lucide-react";

const PictureBox = ({ imageSrc }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="Uploaded content"
          className="w-full h-full object-cover rounded-lg select-none"
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
          onMouseDown={(e) => e.preventDefault()}
        />
      ) : (
        <div className="text-center p-4 text-gray-500">
          <ImageIcon size={32} className="mx-auto mb-2" />
          <p>Add Image</p>
        </div>
      )}
    </div>
  );
};

export default PictureBox;
