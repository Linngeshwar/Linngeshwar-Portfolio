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
      category: "frontend",
      proficiency: 80,
      color: "#fff",
    },
    {
      name: "React",
      size: 170,
      category: "frontend",
      proficiency: 80,
      color: "#61dafb",
    },
    {
      name: "JavaScript",
      size: 190,
      category: "language",
      proficiency: 85,
      color: "#f7df1e",
    },
    {
      name: "TypeScript",
      size: 160,
      category: "language",
      proficiency: 85,
      color: "#3178c6",
    },
    {
      name: "Node.js",
      size: 150,
      category: "backend",
      proficiency: 85,
      color: "#68a063",
    },
    {
      name: "Python",
      size: 170,
      category: "language",
      proficiency: 80,
      color: "#3776ab",
    },
    {
      name: "HTML",
      size: 140,
      category: "frontend",
      proficiency: 95,
      color: "#e34f26",
    },
    {
      name: "CSS",
      size: 130,
      category: "frontend",
      proficiency: 90,
      color: "#1572b6",
    },
    {
      name: "Tailwind",
      size: 160,
      category: "frontend",
      proficiency: 90,
      color: "#06b6d4",
    },
    {
      name: "Git",
      size: 120,
      category: "tools",
      proficiency: 85,
      color: "#f05032",
    },
    {
      name: "MongoDB",
      size: 170,
      category: "database",
      proficiency: 80,
      color: "#47a248",
    },
    {
      name: "PostgreSQL",
      size: 180,
      category: "database",
      proficiency: 75,
      color: "#336791",
    },
    {
      name: "Express",
      size: 150,
      category: "backend",
      proficiency: 85,
      color: "#fff",
    },
    {
      name: "Django",
      size: 160,
      category: "backend",
      proficiency: 60,
      color: "#092e20",
    },
    {
      name: "C++",
      size: 140,
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

    // Filter skills based on category
    const filteredSkills =
      selectedCategory === "all"
        ? skillNames
        : skillNames.filter((skill) => skill.category === selectedCategory);

    // Initialize skills with random positions and velocities
    const initialSkills = filteredSkills.map((skill, index) => ({
      id: index,
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      color: skill.color,
      x: Math.random() * (containerRect.width - skill.size),
      y: Math.random() * (containerRect.height - skill.size),
      vx: (Math.random() - 0.5) * 3, // velocity between -1.5 and 1.5
      vy: (Math.random() - 0.5) * 3,
      size: skill.size,
      baseSize: skill.size,
    }));

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
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <h1 className="text-white text-6xl font-bold tracking-wider">SKILLS</h1>
      </div>

      {/* Category Filter */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20 flex flex-wrap gap-3 justify-center px-4">
        {categories.map((category) => (
          <CursorButton
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border-2 ${
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
      <div className="absolute top-8 left-8 z-20 flex flex-col gap-3">
        <CursorButton
          onClick={() => setIsPaused(!isPaused)}
          className="px-4 py-2 bg-transparent text-white border-2 border-white rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
        >
          {isPaused ? "▶ Play" : "⏸ Pause"}
        </CursorButton>
        <CursorButton
          onClick={toggleGravity}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border-2 ${
            gravityEnabled
              ? "bg-white text-black border-white"
              : "bg-transparent text-white border-white hover:bg-white hover:text-black"
          }`}
        >
          {gravityEnabled ? "🌍 Gravity ON" : "🌍 Gravity OFF"}
        </CursorButton>
        <CursorButton
          onClick={handleBlast}
          className="px-4 py-2 bg-transparent text-white border-2 border-white rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
        >
          💥 Blast!
        </CursorButton>
      </div>

      {/* Skills Container */}
      <div ref={containerRef} className="w-full h-screen relative pt-40">
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
            className="absolute bg-white text-black rounded-full flex items-center justify-center font-semibold select-none cursor-pointer group"
            style={{
              left: `${skill.x}px`,
              top: `${skill.y}px`,
              width: `${skill.size}px`,
              height: `${skill.size}px`,
              fontSize: `${Math.max(10, skill.size * 0.15)}px`,
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
          >
            <span className="relative z-10">{skill.name}</span>

            {/* Proficiency indicator on hover */}
            {hoveredSkill === skill.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-md text-xs whitespace-nowrap"
              >
                {skill.proficiency}% Proficiency
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45"></div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white text-sm text-center">
        <p className="opacity-70">
          Hover for proficiency • Toggle gravity • Blast for chaos!
        </p>
      </div>
    </div>
  );
}
