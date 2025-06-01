import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const NoteBox = ({
  id,
  content,
  onUpdate,
  isSelected,
  editMode,
  localEditMode,
  setLocalEditMode,
}) => {
  const [editContent, setEditContent] = useState(content);

  const handleContentChange = (e) => setEditContent(e.target.value);

  const saveContent = () => {
    onUpdate(id, { content: editContent });
    setLocalEditMode(false);
  };

  const cancelEdit = () => {
    setLocalEditMode(false);
    setEditContent(content);
  };

  return (
    <div className="w-full h-full p-4 overflow-y-auto">
      <div className="w-full h-full flex flex-col">
        {localEditMode ? (
          <div className="w-full h-full flex flex-col relative">
            <textarea
              className="flex-grow p-2 focus:outline-none resize-none bg-transparent whitespace-pre-wrap 
              scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300
              scrollbar-thumb-rounded-full scrollbar-track-rounded-full pr-0"
              value={editContent}
              onChange={handleContentChange}
              autoFocus
              placeholder="Add note here..."
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
        ) : (
          <div
            className="w-full h-full scrollbar-thin scrollbar-track-gray-100 
            scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full
            p-2 whitespace-pre-wrap"
          >
            {content || <div className="text-gray-400 italic">Add note</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteBox;
