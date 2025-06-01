import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Settings,
  Plus,
  Trash2,
  Download,
  Upload,
  X,
  Edit2,
  Palette,
  Type,
  ChevronRight,
  Menu,
  Image,
  Copy,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Globe,
  Phone,
  ChevronDown,
} from "lucide-react";

// Sample appearance data
const sampleAppearanceData = {
  staticLinks: [
    { name: "Canvas", url: "/" },
    { name: "Tools", url: "/tools" },
  ],
  userLinks: [{ name: "GitHub", url: "https://github.com" }],
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/",
      icon: "Github",
    },
    {
      name: "Email",
      url: "?",
      icon: "Mail",
    },
    {
      name: "LinkedIn",
      url: "?",
      icon: "Linkedin",
    },
  ],
  colors: {
    primary: "#0a1a2f",
    secondary: "#204b66",
    text: "#b0cde5",
    background: "#ffffff",
    accent: "#b69007",
    shadow: "#071421",
  },
  siteTitle: "Tools Zoon",
  showLogo: false,
  logoImage: null,
  tools: [
    {
      icon: "barChart",
      name: "Gantt Chart",
      description:
        "Create and update gantt chart project with exporting feature",
      status: "Chart",
      bgColor: "bg-blue-600",
      imagePath:
        "https://th.bing.com/th/id/OIP.aPfNGbiI3Huv3P4fSfN0OAHaE8?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: false,
      path: "/gantt-project-dashboard",
    },
    {
      icon: "users",
      name: "Report",
      description: "Create report for user behavior ",
      status: "Report",
      bgColor: "bg-blue-600",
      imagePath:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmyiqNDPKskWCs_UKsXXMjv1c76fbe7HosbA&s",
      comingSoon: true,
      path: "",
    },
    {
      icon: "lineChart",
      name: "Risk Analysis",
      description: "Identify and assess project risks",
      status: "New",
      bgColor: "bg-green-600",
      imagePath:
        "https://th.bing.com/th/id/OIP.urizurQlISNNiwmuKA-A7AHaEo?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: true,
      path: "/risk-analysis",
    },
    {
      icon: "kanban",
      name: "Kanban Board",
      description: "Visualize workflow and manage tasks",
      status: "",
      bgColor: "bg-yellow-600",
      imagePath:
        "https://th.bing.com/th/id/OIP.urizurQlISNNiwmuKA-A7AHaEo?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: true,
      path: "/kanban-board",
    },
    {
      icon: "users",
      name: "Stakeholder Matrix",
      description: "Map and manage project stakeholders",
      status: "Popular",
      bgColor: "bg-red-600",
      imagePath:
        "https://th.bing.com/th/id/OIP.urizurQlISNNiwmuKA-A7AHaEo?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: true,
      path: "/stakeholder-matrix",
    },
    {
      icon: "barChart",
      name: "Earned Value Analysis",
      description: "Track project performance and costs",
      status: "",
      bgColor: "bg-indigo-600",
      imagePath:
        "https://th.bing.com/th/id/OIP.urizurQlISNNiwmuKA-A7AHaEo?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: true,
      path: "/earned-value",
    },
    {
      icon: "trendingUp",
      name: "Performance Metrics",
      description: "Visualize project performance data",
      status: "New",
      bgColor: "bg-blue-500",
      imagePath:
        "https://th.bing.com/th/id/OIP.urizurQlISNNiwmuKA-A7AHaEo?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: true,
      path: "/performance-metrics",
    },
    {
      icon: "fileText",
      name: "Documentation Generator",
      description: "Create project documentation templates",
      status: "",
      bgColor: "bg-yellow-500",
      imagePath:
        "https://th.bing.com/th/id/OIP.urizurQlISNNiwmuKA-A7AHaEo?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: true,
      path: "/documentation-generator",
    },
    {
      icon: "messagesSquare",
      name: "Team Communication",
      description: "Streamline project team communication",
      status: "",
      bgColor: "bg-green-500",
      imagePath:
        "https://th.bing.com/th/id/OIP.urizurQlISNNiwmuKA-A7AHaEo?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: true,
      path: "/team-communication",
    },
    {
      icon: "gauge",
      name: "Resource Allocation",
      description: "Optimize project resource distribution",
      status: "Popular",
      bgColor: "bg-purple-600",
      imagePath:
        "https://th.bing.com/th/id/OIP.urizurQlISNNiwmuKA-A7AHaEo?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: true,
      path: "/resource-allocation",
    },
    {
      icon: "clock",
      name: "Time Tracking",
      description: "Monitor and analyze project time usage",
      status: "",
      bgColor: "bg-pink-600",
      imagePath:
        "https://th.bing.com/th/id/OIP.urizurQlISNNiwmuKA-A7AHaEo?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: true,
      path: "/time-tracking",
    },
    {
      icon: "brainCircuit",
      name: "PMP Exam Prep",
      description: "Practice tests for PMP certification",
      status: "New",
      bgColor: "bg-blue-400",
      imagePath:
        "https://th.bing.com/th/id/OIP.urizurQlISNNiwmuKA-A7AHaEo?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: true,
      path: "/pmp-exam-prep",
    },
    {
      icon: "briefcase",
      name: "PMBOK Knowledge Areas",
      description: "Interactive guide to all 10 PMBOK knowledge areas",
      status: "Premium",
      bgColor: "bg-amber-600",
      imagePath:
        "https://th.bing.com/th/id/OIP.urizurQlISNNiwmuKA-A7AHaEo?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: true,
      path: "/pmbok-knowledge-areas",
    },
    {
      icon: "award",
      name: "PDU Tracker",
      description:
        "Track and manage your PDU requirements for certification renewal",
      status: "New",
      bgColor: "bg-emerald-600",
      imagePath:
        "https://th.bing.com/th/id/OIP.urizurQlISNNiwmuKA-A7AHaEo?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: true,
      path: "/pdu-tracker",
    },
    {
      icon: "bookOpen",
      name: "PMP Flashcards",
      description: "Interactive flashcards covering key PMP concepts and terms",
      status: "Popular",
      bgColor: "bg-cyan-600",
      imagePath:
        "https://th.bing.com/th/id/OIP.urizurQlISNNiwmuKA-A7AHaEo?cb=iwp2&rs=1&pid=ImgDetMain",
      comingSoon: true,
      path: "/pmp-flashcards",
    },
    {
      icon: "server",
      name: "PMP - Code",
      description: "",
      status: "Active",
      bgColor: "from-blue-600 to-blue-800",
      imagePath:
        "https://th.bing.com/th/id/R.9523a3beac9ca3479cbd59cedf5fda7d?rik=4%2bxw%2fbbzjYX5pg&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1484781%2fimages%2fo-OCEAN-facebook.jpg&ehk=ADYrapm1JK2erZj%2b9x7p4AYL3u6nM3HOdhfRUsyCR2k%3d&risl=&pid=ImgRaw&r=0",
      comingSoon: true,
      path: "",
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
      primary: "#3a0d12",
      secondary: "#8b1e3f",
      text: "#f2d1da",
      shadow: "#1e070a",
    },
  },
  {
    name: "Slate Grey",
    colors: {
      primary: "#1e1f26",
      secondary: "#4b4e57",
      text: "#d3d6dc",
      shadow: "#0d0e12",
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

const socialIconOptions = [
  { value: "Github", name: "GitHub" },
  { value: "Twitter", name: "Twitter" },
  { value: "Linkedin", name: "LinkedIn" },
  { value: "Mail", name: "Email" },
  { value: "Globe", name: "Website" },
  { value: "Phone", name: "Phone" },
];

// CSS animations
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.5s ease-out;
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

  .animate-slideDown {
    animation: slideDown 0.3s ease-out;
  }

  .animate-scaleIn {
    animation: scaleIn 0.3s ease-out;
  }

  .hover-scale:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease;
  }

  .hover-lift:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }

  .transition-smooth {
    transition: all 0.3s ease;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const Header = ({ rotation = 0 }) => {
  const [appearance, setAppearance] = useState(null); // Start with null to show loading
  const [showAppearanceForm, setShowAppearanceForm] = useState(false);
  const [activeSection, setActiveSection] = useState("header");
  const [newLink, setNewLink] = useState({ name: "", url: "" });
  const [newSocialLink, setNewSocialLink] = useState({
    name: "",
    url: "",
    icon: "Github",
  });
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSocialIconDropdown, setShowSocialIconDropdown] = useState(false);

  const APPEARANCE_UPDATE_EVENT = "appearanceUpdate";

  // Function to update appearance and save to localStorage
  const updateAppearance = useCallback((newData) => {
    try {
      localStorage.setItem("appearance", JSON.stringify(newData));
      setAppearance(newData);
      // Dispatch custom event to notify other components
      window.dispatchEvent(
        new CustomEvent(APPEARANCE_UPDATE_EVENT, { detail: newData })
      );
    } catch (error) {
      console.error("Failed to save appearance to localStorage:", error);
    }
  }, []);

  // Function to load appearance from localStorage
  const loadAppearanceFromStorage = useCallback(() => {
    try {
      const savedAppearance = localStorage.getItem("appearance");
      if (savedAppearance) {
        const parsedAppearance = JSON.parse(savedAppearance);
        setAppearance(parsedAppearance);
        return parsedAppearance;
      } else {
        // If no saved data, use sample data and save it
        updateAppearance(sampleAppearanceData);
        return sampleAppearanceData;
      }
    } catch (error) {
      console.error("Failed to load appearance from localStorage:", error);
      // Fallback to sample data
      setAppearance(sampleAppearanceData);
      return sampleAppearanceData;
    }
  }, [updateAppearance]);

  // Load appearance data on component mount
  useEffect(() => {
    loadAppearanceFromStorage();
  }, [loadAppearanceFromStorage]);

  // Listen for appearance updates from other components/tabs
  useEffect(() => {
    const handleAppearanceUpdate = (event) => {
      if (event.detail) {
        setAppearance(event.detail);
      } else {
        loadAppearanceFromStorage();
      }
    };

    // Listen for custom events
    window.addEventListener(APPEARANCE_UPDATE_EVENT, handleAppearanceUpdate);

    // Listen for localStorage changes from other tabs
    window.addEventListener("storage", (e) => {
      if (e.key === "appearance") {
        loadAppearanceFromStorage();
      }
    });

    return () => {
      window.removeEventListener(
        APPEARANCE_UPDATE_EVENT,
        handleAppearanceUpdate
      );
      window.removeEventListener("storage", loadAppearanceFromStorage);
    };
  }, [loadAppearanceFromStorage]);

  // Utility functions
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const truncateUrl = (url, maxLength = 30) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  const renderIcon = (iconName, size = 20, className = "") => {
    const iconProps = { size, className };

    switch (iconName) {
      case "Github":
        return <Github {...iconProps} />;
      case "Twitter":
        return <Twitter {...iconProps} />;
      case "Linkedin":
        return <Linkedin {...iconProps} />;
      case "Mail":
        return <Mail {...iconProps} />;
      case "Globe":
        return <Globe {...iconProps} />;
      case "Phone":
        return <Phone {...iconProps} />;
      default:
        return <Globe {...iconProps} />;
    }
  };

  // Updated handlers that properly update localStorage
  const handleAddLink = () => {
    if (newLink.name && newLink.url && appearance) {
      const updatedAppearance = {
        ...appearance,
        userLinks: [...(appearance.userLinks || []), newLink],
      };
      updateAppearance(updatedAppearance);
      setNewLink({ name: "", url: "" });
    }
  };

  const handleDeleteLink = (index) => {
    if (appearance) {
      const updatedAppearance = {
        ...appearance,
        userLinks: (appearance.userLinks || []).filter((_, i) => i !== index),
      };
      updateAppearance(updatedAppearance);
    }
  };

  const handleColorChange = (key, value) => {
    if (appearance) {
      const updatedAppearance = {
        ...appearance,
        colors: { ...appearance.colors, [key]: value },
      };
      updateAppearance(updatedAppearance);
    }
  };

  const handleThemeSelect = (theme) => {
    if (appearance) {
      const updatedAppearance = {
        ...appearance,
        colors: {
          ...appearance.colors,
          ...theme.colors,
        },
      };
      updateAppearance(updatedAppearance);
    }
  };

  const handleSiteTitleChange = (e) => {
    if (appearance) {
      const updatedAppearance = {
        ...appearance,
        siteTitle: e.target.value,
      };
      updateAppearance(updatedAppearance);
    }
  };

  const handleLogoToggle = (e) => {
    if (appearance) {
      const updatedAppearance = {
        ...appearance,
        showLogo: e.target.checked,
      };
      updateAppearance(updatedAppearance);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !appearance) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedAppearance = {
        ...appearance,
        logoImage: e.target.result,
      };
      updateAppearance(updatedAppearance);
    };
    reader.readAsDataURL(file);
  };

  const handleAddSocialLink = () => {
    if (newSocialLink.name && newSocialLink.url && appearance) {
      const updatedAppearance = {
        ...appearance,
        socialLinks: [...(appearance.socialLinks || []), newSocialLink],
      };
      updateAppearance(updatedAppearance);
      setNewSocialLink({ name: "", url: "", icon: "Github" });
    }
  };

  const handleDeleteSocialLink = (index) => {
    if (appearance) {
      const updatedAppearance = {
        ...appearance,
        socialLinks: (appearance.socialLinks || []).filter(
          (_, i) => i !== index
        ),
      };
      updateAppearance(updatedAppearance);
    }
  };

  const handleExport = () => {
    if (appearance) {
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
    }
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

  // Show loading state while appearance data is being loaded
  if (!appearance) {
    return (
      <motion.header
        className="absolute top-0 left-0 w-full h-16 backdrop-blur-lg border-b z-50"
        style={{
          backgroundColor: "#0a1a2fee",
          borderColor: "#0a1a2f30",
          boxShadow: "0 8px 32px #07142140",
          transform: `rotateX(${rotation}deg)`,
          transformOrigin: "top center",
          backfaceVisibility: "hidden",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          transform: `rotateX(${rotation}deg)`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
      <style>{styles}</style>
      <motion.header
        className="absolute top-0 left-0 w-full h-16 backdrop-blur-lg border-b z-50 flex items-center justify-center"
        style={{
          backgroundColor: `${appearance.colors.primary}ee`,
          borderColor: `${appearance.colors.primary}30`,
          boxShadow: `0 8px 32px ${appearance.colors.shadow}40`,
          transform: `rotateX(${rotation}deg)`,
          transformOrigin: "top center",
          backfaceVisibility: "hidden",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: 0,
          transform: `rotateX(${rotation}deg)`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="container mx-auto px-6 py-4 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center space-x-8 animate-slideDown">
              <div className="flex items-center space-x-4">
                {appearance.showLogo && appearance.logoImage && (
                  <div
                    className="relative cursor-pointer hover-scale transition-smooth"
                    onClick={() => setShowLogoModal(true)}
                  >
                    <img
                      src={appearance.logoImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-white/20 shadow-lg"
                      style={{
                        filter: `drop-shadow(0 4px 8px ${appearance.colors.shadow}40)`,
                      }}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
                  </div>
                )}
                <h1 className="text-lg font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent cursor-pointer hover-scale transition-smooth">
                  {appearance.siteTitle}
                </h1>
              </div>

              <nav className="hidden lg:flex items-center space-x-1">
                {appearance.staticLinks.map((link, index) => (
                  <Link
                    key={`static-${index}`}
                    to={link.url}
                    className="px-3 py-1 rounded-lg font-medium transition-smooth hover:bg-white/10 relative overflow-hidden group hover-lift"
                    style={{
                      color: appearance.colors.text,
                      animationDelay: `${0.2 + index * 0.1}s`,
                    }}
                  >
                    <span className="relative z-10 transition-smooth group-hover:text-white text-sm">
                      {link.name}
                    </span>
                  </Link>
                ))}
                {appearance.userLinks.map((link, index) => (
                  <Link
                    key={`user-${index}`}
                    to={link.url}
                    className="px-3 py-1 rounded-lg font-medium transition-smooth hover:bg-white/10 flex items-center space-x-2 relative overflow-hidden group hover-lift"
                    style={{
                      color: appearance.colors.text,
                      animationDelay: `${0.3 + index * 0.1}s`,
                    }}
                  >
                    <ExternalLink
                      size={14}
                      className="relative z-10 transition-smooth group-hover:scale-110"
                    />
                    <span className="relative z-10 transition-smooth group-hover:text-white text-sm">
                      {link.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-smooth hover-scale"
                style={{ color: appearance.colors.text }}
              >
                <Menu size={18} />
              </button>

              <button
                onClick={() => setShowAppearanceForm(true)}
                className="flex items-center space-x-2 px-3 py-1 rounded-lg font-medium transition-smooth hover:bg-white/10 backdrop-blur-sm border border-white/20 relative overflow-hidden group hover-lift animate-fadeIn"
                style={{
                  color: appearance.colors.text,
                  boxShadow: `0 4px 12px ${appearance.colors.shadow}20`,
                }}
              >
                <Palette
                  size={16}
                  className="relative z-10 transition-smooth group-hover:scale-110"
                />
                <span className="hidden sm:inline relative z-10 transition-smooth group-hover:text-white text-sm">
                  Customize
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t border-white/20 animate-slideDown">
              <div className="flex flex-col space-y-2">
                {[...appearance.staticLinks, ...appearance.userLinks].map(
                  (link, index) => {
                    const isExternal = link.url.startsWith("http");

                    const commonProps = {
                      key: `mobile-${index}`,
                      className:
                        "px-4 py-3 rounded-lg font-medium transition-smooth hover:bg-white/10 relative overflow-hidden group",
                      style: {
                        color: appearance.colors.text,
                        animationDelay: `${index * 0.1}s`,
                      },
                      onClick: () => setMobileMenuOpen(false),
                      children: (
                        <span className="relative z-10 transition-smooth group-hover:text-white">
                          {link.name}
                        </span>
                      ),
                    };

                    return isExternal ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...commonProps}
                      />
                    ) : (
                      <Link to={link.url} {...commonProps} />
                    );
                  }
                )}
              </div>
            </nav>
          )}
        </div>
      </motion.header>

      {/* Logo Modal */}
      {showLogoModal && appearance.showLogo && appearance.logoImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-fadeIn" // Changed from z-50 to z-[60]
          onClick={() => setShowLogoModal(false)}
        >
          <div
            className="relative max-w-2xl max-h-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLogoModal(false)}
              className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-smooth hover-scale"
            >
              <X size={24} className="text-white" />
            </button>
            <img
              src={appearance.logoImage}
              alt="Profile - Large View"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
              style={{ maxWidth: "80vw", maxHeight: "80vh" }}
            />
          </div>
        </div>
      )}

      {/* Appearance Customization Panel */}
      {showAppearanceForm && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4 transition-opacity duration-300 ease-out" // Changed from z-50 to z-[70]
          style={{
            animation: "fadeIn 0.3s ease-out",
            opacity: showAppearanceForm ? 1 : 0,
          }}
          onClick={() => setShowAppearanceForm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out"
            style={{
              animation: "scaleIn 0.3s ease-out",
              transform: showAppearanceForm ? "scale(1)" : "scale(0.95)",
            }}
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
              <button
                onClick={() => setShowAppearanceForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-smooth hover-scale"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                <div className="space-y-2">
                  {[{ id: "header", label: "Header & Footer", icon: Type }].map(
                    (section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg font-medium transition-smooth hover-scale ${
                          activeSection === section.id
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
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
                      </button>
                    )
                  )}
                </div>

                {/* Export/Import */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-2">
                    <button
                      onClick={handleExport}
                      className="w-full flex items-center justify-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-smooth hover-scale"
                    >
                      <Download size={16} />
                      <span>Export</span>
                    </button>
                    <label className="block">
                      <div className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-smooth cursor-pointer hover-scale">
                        <Upload size={16} />
                        <span>Import</span>
                      </div>
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
                {activeSection === "header" && (
                  <div className="space-y-6 animate-fadeIn">
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
                                <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-smooth hover-scale">
                                  <Image size={16} />
                                  <span>Choose Image</span>
                                </div>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-smooth"
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
                          <button
                            key={index}
                            onClick={() => handleThemeSelect(theme)}
                            className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-smooth group hover-scale"
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
                          </button>
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
                                <button
                                  key={color}
                                  onClick={() => handleColorChange(key, color)}
                                  className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-smooth hover-scale"
                                  style={{ backgroundColor: color }}
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
                          <button
                            onClick={handleAddLink}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-smooth hover-scale"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Existing Links */}
                      <div className="space-y-2">
                        {appearance.userLinks.map((link, index) => {
                          const isExternal = link.url.startsWith("http");

                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg animate-fadeIn"
                              style={{ animationDelay: `${index * 0.1}s` }}
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

                                  <button
                                    onClick={() => copyToClipboard(link.url)}
                                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-smooth hover-scale"
                                    title="Copy URL"
                                  >
                                    <Copy size={12} />
                                  </button>

                                  {isExternal ? (
                                    <a
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-smooth hover-scale"
                                      title="Open URL"
                                    >
                                      <ExternalLink size={12} />
                                    </a>
                                  ) : (
                                    <Link
                                      to={link.url}
                                      className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-smooth hover-scale"
                                      title="Open Link"
                                    >
                                      <ExternalLink size={12} />
                                    </Link>
                                  )}
                                </div>
                              </div>

                              <button
                                onClick={() => handleDeleteLink(index)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-smooth ml-3 hover-scale"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "social" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Social Media Links
                      </label>

                      {/* Add New Social Link */}
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="grid grid-cols-3 gap-3">
                          {/* Custom Social Icon Dropdown */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setShowSocialIconDropdown(
                                  !showSocialIconDropdown
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between bg-white"
                            >
                              <div className="flex items-center space-x-2">
                                {renderIcon(
                                  newSocialLink.icon,
                                  16,
                                  "text-gray-600"
                                )}
                                <span>
                                  {socialIconOptions.find(
                                    (opt) => opt.value === newSocialLink.icon
                                  )?.name || newSocialLink.icon}
                                </span>
                              </div>
                              <ChevronDown
                                size={16}
                                className={`transition-transform ${
                                  showSocialIconDropdown ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {/* Social Icon Dropdown Content */}
                            {showSocialIconDropdown && (
                              <div className="absolute z-[80] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                {socialIconOptions.map((option) => (
                                  <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                      setNewSocialLink({
                                        ...newSocialLink,
                                        icon: option.value,
                                      });
                                      setShowSocialIconDropdown(false);
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 transition-smooth"
                                  >
                                    {renderIcon(
                                      option.value,
                                      16,
                                      "text-gray-600"
                                    )}
                                    <span>{option.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          <input
                            type="text"
                            placeholder="Display Name"
                            value={newSocialLink.name}
                            onChange={(e) =>
                              setNewSocialLink({
                                ...newSocialLink,
                                name: e.target.value,
                              })
                            }
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="URL"
                            value={newSocialLink.url}
                            onChange={(e) =>
                              setNewSocialLink({
                                ...newSocialLink,
                                url: e.target.value,
                              })
                            }
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <button
                          onClick={handleAddSocialLink}
                          className="mt-3 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-smooth hover-scale"
                        >
                          Add Social Link
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
