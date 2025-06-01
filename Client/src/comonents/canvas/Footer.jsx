import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  ArrowUp,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Globe,
  Phone,
} from "lucide-react";

// CSS animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
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

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
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
`;

const Footer = ({ rotation = 0 }) => {
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
      <motion.footer
        className="absolute bottom-0 left-0 w-full h-16 bg-gray-800 z-40 flex items-center justify-center"
        style={{
          transform: `rotateX(${rotation}deg)`,
          transformOrigin: "bottom center",
          backfaceVisibility: "hidden",
          boxShadow: "0 -8px 32px rgba(15, 23, 42, 0.4)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transform: `rotateX(${rotation}deg)`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
      </motion.footer>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <motion.footer
        className="absolute bottom-0 left-0 w-full h-auto relative overflow-hidden z-40"
        style={{
          backgroundColor: appearance.colors.secondary,
          color: appearance.colors.text,
          boxShadow: `0 -8px 32px ${appearance.colors.shadow}40`,
          transform: `rotateX(${rotation}deg)`,
          transformOrigin: "bottom center",
          backfaceVisibility: "hidden",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transform: `rotateX(${rotation}deg)`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Main Footer Content */}
        <div className="relative z-10 py-4">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Quick Links */}
              <div className="lg:col-span-1">
                <h4 className="text-sm font-semibold mb-3 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Quick Links
                </h4>
                <div className="flex flex-wrap gap-2">
                  {/* Static Links */}
                  {appearance.staticLinks &&
                    appearance.staticLinks.map((link, index) => {
                      const isExternal = link.url.startsWith("http");

                      return isExternal ? (
                        <a
                          key={`static-footer-${link.name}`}
                          href={link.url}
                          className="block opacity-80 hover:opacity-100 transition-smooth hover-lift text-xs py-1 hover:translate-x-1"
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
                          className="block opacity-80 hover:opacity-100 transition-smooth hover-lift text-xs py-1 hover:translate-x-1"
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
                          className="flex items-center space-x-1 opacity-80 hover:opacity-100 transition-smooth hover-lift text-xs py-1 hover:translate-x-1 group"
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
                            size={10}
                            className="opacity-60 group-hover:opacity-100 transition-smooth"
                          />
                          <span>{link.name}</span>
                        </a>
                      ) : (
                        <Link
                          key={`user-footer-${link.name}`}
                          to={link.url}
                          className="flex items-center space-x-1 opacity-80 hover:opacity-100 transition-smooth hover-lift text-xs py-1 hover:translate-x-1 group"
                          style={{
                            color: appearance.colors.text,
                            animationDelay: `${
                              (appearance.staticLinks?.length || 0) +
                              index * 0.1
                            }s`,
                          }}
                        >
                          <ExternalLink
                            size={10}
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
                  <h4 className="text-sm font-semibold mb-3 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Social Media
                  </h4>
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {(appearance.socialLinks || []).map((social, index) => {
                      const isExternal = social.url.startsWith("http");

                      const commonProps = {
                        key: index,
                        className:
                          "p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-smooth hover-scale relative overflow-hidden group",
                        style: { animationDelay: `${index * 0.1}s` },
                        title: social.name,
                      };

                      const icon = renderSocialIcon(
                        social.icon,
                        14,
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
        <div className="border-t border-white/20 py-2 backdrop-blur-sm"></div>
      </motion.footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full shadow-2xl backdrop-blur-sm border border-white/20 z-40 group overflow-hidden hover-scale transition-smooth animate-scaleIn"
          style={{
            backgroundColor: `${appearance.colors.primary}ee`,
            color: appearance.colors.text,
            boxShadow: `0 8px 32px ${appearance.colors.shadow}40`,
          }}
        >
          <ArrowUp size={16} />
        </button>
      )}
    </>
  );
};

export default Footer;
