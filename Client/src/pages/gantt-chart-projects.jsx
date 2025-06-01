import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Wrench,
  ChevronRight,
  Menu,
  Image,
  Copy,
  ExternalLink,
  ArrowUp,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Globe,
  Shield,
  Award,
  Users,
  Calendar,
  Server,
  ClipboardCheck,
  BarChart3,
  LineChart,
  Gauge,
  TrendingUp,
  MessagesSquare,
  Kanban,
  BrainCircuit,
  Briefcase,
  BookOpen,
  Target,
  FileText,
  Clock,
  ChevronDown,
  Search,
  CheckCircle,
  User,
  ArrowRight,
  Info,
  Folder,
} from "lucide-react";
import Swal from "sweetalert2";

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

const iconOptions = [
  { value: "settings", name: "Settings" },
  { value: "calendar", name: "Calendar" },
  { value: "server", name: "Server" },
  { value: "clipboardCheck", name: "Clipboard Check" },
  { value: "users", name: "Users" },
  { value: "clock", name: "Clock" },
  { value: "barChart", name: "Bar Chart" },
  { value: "fileText", name: "File Text" },
  { value: "lineChart", name: "Line Chart" },
  { value: "gauge", name: "Gauge" },
  { value: "trendingUp", name: "Trending Up" },
  { value: "messagesSquare", name: "Messages Square" },
  { value: "kanban", name: "Kanban" },
  { value: "brainCircuit", name: "Brain Circuit" },
  { value: "briefcase", name: "Briefcase" },
  { value: "award", name: "Award" },
  { value: "bookOpen", name: "Book Open" },
  { value: "target", name: "Target" },
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

  .card-entrance {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s ease-out forwards;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

// Header Component
function Header() {
  const [appearance, setAppearance] = useState(null);
  const [showAppearanceForm, setShowAppearanceForm] = useState(false);
  const [activeSection, setActiveSection] = useState("header");
  const [newLink, setNewLink] = useState({ name: "", url: "" });
  const [newSocialLink, setNewSocialLink] = useState({
    name: "",
    url: "",
    icon: "Github",
  });
  const [editingToolIndex, setEditingToolIndex] = useState(null);
  const [showToolForm, setShowToolForm] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [showIconDropdown, setShowIconDropdown] = useState(false);
  const [newTool, setNewTool] = useState({
    icon: "settings",
    name: "",
    description: "",
    status: "",
    bgColor: "from-blue-600 to-blue-800",
    imagePath: "",
    comingSoon: false,
    path: "",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSocialIconDropdown, setShowSocialIconDropdown] = useState(false);

  const APPEARANCE_UPDATE_EVENT = "appearanceUpdate";

  const updateAppearance = useCallback((newData) => {
    localStorage.setItem("appearance", JSON.stringify(newData));
    setAppearance(newData);
    window.dispatchEvent(new CustomEvent(APPEARANCE_UPDATE_EVENT));
  }, []);

  useEffect(() => {
    const savedAppearance = localStorage.getItem("appearance");
    if (savedAppearance) {
      setAppearance(JSON.parse(savedAppearance));
    } else {
      updateAppearance(sampleAppearanceData);
    }
  }, [updateAppearance]);

  const handleAddLink = () => {
    if (newLink.name && newLink.url) {
      updateAppearance({
        ...appearance,
        userLinks: [...appearance.userLinks, newLink],
      });
      setNewLink({ name: "", url: "" });
    }
  };

  const handleAddSocialLink = () => {
    if (newSocialLink.name && newSocialLink.url) {
      updateAppearance({
        ...appearance,
        socialLinks: [...(appearance.socialLinks || []), newSocialLink],
      });
      setNewSocialLink({ name: "", url: "", icon: "Github" });
    }
  };

  const handleDeleteLink = (index) => {
    updateAppearance({
      ...appearance,
      userLinks: appearance.userLinks.filter((_, i) => i !== index),
    });
  };

  const handleDeleteSocialLink = (index) => {
    updateAppearance({
      ...appearance,
      socialLinks: appearance.socialLinks.filter((_, i) => i !== index),
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
      case "settings":
        return <Settings {...iconProps} />;
      case "calendar":
        return <Calendar {...iconProps} />;
      case "server":
        return <Server {...iconProps} />;
      case "clipboardCheck":
        return <ClipboardCheck {...iconProps} />;
      case "users":
        return <Users {...iconProps} />;
      case "clock":
        return <Clock {...iconProps} />;
      case "barChart":
        return <BarChart3 {...iconProps} />;
      case "fileText":
        return <FileText {...iconProps} />;
      case "lineChart":
        return <LineChart {...iconProps} />;
      case "gauge":
        return <Gauge {...iconProps} />;
      case "trendingUp":
        return <TrendingUp {...iconProps} />;
      case "messagesSquare":
        return <MessagesSquare {...iconProps} />;
      case "kanban":
        return <Kanban {...iconProps} />;
      case "brainCircuit":
        return <BrainCircuit {...iconProps} />;
      case "briefcase":
        return <Briefcase {...iconProps} />;
      case "award":
        return <Award {...iconProps} />;
      case "bookOpen":
        return <BookOpen {...iconProps} />;
      case "target":
        return <Target {...iconProps} />;
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
        return <Settings {...iconProps} />;
    }
  };

  if (!appearance) {
    return (
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/90 border-b border-gray-800 animate-fadeIn">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <header
        className="sticky top-0 z-40 backdrop-blur-lg border-b animate-fadeInUp"
        style={{
          backgroundColor: `${appearance.colors.primary}ee`,
          borderColor: `${appearance.colors.primary}30`,
          boxShadow: `0 8px 32px ${appearance.colors.shadow}40`,
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/20 shadow-lg"
                      style={{
                        filter: `drop-shadow(0 4px 8px ${appearance.colors.shadow}40)`,
                      }}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
                  </div>
                )}
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent cursor-pointer hover-scale transition-smooth">
                  {appearance.siteTitle}
                </h1>
              </div>

              <nav className="hidden lg:flex items-center space-x-1">
                {appearance.staticLinks.map((link, index) => (
                  <Link
                    key={`static-${index}`}
                    to={link.url}
                    className="px-4 py-2 rounded-lg font-medium transition-smooth hover:bg-white/10 relative overflow-hidden group hover-lift"
                    style={{
                      color: appearance.colors.text,
                      animationDelay: `${0.2 + index * 0.1}s`,
                    }}
                  >
                    <span className="relative z-10 transition-smooth group-hover:text-white">
                      {link.name}
                    </span>
                  </Link>
                ))}
                {appearance.userLinks.map((link, index) => (
                  <Link
                    key={`user-${index}`}
                    to={link.url}
                    className="px-4 py-2 rounded-lg font-medium transition-smooth hover:bg-white/10 flex items-center space-x-2 relative overflow-hidden group hover-lift"
                    style={{
                      color: appearance.colors.text,
                      animationDelay: `${0.3 + index * 0.1}s`,
                    }}
                  >
                    <ExternalLink
                      size={16}
                      className="relative z-10 transition-smooth group-hover:scale-110"
                    />
                    <span className="relative z-10 transition-smooth group-hover:text-white">
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
                <Menu size={20} />
              </button>

              <button
                onClick={() => setShowAppearanceForm(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-smooth hover:bg-white/10 backdrop-blur-sm border border-white/20 relative overflow-hidden group hover-lift animate-fadeIn"
                style={{
                  color: appearance.colors.text,
                  boxShadow: `0 4px 12px ${appearance.colors.shadow}20`,
                }}
              >
                <Palette
                  size={18}
                  className="relative z-10 transition-smooth group-hover:scale-110"
                />
                <span className="hidden sm:inline relative z-10 transition-smooth group-hover:text-white">
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
      </header>

      {/* Logo Modal */}
      {showLogoModal && appearance.showLogo && appearance.logoImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-out"
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
                  {[
                    { id: "header", label: "Header & Footer", icon: Type },
                    { id: "social", label: "Social Links", icon: Link },
                  ].map((section) => (
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
                  ))}
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
                              <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
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

                      {/* Existing Social Links */}
                      <div className="space-y-2">
                        {(appearance.socialLinks || []).map((link, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg animate-fadeIn"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="flex items-center space-x-3">
                              {renderIcon(link.icon, 20, "text-gray-600")}
                              <div>
                                <span className="font-medium text-gray-900 block">
                                  {link.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {truncateUrl(link.url)}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteSocialLink(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-smooth hover-scale"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
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
}

// Footer Component
function Footer() {
  const [appearance, setAppearance] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const APPEARANCE_UPDATE_EVENT = "appearanceUpdate";

  const loadAppearance = useCallback(() => {
    const savedAppearance = localStorage.getItem("appearance");
    if (savedAppearance) {
      setAppearance(JSON.parse(savedAppearance));
    }
  }, []);

  useEffect(() => {
    loadAppearance();
    window.addEventListener(APPEARANCE_UPDATE_EVENT, loadAppearance);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener(APPEARANCE_UPDATE_EVENT, loadAppearance);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadAppearance]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSocialIcon = (iconName, size = 18, className = "") => {
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

  if (!appearance) {
    return (
      <footer
        className="py-8 animate-fadeIn"
        style={{
          backgroundColor: "#1e293b",
          boxShadow: "0 -8px 32px rgba(15, 23, 42, 0.4)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <>
      <footer
        className="relative overflow-hidden animate-fadeIn"
        style={{
          backgroundColor: appearance.colors.secondary,
          color: appearance.colors.text,
          boxShadow: `0 -8px 32px ${appearance.colors.shadow}40`,
        }}
      >
        {/* Main Footer Content */}
        <div className="relative z-10 py-6">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Side - Quick Links */}
              <div className="lg:col-span-1">
                <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Quick Links
                </h4>
                <div className="flex gap-3">
                  {/* Static Links */}
                  {appearance.staticLinks &&
                    appearance.staticLinks.map((link, index) => {
                      const isExternal = link.url.startsWith("http");

                      return isExternal ? (
                        <a
                          key={`static-footer-${link.name}`}
                          href={link.url}
                          className="block opacity-80 hover:opacity-100 transition-smooth hover-lift text-sm py-1 hover:translate-x-1"
                          style={{
                            color: appearance.colors.text,
                            animationDelay: `${index * 0.1}s`,
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          key={`static-footer-${link.name}`}
                          to={link.url}
                          className="block opacity-80 hover:opacity-100 transition-smooth hover-lift text-sm py-1 hover:translate-x-1"
                          style={{
                            color: appearance.colors.text,
                            animationDelay: `${index * 0.1}s`,
                          }}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  {appearance.userLinks &&
                    appearance.userLinks.map((link, index) => {
                      const isExternal = link.url.startsWith("http");

                      return isExternal ? (
                        <a
                          key={`user-footer-${link.name}`}
                          href={link.url}
                          className="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-smooth hover-lift text-sm py-1 hover:translate-x-1 group"
                          style={{
                            color: appearance.colors.text,
                            animationDelay: `${
                              (appearance.staticLinks?.length || 0) +
                              index * 0.1
                            }s`,
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink
                            size={14}
                            className="opacity-60 group-hover:opacity-100 transition-smooth"
                          />
                          <span>{link.name}</span>
                        </a>
                      ) : (
                        <Link
                          key={`user-footer-${link.name}`}
                          to={link.url}
                          className="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-smooth hover-lift text-sm py-1 hover:translate-x-1 group"
                          style={{
                            color: appearance.colors.text,
                            animationDelay: `${
                              (appearance.staticLinks?.length || 0) +
                              index * 0.1
                            }s`,
                          }}
                        >
                          <ExternalLink
                            size={14}
                            className="opacity-60 group-hover:opacity-100 transition-smooth"
                          />
                          <span>{link.name}</span>
                        </Link>
                      );
                    })}
                </div>
              </div>

              {/* Right Side - Social Media */}
              <div className="lg:col-span-1 flex flex-col justify-center items-start lg:items-end">
                <div className="w-full lg:text-right">
                  <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Social Media
                  </h4>
                  <div className="flex flex-wrap gap-3 lg:justify-end">
                    {(appearance.socialLinks || []).map((social, index) => {
                      const isExternal = social.url.startsWith("http");

                      const commonProps = {
                        key: index,
                        className:
                          "p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-smooth hover-scale relative overflow-hidden group",
                        style: { animationDelay: `${index * 0.1}s` },
                        title: social.name,
                      };

                      const icon = renderSocialIcon(
                        social.icon,
                        18,
                        "hover:scale-110 transition-transform duration-300 relative z-10"
                      );

                      const overlay = (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
                      );

                      return isExternal ? (
                        <a
                          {...commonProps}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {overlay}
                          {icon}
                        </a>
                      ) : (
                        <Link {...commonProps} to={social.url}>
                          {overlay}
                          {icon}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-6 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-center items-center space-y-2 lg:space-y-0">
              <div className="text-center">
                <p className="text-sm opacity-80">
                  © {new Date().getFullYear()} {appearance.siteTitle}. All
                  rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 rounded-full shadow-2xl backdrop-blur-sm border border-white/20 z-40 group overflow-hidden hover-scale transition-smooth animate-scaleIn"
          style={{
            backgroundColor: `${appearance.colors.primary}ee`,
            color: appearance.colors.text,
            boxShadow: `0 8px 32px ${appearance.colors.shadow}40`,
          }}
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
}

// Main Gantt Projects Dashboard Component
const GanttProjectsDashboard = () => {
  const [appearance, setAppearance] = useState(null);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      return date.toISOString().split("T")[0];
    })(),
  });
  const fileInputRef = useRef(null);

  const APPEARANCE_UPDATE_EVENT = "appearanceUpdate";

  // Load appearance data
  const loadAppearance = useCallback(() => {
    const savedAppearance = localStorage.getItem("appearance");
    if (savedAppearance) {
      setAppearance(JSON.parse(savedAppearance));
    } else {
      // Initialize with sample data if none exists
      localStorage.setItem("appearance", JSON.stringify(sampleAppearanceData));
      setAppearance(sampleAppearanceData);
    }
  }, []);

  useEffect(() => {
    loadAppearance();
    window.addEventListener(APPEARANCE_UPDATE_EVENT, loadAppearance);
    return () => {
      window.removeEventListener(APPEARANCE_UPDATE_EVENT, loadAppearance);
    };
  }, [loadAppearance]);

  // Function to navigate to the Gantt chart page with project data
  const openGanttChart = (project) => {
    const slugifiedName = project.name.toLowerCase().replace(/\s+/g, "-");
    return `/gantt-chart/${slugifiedName}`;
  };

  // Function to handle showing the new project modal
  const handleCreateNewGanttChart = () => {
    setShowNewProjectModal(true);
  };

  // Load projects from localStorage
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const storedProjects = localStorage.getItem("ganttProjects");

        if (storedProjects) {
          const parsedProjects = JSON.parse(storedProjects);
          const updatedProjects = parsedProjects.map((project) => {
            const taskCount = project.tasks?.length || 0;
            const subtaskCount =
              project.tasks?.reduce((total, task) => {
                return total + (task.subtasks?.length || 0);
              }, 0) || 0;

            return {
              ...project,
              taskCount,
              subtaskCount,
            };
          });

          setProjects(updatedProjects);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
        alert("Failed to load project data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to export projects data
  const exportProjectsData = () => {
    try {
      const projectsData = localStorage.getItem("ganttProjects");
      if (!projectsData) {
        Swal.fire({
          icon: "warning",
          title: "No Data Found",
          text: "No projects data found to export.",
          confirmButtonColor: appearance?.colors?.primary || "#3085d6",
        });
        return;
      }

      const formattedData = JSON.stringify(JSON.parse(projectsData), null, 2);
      const blob = new Blob([formattedData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "gantt-chart-projects.json";
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(link);

      // SweetAlert2 success message
      Swal.fire({
        icon: "success",
        title: "Export Complete!",
        text: "Projects data has been exported successfully!",
        confirmButtonColor: appearance?.colors?.primary || "#3085d6",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error exporting projects data:", error);

      // SweetAlert2 error message
      Swal.fire({
        icon: "error",
        title: "Export Error",
        text: "Failed to export projects data. Please try again.",
        confirmButtonColor: appearance?.colors?.primary || "#3085d6",
      });
    }
  };

  // Function to import projects data
  const importProjectsData = (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          const projectsData = JSON.parse(content);

          if (!Array.isArray(projectsData)) {
            throw new Error(
              "Invalid projects data format. Expected an array of projects."
            );
          }

          localStorage.setItem("ganttProjects", content);
          setProjects(projectsData);

          // SweetAlert2 success message
          Swal.fire({
            icon: "success",
            title: "Import Successful!",
            text: "Projects data has been imported successfully!",
            confirmButtonColor: appearance?.colors?.primary || "#3085d6",
            showConfirmButton: true,
            timer: 3000,
            timerProgressBar: true,
          });
        } catch (error) {
          console.error("Error parsing projects data:", error);

          // SweetAlert2 error message
          Swal.fire({
            icon: "error",
            title: "Import Failed",
            text: "Invalid file format. Please select a valid JSON file with project data.",
            confirmButtonColor: appearance?.colors?.primary || "#3085d6",
            footer:
              "<small>Make sure your file contains valid project data in JSON format.</small>",
          });
        }
      };

      reader.readAsText(file);
      event.target.value = null;
    } catch (error) {
      console.error("Error importing projects data:", error);

      // SweetAlert2 error message
      Swal.fire({
        icon: "error",
        title: "Import Error",
        text: "Failed to import projects data. Please try again.",
        confirmButtonColor: appearance?.colors?.primary || "#3085d6",
      });
    }
  };

  // Function to trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Function to delete a project
  const deleteProject = (projectId, projectName, event) => {
    // Prevent navigation to the Gantt chart
    event.preventDefault();
    event.stopPropagation();

    Swal.fire({
      title: "Delete Project",
      text: `Are you sure you want to delete "${projectName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: appearance?.colors?.primary || "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove project from state
        const updatedProjects = projects.filter(
          (project) => project.id !== projectId
        );
        setProjects(updatedProjects);

        // Update localStorage
        localStorage.setItem("ganttProjects", JSON.stringify(updatedProjects));

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Project Deleted!",
          text: `"${projectName}" has been deleted successfully.`,
          confirmButtonColor: appearance?.colors?.primary || "#3085d6",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  };

  // Function to handle new project form input changes
  const handleNewProjectInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

  // Function to save a new project
  const saveNewProject = () => {
    if (!newProject.name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Project name is required",
        confirmButtonColor: appearance?.colors?.primary || "#3085d6",
      });
      return;
    }

    const startDate = new Date(newProject.startDate);
    const endDate = new Date(newProject.endDate);

    if (endDate <= startDate) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Date Range",
        text: "End date must be after start date",
        confirmButtonColor: appearance?.colors?.primary || "#3085d6",
      });
      return;
    }

    const today = new Date();
    const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

    const newProjectData = {
      id: Date.now(),
      name: newProject.name.trim(),
      description: newProject.description.trim() || "Project description",
      createdAt: today.toISOString().split("T")[0],
      updatedAt: today.toISOString().split("T")[0],
      startDate: startDate,
      endDate: endDate,
      dateRange: `${startDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${endDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`,
      completion: 0,
      daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
      taskCount: 1,
      subtaskCount: 0,
      tasks: [
        {
          id: 1,
          title: "Task 1",
          color: "#6366f1",
          start: newProject.startDate,
          end: newProject.endDate,
          newEnd: newProject.endDate,
          collapsed: false,
          subtasks: [],
        },
      ],
    };

    const updatedProjects = [...projects, newProjectData];
    localStorage.setItem("ganttProjects", JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    setShowNewProjectModal(false);

    setNewProject({
      name: "",
      description: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: (() => {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        return date.toISOString().split("T")[0];
      })(),
    });

    // SweetAlert2 success message with redirect
    Swal.fire({
      icon: "success",
      title: "Project Created!",
      text: `${newProjectData.name} has been created successfully. Redirecting to Gantt chart...`,
      confirmButtonColor: appearance?.colors?.primary || "#3085d6",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });

    setTimeout(() => {
      const slugifiedName = newProjectData.name
        .toLowerCase()
        .replace(/\s+/g, "-");
      window.location.href = `/gantt-chart/${slugifiedName}`;
    }, 1500);
  };

  if (!appearance) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: appearance.colors.background }}
      >
        <Header />

        <main className="flex-grow">
          <div
            className="py-10 relative"
            style={{
              background: `linear-gradient(135deg, ${appearance.colors.background} 0%, ${appearance.colors.primary}10 100%)`,
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeInUp">
              {/* Top controls section */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div className="flex-1 w-full sm:max-w-lg">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search projects..."
                      className="pl-10 block w-full rounded-lg border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm h-11 transition-all duration-300"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Import/Export buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={exportProjectsData}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm 
                        bg-white text-gray-700 hover:bg-gray-50
                        transition-all duration-200 hover:shadow-md hover-scale"
                      title="Export projects data to file"
                    >
                      <Download className="mr-2 h-4 w-4 text-gray-600" />
                      Export
                    </button>

                    <button
                      onClick={triggerFileInput}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm 
                        bg-white text-gray-700 hover:bg-gray-50
                        transition-all duration-200 hover:shadow-md hover-scale"
                      title="Import projects data from file"
                    >
                      <Upload className="mr-2 h-4 w-4 text-gray-600" />
                      Import
                    </button>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={importProjectsData}
                      accept=".json,.txt"
                      className="hidden"
                    />
                  </div>

                  <button
                    onClick={handleCreateNewGanttChart}
                    className="group inline-flex items-center px-5 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover-scale"
                    style={{
                      background: `linear-gradient(135deg, ${appearance.colors.primary} 0%, ${appearance.colors.secondary} 100%)`,
                    }}
                  >
                    <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                    Create New Gantt Chart
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin"></div>
                    </div>
                    <div className="w-8 h-8 border-t-4 border-b-4 border-sky-500 rounded-full animate-spin"></div>
                  </div>
                </div>
              ) : (
                <>
                  {/* No projects placeholder */}
                  {projects.length === 0 && !searchTerm && (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center mt-6 animate-fadeIn border border-gray-200">
                      <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                        <Folder className="h-12 w-12 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-3">
                        No Projects Found
                      </h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        You don't have any Gantt chart projects yet. Create your
                        first project to get started or import existing project
                        data.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={handleCreateNewGanttChart}
                          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white transition-all duration-300 transform hover:scale-105 hover-scale"
                          style={{
                            backgroundColor: appearance.colors.primary,
                          }}
                        >
                          <Plus className="mr-2 h-5 w-5" />
                          Create New Project
                        </button>
                        <button
                          onClick={triggerFileInput}
                          className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-sm font-medium rounded-lg shadow-sm 
                            bg-white text-gray-700 hover:bg-gray-50
                            transition-all duration-200 hover-scale"
                        >
                          <Upload className="mr-2 h-5 w-5 text-gray-600" />
                          Import Projects
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Projects grid */}
                  {projects.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProjects.map((project, index) => (
                        <Link
                          key={project.id}
                          to={openGanttChart(project)}
                          className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl cursor-pointer 
                            transform transition-all duration-500 ease-out
                            hover:translate-y-[-5px] animate-fadeIn hover-lift"
                          style={{ animationDelay: `${index * 100}ms` }}
                          onMouseEnter={() => setHoveredProject(project.id)}
                          onMouseLeave={() => setHoveredProject(null)}
                        >
                          <div
                            className="h-2"
                            style={{
                              background: `linear-gradient(90deg, ${appearance.colors.primary} 0%, ${appearance.colors.secondary} 100%)`,
                            }}
                          ></div>
                          <div className="p-6 relative">
                            {/* Delete button */}
                            <button
                              onClick={(e) =>
                                deleteProject(project.id, project.name, e)
                              }
                              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 hover-scale z-10"
                              title="Delete project"
                            >
                              <X className="h-4 w-4" />
                            </button>

                            <div className="flex justify-between items-start mb-4 pr-8">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {project.name}
                              </h3>
                              <div
                                className="ml-2 px-2 py-1 rounded text-xs font-medium"
                                style={{
                                  backgroundColor: `${appearance.colors.primary}20`,
                                  color: appearance.colors.primary,
                                }}
                              >
                                {project.completion}% Complete
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                              {project.description}
                            </p>

                            {/* Progress bar */}
                            <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
                              <div
                                className="h-2 rounded-full group-hover:animate-pulse"
                                style={{
                                  width: `${project.completion}%`,
                                  background: `linear-gradient(90deg, ${appearance.colors.primary} 0%, ${appearance.colors.secondary} 100%)`,
                                }}
                              ></div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                              <div className="flex items-center text-gray-600">
                                <Calendar
                                  className="h-4 w-4 mr-2"
                                  style={{ color: appearance.colors.primary }}
                                />
                                <span>{project.dateRange}</span>
                              </div>

                              <div className="flex items-center text-gray-600">
                                <CheckCircle
                                  className="h-4 w-4 mr-2"
                                  style={{ color: appearance.colors.primary }}
                                />
                                <span>
                                  {project.taskCount} tasks (
                                  {project.subtaskCount} subtasks)
                                </span>
                              </div>

                              <div className="flex items-center text-gray-600">
                                <Clock
                                  className="h-4 w-4 mr-2"
                                  style={{ color: appearance.colors.primary }}
                                />
                                <span>
                                  {project.daysRemaining > 0
                                    ? `${project.daysRemaining} days remaining`
                                    : "Deadline passed"}
                                </span>
                              </div>

                              <div className="flex items-center text-gray-600">
                                <FileText
                                  className="h-4 w-4 mr-2"
                                  style={{ color: appearance.colors.primary }}
                                />
                                <span>
                                  Updated{" "}
                                  {new Date(
                                    project.updatedAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                              <button
                                className="inline-flex items-center text-sm font-medium transition-colors"
                                style={{
                                  color: appearance.colors.primary,
                                }}
                              >
                                View Gantt Chart
                                <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                              </button>
                            </div>
                          </div>
                        </Link>
                      ))}

                      {/* Add new project card */}
                      <div
                        className="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-sky-400
                            flex items-center justify-center cursor-pointer min-h-[250px]
                            transform transition-all duration-300 ease-in-out
                            hover:scale-[1.02] hover:shadow-md animate-fadeIn hover-scale"
                        style={{
                          animationDelay: `${filteredProjects.length * 100}ms`,
                        }}
                        onClick={handleCreateNewGanttChart}
                      >
                        <div className="text-center p-6">
                          <div
                            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors duration-300"
                            style={{
                              backgroundColor: `${appearance.colors.primary}20`,
                            }}
                          >
                            <Plus
                              className="h-8 w-8 animate-bounce"
                              style={{ color: appearance.colors.primary }}
                            />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            Create New Project
                          </h3>
                          <p className="text-sm text-gray-500">
                            Set up a new Gantt chart project
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {filteredProjects.length === 0 && searchTerm && (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center mt-6 animate-fadeIn">
                      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No projects found
                      </h3>
                      <p className="text-gray-500 mb-4">
                        No results matching "{searchTerm}". Try adjusting your
                        search criteria.
                      </p>
                      <button
                        onClick={() => setSearchTerm("")}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors hover-scale"
                        style={{
                          backgroundColor: appearance.colors.primary,
                        }}
                      >
                        Clear Search
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>

        <Footer />

        {/* New Project Modal */}
        {showNewProjectModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-scaleIn border border-gray-200">
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors hover-scale"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex items-center space-x-3 mb-5">
                <div
                  className="p-2 rounded-md"
                  style={{
                    backgroundColor: `${appearance.colors.primary}20`,
                  }}
                >
                  <Plus
                    className="h-6 w-6"
                    style={{ color: appearance.colors.primary }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Create New Project
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newProject.name}
                    onChange={handleNewProjectInputChange}
                    placeholder="Enter project name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-sky-500 transition-all duration-300"
                    required
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Description
                  </label>
                  <textarea
                    name="description"
                    value={newProject.description}
                    onChange={handleNewProjectInputChange}
                    placeholder="Enter project description"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-sky-500 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={newProject.startDate}
                      onChange={handleNewProjectInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-sky-500 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={newProject.endDate}
                      onChange={handleNewProjectInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-sky-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 mt-4">
                  <button
                    onClick={() => setShowNewProjectModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors hover-scale"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveNewProject}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 transition-all duration-300 hover-scale"
                    style={{
                      background: `linear-gradient(135deg, ${appearance.colors.primary} 0%, ${appearance.colors.secondary} 100%)`,
                    }}
                  >
                    Create Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GanttProjectsDashboard;
