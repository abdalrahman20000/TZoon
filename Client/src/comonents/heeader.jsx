import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Plus,
  Trash2,
  Download,
  Upload,
  X,
  Edit2,
  Palette,
  Link as LinkIcon,
  Type,
  Wrench,
  ChevronRight,
  Menu,
  Image,
  Copy,
  ExternalLink,
} from "lucide-react";

const sampleAppearanceData = {
  staticLinks: [
    { name: "Canvas", url: "/canvas" },
    { name: "Tools", url: "/tools" },
  ],
  userLinks: [{ name: "GitHub", url: "https://github.com" }],
  colors: {
    primary: "#1e293b",
    secondary: "#f8fafc",
    text: "#ffffff",
    background: "#ffffff",
    shadow: "#0f172a",
  },
  siteTitle: "Project Management Suite",
  showLogo: false,
  logoImage: null,
  tools: [
    {
      icon: "calendar",
      name: "Gantt Chart Creator",
      description: "Create and manage project schedules",
      status: "Popular",
      bgColor: "from-blue-600 to-blue-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: false,
      path: "/gantt-chart",
    },
    {
      icon: "clipboardCheck",
      name: "Requirements Tracker",
      description: "Manage and track project requirements",
      status: "Active",
      bgColor: "from-green-600 to-green-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/requirements-tracker",
    },
    {
      icon: "lineChart",
      name: "Risk Analysis",
      description: "Identify and assess project risks",
      status: "New",
      bgColor: "from-red-600 to-red-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/risk-analysis",
    },
    {
      icon: "kanban",
      name: "Kanban Board",
      description: "Visualize workflow and manage tasks",
      status: "",
      bgColor: "from-yellow-600 to-yellow-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/kanban-board",
    },
    {
      icon: "users",
      name: "Stakeholder Matrix",
      description: "Map and manage project stakeholders",
      status: "Popular",
      bgColor: "from-purple-600 to-purple-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/stakeholder-matrix",
    },
    {
      icon: "barChart",
      name: "Earned Value Analysis",
      description: "Track project performance and costs",
      status: "",
      bgColor: "from-indigo-600 to-indigo-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/earned-value",
    },
    {
      icon: "trendingUp",
      name: "Performance Metrics",
      description: "Visualize project performance data",
      status: "New",
      bgColor: "from-emerald-600 to-emerald-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/performance-metrics",
    },
    {
      icon: "fileText",
      name: "Documentation Generator",
      description: "Create project documentation templates",
      status: "",
      bgColor: "from-orange-600 to-orange-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/documentation-generator",
    },
    {
      icon: "messagesSquare",
      name: "Team Communication",
      description: "Streamline project team communication",
      status: "",
      bgColor: "from-cyan-600 to-cyan-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/team-communication",
    },
    {
      icon: "gauge",
      name: "Resource Allocation",
      description: "Optimize project resource distribution",
      status: "Popular",
      bgColor: "from-pink-600 to-pink-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/resource-allocation",
    },
    {
      icon: "clock",
      name: "Time Tracking",
      description: "Monitor and analyze project time usage",
      status: "",
      bgColor: "from-teal-600 to-teal-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/time-tracking",
    },
    {
      icon: "brainCircuit",
      name: "PMP Exam Prep",
      description: "Practice tests for PMP certification",
      status: "New",
      bgColor: "from-violet-600 to-violet-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/pmp-exam-prep",
    },
    {
      icon: "briefcase",
      name: "PMBOK Knowledge Areas",
      description: "Interactive guide to all 10 PMBOK knowledge areas",
      status: "Premium",
      bgColor: "from-amber-600 to-amber-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/pmbok-knowledge-areas",
    },
    {
      icon: "award",
      name: "PDU Tracker",
      description:
        "Track and manage your PDU requirements for certification renewal",
      status: "New",
      bgColor: "from-emerald-600 to-emerald-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/pdu-tracker",
    },
    {
      icon: "bookOpen",
      name: "PMP Flashcards",
      description: "Interactive flashcards covering key PMP concepts and terms",
      status: "Popular",
      bgColor: "from-cyan-600 to-cyan-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/pmp-flashcards",
    },
    {
      icon: "target",
      name: "Project Charter Builder",
      description: "Create professional project charters with guided templates",
      status: "",
      bgColor: "from-rose-600 to-rose-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: true,
      path: "/project-charter-builder",
    },
  ],
};

const colorThemes = [
  {
    name: "Ocean Blue",
    colors: {
      primary: "#0a1a2f",
      secondary: "#204b66",
      text: "#b0cde5",
      shadow: "#071421",
    },
  },
  {
    name: "Forest Green",
    colors: {
      primary: "#1e3d2f",
      secondary: "#5a8c6d",
      text: "#d2e8d2",
      shadow: "#0f271c",
    },
  },
  {
    name: "Rose Garden",
    colors: {
      primary: "#e395af",
      secondary: "#aabfda",
      text: "#f6e3dc",
      shadow: "#c76d91",
    },
  },
  {
    name: "Crimson Night",
    colors: {
      primary: "#3a0d12", // deep crimson base
      secondary: "#8b1e3f", // wine red accent
      text: "#f2d1da", // soft pinkish-white text
      shadow: "#1e070a", // deep shadow
    },
  },
  {
    name: "Slate Grey",
    colors: {
      primary: "#1e1f26", // dark slate
      secondary: "#4b4e57", // muted steel grey
      text: "#d3d6dc", // light grey text
      shadow: "#0d0e12", // deep charcoal shadow
    },
  },
];

const colorSwatches = [
  "#9e5068",
  "#e395af",
  "#f6b1ce",
  "#aabfda",
  "#7185a8",
  "#fbd87e",
  "#f3e6b9",
  "#c88348",
  "#834c25",
  "#e1a95f",
  "#efdc80",
  "#faf0bf",
  "#86afa1",
  "#4c816f",
  "#214a3c",
  "#d99099",
  "#7e83a3",
  "#c1df7d",
  "#56a7c4",
];

const iconOptions = [
  "settings",
  "calendar",
  "server",
  "clipboardCheck",
  "users",
  "clock",
  "barChart",
  "fileText",
  "lineChart",
  "gauge",
  "trendingUp",
  "messagesSquare",
  "kanban",
  "brainCircuit",
  "briefcase",
  "award",
  "bookOpen",
  "target",
];

export default function Header() {
  const [appearance, setAppearance] = useState(null);
  const [showAppearanceForm, setShowAppearanceForm] = useState(false);
  const [activeSection, setActiveSection] = useState("header");
  const [newLink, setNewLink] = useState({ name: "", url: "" });
  const [editingToolIndex, setEditingToolIndex] = useState(null);
  const [showToolForm, setShowToolForm] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [newTool, setNewTool] = useState({
    icon: "settings",
    name: "",
    description: "",
    status: "",
    bgColor: "from-blue-600 to-blue-800",
    imagePath: "/api/placeholder/400/320",
    comingSoon: false,
    path: "",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const APPEARANCE_UPDATE_EVENT = "appearanceUpdate";

  useEffect(() => {
    const initializeAppearance = () => {
      const savedAppearance = localStorage.getItem("appearance");
      if (savedAppearance) {
        setAppearance(JSON.parse(savedAppearance));
      } else {
        localStorage.setItem(
          "appearance",
          JSON.stringify(sampleAppearanceData)
        );
        setAppearance(sampleAppearanceData);
        window.dispatchEvent(new CustomEvent(APPEARANCE_UPDATE_EVENT));
      }
    };

    initializeAppearance();

    const handleAppearanceUpdate = () => {
      const savedAppearance = localStorage.getItem("appearance");
      if (savedAppearance) {
        setAppearance(JSON.parse(savedAppearance));
      }
    };

    window.addEventListener(APPEARANCE_UPDATE_EVENT, handleAppearanceUpdate);
    return () => {
      window.removeEventListener(
        APPEARANCE_UPDATE_EVENT,
        handleAppearanceUpdate
      );
    };
  }, []);

  const updateAppearance = (newData) => {
    localStorage.setItem("appearance", JSON.stringify(newData));
    setAppearance(newData);
    window.dispatchEvent(new CustomEvent(APPEARANCE_UPDATE_EVENT));
  };

  const handleAddLink = () => {
    if (newLink.name && newLink.url) {
      updateAppearance({
        ...appearance,
        userLinks: [...appearance.userLinks, newLink],
      });
      setNewLink({ name: "", url: "" });
    }
  };

  const handleDeleteLink = (index) => {
    updateAppearance({
      ...appearance,
      userLinks: appearance.userLinks.filter((_, i) => i !== index),
    });
  };

  const handleColorChange = (key, value) => {
    updateAppearance({
      ...appearance,
      colors: { ...appearance.colors, [key]: value },
    });
  };

  const handleThemeSelect = (theme) => {
    updateAppearance({
      ...appearance,
      colors: {
        ...appearance.colors,
        ...theme.colors,
      },
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(appearance, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", "appearance.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        updateAppearance(importedData);
      } catch (error) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const handleSiteTitleChange = (e) => {
    updateAppearance({ ...appearance, siteTitle: e.target.value });
  };

  const handleLogoToggle = (e) => {
    updateAppearance({ ...appearance, showLogo: e.target.checked });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      updateAppearance({ ...appearance, logoImage: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleToolStatusChange = (index) => {
    const updatedTools = [...appearance.tools];
    updatedTools[index].comingSoon = !updatedTools[index].comingSoon;
    updateAppearance({ ...appearance, tools: updatedTools });
  };

  const handleEditTool = (index) => {
    setEditingToolIndex(index);
    setNewTool({ ...appearance.tools[index] });
    setShowToolForm(true);
  };

  const handleAddNewTool = () => {
    setEditingToolIndex(null);
    setNewTool({
      icon: "settings",
      name: "",
      description: "",
      status: "",
      bgColor: "from-blue-600 to-blue-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: false,
      path: "",
    });
    setShowToolForm(true);
  };

  const handleSaveTool = () => {
    if (!newTool.name.trim()) return;

    const updatedTools = [...appearance.tools];
    if (editingToolIndex !== null) {
      updatedTools[editingToolIndex] = newTool;
    } else {
      updatedTools.push(newTool);
    }
    updateAppearance({ ...appearance, tools: updatedTools });
    setEditingToolIndex(null);
    setShowToolForm(false);
    setNewTool({
      icon: "settings",
      name: "",
      description: "",
      status: "",
      bgColor: "from-blue-600 to-blue-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: false,
      path: "",
    });
  };

  const handleCancelTool = () => {
    setEditingToolIndex(null);
    setShowToolForm(false);
    setNewTool({
      icon: "settings",
      name: "",
      description: "",
      status: "",
      bgColor: "from-blue-600 to-blue-800",
      imagePath: "/api/placeholder/400/320",
      comingSoon: false,
      path: "",
    });
  };

  const handleDeleteTool = (index) => {
    const updatedTools = appearance.tools.filter((_, i) => i !== index);
    updateAppearance({ ...appearance, tools: updatedTools });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const truncateUrl = (url, maxLength = 30) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  if (!appearance) {
    return (
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/90 border-b border-gray-800"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </motion.header>
    );
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 backdrop-blur-lg border-b"
        style={{
          backgroundColor: `${appearance.colors.primary}ee`,
          borderColor: `${appearance.colors.primary}30`,
          boxShadow: `0 8px 32px ${appearance.colors.shadow}40`,
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-4">
                {appearance.showLogo && appearance.logoImage && (
                  <motion.div
                    className="relative cursor-pointer"
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.4, ease: "easeOut" },
                    }}
                    onClick={() => setShowLogoModal(true)}
                  >
                    <img
                      src={appearance.logoImage}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-lg transition-all duration-300"
                      style={{
                        filter: `drop-shadow(0 4px 8px ${appearance.colors.shadow}40)`,
                      }}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
                  </motion.div>
                )}
                <motion.h1
                  className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent cursor-pointer"
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.4, ease: "easeOut" },
                  }}
                >
                  {appearance.siteTitle}
                </motion.h1>
              </div>

              <nav className="hidden lg:flex items-center space-x-1">
                {appearance.staticLinks.map((link, index) => (
                  <motion.a
                    key={`static-${index}`}
                    href={link.url}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 relative overflow-hidden group"
                    style={{ color: appearance.colors.text }}
                    whileHover={{
                      y: -1,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <span className="relative z-10 transition-all duration-300 group-hover:text-white">
                      {link.name}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/10 rounded-lg"
                      initial={{ x: "-100%", opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white rounded-full"
                      whileHover={{
                        width: "60%",
                        x: "-50%",
                        transition: { duration: 0.3 },
                      }}
                    />
                  </motion.a>
                ))}
                {appearance.userLinks.map((link, index) => (
                  <motion.a
                    key={`user-${index}`}
                    href={link.url}
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 flex items-center space-x-2 relative overflow-hidden group"
                    style={{ color: appearance.colors.text }}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      y: -1,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <LinkIcon
                      size={16}
                      className="relative z-10 transition-all duration-300 group-hover:scale-110"
                    />
                    <span className="relative z-10 transition-all duration-300 group-hover:text-white">
                      {link.name}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/10 rounded-lg"
                      initial={{ x: "-100%", opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white rounded-full"
                      whileHover={{
                        width: "60%",
                        x: "-50%",
                        transition: { duration: 0.3 },
                      }}
                    />
                  </motion.a>
                ))}
              </nav>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                style={{ color: appearance.colors.text }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu size={20} />
              </motion.button>

              <motion.button
                onClick={() => setShowAppearanceForm(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm border border-white/20 relative overflow-hidden group"
                style={{
                  color: appearance.colors.text,
                  boxShadow: `0 4px 12px ${appearance.colors.shadow}20`,
                }}
                whileHover={{
                  y: -1,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Palette
                  size={18}
                  className="relative z-10 transition-all duration-300 group-hover:scale-110"
                />
                <span className="hidden sm:inline relative z-10 transition-all duration-300 group-hover:text-white">
                  Customize
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/15 rounded-lg"
                  initial={{ x: "-100%", opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-4 pt-4 border-t border-white/20"
              >
                <div className="flex flex-col space-y-2">
                  {[...appearance.staticLinks, ...appearance.userLinks].map(
                    (link, index) => (
                      <motion.a
                        key={`mobile-${index}`}
                        href={link.url}
                        className="px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 relative overflow-hidden group"
                        style={{ color: appearance.colors.text }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="relative z-10 transition-all duration-300 group-hover:text-white">
                          {link.name}
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 rounded-lg"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.a>
                    )
                  )}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Logo Modal */}
      <AnimatePresence>
        {showLogoModal && appearance.showLogo && appearance.logoImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowLogoModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="relative max-w-2xl max-h-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setShowLogoModal(false)}
                className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} className="text-white" />
              </motion.button>
              <img
                src={appearance.logoImage}
                alt="Profile - Large View"
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
                style={{ maxWidth: "80vw", maxHeight: "80vh" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Appearance Customization Panel */}
      <AnimatePresence>
        {showAppearanceForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAppearanceForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Palette className="text-blue-600" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Customize Appearance
                  </h2>
                </div>
                <motion.button
                  onClick={() => setShowAppearanceForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} className="text-gray-500" />
                </motion.button>
              </div>

              <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                  <div className="space-y-2">
                    {[
                      { id: "header", label: "Header & Footer", icon: Type },
                      { id: "tools", label: "Tools Management", icon: Wrench },
                    ].map((section) => (
                      <motion.button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg font-medium transition-all ${
                          activeSection === section.id
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <section.icon size={18} />
                          <span>{section.label}</span>
                        </div>
                        <ChevronRight
                          size={16}
                          className={`transition-transform ${
                            activeSection === section.id ? "rotate-90" : ""
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>

                  {/* Export/Import */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-2">
                      <motion.button
                        onClick={handleExport}
                        className="w-full flex items-center justify-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Download size={16} />
                        <span>Export</span>
                      </motion.button>
                      <label className="block">
                        <motion.div
                          className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Upload size={16} />
                          <span>Import</span>
                        </motion.div>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImport}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 max-h-[calc(90vh-80px)] overflow-y-auto">
                  <AnimatePresence mode="wait">
                    {activeSection === "header" && (
                      <motion.div
                        key="header"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        {/* Logo Section */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Profile Picture Settings
                          </h3>
                          <div className="space-y-4">
                            <label className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={appearance.showLogo || false}
                                onChange={handleLogoToggle}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                Show Profile Picture
                              </span>
                            </label>

                            {appearance.showLogo && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Upload Profile Picture
                                </label>
                                <div className="flex items-center space-x-4">
                                  {appearance.logoImage && (
                                    <div className="relative">
                                      <img
                                        src={appearance.logoImage}
                                        alt="Profile preview"
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 shadow-lg"
                                      />
                                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                                    </div>
                                  )}
                                  <label className="cursor-pointer">
                                    <motion.div
                                      className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      <Image size={16} />
                                      <span>Choose Image</span>
                                    </motion.div>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={handleLogoUpload}
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Site Title */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Site Title
                          </label>
                          <input
                            type="text"
                            value={appearance.siteTitle}
                            onChange={handleSiteTitleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter site title"
                          />
                        </div>

                        {/* Color Themes */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Quick Themes
                          </label>
                          <div className="grid grid-cols-5 gap-3 mb-4">
                            {colorThemes.map((theme, index) => (
                              <motion.button
                                key={index}
                                onClick={() => handleThemeSelect(theme)}
                                className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <div className="flex flex-col space-y-1">
                                  <div
                                    className="w-full h-4 rounded"
                                    style={{
                                      backgroundColor: theme.colors.primary,
                                    }}
                                  />
                                  <div
                                    className="w-full h-2 rounded"
                                    style={{
                                      backgroundColor: theme.colors.secondary,
                                    }}
                                  />
                                  <div
                                    className="w-full h-2 rounded"
                                    style={{
                                      backgroundColor: theme.colors.text,
                                    }}
                                  />
                                </div>
                                <p className="text-xs font-medium text-gray-600 mt-2 group-hover:text-gray-900">
                                  {theme.name}
                                </p>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        {/* Colors */}
                        <div className="grid grid-cols-2 gap-6">
                          {Object.entries({
                            primary: "Primary (Header)",
                            secondary: "Secondary (Footer)",
                            text: "Text",
                            shadow: "Shadow",
                          }).map(([key, label]) => (
                            <div key={key}>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">
                                {label} Color
                              </label>
                              <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                  {colorSwatches.slice(0, 10).map((color) => (
                                    <motion.button
                                      key={color}
                                      onClick={() =>
                                        handleColorChange(key, color)
                                      }
                                      className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                                      style={{ backgroundColor: color }}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                    />
                                  ))}
                                </div>
                                <input
                                  type="color"
                                  value={appearance.colors[key] || "#000000"}
                                  onChange={(e) =>
                                    handleColorChange(key, e.target.value)
                                  }
                                  className="w-full h-10 rounded-lg border border-gray-300"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Links Management */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Navigation Links
                          </label>

                          {/* Add New Link */}
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="flex space-x-3">
                              <input
                                type="text"
                                placeholder="Link Name"
                                value={newLink.name}
                                onChange={(e) =>
                                  setNewLink({
                                    ...newLink,
                                    name: e.target.value,
                                  })
                                }
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                placeholder="URL"
                                value={newLink.url}
                                onChange={(e) =>
                                  setNewLink({
                                    ...newLink,
                                    url: e.target.value,
                                  })
                                }
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <motion.button
                                onClick={handleAddLink}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Plus size={16} />
                              </motion.button>
                            </div>
                          </div>

                          {/* Existing Links */}
                          <div className="space-y-2">
                            {appearance.userLinks.map((link, index) => (
                              <motion.div
                                key={index}
                                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="flex-1 min-w-0">
                                  <span className="font-medium text-gray-900 block">
                                    {link.name}
                                  </span>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span
                                      className="text-sm text-gray-500 truncate flex-1"
                                      title={link.url}
                                    >
                                      {truncateUrl(link.url)}
                                    </span>
                                    <motion.button
                                      onClick={() => copyToClipboard(link.url)}
                                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      title="Copy URL"
                                    >
                                      <Copy size={12} />
                                    </motion.button>
                                    <motion.a
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      title="Open URL"
                                    >
                                      <ExternalLink size={12} />
                                    </motion.a>
                                  </div>
                                </div>
                                <motion.button
                                  onClick={() => handleDeleteLink(index)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-3"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Trash2 size={16} />
                                </motion.button>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeSection === "tools" && (
                      <motion.div
                        key="tools"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        {/* Add/Edit Tool Form */}
                        {showToolForm && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {editingToolIndex !== null
                                  ? "Edit Tool"
                                  : "Add New Tool"}
                              </h3>
                              <motion.button
                                onClick={handleCancelTool}
                                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X size={16} className="text-gray-500" />
                              </motion.button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Icon
                                </label>
                                <select
                                  value={newTool.icon}
                                  onChange={(e) =>
                                    setNewTool({
                                      ...newTool,
                                      icon: e.target.value,
                                    })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  {iconOptions.map((icon) => (
                                    <option key={icon} value={icon}>
                                      {icon}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  value={newTool.name}
                                  onChange={(e) =>
                                    setNewTool({
                                      ...newTool,
                                      name: e.target.value,
                                    })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Description
                                </label>
                                <input
                                  type="text"
                                  value={newTool.description}
                                  onChange={(e) =>
                                    setNewTool({
                                      ...newTool,
                                      description: e.target.value,
                                    })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Status
                                </label>
                                <input
                                  type="text"
                                  value={newTool.status}
                                  onChange={(e) =>
                                    setNewTool({
                                      ...newTool,
                                      status: e.target.value,
                                    })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="Popular, New, Premium, etc."
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Path
                                </label>
                                <input
                                  type="text"
                                  value={newTool.path}
                                  onChange={(e) =>
                                    setNewTool({
                                      ...newTool,
                                      path: e.target.value,
                                    })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="/tool-path"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Image Path
                                </label>
                                <input
                                  type="text"
                                  value={newTool.imagePath}
                                  onChange={(e) =>
                                    setNewTool({
                                      ...newTool,
                                      imagePath: e.target.value,
                                    })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder="/api/placeholder/400/320 or image URL"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={newTool.comingSoon}
                                    onChange={(e) =>
                                      setNewTool({
                                        ...newTool,
                                        comingSoon: e.target.checked,
                                      })
                                    }
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span className="text-sm font-medium text-gray-700">
                                    Coming Soon
                                  </span>
                                </label>
                              </div>
                              <div className="col-span-2 flex space-x-3">
                                <motion.button
                                  onClick={handleSaveTool}
                                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {editingToolIndex !== null
                                    ? "Update Tool"
                                    : "Add Tool"}
                                </motion.button>
                                <motion.button
                                  onClick={handleCancelTool}
                                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Cancel
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Tools List */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                              Manage Tools
                            </h3>
                            <motion.button
                              onClick={handleAddNewTool}
                              className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Plus size={16} />
                              <span>Add Tool</span>
                            </motion.button>
                          </div>

                          <div className="grid gap-3 max-h-96 overflow-y-auto">
                            {appearance.tools.map((tool, index) => (
                              <motion.div
                                key={index}
                                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3">
                                    <span className="font-medium text-gray-900">
                                      {tool.name}
                                    </span>
                                    {tool.status && (
                                      <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                                        {tool.status}
                                      </span>
                                    )}
                                    <span
                                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        tool.comingSoon
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {tool.comingSoon
                                        ? "Coming Soon"
                                        : "Available"}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {tool.description}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    Image: {tool.imagePath}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <motion.button
                                    onClick={() => handleEditTool(index)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Edit2 size={16} />
                                  </motion.button>
                                  <motion.button
                                    onClick={() =>
                                      handleToolStatusChange(index)
                                    }
                                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                                      tool.comingSoon
                                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    {tool.comingSoon ? "Enable" : "Disable"}
                                  </motion.button>
                                  <motion.button
                                    onClick={() => handleDeleteTool(index)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Trash2 size={16} />
                                  </motion.button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
