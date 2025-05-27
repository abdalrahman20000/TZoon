import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Globe,
  Shield,
  Award,
  Users,
} from "lucide-react";

export default function Footer() {
  const [appearance, setAppearance] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const APPEARANCE_UPDATE_EVENT = "appearanceUpdate";

  useEffect(() => {
    const loadAppearance = () => {
      const savedAppearance = localStorage.getItem("appearance");
      if (savedAppearance) {
        setAppearance(JSON.parse(savedAppearance));
      }
    };

    loadAppearance();
    window.addEventListener(APPEARANCE_UPDATE_EVENT, loadAppearance);

    // Handle scroll for scroll-to-top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener(APPEARANCE_UPDATE_EVENT, loadAppearance);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!appearance) {
    return (
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-8"
        style={{
          backgroundColor: "#1e293b",
          boxShadow: "0 -8px 32px rgba(15, 23, 42, 0.4)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
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

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com",
      label: "GitHub",
      color: "hover:text-gray-300",
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "hover:text-blue-500",
    },
    {
      icon: Mail,
      href: "mailto:contact@example.com",
      label: "Email",
      color: "hover:text-green-400",
    },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Documentation", href: "/docs" },
    { name: "Support", href: "/support" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      desc: "Bank-level encryption",
    },
    { icon: Users, title: "Team Collaboration", desc: "Real-time workflows" },
    { icon: Award, title: "Industry Leading", desc: "Trusted by thousands" },
    { icon: Globe, title: "Global Reach", desc: "Available worldwide" },
  ];

  return (
    <>
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative overflow-hidden"
        style={{
          backgroundColor: appearance.colors.secondary,
          color: appearance.colors.text,
          boxShadow: `0 -8px 32px ${appearance.colors.shadow}40`,
        }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, ${appearance.colors.text} 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "40px 40px"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating Orbs */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl opacity-10"
              style={{
                background: `radial-gradient(circle, ${appearance.colors.primary} 0%, transparent 70%)`,
                width: `${150 + i * 80}px`,
                height: `${150 + i * 80}px`,
                left: `${20 + i * 40}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="relative z-50 py-12 text-amber-500">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Company Info */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <motion.h2
                  className="text-2xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {appearance.siteTitle}
                </motion.h2>
                <p className="text-base opacity-90 mb-6 leading-relaxed">
                  Empowering teams worldwide with cutting-edge project
                  management solutions. Transform your workflow and boost
                  productivity.
                </p>

                {/* Feature Highlights */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="flex items-center space-x-2 p-2 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-200"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 2 }}
                    >
                      <div className="p-1 bg-white/10 rounded">
                        <feature.icon size={14} className="text-white/90" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-white/95">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-white/70">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <motion.div
                    className="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-all duration-200 group"
                    whileHover={{ x: 2 }}
                  >
                    <div className="p-1 bg-white/10 rounded group-hover:bg-white/20 transition-all duration-200">
                      <MapPin size={14} />
                    </div>
                    <span className="text-xs">
                      123 Business Avenue, Suite 100
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-all duration-200 group"
                    whileHover={{ x: 2 }}
                  >
                    <div className="p-1 bg-white/10 rounded group-hover:bg-white/20 transition-all duration-200">
                      <Phone size={14} />
                    </div>
                    <span className="text-xs">+1 (555) 123-4567</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center space-x-2 opacity-80 hover:opacity-100 transition-all duration-200 group"
                    whileHover={{ x: 2 }}
                  >
                    <div className="p-1 bg-white/10 rounded group-hover:bg-white/20 transition-all duration-200">
                      <Mail size={14} />
                    </div>
                    <span className="text-xs">hello@projectmanagement.com</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-bold mb-4 relative">
                  Quick Links
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-white to-transparent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "40px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {quickLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="opacity-80 hover:opacity-100 transition-all duration-300 hover:translate-x-2 flex items-center space-x-2 group p-2 rounded-lg hover:bg-white/10"
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.div
                        className="w-1 h-1 bg-white rounded-full transition-all duration-300"
                        whileHover={{
                          scale: 2,
                          backgroundColor: appearance.colors.primary,
                        }}
                      />
                      <span className="text-sm transition-all duration-300 group-hover:text-white">
                        {link.name}
                      </span>
                      <ExternalLink
                        size={10}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0"
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Navigation & Social */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-bold mb-4 relative">
                  Connect
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-white to-transparent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "40px" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </h3>

                {/* Main Navigation Links */}
                <div className="space-y-2 mb-6">
                  {/* Static Links */}
                  {appearance.staticLinks &&
                    appearance.staticLinks.map((link, index) => (
                      <motion.a
                        key={`static-footer-${index}`}
                        href={link.url}
                        className="block opacity-80 hover:opacity-100 transition-all duration-300 hover:translate-x-2 group flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10"
                        style={{ color: appearance.colors.text }}
                        target={
                          link.url.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.url.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 0.8, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <motion.div
                          className="w-1 h-1 bg-white rounded-full transition-all duration-300"
                          whileHover={{
                            scale: 2,
                            backgroundColor: appearance.colors.primary,
                          }}
                        />
                        <span className="text-sm transition-all duration-300 group-hover:text-white">
                          {link.name}
                        </span>
                        {link.url.startsWith("http") && (
                          <ExternalLink
                            size={10}
                            className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0"
                          />
                        )}
                      </motion.a>
                    ))}

                  {/* User Links */}
                  {appearance.userLinks &&
                    appearance.userLinks.map((link, index) => (
                      <motion.a
                        key={`user-footer-${index}`}
                        href={link.url}
                        className="block opacity-80 hover:opacity-100 transition-all duration-300 hover:translate-x-2 group flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10"
                        style={{ color: appearance.colors.text }}
                        target={
                          link.url.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.url.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 0.8, x: 0 }}
                        transition={{
                          delay:
                            (appearance.staticLinks?.length || 0 + index) * 0.1,
                          duration: 0.3,
                        }}
                      >
                        <motion.div
                          className="w-1 h-1 bg-white rounded-full transition-all duration-300"
                          whileHover={{
                            scale: 2,
                            backgroundColor: appearance.colors.primary,
                          }}
                        />
                        <span className="text-sm transition-all duration-300 group-hover:text-white">
                          {link.name}
                        </span>
                        {link.url.startsWith("http") && (
                          <ExternalLink
                            size={10}
                            className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0"
                          />
                        )}
                      </motion.a>
                    ))}
                </div>

                {/* Social Links */}
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 group ${social.color} relative overflow-hidden`}
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 rounded-xl"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <social.icon
                        size={18}
                        className="group-hover:scale-110 transition-transform duration-300 relative z-10"
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/20 py-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-center items-center space-y-2 lg:space-y-0">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <p className="text-sm opacity-80">
                  © {new Date().getFullYear()} {appearance.siteTitle}. All
                  rights reserved.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 rounded-full shadow-2xl backdrop-blur-sm border border-white/20 z-40 group overflow-hidden"
          style={{
            backgroundColor: `${appearance.colors.primary}ee`,
            color: appearance.colors.text,
            boxShadow: `0 8px 32px ${appearance.colors.shadow}40`,
          }}
          whileHover={{
            scale: 1.1,
            y: -2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowUp size={20} />
          </motion.div>

          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: `${appearance.colors.primary}30` }}
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 2, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>
      )}
    </>
  );
}
