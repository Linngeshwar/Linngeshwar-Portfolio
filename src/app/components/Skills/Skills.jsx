"use client";

import { useState, useEffect, useRef } from "react";

export default function Skills() {
  const containerRef = useRef(null);
  const [skills, setSkills] = useState([]);

  const skillNames = [
    { name: "Next.js", size: 180 },
    { name: "React", size: 170 },
    { name: "JavaScript", size: 190 },
    { name: "TypeScript", size: 160 },
    { name: "Node.js", size: 150 },
    { name: "Python", size: 170 },
    { name: "HTML", size: 140 },
    { name: "CSS", size: 130 },
    { name: "Tailwind", size: 160 },
    { name: "Git", size: 120 },
    { name: "MongoDB", size: 170 },
    { name: "PostgreSQL", size: 180 },
    { name: "Express", size: 150 },
    { name: "Django", size: 160 },
    { name: "C++", size: 140 },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    // Initialize skills with random positions and velocities
    const initialSkills = skillNames.map((skill, index) => ({
      id: index,
      name: skill.name,
      x: Math.random() * (containerRect.width - skill.size),
      y: Math.random() * (containerRect.height - skill.size),
      vx: (Math.random() - 0.5) * 4, // velocity between -2 and 2
      vy: (Math.random() - 0.5) * 4,
      size: skill.size,
    }));

    setSkills(initialSkills);

    const animate = () => {
      setSkills((prevSkills) =>
        prevSkills.map((skill) => {
          let newX = skill.x + skill.vx;
          let newY = skill.y + skill.vy;
          let newVx = skill.vx;
          let newVy = skill.vy;

          // Bounce off walls
          if (newX <= 0 || newX >= containerRect.width - skill.size) {
            newVx = -newVx;
            newX = newX <= 0 ? 0 : containerRect.width - skill.size;
          }
          if (newY <= 0 || newY >= containerRect.height - skill.size) {
            newVy = -newVy;
            newY = newY <= 0 ? 0 : containerRect.height - skill.size;
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
  }, []);

  return (
    <div
      id="skills"
      className="w-full h-screen bg-black relative overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-white text-6xl font-bold tracking-wider">SKILLS</h1>
      </div>

      <div ref={containerRef} className="w-full h-full relative pt-24">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="absolute bg-white text-black rounded-full flex items-center justify-center font-semibold select-none"
            style={{
              left: `${skill.x}px`,
              top: `${skill.y}px`,
              width: `${skill.size}px`,
              height: `${skill.size}px`,
              fontSize: `${Math.max(10, skill.size * 0.15)}px`,
              transform: "translate3d(0, 0, 0)", // Hardware acceleration
            }}
          >
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
}
