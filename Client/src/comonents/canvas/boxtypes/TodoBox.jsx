import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, X } from "lucide-react";

const TodoBox = ({
  id,
  tasks: initialTasks,
  onUpdate,
  editMode,
  localEditMode,
}) => {
  const [localTasks, setLocalTasks] = useState(initialTasks || []);
  const [newTask, setNewTask] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const completionPercentage =
    localTasks.length > 0
      ? Math.round(
          (localTasks.filter((task) => task.completed).length /
            localTasks.length) *
            100
        )
      : 0;

  const handleAddTask = () => {
    if (newTask.trim()) {
      const taskToAdd = { text: newTask.trim(), completed: false };
      setLocalTasks([...localTasks, taskToAdd]);
      onUpdate(id, { tasks: [...localTasks, taskToAdd] });
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...localTasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };
    setLocalTasks(updatedTasks);
    onUpdate(id, { tasks: updatedTasks });
  };

  const deleteTask = (index) => {
    const updatedTasks = localTasks.filter((_, i) => i !== index);
    setLocalTasks(updatedTasks);
    onUpdate(id, { tasks: updatedTasks });
  };

  return (
    <>
      <div className="w-full h-full p-4 flex flex-col">
        <div className="flex-grow overflow-auto">
          <AnimatePresence>
            {localTasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="group flex items-center justify-between mb-2 hover:bg-gray-50 p-1 rounded"
              >
                <div className="flex items-center gap-2 flex-grow">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    disabled={!editMode && !localEditMode}
                  />
                  <span
                    className={`flex-grow whitespace-normal break-words ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                {(editMode || localEditMode) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(index);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 ml-2"
                  >
                    <X size={16} />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {(editMode || localEditMode) && (
          <div className="mt-2">
            {showAddTask ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center"
              >
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                  className="flex-grow border border-gray-300 rounded px-2 py-1 text-sm"
                  placeholder="Add new task..."
                  autoFocus
                />
                <button
                  onClick={handleAddTask}
                  className="ml-2 bg-blue-500 text-white p-1 rounded"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="ml-1 bg-gray-300 text-gray-700 p-1 rounded"
                >
                  <X size={16} />
                </button>
              </motion.div>
            ) : (
              <button
                onClick={() => setShowAddTask(true)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-800"
              >
                <Plus size={16} className="mr-1" />
                Add Task
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TodoBox;
