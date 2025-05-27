import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import {
  Menu,
  X,
  PlusCircle,
  Rotate3D,
  Save,
  Trash2,
  Move,
  Image,
  Edit,
  Maximize2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Initial gallery items
const initialItems = {
  left: [
    {
      id: "left-1",
      type: "image",
      content: "/api/placeholder/400/300",
      rotation: 0,
      title: "Nature View",
      width: 400,
      height: 300,
      position: { x: 0, y: 0 },
    },
    {
      id: "left-2",
      type: "image",
      content: "/api/placeholder/400/300",
      rotation: 0,
      title: "Mountain Landscape",
      width: 400,
      height: 300,
      position: { x: 0, y: 0 },
    },
  ],
  middle: [
    {
      id: "middle-1",
      type: "note",
      content:
        "This is my collection of beautiful memories and thoughts. Each image represents a special moment captured in time.",
      rotation: 0,
      title: "My Gallery Notes",
      width: 400,
      height: 200,
      position: { x: 0, y: 0 },
    },
  ],
  right: [
    {
      id: "right-1",
      type: "image",
      content: "/api/placeholder/400/300",
      rotation: 0,
      title: "Ocean View",
      width: 400,
      height: 300,
      position: { x: 0, y: 0 },
    },
    {
      id: "right-2",
      type: "image",
      content: "/api/placeholder/400/300",
      rotation: 0,
      title: "City Skyline",
      width: 400,
      height: 300,
      position: { x: 0, y: 0 },
    },
  ],
};

// Navigation links
const navLinks = [
  { name: "Home", href: "#" },
  { name: "Gallery", href: "#gallery" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

// Animation variants for framer-motion
const pageAnimations = {
  itemFadeIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  },
  containerAnimation: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  modalAnimation: {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  },
  buttonAnimation: {
    tap: { scale: 0.95 },
  },
};

export default function PersonalGallery() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState(initialItems);
  const [editMode, setEditMode] = useState(false);
  const [rotatingItem, setRotatingItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editWidth, setEditWidth] = useState(400);
  const [editHeight, setEditHeight] = useState(300);
  const [movingItem, setMovingItem] = useState(null);
  const [editingImage, setEditingImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizingItem, setResizingItem] = useState(null);

  const itemRefs = useRef({});
  const containerRefs = useRef({});

  const handleRotate = useCallback((section, id, degrees) => {
    setGalleryItems((prev) => {
      const updatedSection = prev[section].map((item) => {
        if (item.id === id) {
          return {
            ...item,
            rotation: item.rotation + degrees,
          };
        }
        return item;
      });

      return {
        ...prev,
        [section]: updatedSection,
      };
    });
  }, []);

  const addItem = (section, type) => {
    const newId = `${section}-${
      galleryItems[section].length + 1
    }-${Date.now()}`;

    const defaultWidth = type === "image" ? 400 : 400;
    const defaultHeight = type === "image" ? 300 : 200;

    const newItem = {
      id: newId,
      type: type,
      content:
        type === "image" ? "/api/placeholder/400/300" : "Add your note here...",
      rotation: 0,
      title: type === "image" ? "New Image" : "New Note",
      width: defaultWidth,
      height: defaultHeight,
      position: { x: 0, y: 0 },
    };

    setGalleryItems((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const removeItem = (section, id) => {
    setGalleryItems((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  const startEdit = (item, section) => {
    const itemToEdit = galleryItems[section].find((i) => i.id === item.id);
    setEditingItem({ ...itemToEdit, section });
    setEditContent(itemToEdit.content);
    setEditTitle(itemToEdit.title);
    setEditWidth(itemToEdit.width);
    setEditHeight(itemToEdit.height);
  };

  const startImageEdit = (item, section) => {
    const itemToEdit = galleryItems[section].find((i) => i.id === item.id);
    setEditingImage({ ...itemToEdit, section });
    setImageUrl(itemToEdit.content);
    setEditTitle(itemToEdit.title);
    setEditWidth(itemToEdit.width);
    setEditHeight(itemToEdit.height);
  };

  const saveEdit = () => {
    if (!editingItem) return;

    setGalleryItems((prev) => {
      const updatedSection = prev[editingItem.section].map((item) => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            content: editContent,
            title: editTitle,
            width: parseInt(editWidth),
            height: parseInt(editHeight),
          };
        }
        return item;
      });

      return {
        ...prev,
        [editingItem.section]: updatedSection,
      };
    });

    setEditingItem(null);
  };

  const saveImageEdit = () => {
    if (!editingImage) return;

    setGalleryItems((prev) => {
      const updatedSection = prev[editingImage.section].map((item) => {
        if (item.id === editingImage.id) {
          return {
            ...item,
            content:
              imageUrl.startsWith("http") || imageUrl.startsWith("/api")
                ? imageUrl
                : "/api/placeholder/" + editWidth + "/" + editHeight,
            title: editTitle,
            width: parseInt(editWidth),
            height: parseInt(editHeight),
          };
        }
        return item;
      });

      return {
        ...prev,
        [editingImage.section]: updatedSection,
      };
    });

    setEditingImage(null);
  };

  const handleResizeStart = (item, section) => {
    setResizingItem({ ...item, section });
  };

  const handleResizing = (width, height) => {
    if (!resizingItem) return;

    setGalleryItems((prev) => {
      const updatedSection = prev[resizingItem.section].map((item) => {
        if (item.id === resizingItem.id) {
          return {
            ...item,
            width: width,
            height: height,
          };
        }
        return item;
      });

      return {
        ...prev,
        [resizingItem.section]: updatedSection,
      };
    });
  };

  const handleDragStart = (e, item, section) => {
    if (!editMode) return;

    // Get the container's bounds
    const containerRect =
      containerRefs.current[section].getBoundingClientRect();
    const itemRect = itemRefs.current[item.id].getBoundingClientRect();

    // Calculate offset from click point to item origin
    const offsetX = e.clientX - itemRect.left;
    const offsetY = e.clientY - itemRect.top;

    setDragOffset({ x: offsetX, y: offsetY });
    setMovingItem({ ...item, section });
  };

  const handleDrag = useCallback(
    debounce((e, section) => {
      if (!movingItem || movingItem.section !== section) return;

      const containerRect =
        containerRefs.current[section].getBoundingClientRect();
      const newX = e.clientX - containerRect.left - dragOffset.x;
      const newY = e.clientY - containerRect.top - dragOffset.y;

      setGalleryItems((prev) => {
        const updatedSection = prev[section].map((item) => {
          if (item.id === movingItem.id) {
            return {
              ...item,
              position: { x: newX, y: newY },
            };
          }
          return item;
        });

        return {
          ...prev,
          [section]: updatedSection,
        };
      });
    }, 16), // ~60fps
    [movingItem, dragOffset]
  );

  // Optimize image loading in the modal sections
  const ImageWithPlaceholder = ({ src, alt, className }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <div className={`relative ${className}`}>
        {!loaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md"></div>
        )}
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover rounded-md transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      </div>
    );
  };

  const handleDragEnd = () => {
    setMovingItem(null);
  };

  const GalleryItem = memo(({ item, section }) => {
    const isMoving = movingItem && movingItem.id === item.id;
    const isResizing = resizingItem && resizingItem.id === item.id;

    return (
      <motion.div
        ref={(el) => (itemRefs.current[item.id] = el)}
        className={`relative group bg-white rounded-lg shadow-lg mb-6 transition-shadow duration-300 hover:shadow-xl ${
          isMoving ? "z-50" : "z-10"
        }`}
        style={{
          transform: `rotate(${item.rotation}deg)`,
          position: editMode ? "absolute" : "relative",
          left: editMode ? `${item.position.x}px` : "auto",
          top: editMode ? `${item.position.y}px` : "auto",
          width: `${item.width}px`,
          height: `${item.height}px`,
          willChange: editMode ? "transform, left, top" : "auto", // Optimize for transforms
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3 }, // Simplified animation
          },
          exit: { opacity: 0, scale: 0.9 },
        }}
        onMouseDown={editMode ? (e) => handleDragStart(e, item, section) : null}
        layout
      >
        {editMode && (
          <div className="absolute -top-3 -right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <motion.button
              whileTap={pageAnimations.buttonAnimation.tap}
              onClick={() =>
                setRotatingItem(
                  item.id !== rotatingItem?.id ? { id: item.id, section } : null
                )
              }
              className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full transition-colors"
            >
              <Rotate3D size={16} />
            </motion.button>

            <motion.button
              whileTap={pageAnimations.buttonAnimation.tap}
              onClick={() => handleResizeStart(item, section)}
              className="bg-purple-500 hover:bg-purple-600 text-white p-1 rounded-full transition-colors"
            >
              <Maximize2 size={16} />
            </motion.button>

            <motion.button
              whileTap={pageAnimations.buttonAnimation.tap}
              onClick={() =>
                item.type === "note"
                  ? startEdit(item, section)
                  : startImageEdit(item, section)
              }
              className="bg-green-500 hover:bg-green-600 text-white p-1 rounded-full transition-colors"
            >
              <Edit size={16} />
            </motion.button>

            <motion.button
              whileTap={pageAnimations.buttonAnimation.tap}
              onClick={() => removeItem(section, item.id)}
              className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
            >
              <Trash2 size={16} />
            </motion.button>
          </div>
        )}

        {rotatingItem && rotatingItem.id === item.id && (
          <motion.div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-full p-2 flex space-x-2 z-30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.button
              whileTap={pageAnimations.buttonAnimation.tap}
              onClick={() => handleRotate(section, item.id, -5)}
              className="hover:text-blue-300"
            >
              -5°
            </motion.button>
            <motion.button
              whileTap={pageAnimations.buttonAnimation.tap}
              onClick={() => handleRotate(section, item.id, -1)}
              className="hover:text-blue-300"
            >
              -1°
            </motion.button>
            <motion.button
              whileTap={pageAnimations.buttonAnimation.tap}
              onClick={() => {
                setGalleryItems((prev) => {
                  const updatedSection = prev[section].map((i) => {
                    if (i.id === item.id) {
                      return { ...i, rotation: 0 };
                    }
                    return i;
                  });
                  return { ...prev, [section]: updatedSection };
                });
              }}
              className="hover:text-blue-300"
            >
              0°
            </motion.button>
            <motion.button
              whileTap={pageAnimations.buttonAnimation.tap}
              onClick={() => handleRotate(section, item.id, 1)}
              className="hover:text-blue-300"
            >
              +1°
            </motion.button>
            <motion.button
              whileTap={pageAnimations.buttonAnimation.tap}
              onClick={() => handleRotate(section, item.id, 5)}
              className="hover:text-blue-300"
            >
              +5°
            </motion.button>
          </motion.div>
        )}

        {resizingItem && resizingItem.id === item.id && (
          <motion.div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-full p-2 flex items-center space-x-2 z-30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center">
              <span className="text-xs mr-1">W:</span>
              <input
                type="number"
                value={item.width}
                onChange={(e) =>
                  handleResizing(parseInt(e.target.value), item.height)
                }
                className="w-16 px-1 py-0.5 text-black text-xs rounded"
                min="100"
                max="800"
                step="10"
              />
            </div>
            <div className="flex items-center">
              <span className="text-xs mr-1">H:</span>
              <input
                type="number"
                value={item.height}
                onChange={(e) =>
                  handleResizing(item.width, parseInt(e.target.value))
                }
                className="w-16 px-1 py-0.5 text-black text-xs rounded"
                min="100"
                max="800"
                step="10"
              />
            </div>
            <button
              onClick={() => setResizingItem(null)}
              className="text-xs bg-blue-500 px-2 py-0.5 rounded hover:bg-blue-600"
            >
              Done
            </button>
          </motion.div>
        )}

        <div
          className={`p-4 h-full flex flex-col ${
            editMode ? "cursor-move" : ""
          }`}
        >
          <h3 className="text-xl font-bold mb-2 text-center">{item.title}</h3>

          {item.type === "image" ? (
            <div className="overflow-hidden rounded-md flex-grow">
              <ImageWithPlaceholder
                src={item.content}
                alt={item.title}
                className="w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-md flex-grow border-l-4 border-yellow-400 overflow-auto">
              <p className="text-gray-700">{item.content}</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  });

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white sticky top-0 z-50 shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-purple-600">PG</span>
              </div>
              <span className="text-xl font-bold">PersonalGallery</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-purple-200 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-1 rounded-full ${
                  editMode
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {editMode ? "Save Layout" : "Edit Layout"}
              </motion.button>
            </nav>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav
                className="md:hidden pt-4 pb-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="text-white hover:text-purple-200 transition-colors duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                  <motion.button
                    onClick={() => {
                      setEditMode(!editMode);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2 rounded-full ${
                      editMode
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    } transition-colors duration-300 text-left`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {editMode ? "Save Layout" : "Edit Layout"}
                  </motion.button>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          className="bg-gradient-to-b from-blue-500 to-purple-600 text-white py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              My Personal Gallery
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Create your own unique collection of memories and notes. Arrange,
              resize, rotate, and position elements exactly as you wish.
            </motion.p>
          </div>
        </motion.section>

        {/* Gallery Section */}
        <section id="gallery" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Interactive Gallery
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Customize your gallery layout. Add images and notes, resize
                them, and arrange them to your liking with complete freedom.
              </p>

              <AnimatePresence>
                {editMode && (
                  <motion.div
                    className="mt-4 flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addItem("left", "image")}
                      className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                    >
                      <PlusCircle className="mr-2" size={16} />
                      Add Left Image
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addItem("middle", "note")}
                      className="flex items-center bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
                    >
                      <PlusCircle className="mr-2" size={16} />
                      Add Middle Note
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addItem("right", "image")}
                      className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <PlusCircle className="mr-2" size={16} />
                      Add Right Image
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="flex flex-col md:flex-row"
              variants={pageAnimations.containerAnimation}
              initial="hidden"
              animate="visible"
            >
              {/* Left Column - Images */}
              <div
                ref={(el) => (containerRefs.current["left"] = el)}
                className="md:w-1/3 px-4 relative"
                style={{ height: editMode ? "800px" : "auto" }}
                onMouseMove={editMode ? (e) => handleDrag(e, "left") : null}
                onMouseUp={editMode ? handleDragEnd : null}
                onMouseLeave={editMode ? handleDragEnd : null}
              >
                <AnimatePresence>
                  {galleryItems.left.map((item) => (
                    <GalleryItem key={item.id} item={item} section="left" />
                  ))}
                </AnimatePresence>
              </div>

              {/* Middle Column - Notes */}
              <div
                ref={(el) => (containerRefs.current["middle"] = el)}
                className="md:w-1/3 px-4 relative"
                style={{ height: editMode ? "800px" : "auto" }}
                onMouseMove={editMode ? (e) => handleDrag(e, "middle") : null}
                onMouseUp={editMode ? handleDragEnd : null}
                onMouseLeave={editMode ? handleDragEnd : null}
              >
                <AnimatePresence>
                  {galleryItems.middle.map((item) => (
                    <GalleryItem key={item.id} item={item} section="middle" />
                  ))}
                </AnimatePresence>
              </div>

              {/* Right Column - Images */}
              <div
                ref={(el) => (containerRefs.current["right"] = el)}
                className="md:w-1/3 px-4 relative"
                style={{ height: editMode ? "800px" : "auto" }}
                onMouseMove={editMode ? (e) => handleDrag(e, "right") : null}
                onMouseUp={editMode ? handleDragEnd : null}
                onMouseLeave={editMode ? handleDragEnd : null}
              >
                <AnimatePresence>
                  {galleryItems.right.map((item) => (
                    <GalleryItem key={item.id} item={item} section="right" />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Edit Note Modal */}
        <AnimatePresence>
          {editingItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                className="bg-white rounded-lg p-6 w-full max-w-md"
                variants={pageAnimations.modalAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-xl font-bold mb-4">Edit Note</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Content</label>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all h-32"
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      value={editWidth}
                      onChange={(e) => setEditWidth(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      min="100"
                      max="800"
                      step="10"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      value={editHeight}
                      onChange={(e) => setEditHeight(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      min="100"
                      max="800"
                      step="10"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={saveEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Edit Image Modal */}
        <AnimatePresence>
          {editingImage && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <motion.div
                className="bg-white rounded-lg p-6 w-full max-w-md"
                variants={pageAnimations.modalAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-xl font-bold mb-4">Edit Image</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Image URL (or leave blank for placeholder)
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="/api/placeholder/width/height"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      value={editWidth}
                      onChange={(e) => setEditWidth(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      min="100"
                      max="800"
                      step="10"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      value={editHeight}
                      onChange={(e) => setEditHeight(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      min="100"
                      max="800"
                      step="10"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditingImage(null)}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={saveImageEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* About Section */}
        <motion.section
          id="about"
          className="py-16 bg-gray-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                className="text-3xl font-bold mb-6 text-center"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                About This Gallery
              </motion.h2>
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-700 mb-4">
                  This enhanced interactive personal gallery allows you to
                  create and customize your own unique collection of memories
                  and thoughts. You can add images and notes, arrange them as
                  you like, resize them to your preferred dimensions, rotate
                  individual elements, and freely position them to create a
                  truly personalized display.
                </p>
                <p className="text-gray-700 mb-4">
                  To get started, click the "Edit Layout" button in the
                  navigation bar. This will allow you to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>Add new image boxes to the left or right columns</li>
                  <li>Add new note boxes to the middle column</li>
                  <li>Resize any box to your preferred dimensions</li>
                  <li>Rotate any box to your desired angle</li>
                  <li>
                    Drag and position elements anywhere within their column
                  </li>
                  <li>Edit the content and title of any box</li>
                  <li>Change images by providing a new URL</li>
                  <li>Remove any box you don't want</li>
                </ul>
                <p className="text-gray-700">
                  Once you're satisfied with your layout, click "Save Layout" to
                  exit edit mode and enjoy your personalized gallery!
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have questions about using your personal gallery? Get in touch
                with our team.
              </p>
            </motion.div>

            <motion.div
              className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="space-y-4"
                variants={pageAnimations.containerAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={pageAnimations.itemFadeIn}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="Your name"
                  />
                </motion.div>
                <motion.div variants={pageAnimations.itemFadeIn}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="Your email"
                  />
                </motion.div>
                <motion.div variants={pageAnimations.itemFadeIn}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="Your message"
                  ></textarea>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => alert("Message sent!")}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-600 transition-colors duration-300"
                >
                  Send Message
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="flex items-center mb-4 md:mb-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                <span className="text-sm font-bold text-purple-600">PG</span>
              </div>
              <span className="text-xl font-bold">PersonalGallery</span>
            </motion.div>

            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-purple-200 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
          <div className="border-t border-purple-400 mt-6 pt-6 text-center">
            <p>
              &copy; {new Date().getFullYear()} PersonalGallery. All rights
              reserved.
            </p>
          </div>
        </div>
      </motion.footer>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .floating-animation {
          animation: float 5s ease-in-out infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
          }
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}
