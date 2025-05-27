import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  format,
  parseISO,
  addDays,
  isSameDay,
  differenceInDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  isSameMonth,
  isSameYear,
} from "date-fns";
import { toPng } from "html-to-image";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const calculateDateRange = (tasks) => {
  let allDates = [];

  tasks.forEach((task) => {
    allDates.push(new Date(task.start));
    allDates.push(new Date(task.end));
    allDates.push(new Date(task.newEnd));

    task.subtasks.forEach((subtask) => {
      allDates.push(new Date(subtask.start));
      allDates.push(new Date(subtask.end));
      allDates.push(new Date(subtask.newEnd));
    });
  });

  const minDate = new Date(Math.min(...allDates.map((date) => date.getTime())));
  const maxDate = new Date(Math.max(...allDates.map((date) => date.getTime())));

  minDate.setDate(minDate.getDate() - 7);
  maxDate.setDate(maxDate.getDate() + 7);

  return { minDate, maxDate };
};

const groupDatesByViewMode = (minDate, maxDate, viewMode) => {
  if (viewMode === "days") {
    return eachDayOfInterval({ start: minDate, end: maxDate });
  } else if (viewMode === "months") {
    return eachMonthOfInterval({ start: minDate, end: maxDate });
  } else if (viewMode === "years") {
    return eachYearOfInterval({ start: minDate, end: maxDate });
  }
  return [];
};

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

const calculateSubtaskProgress = (subtask) => {
  if (!subtask.progressDates || subtask.progressDates.length === 0) return 0;

  const totalDuration =
    differenceInDays(new Date(subtask.newEnd), new Date(subtask.start)) + 1;
  const taskDuration =
    differenceInDays(new Date(subtask.end), new Date(subtask.start)) + 1;
  const extendedDuration = totalDuration - taskDuration;

  let completedDays = 0;

  subtask.progressDates.forEach((period) => {
    const start = new Date(period.start);
    const end = new Date(period.end);
    completedDays += differenceInDays(end, start) + 1;
  });

  const originalProgress = Math.min((completedDays / taskDuration) * 100, 100);
  const extendedProgress = Math.max(
    0,
    ((completedDays - taskDuration) / extendedDuration) * 100
  );

  const totalProgress =
    (originalProgress * taskDuration + extendedProgress * extendedDuration) /
    totalDuration;

  return Math.round(totalProgress);
};

const calculateTaskProgress = (subtasks) => {
  if (subtasks.length === 0) return 0;
  const totalProgress = subtasks.reduce(
    (sum, subtask) => sum + calculateSubtaskProgress(subtask),
    0
  );
  return Math.round(totalProgress / subtasks.length);
};

// Darker color options
const colorOptions = [
  { name: "White", value: "#FFFFFF", bg: "#F5F5F5" },
  { name: "Ocean Blue", value: "#1D4ED8", bg: "#BFDBFE" }, // darker than #2563EB
  { name: "Purple", value: "#6D28D9", bg: "#DDD6FE" }, // darker than #7C3AED
  { name: "Rose", value: "#BE123C", bg: "#FECACA" }, // darker than #E11D48
  { name: "Amber", value: "#B45309", bg: "#FDE68A" }, // darker than #D97706
  { name: "Teal", value: "#0F766E", bg: "#99F6E4" }, // darker than #0D9488
  { name: "Indigo", value: "#4338CA", bg: "#C7D2FE" }, // darker than #4F46E5
  { name: "Pink", value: "#BE185D", bg: "#FBCFE8" }, // darker than #DB2777
  { name: "Lime", value: "#4D7C0F", bg: "#D9F99D" }, // darker than #65A30D
  { name: "Cyan", value: "#0E7490", bg: "#A5F3FC" }, // darker than #0891B2
];

const AddTaskModal = ({ onSave, onClose }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    color: "#1E40AF",
    colorBg: "#DBEAFE",
    start: format(new Date(), "yyyy-MM-dd"),
    end: format(addDays(new Date(), 7), "yyyy-MM-dd"),
    newEnd: format(addDays(new Date(), 7), "yyyy-MM-dd"),
    subtasks: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field, value) => {
    setNewTask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newTask);
  };

  return (
    <>
      <div
        className="fixed inset-0  bg-opacity-20 backdrop-blur-sm transition-all duration-300 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-all duration-300 ease-out z-50 animate-slideInRight">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  Add New Task
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-slate-400"
                  placeholder="Enter task title..."
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">
                  Color Theme
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      type="button"
                      key={color.value}
                      className={`w-12 h-12 rounded-xl cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center ${
                        newTask.color === color.value
                          ? "ring-3 ring-blue-500 ring-offset-2 shadow-lg"
                          : "hover:shadow-md"
                      }`}
                      style={{ backgroundColor: color.bg }}
                      onClick={() =>
                        setNewTask((prev) => ({
                          ...prev,
                          color: color.value,
                          colorBg: color.bg,
                        }))
                      }
                      title={color.name}
                    >
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color.value }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newTask.start}
                    onChange={(e) => handleDateChange("start", e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newTask.end}
                    min={newTask.start}
                    onChange={(e) => handleDateChange("end", e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Extended End Date
                  </label>
                  <input
                    type="date"
                    value={newTask.newEnd}
                    min={newTask.end}
                    onChange={(e) => handleDateChange("newEnd", e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const AddSubtaskModal = ({ onSave, onClose, parentTask }) => {
  const [newSubtask, setNewSubtask] = useState({
    title: "",
    assignedTo: "",
    duration: 7,
    start: parentTask.start,
    end: parentTask.end,
    newEnd: parentTask.newEnd,
    progressDates: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSubtask((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field, value) => {
    setNewSubtask((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newSubtask);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-opacity-20 backdrop-blur-sm transition-all duration-300 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-all duration-300 ease-out z-50 animate-slideInRight">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  Add New Subtask
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Subtask Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newSubtask.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-slate-400"
                  placeholder="Enter subtask title..."
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Assigned To
                </label>
                <input
                  type="text"
                  name="assignedTo"
                  value={newSubtask.assignedTo}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter assignee name..."
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Duration (days)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={newSubtask.duration}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newSubtask.start}
                    onChange={(e) => handleDateChange("start", e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newSubtask.end}
                    min={newSubtask.start}
                    onChange={(e) => handleDateChange("end", e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Extended End Date
                  </label>
                  <input
                    type="date"
                    value={newSubtask.newEnd}
                    min={newSubtask.end}
                    onChange={(e) => handleDateChange("newEnd", e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Add Subtask
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const EditModal = ({ item, onSave, onClose, type }) => {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field, value) => {
    setEditedItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...editedItem,
      type: type, // Ensure type is passed back
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-opacity-20 backdrop-blur-sm transition-all duration-300 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-all duration-300 ease-out z-50 animate-slideInRight">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                  Edit {type}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editedItem.title}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {type === "task" && (
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">
                    Color Theme
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {colorOptions.map((color) => (
                      <button
                        type="button"
                        key={color.value}
                        className={`w-12 h-12 rounded-xl cursor-pointer transition-all duration-200 hover:scale-110 flex items-center justify-center ${
                          editedItem.color === color.value
                            ? "ring-3 ring-blue-500 ring-offset-2 shadow-lg"
                            : "hover:shadow-md"
                        }`}
                        style={{ backgroundColor: color.bg }}
                        onClick={() =>
                          setEditedItem((prev) => ({
                            ...prev,
                            color: color.value,
                            colorBg: color.bg,
                          }))
                        }
                        title={color.name}
                      >
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: color.value }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {type === "subtask" && (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Assigned To
                    </label>
                    <input
                      type="text"
                      name="assignedTo"
                      value={editedItem.assignedTo || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter assignee name..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={editedItem.duration || ""}
                      onChange={handleChange}
                      min="1"
                      className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={editedItem.start}
                    onChange={(e) => handleDateChange("start", e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={editedItem.end}
                    min={editedItem.start}
                    onChange={(e) => handleDateChange("end", e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Extended End Date
                  </label>
                  <input
                    type="date"
                    value={editedItem.newEnd}
                    min={editedItem.end}
                    onChange={(e) => handleDateChange("newEnd", e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const GanttChart = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(70);
  const [viewMode, setViewMode] = useState("days");
  const [editingItem, setEditingItem] = useState(null);
  const [addingTask, setAddingTask] = useState(false);
  const [addingSubtask, setAddingSubtask] = useState(false);
  const [selectedTaskForSubtask, setSelectedTaskForSubtask] = useState(null);
  const [addingItemType, setAddingItemType] = useState(null);
  const [newItemData, setNewItemData] = useState({});
  const [expandedSubtasks, setExpandedSubtasks] = useState({});
  const [projectTitle, setProjectTitle] = useState("");
  const [projectId, setProjectId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editModalType, setEditModalType] = useState("");
  const [appearance, setAppearance] = useState({
    colors: {
      primary: "#0a1a2f",
      secondary: "#204b66",
      text: "#b0cde5",
      background: "#ffffff",
    },
  });

  const ganttRef = useRef(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const ganttProjects = JSON.parse(
      localStorage.getItem("ganttProjects") || "[]"
    );
    const appearanceData = JSON.parse(
      localStorage.getItem("appearance") || "{}"
    );

    if (appearanceData.colors) {
      setAppearance(appearanceData);
    }

    // Find the project by name from URL params
    const project = ganttProjects.find(
      (p) =>
        p.name.toLowerCase().replace(/\s+/g, "-") === projectName ||
        p.id.toString() === projectName
    );

    if (project) {
      setProjectTitle(project.name);
      setProjectId(project.id);
      setTasks(project.tasks || []);
    } else {
      // If no project found, redirect back or show error
      navigate(-1);
    }
  }, [projectName, navigate]);

  const updateLocalStorage = (updatedTasks) => {
    const ganttProjects = JSON.parse(
      localStorage.getItem("ganttProjects") || "[]"
    );
    const updatedProjects = ganttProjects.map((project) =>
      project.id === projectId
        ? {
            ...project,
            tasks: updatedTasks,
            updatedAt: format(new Date(), "yyyy-MM-dd"),
          }
        : project
    );
    localStorage.setItem("ganttProjects", JSON.stringify(updatedProjects));
  };

  const { minDate, maxDate } =
    tasks.length > 0
      ? calculateDateRange(tasks)
      : { minDate: new Date(), maxDate: new Date() };
  const dateRange = groupDatesByViewMode(minDate, maxDate, viewMode);
  const daysInRange = eachDayOfInterval({ start: minDate, end: maxDate });

  const toggleCollapse = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, collapsed: !task.collapsed } : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const toggleSubtaskExpansion = (taskId, subtaskId) => {
    const key = `${taskId}-${subtaskId}`;
    setExpandedSubtasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAddTask = () => {
    setAddingTask(true);
  };

  const handleAddSubtask = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setSelectedTaskForSubtask(task);
    setAddingSubtask(true);
  };

  const saveNewTask = (newTask) => {
    const newTaskId = Math.max(...tasks.map((t) => t.id), 0) + 1;
    const taskToAdd = {
      ...newTask,
      id: newTaskId,
      collapsed: false,
      subtasks: [],
    };
    const updatedTasks = [...tasks, taskToAdd];
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
    setAddingTask(false);
  };

  const saveNewSubtask = (newSubtask) => {
    const parentTask = selectedTaskForSubtask;
    const newSubtaskId =
      Math.max(...parentTask.subtasks.map((s) => s.id), 0) + 1;
    const subtaskToAdd = {
      ...newSubtask,
      id: newSubtaskId,
    };

    const updatedTasks = tasks.map((task) =>
      task.id === parentTask.id
        ? { ...task, subtasks: [...task.subtasks, subtaskToAdd] }
        : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
    setAddingSubtask(false);
    setSelectedTaskForSubtask(null);
  };

  const handleAddItem = (type, parentTaskId = null, parentSubtaskId = null) => {
    setAddingItemType(type);

    if (type === "progress" && parentTaskId && parentSubtaskId) {
      const parentTask = tasks.find((t) => t.id === parentTaskId);
      const parentSubtask = parentTask.subtasks.find(
        (s) => s.id === parentSubtaskId
      );
      setNewItemData({
        start: parentSubtask.start,
        end: parentSubtask.start,
        parentTaskId,
        parentSubtaskId,
      });
    }
  };

  const saveNewItem = () => {
    let updatedTasks = [...tasks];

    if (
      addingItemType === "progress" &&
      newItemData.parentTaskId &&
      newItemData.parentSubtaskId
    ) {
      if (!newItemData.start || !newItemData.end) return;

      const newPeriod = {
        start: newItemData.start,
        end: newItemData.end,
      };

      updatedTasks = tasks.map((task) =>
        task.id === newItemData.parentTaskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === newItemData.parentSubtaskId
                  ? {
                      ...subtask,
                      progressDates: [...subtask.progressDates, newPeriod],
                    }
                  : subtask
              ),
            }
          : task
      );
    }

    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
    setAddingItemType(null);
    setNewItemData({});
  };

  const startEditing = (item, type, parentTaskId = null) => {
    setEditingItem({ ...item, type, parentTaskId });
    setEditModalType(type);
    setShowEditModal(true);
  };

  const handleSaveEdit = (editedItem) => {
    let updatedTasks = [...tasks];

    if (editedItem.type === "task") {
      updatedTasks = tasks.map((task) =>
        task.id === editedItem.id
          ? { ...editedItem, subtasks: task.subtasks }
          : task
      );
    } else if (editedItem.type === "subtask" && editedItem.parentTaskId) {
      updatedTasks = tasks.map((task) =>
        task.id === editedItem.parentTaskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === editedItem.id
                  ? { ...editedItem, parentTaskId: undefined } // Remove parentTaskId from the subtask data
                  : subtask
              ),
            }
          : task
      );
    }

    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
    setShowEditModal(false);
    setEditingItem(null);
  };

  const deleteItem = (id, type, parentTaskId = null) => {
    let updatedTasks = [...tasks];

    if (type === "task") {
      updatedTasks = tasks.filter((task) => task.id !== id);
    } else if (type === "subtask" && parentTaskId) {
      updatedTasks = tasks.map((task) =>
        task.id === parentTaskId
          ? {
              ...task,
              subtasks: task.subtasks.filter((subtask) => subtask.id !== id),
            }
          : task
      );
    } else if (type === "progress" && parentTaskId) {
      updatedTasks = tasks.map((task) =>
        task.id === parentTaskId.taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === parentTaskId.subtaskId
                  ? {
                      ...subtask,
                      progressDates: subtask.progressDates.filter(
                        (_, i) => i !== id
                      ),
                    }
                  : subtask
              ),
            }
          : task
      );
    }

    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const getCellStatus = (item, date) => {
    const currentDate = formatDate(date);
    const isInTaskRange = currentDate >= item.start && currentDate <= item.end;
    const isInExtendedRange =
      currentDate > item.end && currentDate <= item.newEnd;

    let hasProgress = false;
    for (const progressPeriod of item.progressDates || []) {
      if (
        currentDate >= progressPeriod.start &&
        currentDate <= progressPeriod.end
      ) {
        hasProgress = true;
        break;
      }
    }

    if (isInTaskRange) {
      return hasProgress ? "completed" : "pending";
    } else if (isInExtendedRange) {
      return hasProgress ? "extended-completed" : "extended-pending";
    }

    return "outside";
  };

  const getCellColor = (status, taskColor = null) => {
    const baseColor = taskColor || "#1E40AF";

    switch (status) {
      case "completed":
        return `bg-emerald-500 border border-emerald-600 shadow-sm`;
      case "pending":
        return `bg-emerald-100 border border-emerald-300`;
      case "extended-completed":
        return `bg-rose-500 border border-rose-600 shadow-sm`;
      case "extended-pending":
        return `bg-rose-100 border border-rose-300`;
      default:
        return "border border-slate-200 bg-slate-50";
    }
  };

  const getTaskCellColor = (status, task) => {
    const lightColor = task.colorBg || "#DBEAFE";
    const darkColor = task.color || "#1E40AF";

    switch (status) {
      case "completed":
        return { backgroundColor: darkColor };
      case "pending":
        return { backgroundColor: lightColor };
      case "extended-completed":
        return { backgroundColor: "#DC2626" };
      case "extended-pending":
        return { backgroundColor: "#FEE2E2" };
      default:
        return { backgroundColor: lightColor };
    }
  };

  const getSubtaskCellColor = (status) => {
    switch (status) {
      case "completed":
        return { backgroundColor: "#10B981", borderColor: "#059669" };
      case "pending":
        return { backgroundColor: "#D1FAE5", borderColor: "#6EE7B7" };
      case "extended-completed":
        return { backgroundColor: "#EF4444", borderColor: "#DC2626" };
      case "extended-pending":
        return { backgroundColor: "#FEE2E2", borderColor: "#FECACA" };
      default:
        return { backgroundColor: "#F8FAFC", borderColor: "#E2E8F0" };
    }
  };

  const handleZoom = (direction) => {
    if (direction === "in" && zoomLevel < 150) {
      setZoomLevel(zoomLevel + 10);
    } else if (direction === "out" && zoomLevel > 50) {
      setZoomLevel(zoomLevel - 10);
    }
  };

  const isDateInRange = (date, start, end) => {
    if (viewMode === "days") {
      return date >= new Date(start) && date <= new Date(end);
    } else if (viewMode === "months") {
      const dateMonth = date.getMonth();
      const dateYear = date.getFullYear();
      const startMonth = new Date(start).getMonth();
      const startYear = new Date(start).getFullYear();
      const endMonth = new Date(end).getMonth();
      const endYear = new Date(end).getFullYear();

      const dateTime = dateYear * 12 + dateMonth;
      const startTime = startYear * 12 + startMonth;
      const endTime = endYear * 12 + endMonth;

      return dateTime >= startTime && dateTime <= endTime;
    } else if (viewMode === "years") {
      const dateYear = date.getFullYear();
      const startYear = new Date(start).getFullYear();
      const endYear = new Date(end).getFullYear();

      return dateYear >= startYear && dateYear <= endYear;
    }
    return false;
  };

  const isDateInExtendedRange = (date, end, newEnd) => {
    if (viewMode === "days") {
      return date > new Date(end) && date <= new Date(newEnd);
    } else if (viewMode === "months") {
      const dateMonth = date.getMonth();
      const dateYear = date.getFullYear();
      const endMonth = new Date(end).getMonth();
      const endYear = new Date(end).getFullYear();
      const newEndMonth = new Date(newEnd).getMonth();
      const newEndYear = new Date(newEnd).getFullYear();

      const dateTime = dateYear * 12 + dateMonth;
      const endTime = endYear * 12 + endMonth;
      const newEndTime = newEndYear * 12 + newEndMonth;

      return dateTime > endTime && dateTime <= newEndTime;
    } else if (viewMode === "years") {
      const dateYear = date.getFullYear();
      const endYear = new Date(end).getFullYear();
      const newEndYear = new Date(newEnd).getFullYear();

      return dateYear > endYear && dateYear <= newEndYear;
    }
    return false;
  };

  const isDateInProgress = (date, progressDates) => {
    if (!progressDates || progressDates.length === 0) return false;

    for (const period of progressDates) {
      if (viewMode === "days") {
        if (date >= new Date(period.start) && date <= new Date(period.end)) {
          return true;
        }
      } else if (viewMode === "months") {
        const dateMonth = date.getMonth();
        const dateYear = date.getFullYear();
        const startMonth = new Date(period.start).getMonth();
        const startYear = new Date(period.start).getFullYear();
        const endMonth = new Date(period.end).getMonth();
        const endYear = new Date(period.end).getFullYear();

        const dateTime = dateYear * 12 + dateMonth;
        const startTime = startYear * 12 + startMonth;
        const endTime = endYear * 12 + endMonth;

        if (dateTime >= startTime && dateTime <= endTime) {
          return true;
        }
      } else if (viewMode === "years") {
        const dateYear = date.getFullYear();
        const startYear = new Date(period.start).getFullYear();
        const endYear = new Date(period.end).getFullYear();

        if (dateYear >= startYear && dateYear <= endYear) {
          return true;
        }
      }
    }
    return false;
  };

  const getViewModeCellStatus = (item, date) => {
    const isInTaskRange = isDateInRange(date, item.start, item.end);
    const isInExtendedRange = isDateInExtendedRange(
      date,
      item.end,
      item.newEnd
    );
    const hasProgress = isDateInProgress(date, item.progressDates);

    if (isInTaskRange) {
      return hasProgress ? "completed" : "pending";
    } else if (isInExtendedRange) {
      return hasProgress ? "extended-completed" : "extended-pending";
    }

    return "outside";
  };

  const getDayOffset = (date) => {
    const firstDate = daysInRange[0];
    const diffDays = differenceInDays(date, firstDate);
    return diffDays;
  };

  const getGroupedDates = () => {
    if (viewMode === "days") {
      const months = eachMonthOfInterval({ start: minDate, end: maxDate });
      return months.map((month) => ({
        date: month,
        label: format(month, "MMM yyyy"),
        span: differenceInDays(endOfMonth(month), month) + 1,
        isMonth: true,
      }));
    } else if (viewMode === "months") {
      const years = eachYearOfInterval({ start: minDate, end: maxDate });
      return years.map((year) => ({
        date: year,
        label: format(year, "yyyy"),
        span: 12,
        isYear: true,
      }));
    }
    return [];
  };

  const groupedDates = getGroupedDates();

  const getDateCellWidth = () => {
    if (viewMode === "days") {
      return Math.max(
        40,
        Math.min(80, (window.innerWidth - 800) / dateRange.length)
      );
    } else if (viewMode === "months") {
      return Math.max(
        80,
        Math.min(120, (window.innerWidth - 800) / dateRange.length)
      );
    } else {
      return Math.max(
        100,
        Math.min(150, (window.innerWidth - 800) / dateRange.length)
      );
    }
  };

  const cellWidth = getDateCellWidth();

  const exportAsImage = async () => {
    if (ganttRef.current) {
      try {
        // Temporarily hide buttons and interactive elements
        const buttons = ganttRef.current.querySelectorAll(
          "button, input, select"
        );
        const svgs = ganttRef.current.querySelectorAll('svg[role="button"]');

        buttons.forEach((btn) => (btn.style.display = "none"));
        svgs.forEach((svg) => (svg.style.display = "none"));

        const dataUrl = await toPng(ganttRef.current, {
          quality: 1.0,
          pixelRatio: 2,
          backgroundColor: "#ffffff",
          skipFonts: false,
          style: {
            width: ganttRef.current.scrollWidth + "px",
            height: ganttRef.current.scrollHeight + "px",
          },
          width: ganttRef.current.scrollWidth,
          height: ganttRef.current.scrollHeight,
        });

        // Restore buttons and interactive elements
        buttons.forEach((btn) => (btn.style.display = ""));
        svgs.forEach((svg) => (svg.style.display = ""));

        const link = document.createElement("a");
        link.download = `${projectTitle}-gantt-${format(
          new Date(),
          "yyyy-MM-dd"
        )}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error exporting image:", error);
        alert("Error exporting image. Please try again.");
      }
    }
  };

  const getExcelColor = (status) => {
    switch (status) {
      case "completed":
        return "FF10B981";
      case "pending":
        return "FFECFDF5";
      case "extended-completed":
        return "FFF43F5E";
      case "extended-pending":
        return "FFFFF1F2";
      default:
        return "FFF8FAFC";
    }
  };

  const exportAsExcel = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Gantt Chart");

      const headers = [
        "Task Name",
        "Assigned To",
        "Duration",
        "Progress",
        "Start Date",
        "End Date",
        "New End Date",
        ...dateRange.map(() => ""),
      ];

      const headerRow = worksheet.addRow(headers);

      headerRow.eachCell((cell, colNumber) => {
        if (colNumber <= 7) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF1E293B" },
          };
          cell.font = {
            color: { argb: "FFFFFFFF" },
            bold: true,
            size: 11,
          };
        } else {
          cell.value = "";
        }
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        cell.border = {
          top: { style: "thin", color: { argb: "FF475569" } },
          left: { style: "thin", color: { argb: "FF475569" } },
          bottom: { style: "thin", color: { argb: "FF475569" } },
          right: { style: "thin", color: { argb: "FF475569" } },
        };
      });

      tasks.forEach((task) => {
        const taskRow = {
          "Task Name": task.title,
          "Assigned To": "",
          Duration:
            differenceInDays(new Date(task.end), new Date(task.start)) + 1,
          Progress: `${calculateTaskProgress(task.subtasks)}%`,
          "Start Date": task.start,
          "End Date": task.end,
          "New End Date": task.newEnd,
        };

        const taskRowArray = [...Object.values(taskRow)];

        dateRange.forEach((date) => {
          const cellStatus = getViewModeCellStatus(task, date);
          taskRowArray.push("");
        });

        const row = worksheet.addRow(taskRowArray);

        row.eachCell((cell, colNumber) => {
          if (colNumber <= 7) {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: {
                argb: task.color ? task.color.replace("#", "FF") : "FF3B82F6",
              },
            };
          } else {
            const dateIndex = colNumber - 8;
            if (dateIndex < dateRange.length) {
              const date = dateRange[dateIndex];
              const status = getViewModeCellStatus(task, date);
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: getExcelColor(status) },
              };
            }
          }

          cell.border = {
            top: { style: "thin", color: { argb: "FFE2E8F0" } },
            left: { style: "thin", color: { argb: "FFE2E8F0" } },
            bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
            right: { style: "thin", color: { argb: "FFE2E8F0" } },
          };

          cell.font = {
            bold: true,
            size: 10,
          };

          cell.alignment = {
            vertical: "middle",
            horizontal: colNumber <= 1 ? "left" : "center",
          };
        });

        if (!task.collapsed) {
          task.subtasks.forEach((subtask) => {
            const subtaskRowArray = [
              `  • ${subtask.title}`,
              subtask.assignedTo,
              subtask.duration,
              `${calculateSubtaskProgress(subtask)}%`,
              subtask.start,
              subtask.end,
              subtask.newEnd,
            ];

            dateRange.forEach((date) => {
              subtaskRowArray.push("");
            });

            const subRow = worksheet.addRow(subtaskRowArray);

            subRow.eachCell((cell, colNumber) => {
              if (colNumber <= 7) {
                cell.fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "FFF8FAFC" },
                };
              } else {
                const dateIndex = colNumber - 8;
                if (dateIndex < dateRange.length) {
                  const date = dateRange[dateIndex];
                  const status = getViewModeCellStatus(subtask, date);
                  cell.fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: getExcelColor(status) },
                  };
                }
              }

              cell.border = {
                top: { style: "thin", color: { argb: "FFE2E8F0" } },
                left: { style: "thin", color: { argb: "FFE2E8F0" } },
                bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
                right: { style: "thin", color: { argb: "FFE2E8F0" } },
              };

              cell.font = {
                size: 10,
              };

              cell.alignment = {
                vertical: "middle",
                horizontal: colNumber <= 1 ? "left" : "center",
              };
            });
          });
        }
      });

      const wscols = [
        { width: 30 },
        { width: 20 },
        { width: 10 },
        { width: 10 },
        { width: 12 },
        { width: 12 },
        { width: 12 },
        ...dateRange.map(() => ({
          width: viewMode === "days" ? 12 : viewMode === "months" ? 10 : 8,
        })),
      ];

      wscols.forEach((col, index) => {
        worksheet.getColumn(index + 1).width = col.width;
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(
        blob,
        `${projectTitle}-gantt-${format(new Date(), "yyyy-MM-dd")}.xlsx`
      );
    } catch (error) {
      console.error("Error exporting Excel:", error);
      alert("Error exporting Excel file. Please try again.");
    }
  };

  const exportAsHTML = () => {
    const clone = ganttRef.current.cloneNode(true);

    // Fix progress bars by directly setting their computed values
    let progressBarIndex = 0;
    const allProgressBars = clone.querySelectorAll(".progress-bar");

    // Process task progress bars
    tasks.forEach((task) => {
      if (progressBarIndex < allProgressBars.length) {
        const taskProgress = calculateTaskProgress(task.subtasks);
        const progressBar = allProgressBars[progressBarIndex];
        progressBar.style.width = `${taskProgress}%`;
        progressBar.style.background =
          "linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%)";
        progressBar.style.transition = "none";
        progressBarIndex++;
      }

      // Process subtask progress bars (only if task is not collapsed)
      if (!task.collapsed) {
        task.subtasks.forEach((subtask) => {
          if (progressBarIndex < allProgressBars.length) {
            const subtaskProgress = calculateSubtaskProgress(subtask);
            const progressBar = allProgressBars[progressBarIndex];
            progressBar.style.width = `${subtaskProgress}%`;
            progressBar.style.background =
              "linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%)";
            progressBar.style.transition = "none";
            progressBarIndex++;
          }
        });
      }
    });

    const interactiveElements = clone.querySelectorAll(
      "button, svg, input, select"
    );
    interactiveElements.forEach((el) => el.remove());

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${projectTitle} Gantt Chart - ${format(
      new Date(),
      "yyyy-MM-dd"
    )}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body {
          margin: 0;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .gantt-container {
          width: 100%;
          overflow-x: auto;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .gantt-chart {
          min-width: 100%;
          border-radius: 16px;
          overflow: hidden;
        }
        table {
          border-radius: 16px;
          overflow: hidden;
        }
        th, td {
          border-radius: 8px;
        }
        .progress-bar {
          background: linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%) !important;
          transition: none !important;
        }
        .progress-container {
          width: 100%;
          background-color: #E2E8F0;
          border-radius: 9999px;
          height: 8px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .progress-text {
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          margin-top: 4px;
          display: block;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="gantt-container">
        ${clone.outerHTML}
      </div>
    </body>
    </html>
  `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${projectTitle}-gantt-${format(
      new Date(),
      "yyyy-MM-dd"
    )}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!projectTitle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading project...</p>
        </div>
      </div>
    );
  }

  const ganttStyles = {
    taskContainer: {
      minWidth: `${dateRange.length * cellWidth + 800}px`, // Total width of all columns
    },
    subtaskCell: {
      minWidth: `${cellWidth}px`,
      width: `${cellWidth}px`,
      flexShrink: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 animate-fadeIn">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInDown {
          from { 
            opacity: 0; 
            transform: translateY(-10px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        @keyframes fadeOut {
          from { 
            opacity: 1; 
            transform: translateY(0);
          }
          to { 
            opacity: 0; 
            transform: translateY(-10px);
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-10px); }
          70% { transform: translateY(-5px); }
        }
        @keyframes rotateCollapse {
          from { transform: rotate(0deg); }
          to { transform: rotate(90deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.3s ease-out;
        }
        .animate-fadeOut {
          animation: fadeOut 0.2s ease-out;
        }
        .animate-pulse-subtle {
          animation: pulse 2s infinite;
        }
        .animate-bounce-subtle {
          animation: bounce 2s infinite;
        }
        .progress-bar {
          background: linear-gradient(90deg, #3B82F6 0%, #1D4ED8 100%);
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .task-hover {
          transition: all 0.3s ease-in-out;
        }
        .task-hover:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .collapse-icon {
          transition: transform 0.3s ease-in-out;
        }
        .collapsed .collapse-icon {
          transform: rotate(-90deg);
        }
        .subtask-row {
          transition: all 0.3s ease-in-out;
          transform-origin: top;
        }
        .subtask-collapsed {
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
        }
        .subtask-expanded {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .page-transition {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>

      {addingTask && (
        <AddTaskModal
          onSave={saveNewTask}
          onClose={() => setAddingTask(false)}
        />
      )}

      {addingSubtask && selectedTaskForSubtask && (
        <AddSubtaskModal
          onSave={saveNewSubtask}
          onClose={() => {
            setAddingSubtask(false);
            setSelectedTaskForSubtask(null);
          }}
          parentTask={selectedTaskForSubtask}
        />
      )}

      {showEditModal && editingItem && (
        <EditModal
          item={editingItem}
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)}
          type={editModalType}
        />
      )}

      {/* Header with appearance colors */}
      <div
        className="w-full shadow-lg border-b sticky top-0 z-30 page-transition"
        style={{
          backgroundColor: appearance.colors.primary,
          borderColor: appearance.colors.secondary,
        }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1
                  className="text-xl font-bold"
                  style={{ color: appearance.colors.text }}
                >
                  {projectTitle}
                </h1>
                <p
                  className="text-xs"
                  style={{ color: appearance.colors.text, opacity: 0.7 }}
                >
                  Professional project management dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <span
                  className="text-xs font-semibold"
                  style={{ color: appearance.colors.text }}
                >
                  View:
                </span>
                <div className="flex bg-black bg-opacity-20 rounded-lg p-1">
                  {["days", "months", "years"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                        viewMode === mode
                          ? "text-white shadow-sm transform scale-105"
                          : "hover:bg-white hover:bg-opacity-10"
                      }`}
                      style={{
                        backgroundColor:
                          viewMode === mode
                            ? appearance.colors.secondary
                            : "transparent",
                        color: appearance.colors.text,
                      }}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Export Buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={exportAsImage}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 text-xs transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                  title="Export as Image"
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Image</span>
                </button>
                <button
                  onClick={exportAsExcel}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 text-xs transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                  title="Export as Excel"
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Excel</span>
                </button>
                <button
                  onClick={exportAsHTML}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 text-xs transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                  title="Export as HTML"
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                  <span>HTML</span>
                </button>
              </div>

              {/* Add Task Button */}
              <button
                onClick={handleAddTask}
                className="flex items-center space-x-1 px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 text-xs transition-all duration-200 shadow-md hover:shadow-lg font-medium hover:scale-105"
              >
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Add Task</span>
              </button>
            </div>
          </div>
        </div>

        {/* Legend with Back Button on the left and Zoom on the right */}
        <div
          className="px-4 py-2 border-t bg-opacity-50"
          style={{
            borderColor: appearance.colors.secondary,
            backgroundColor: appearance.colors.secondary,
          }}
        >
          <div className="flex items-center justify-between">
            {/* Back Button on the left */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all duration-200 font-medium text-sm"
              style={{ color: appearance.colors.text }}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back</span>
            </button>

            {/* Legend items centered */}
            <div className="flex items-center justify-center space-x-6 flex-1">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-emerald-100 border border-emerald-300 rounded-sm"></div>
                <span
                  className="text-xs"
                  style={{ color: appearance.colors.text }}
                >
                  Pending
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-emerald-500 border border-emerald-600 rounded-sm"></div>
                <span
                  className="text-xs"
                  style={{ color: appearance.colors.text }}
                >
                  Completed
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-rose-100 border border-rose-300 rounded-sm"></div>
                <span
                  className="text-xs"
                  style={{ color: appearance.colors.text }}
                >
                  Extended Pending
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-rose-500 border border-rose-600 rounded-sm"></div>
                <span
                  className="text-xs"
                  style={{ color: appearance.colors.text }}
                >
                  Extended Completed
                </span>
              </div>
            </div>

            {/* Zoom Controls on the right */}
            <div className="flex items-center space-x-2 bg-black bg-opacity-20 rounded-lg p-1">
              <button
                onClick={() => handleZoom("out")}
                className="p-1.5 bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 disabled:opacity-50 transition-all duration-200 shadow-sm hover:scale-110"
                disabled={zoomLevel <= 50}
                style={{ color: appearance.colors.text }}
              >
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <span
                className="text-xs font-medium px-1"
                style={{ color: appearance.colors.text }}
              >
                {zoomLevel}%
              </span>
              <button
                onClick={() => handleZoom("in")}
                className="p-1.5 bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 disabled:opacity-50 transition-all duration-200 shadow-sm hover:scale-110"
                disabled={zoomLevel >= 150}
                style={{ color: appearance.colors.text }}
              >
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-3 page-transition">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-slideUp">
          {/* Gantt Chart */}
          <div className="overflow-hidden">
            <div
              className="overflow-x-auto"
              ref={ganttRef}
              style={{ zoom: `${zoomLevel}%` }}
            >
              <div
                style={{ minWidth: `${dateRange.length * cellWidth + 800}px` }}
              >
                {/* Header - View Mode */}
                <div className="flex bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                  <div className="w-56 min-w-56 border-r border-slate-600 p-3 font-bold text-sm">
                    Task
                  </div>
                  <div className="w-28 min-w-28 border-r border-slate-600 p-3 font-bold text-sm">
                    Assigned To
                  </div>
                  <div className="w-20 min-w-20 border-r border-slate-600 p-3 font-bold text-sm">
                    Duration
                  </div>
                  <div className="w-20 min-w-20 border-r border-slate-600 p-3 font-bold text-sm">
                    Progress
                  </div>
                  <div className="w-28 min-w-28 border-r border-slate-600 p-3 font-bold text-sm">
                    Start
                  </div>
                  <div className="w-28 min-w-28 border-r border-slate-600 p-3 font-bold text-sm">
                    End
                  </div>
                  <div className="w-28 min-w-28 border-r border-slate-600 p-3 font-bold text-sm">
                    Extended End
                  </div>
                  <div className="flex flex-grow">
                    {viewMode === "days" &&
                      groupedDates.map((group, idx) => (
                        <div
                          key={idx}
                          className="border-r border-slate-600 bg-slate-700 font-bold text-center p-2 text-sm"
                          style={{
                            minWidth: `${group.span * cellWidth}px`,
                            width: `${group.span * cellWidth}px`,
                          }}
                        >
                          {group.label}
                        </div>
                      ))}
                    {viewMode !== "days" &&
                      dateRange.map((date, idx) => (
                        <div
                          key={idx}
                          className="border-r border-slate-600 bg-slate-700 font-bold text-center p-2 text-sm"
                          style={{
                            minWidth: `${cellWidth}px`,
                            width: `${cellWidth}px`,
                          }}
                        >
                          {viewMode === "months" && format(date, "MMM yyyy")}
                          {viewMode === "years" && format(date, "yyyy")}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Day headers when in days view */}
                {viewMode === "days" && (
                  <div className="flex bg-slate-100">
                    <div className="w-56 min-w-56 border-r border-slate-200"></div>
                    <div className="w-28 min-w-28 border-r border-slate-200"></div>
                    <div className="w-20 min-w-20 border-r border-slate-200"></div>
                    <div className="w-20 min-w-20 border-r border-slate-200"></div>
                    <div className="w-28 min-w-28 border-r border-slate-200"></div>
                    <div className="w-28 min-w-28 border-r border-slate-200"></div>
                    <div className="w-28 min-w-28 border-r border-slate-200"></div>
                    <div className="flex flex-grow">
                      {dateRange.map((date, idx) => (
                        <div
                          key={idx}
                          className="border-r border-slate-200 bg-slate-100 text-center p-1 text-xs text-slate-600 font-medium"
                          style={{
                            minWidth: `${cellWidth}px`,
                            width: `${cellWidth}px`,
                          }}
                        >
                          {format(date, "d")}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tasks */}
              {tasks.map((task, taskIndex) => (
                <React.Fragment key={task.id}>
                  {/* Task Row */}
                  <div
                    className={`flex border-t border-slate-200 hover:bg-slate-50 transition-all duration-300 task-hover ${
                      task.collapsed ? "collapsed" : ""
                    }`}
                  >
                    <div
                      className="w-56 min-w-56 border-r border-slate-200 p-3 flex items-center font-semibold text-sm"
                      style={{ backgroundColor: task.colorBg || task.color }}
                    >
                      <button
                        onClick={() => toggleCollapse(task.id)}
                        className="mr-2 p-1 text-slate-600 hover:text-slate-800 hover:bg-white rounded-lg transition-all duration-200 collapse-icon"
                      >
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      <span
                        className="cursor-pointer hover:text-blue-600 transition-colors duration-200 flex-1"
                        onClick={() => startEditing(task, "task")}
                      >
                        {task.title}
                      </span>

                      <div className="ml-2 flex space-x-1">
                        <button
                          onClick={() => startEditing(task, "task")}
                          className="p-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Edit task"
                        >
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteItem(task.id, "task")}
                          className="p-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Delete task"
                        >
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleAddSubtask(task.id)}
                          className="p-1 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Add subtask"
                        >
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div
                      className="w-28 min-w-28 border-r border-slate-200 p-3 flex items-center text-sm"
                      style={{ backgroundColor: task.colorBg || task.color }}
                    ></div>
                    <div
                      className="w-20 min-w-20 border-r border-slate-200 p-3 text-center flex items-center justify-center font-medium text-sm"
                      style={{ backgroundColor: task.colorBg || task.color }}
                    >
                      {differenceInDays(
                        new Date(task.end),
                        new Date(task.start)
                      ) + 1}
                    </div>
                    <div
                      className="w-20 min-w-20 border-r border-slate-200 p-3 flex items-center justify-center"
                      style={{ backgroundColor: task.colorBg || task.color }}
                    >
                      <div className="w-full">
                        <div className="w-full bg-slate-200 rounded-full h-2 shadow-inner">
                          <div
                            className="progress-bar h-2 rounded-full"
                            style={{
                              width: `${calculateTaskProgress(task.subtasks)}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold text-slate-600 mt-1 block">
                          {calculateTaskProgress(task.subtasks)}%
                        </span>
                      </div>
                    </div>
                    <div
                      className="w-28 min-w-28 border-r border-slate-200 p-3 flex items-center font-medium text-slate-700 text-sm"
                      style={{ backgroundColor: task.colorBg || task.color }}
                    >
                      {task.start}
                    </div>
                    <div
                      className="w-28 min-w-28 border-r border-slate-200 p-3 flex items-center"
                      style={{ backgroundColor: task.colorBg || task.color }}
                    >
                      <div>
                        <div className="font-medium text-slate-700 text-sm">
                          {task.end}
                        </div>
                        {task.end !== task.newEnd && (
                          <div className="text-xs text-rose-600 font-medium">
                            Ext: {task.newEnd}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="w-28 min-w-28 border-r border-slate-200 p-3 flex items-center font-medium text-slate-700 text-sm"
                      style={{ backgroundColor: task.colorBg || task.color }}
                    >
                      {task.newEnd}
                    </div>
                    <div className="flex flex-grow relative">
                      {dateRange.map((date, dateIdx) => {
                        const cellStatus = getViewModeCellStatus(task, date);
                        const cellStyle = getTaskCellColor(cellStatus, task);
                        return (
                          <div
                            key={dateIdx}
                            style={{
                              minWidth: `${cellWidth}px`,
                              width: `${cellWidth}px`,
                              ...cellStyle,
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subtasks */}
                  {!task.collapsed && (
                    <div
                      className={`subtask-row ${
                        task.collapsed
                          ? "subtask-collapsed animate-collapseUp"
                          : "subtask-expanded animate-slideDown"
                      }`}
                    >
                      {task.subtasks.map((subtask) => (
                        <React.Fragment key={subtask.id}>
                          <div className="flex border-t border-slate-200 hover:bg-slate-50 transition-all duration-200 ">
                            {" "}
                            <div className="w-56 min-w-56 border-r border-slate-200 p-3 bg-slate-50">
                              <div className="ml-6 flex items-center">
                                <span className="text-slate-400 mr-2 text-lg">
                                  •
                                </span>

                                <span
                                  className="cursor-pointer hover:text-blue-600 transition-colors duration-200 flex-1 font-medium text-sm"
                                  onClick={() =>
                                    startEditing(
                                      { ...subtask, parentTaskId: task.id },
                                      "subtask",
                                      task.id
                                    )
                                  }
                                >
                                  {subtask.title}
                                </span>

                                <div className="ml-2 flex space-x-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      startEditing(
                                        { ...subtask, parentTaskId: task.id },
                                        "subtask",
                                        task.id
                                      );
                                    }}
                                    className="p-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                                    title="Edit subtask"
                                  >
                                    <svg
                                      className="h-3 w-3"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteItem(
                                        subtask.id,
                                        "subtask",
                                        task.id
                                      );
                                    }}
                                    className="p-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                    title="Delete subtask"
                                  >
                                    <svg
                                      className="h-3 w-3"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleSubtaskExpansion(
                                        task.id,
                                        subtask.id
                                      );
                                    }}
                                    className="p-1 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 hover:scale-110"
                                    title="Show progress periods"
                                  >
                                    <svg
                                      className="h-3 w-3"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="w-28 min-w-28 border-r border-slate-200 p-3 bg-slate-50 flex items-center font-medium text-slate-700 text-sm">
                              {subtask.assignedTo}
                            </div>
                            <div className="w-20 min-w-20 border-r border-slate-200 p-3 text-center bg-slate-50 flex items-center justify-center font-medium text-sm">
                              {subtask.duration}
                            </div>
                            <div className="w-20 min-w-20 border-r border-slate-200 p-3 bg-slate-50 flex items-center justify-center">
                              <div className="w-full">
                                <div className="w-full bg-slate-200 rounded-full h-2 shadow-inner">
                                  <div
                                    className="progress-bar h-2 rounded-full"
                                    style={{
                                      width: `${calculateSubtaskProgress(
                                        subtask
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="text-xs font-semibold text-slate-600 mt-1 block">
                                  {calculateSubtaskProgress(subtask)}%
                                </span>
                              </div>
                            </div>
                            <div className="w-28 min-w-28 border-r border-slate-200 p-3 bg-slate-50 flex items-center font-medium text-slate-700 text-sm">
                              {subtask.start}
                            </div>
                            <div className="w-28 min-w-28 border-r border-slate-200 p-3 bg-slate-50 flex items-center">
                              <div>
                                <div className="font-medium text-slate-700 text-sm">
                                  {subtask.end}
                                </div>
                                {subtask.end !== subtask.newEnd && (
                                  <div className="text-xs text-rose-600 font-medium">
                                    Ext: {subtask.newEnd}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="w-28 min-w-28 border-r border-slate-200 p-3 bg-slate-50 flex items-center font-medium text-slate-700 text-sm">
                              {subtask.newEnd}
                            </div>
                            {/* Replace this section in the subtasks rendering */}
                            <div className="flex flex-grow relative">
                              {dateRange.map((date, dateIdx) => {
                                const cellStatus = getViewModeCellStatus(
                                  subtask,
                                  date
                                );
                                const cellStyle =
                                  getSubtaskCellColor(cellStatus);
                                return (
                                  <div
                                    key={dateIdx}
                                    className="border-r border-slate-200"
                                    style={{
                                      minWidth: `${cellWidth}px`,
                                      width: `${cellWidth}px`,
                                      ...cellStyle,
                                    }}
                                  ></div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Progress Periods Dropdown */}
                          {expandedSubtasks[`${task.id}-${subtask.id}`] && (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 transition-all duration-300 ease-in-out animate-slideDown border-t border-slate-200">
                              <div className="pl-12 pr-4 py-3">
                                <div className="flex justify-between items-center mb-3">
                                  <h4 className="font-semibold text-xs text-slate-800">
                                    Progress Periods
                                  </h4>
                                  <button
                                    onClick={() =>
                                      handleAddItem(
                                        "progress",
                                        task.id,
                                        subtask.id
                                      )
                                    }
                                    className="flex items-center text-xs text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded-lg transition-all duration-200 hover:scale-105"
                                  >
                                    <svg
                                      className="h-3 w-3 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                      />
                                    </svg>
                                    Add Period
                                  </button>
                                </div>

                                {addingItemType === "progress" &&
                                  newItemData.parentSubtaskId ===
                                    subtask.id && (
                                    <div className="flex items-center mb-3 p-3 bg-white rounded-lg border border-blue-200 shadow-sm animate-slideUp">
                                      <input
                                        type="date"
                                        className="p-2 border border-slate-300 rounded-lg text-xs transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={newItemData.start}
                                        min={subtask.start}
                                        max={subtask.newEnd}
                                        onChange={(e) =>
                                          setNewItemData({
                                            ...newItemData,
                                            start: e.target.value,
                                          })
                                        }
                                      />
                                      <span className="mx-2 text-xs font-medium text-slate-600">
                                        to
                                      </span>
                                      <input
                                        type="date"
                                        className="p-2 border border-slate-300 rounded-lg text-xs transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={newItemData.end}
                                        min={newItemData.start || subtask.start}
                                        max={subtask.newEnd}
                                        onChange={(e) =>
                                          setNewItemData({
                                            ...newItemData,
                                            end: e.target.value,
                                          })
                                        }
                                      />
                                      <button
                                        onClick={saveNewItem}
                                        className="ml-2 px-3 py-2 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-all duration-200 hover:scale-105"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => setAddingItemType(null)}
                                        className="ml-1 px-3 py-2 bg-slate-300 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-400 transition-all duration-200 hover:scale-105"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  )}

                                {subtask.progressDates.length > 0 ? (
                                  <div className="space-y-2">
                                    {subtask.progressDates.map(
                                      (period, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200"
                                        >
                                          <span className="text-xs font-medium text-slate-700">
                                            {period.start} to {period.end}
                                          </span>
                                          <button
                                            onClick={() =>
                                              deleteItem(idx, "progress", {
                                                taskId: task.id,
                                                subtaskId: subtask.id,
                                              })
                                            }
                                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                            title="Delete period"
                                          >
                                            <svg
                                              className="h-3 w-3"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                              />
                                            </svg>
                                          </button>
                                        </div>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-xs text-slate-500 italic">
                                    No progress periods added yet
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
