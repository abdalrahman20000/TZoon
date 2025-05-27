import React, { useState, useEffect, useCallback } from "react";
import {
  Settings,
  Plus,
  Trash2,
  Download,
  Upload,
  X,
  Edit2,
  Palette,
  Link,
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

  .dropdown-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
     transition: all 0.3s ease-out;
    transform-origin: top center;
  }

  .dropdown-open .dropdown-content {
    max-height: 200px;
     animation: slideDown 0.2s ease-out forwards;
  }


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
      transform: scale(0.9);
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
      imagePath: "",
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
    setShowToolForm(false);
    setNewTool({
      icon: "settings",
      name: "",
      description: "",
      status: "",
      bgColor: "from-blue-600 to-blue-800",
      imagePath: "",
      comingSoon: false,
      path: "",
    });
  };

  const handleCancelTool = () => {
    setShowToolForm(false);
    setNewTool({
      icon: "settings",
      name: "",
      description: "",
      status: "",
      bgColor: "from-blue-600 to-blue-800",
      imagePath: "",
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
                  <a
                    key={`static-${index}`}
                    href={link.url}
                    className="px-4 py-2 rounded-lg font-medium transition-smooth hover:bg-white/10 relative overflow-hidden group hover-lift"
                    style={{
                      color: appearance.colors.text,
                      animationDelay: `${0.2 + index * 0.1}s`,
                    }}
                  >
                    <span className="relative z-10 transition-smooth group-hover:text-white">
                      {link.name}
                    </span>
                  </a>
                ))}
                {appearance.userLinks.map((link, index) => (
                  <a
                    key={`user-${index}`}
                    href={link.url}
                    className="px-4 py-2 rounded-lg font-medium transition-smooth hover:bg-white/10 flex items-center space-x-2 relative overflow-hidden group hover-lift"
                    style={{
                      color: appearance.colors.text,
                      animationDelay: `${0.3 + index * 0.1}s`,
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Link
                      size={16}
                      className="relative z-10 transition-smooth group-hover:scale-110"
                    />
                    <span className="relative z-10 transition-smooth group-hover:text-white">
                      {link.name}
                    </span>
                  </a>
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
                  (link, index) => (
                    <a
                      key={`mobile-${index}`}
                      href={link.url}
                      className="px-4 py-3 rounded-lg font-medium transition-smooth hover:bg-white/10 relative overflow-hidden group"
                      style={{
                        color: appearance.colors.text,
                        animationDelay: `${index * 0.1}s`,
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="relative z-10 transition-smooth group-hover:text-white">
                        {link.name}
                      </span>
                    </a>
                  )
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
                    { id: "tools", label: "Tools Management", icon: Wrench },
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
                        {appearance.userLinks.map((link, index) => (
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
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-smooth hover-scale"
                                  title="Open URL"
                                >
                                  <ExternalLink size={12} />
                                </a>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteLink(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-smooth ml-3 hover-scale"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
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

                {activeSection === "tools" && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Add/Edit Tool Form */}
                    {showToolForm && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 animate-scaleIn">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {editingToolIndex !== null
                              ? "Edit Tool"
                              : "Add New Tool"}
                          </h3>
                          <button
                            onClick={handleCancelTool}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-smooth hover-scale"
                          >
                            <X size={16} className="text-gray-500" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {/* Custom Icon Dropdown */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Icon
                            </label>
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() =>
                                  setShowIconDropdown(!showIconDropdown)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between bg-white"
                              >
                                <div className="flex items-center space-x-2">
                                  {renderIcon(
                                    newTool.icon,
                                    16,
                                    "text-gray-600"
                                  )}
                                  <span>
                                    {iconOptions.find(
                                      (opt) => opt.value === newTool.icon
                                    )?.name || newTool.icon}
                                  </span>
                                </div>
                                <ChevronDown
                                  size={16}
                                  className={`transition-transform ${
                                    showIconDropdown ? "rotate-180" : ""
                                  }`}
                                />
                              </button>

                              {/* Dropdown Content - FIXED */}
                              {showIconDropdown && (
                                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                  {iconOptions.map((option) => (
                                    <button
                                      key={option.value}
                                      type="button"
                                      onClick={() => {
                                        setNewTool({
                                          ...newTool,
                                          icon: option.value,
                                        });
                                        setShowIconDropdown(false);
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
                              Image URL
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
                              placeholder="https://example.com/image.jpg"
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
                            <button
                              onClick={handleSaveTool}
                              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-smooth font-medium hover-scale"
                            >
                              {editingToolIndex !== null
                                ? "Update Tool"
                                : "Add Tool"}
                            </button>
                            <button
                              onClick={handleCancelTool}
                              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-smooth font-medium hover-scale"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tools List */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Manage Tools
                        </h3>
                        <button
                          onClick={handleAddNewTool}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-smooth hover-scale"
                        >
                          <Plus size={16} />
                          <span>Add Tool</span>
                        </button>
                      </div>

                      <div className="grid gap-3 max-h-96 overflow-y-auto">
                        {appearance.tools.map((tool, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-smooth animate-fadeIn"
                            style={{ animationDelay: `${index * 0.05}s` }}
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
                              <button
                                onClick={() => handleEditTool(index)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-smooth hover-scale"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleToolStatusChange(index)}
                                className={`px-3 py-1 text-xs font-medium rounded-lg transition-smooth hover-scale ${
                                  tool.comingSoon
                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                }`}
                              >
                                {tool.comingSoon ? "Enable" : "Disable"}
                              </button>
                              <button
                                onClick={() => handleDeleteTool(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-smooth hover-scale"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
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
      <style>{`
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
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
      `}</style>
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
                    appearance.staticLinks.map((link, index) => (
                      <a
                        key={`static-footer-${link.name}`}
                        href={link.url}
                        className="block opacity-80 hover:opacity-100 transition-smooth hover-lift text-sm py-1 hover:translate-x-1"
                        style={{
                          color: appearance.colors.text,
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        {link.name}
                      </a>
                    ))}

                  {/* User Links */}
                  {appearance.userLinks &&
                    appearance.userLinks.map((link, index) => (
                      <a
                        key={`user-footer-${link.name}`}
                        href={link.url}
                        className="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-smooth hover-lift text-sm py-1 hover:translate-x-1 group"
                        style={{
                          color: appearance.colors.text,
                          animationDelay: `${
                            (appearance.staticLinks?.length || 0) + index * 0.1
                          }s`,
                        }}
                        target={
                          link.url.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.url.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        <ExternalLink
                          size={14}
                          className="opacity-60 group-hover:opacity-100 transition-smooth"
                        />
                        <span>{link.name}</span>
                      </a>
                    ))}
                </div>
              </div>

              {/* Right Side - Social Media */}
              <div className="lg:col-span-1 flex flex-col justify-center items-start lg:items-end">
                <div className="w-full lg:text-right">
                  <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Social Media
                  </h4>
                  <div className="flex flex-wrap gap-3 lg:justify-end">
                    {(appearance.socialLinks || []).map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-smooth hover-scale relative overflow-hidden group"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        title={social.name}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
                        {renderSocialIcon(
                          social.icon,
                          18,
                          "hover:scale-110 transition-transform duration-300 relative z-10"
                        )}
                      </a>
                    ))}
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

// Tools Component
function Tools() {
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});
  const [visibleCount, setVisibleCount] = useState(0);

  const APPEARANCE_UPDATE_EVENT = "appearanceUpdate";

  const loadTools = useCallback(() => {
    const savedAppearance = localStorage.getItem("appearance");
    if (savedAppearance) {
      const appearanceData = JSON.parse(savedAppearance);
      setTools(appearanceData.tools || []);
    }
  }, []);

  useEffect(() => {
    loadTools();
    window.addEventListener(APPEARANCE_UPDATE_EVENT, loadTools);
    return () => {
      window.removeEventListener(APPEARANCE_UPDATE_EVENT, loadTools);
    };
  }, [loadTools]);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    const preloadImages = async () => {
      const preloadPromises = tools.map((tool) => {
        if (!tool.imagePath) return Promise.resolve();
        return new Promise((resolve) => {
          const img = new Image();
          img.src = tool.imagePath;
          img.onload = () => {
            setLoadedImages((prev) => ({ ...prev, [tool.imagePath]: true }));
            resolve();
          };
          img.onerror = resolve;
        });
      });
      await Promise.all(preloadPromises);
    };

    preloadImages();

    const showCards = () => {
      let counter = 0;
      const interval = setInterval(() => {
        counter++;
        setVisibleCount((prev) => Math.min(prev + 4, tools.length));

        if (counter >= Math.ceil(tools.length / 4)) {
          clearInterval(interval);
        }
      }, 150);

      return interval;
    };

    const cardsInterval = setTimeout(showCards, 600);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(cardsInterval);
    };
  }, [tools]);

  const renderIcon = (iconName) => {
    const iconProps = { size: 20, className: "text-white" };

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
      default:
        return <Settings {...iconProps} />;
    }
  };

  const StatusBadge = ({ status }) => {
    let bgColor = "bg-gray-100";
    let textColor = "text-gray-800";

    if (status === "Popular") {
      bgColor = "bg-purple-100";
      textColor = "text-purple-800";
    } else if (status === "New") {
      bgColor = "bg-green-100";
      textColor = "text-green-800";
    } else if (status === "Active") {
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
    } else if (status === "Premium") {
      bgColor = "bg-amber-100";
      textColor = "text-amber-800";
    }

    return (
      <span
        className={`text-xs font-semibold px-2 py-1 rounded-full ${bgColor} ${textColor} shadow-sm`}
      >
        {status}
      </span>
    );
  };

  const CardSkeleton = () => (
    <div className="h-32 rounded-xl bg-gray-200 overflow-hidden animate-pulse">
      <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400">
        <div className="h-full w-full bg-gray-300" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <div className="py-10 bg-white relative flex-grow">
        <div
          className="absolute inset-0 bg-opacity-30"
          style={{
            backgroundImage: "radial-gradient(#f0f0f0 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 16 }).map((_, index) => (
                <CardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <div
                  key={`${tool.name}-${index}`}
                  className={`h-32 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-smooth hover-lift ${
                    tool.comingSoon ? "cursor-not-allowed" : "cursor-pointer"
                  } ${index < visibleCount ? "card-entrance" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {tool.comingSoon ? (
                    <div className="relative h-full w-full overflow-hidden group cursor-not-allowed rounded-xl hover-scale transition-smooth">
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-50 blur-sm transform scale-110 group-hover:scale-125 transition-smooth"
                        style={{
                          backgroundImage: tool.imagePath
                            ? `url(${tool.imagePath})`
                            : "none",
                          backgroundColor: tool.imagePath
                            ? "transparent"
                            : "#374151",
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"></div>

                      {/* Coming Soon Badge */}
                      <div className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden">
                        <div className="transform rotate-6 group-hover:rotate-0 transition-smooth bg-gray-800 bg-opacity-80 px-5 py-3 rounded-lg shadow-xl border border-gray-700 border-opacity-50">
                          <span className="text-white text-xl font-medium tracking-wide">
                            COMING SOON
                          </span>
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="absolute top-3 left-3 bg-gray-800 bg-opacity-70 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-gray-700 border-opacity-40 overflow-hidden">
                        <div className="text-gray-200 opacity-90 group-hover:text-white group-hover:opacity-100 transition-smooth">
                          {renderIcon(tool.icon)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={tool.path}
                      className="block h-full w-full overflow-hidden hover-scale transition-smooth"
                    >
                      <div className="relative h-full w-full overflow-hidden group transition-smooth">
                        {/* Background Image */}
                        <div
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-[2px] group-hover:blur-[6px] transform scale-110 group-hover:scale-125 transition-smooth"
                          style={{
                            backgroundImage: tool.imagePath
                              ? `url(${tool.imagePath})`
                              : "none",
                            backgroundColor: tool.imagePath
                              ? "transparent"
                              : "#374151",
                          }}
                        />

                        {/* Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-transparent to-gray-800 opacity-40 group-hover:opacity-80 transition-smooth"></div>
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${tool.bgColor} opacity-0 group-hover:opacity-20 transition-smooth`}
                        ></div>

                        {/* Content - Centered on hover */}
                        <div className="relative h-full w-full p-4 flex flex-col justify-between overflow-hidden">
                          <div className="flex justify-between items-start overflow-hidden">
                            <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm p-2 rounded-lg shadow-md border border-gray-700 border-opacity-30 group-hover:shadow-lg group-hover:border-gray-600 transition-smooth overflow-hidden">
                              <div className="relative z-10">
                                {renderIcon(tool.icon)}
                              </div>
                            </div>

                            {tool.status && (
                              <div className="transform group-hover:translate-x-0 group-hover:-translate-y-1 transition-smooth overflow-hidden">
                                <StatusBadge status={tool.status} />
                              </div>
                            )}
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                            <h3 className="text-xl font-bold text-white text-center px-4">
                              {tool.name}
                            </h3>
                          </div>

                          <div className="bg-gradient-to-t from-gray-900 via-gray-800 to-transparent p-3 -mx-4 -mb-4 overflow-hidden group-hover:opacity-0 transition-smooth">
                            <h3 className="text-base font-bold text-white mb-1">
                              {tool.name}
                            </h3>
                            <p className="text-xs text-gray-300 line-clamp-2">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default Tools;
