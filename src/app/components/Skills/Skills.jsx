"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CursorButton from "../Cursor/CursorButton";

export default function Skills() {
  const containerRef = useRef(null);
  const [skills, setSkills] = useState([]);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isPaused, setIsPaused] = useState(false);
  const [gravityEnabled, setGravityEnabled] = useState(false);

  // Function to apply blast effect
  const handleBlast = () => {
    setSkills((prevSkills) =>
      prevSkills.map((skill) => ({
        ...skill,
        vx: (Math.random() - 0.5) * 20, // Random horizontal velocity -10 to 10
        vy: (Math.random() - 0.5) * 20, // Random vertical velocity -10 to 10
      }))
    );
  };

  // Function to toggle gravity with velocity reset
  const toggleGravity = () => {
    if (!gravityEnabled) {
      // Turning gravity ON - give skills some initial velocity if they're still
      setSkills((prevSkills) =>
        prevSkills.map((skill) => ({
          ...skill,
          vx: Math.abs(skill.vx) < 0.5 ? (Math.random() - 0.5) * 4 : skill.vx,
          vy: Math.abs(skill.vy) < 0.5 ? (Math.random() - 0.5) * 2 : skill.vy,
        }))
      );
    }
    setGravityEnabled(!gravityEnabled);
  };

  const skillNames = [
    {
      name: "Next.js",
      size: 180,
      mobileSize: 100,
      category: "frontend",
      proficiency: 80,
      color: "#fff",
    },
    {
      name: "React",
      size: 170,
      mobileSize: 95,
      category: "frontend",
      proficiency: 80,
      color: "#61dafb",
    },
    {
      name: "JavaScript",
      size: 190,
      mobileSize: 105,
      category: "language",
      proficiency: 85,
      color: "#f7df1e",
    },
    {
      name: "TypeScript",
      size: 160,
      mobileSize: 90,
      category: "language",
      proficiency: 85,
      color: "#3178c6",
    },
    {
      name: "Node.js",
      size: 150,
      mobileSize: 85,
      category: "backend",
      proficiency: 85,
      color: "#68a063",
    },
    {
      name: "Python",
      size: 170,
      mobileSize: 95,
      category: "language",
      proficiency: 80,
      color: "#3776ab",
    },
    {
      name: "HTML",
      size: 140,
      mobileSize: 80,
      category: "frontend",
      proficiency: 95,
      color: "#e34f26",
    },
    {
      name: "CSS",
      size: 130,
      mobileSize: 75,
      category: "frontend",
      proficiency: 90,
      color: "#1572b6",
    },
    {
      name: "Tailwind",
      size: 160,
      mobileSize: 90,
      category: "frontend",
      proficiency: 90,
      color: "#06b6d4",
    },
    {
      name: "Git",
      size: 120,
      mobileSize: 70,
      category: "tools",
      proficiency: 85,
      color: "#f05032",
    },
    {
      name: "MongoDB",
      size: 170,
      mobileSize: 95,
      category: "database",
      proficiency: 80,
      color: "#47a248",
    },
    {
      name: "PostgreSQL",
      size: 180,
      mobileSize: 100,
      category: "database",
      proficiency: 75,
      color: "#336791",
    },
    {
      name: "Express",
      size: 150,
      mobileSize: 85,
      category: "backend",
      proficiency: 85,
      color: "#fff",
    },
    {
      name: "Django",
      size: 160,
      mobileSize: 90,
      category: "backend",
      proficiency: 60,
      color: "#092e20",
    },
    {
      name: "C++",
      size: 140,
      mobileSize: 80,
      category: "language",
      proficiency: 75,
      color: "#00599c",
    },
  ];

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "language", label: "Languages" },
    { id: "database", label: "Database" },
    // { id: "tools", label: "Tools" },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const screenWidth = window.innerWidth;

    // Calculate size multiplier based on screen width
    let sizeMultiplier;
    if (screenWidth < 640) {
      // Mobile: 45% of original size
      sizeMultiplier = 0.45;
    } else if (screenWidth < 768) {
      // Small tablets: 55% of original size
      sizeMultiplier = 0.55;
    } else if (screenWidth < 1024) {
      // Tablets: 70% of original size
      sizeMultiplier = 0.7;
    } else if (screenWidth < 1280) {
      // Small desktop: 85% of original size
      sizeMultiplier = 0.85;
    } else {
      // Large desktop: 100% of original size
      sizeMultiplier = 1;
    }

    // Filter skills based on category
    const filteredSkills =
      selectedCategory === "all"
        ? skillNames
        : skillNames.filter((skill) => skill.category === selectedCategory);

    // Initialize skills with random positions and velocities
    const initialSkills = filteredSkills.map((skill, index) => {
      const skillSize = Math.round(skill.size * sizeMultiplier);
      const velocityMultiplier = sizeMultiplier < 0.7 ? 2 : 3;

      return {
        id: index,
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        color: skill.color,
        x: Math.random() * (containerRect.width - skillSize),
        y: Math.random() * (containerRect.height - skillSize),
        vx: (Math.random() - 0.5) * velocityMultiplier,
        vy: (Math.random() - 0.5) * velocityMultiplier,
        size: skillSize,
        baseSize: skillSize,
      };
    });

    setSkills(initialSkills);
  }, [selectedCategory]);

  useEffect(() => {
    if (isPaused || skills.length === 0) return;

    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const gravity = 0.15; // Gravity acceleration
    const bounceDamping = 0.7; // Energy loss on bounce

    const animate = () => {
      setSkills((prevSkills) =>
        prevSkills.map((skill) => {
          // Skip animation if skill is hovered
          if (hoveredSkill === skill.id) {
            return skill;
          }

          let newVx = skill.vx;
          let newVy = skill.vy;

          // Apply gravity if enabled
          if (gravityEnabled) {
            newVy += gravity;
          }

          let newX = skill.x + newVx;
          let newY = skill.y + newVy;

          // Bounce off walls
          if (newX <= 0 || newX >= containerRect.width - skill.size) {
            newVx = -newVx * (gravityEnabled ? bounceDamping : 1);
            newX = newX <= 0 ? 0 : containerRect.width - skill.size;
          }
          if (newY <= 0 || newY >= containerRect.height - skill.size) {
            newVy = -newVy * (gravityEnabled ? bounceDamping : 1);
            newY = newY <= 0 ? 0 : containerRect.height - skill.size;

            // Add friction when on ground with gravity
            if (gravityEnabled && newY >= containerRect.height - skill.size) {
              newVx *= 0.98; // Friction
            }
          }

          return {
            ...skill,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        })
      );
    };

    const intervalId = setInterval(animate, 16); // ~60fps

    return () => clearInterval(intervalId);
  }, [isPaused, hoveredSkill, skills.length, gravityEnabled]);

  return (
    <div
      id="skills"
      className="w-full min-h-screen bg-black relative overflow-hidden pb-20"
    >
      {/* Header */}
      <div className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-center">
          SKILLS
        </h1>
      </div>

      {/* Category Filter */}
      <div className="hidden md:flex absolute top-14 sm:top-16 md:top-20 lg:top-24 left-1/2 transform -translate-x-1/2 z-20 flex-wrap gap-2 md:gap-3 justify-center px-4 max-w-full">
        {categories.map((category) => (
          <CursorButton
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border-2 z-50 ${
              selectedCategory === category.id
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-white hover:bg-white hover:text-black"
            }`}
          >
            {category.label}
          </CursorButton>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="absolute top-4 md:top-8 left-2 sm:left-4 md:left-8 z-20 flex flex-col gap-2 md:gap-3">
        <CursorButton
          onClick={() => setIsPaused(!isPaused)}
          className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-transparent text-white border-2 border-white rounded-full text-xs sm:text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
        >
          <span className="hidden sm:inline">
            {isPaused ? "▶ Play" : "⏸ Pause"}
          </span>
          <span className="sm:hidden">{isPaused ? "▶" : "⏸"}</span>
        </CursorButton>
        <CursorButton
          onClick={toggleGravity}
          className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border-2 ${
            gravityEnabled
              ? "bg-white text-black border-white"
              : "bg-transparent text-white border-white hover:bg-white hover:text-black"
          }`}
        >
          <span className="hidden sm:inline">
            {gravityEnabled ? "🌍 Gravity ON" : "🌍 Gravity OFF"}
          </span>
          <span className="sm:hidden">🌍</span>
        </CursorButton>
        <CursorButton
          onClick={handleBlast}
          className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-transparent text-white border-2 border-white rounded-full text-xs sm:text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
        >
          <span className="hidden sm:inline">💥 Blast!</span>
          <span className="sm:hidden">💥</span>
        </CursorButton>
      </div>

      {/* Skills Container */}
      <div
        ref={containerRef}
        className="w-full h-screen relative pt-32 sm:pt-36 md:pt-40 z-10"
      >
        {skills.map((skill) => (
          <motion.div
            key={`${skill.name}-${selectedCategory}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: hoveredSkill === skill.id ? 1.2 : 1,
              opacity: 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bg-white text-black rounded-full flex items-center justify-center font-semibold select-none cursor-pointer group z-0"
            style={{
              left: `${skill.x}px`,
              top: `${skill.y}px`,
              width: `${skill.size}px`,
              height: `${skill.size}px`,
              fontSize: `${Math.max(8, skill.size * 0.15)}px`,
              transform: "translate3d(0, 0, 0)", // Hardware acceleration
              backgroundColor: hoveredSkill === skill.id ? skill.color : "#fff",
              color:
                hoveredSkill === skill.id &&
                (skill.color === "#fff" || skill.color === "#f7df1e")
                  ? "#000"
                  : hoveredSkill === skill.id
                  ? "#fff"
                  : "#000",
              boxShadow:
                hoveredSkill === skill.id
                  ? `0 0 30px ${skill.color}`
                  : "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={() => setHoveredSkill(skill.id)}
            onMouseLeave={() => setHoveredSkill(null)}
            onTouchStart={() => setHoveredSkill(skill.id)}
            onTouchEnd={() => setTimeout(() => setHoveredSkill(null), 2000)}
          >
            <span className="relative z-10">{skill.name}</span>

            {/* Proficiency indicator on hover */}
            {hoveredSkill === skill.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 sm:px-3 rounded-md text-[10px] sm:text-xs whitespace-nowrap"
              >
                {skill.proficiency}% Proficiency
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45"></div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white text-xs sm:text-sm text-center px-4">
        <p className="opacity-70">
          <span className="hidden sm:inline">
            Hover for proficiency • Toggle gravity • Blast for chaos!
          </span>
          <span className="sm:hidden">Tap for proficiency</span>
        </p>
      </div>
    </div>
  );
}
