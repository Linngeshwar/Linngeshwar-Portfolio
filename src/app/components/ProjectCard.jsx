"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CursorButton from "./CursorButton";

export default function ProjectCard({
  title = "Project Title",
  description = "This is a brief description of the project.",
  link = "#",
  githubLink = "github.com/linngeshwar",
  image = "public/images/we bare bears.jpg",
  technologies = [],
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project-card grid grid-cols-2 gap-8 my-5 mx-16 p-8 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 shadow-2xl rounded-2xl transition-all duration-300 hover:border-neutral-700 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      {image && (
        <motion.div
          className="w-full h-full rounded-xl overflow-hidden bg-neutral-800 border border-neutral-700"
          style={{ aspectRatio: "16/9" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      )}

      {/* Project Details Column */}
      <div className="flex flex-col justify-between">
        {/* Project Title with GitHub Link */}
        <div className="flex items-center justify-between mb-4">
          <motion.h2
            className="text-3xl font-bold text-white group-hover:text-neutral-100 transition-colors duration-300"
            animate={
              isHovered
                ? {
                    color: [
                      "#ffffff",
                      "#f0f0f0",
                      "#d0d0d0",
                      "#a0a0a0",
                      "#d0d0d0",
                      "#f0f0f0",
                      "#ffffff",
                    ],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }
                : { color: "#ffffff" }
            }
          >
            {title}
          </motion.h2>

          {/* GitHub Logo */}
          {githubLink && (
            <motion.a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 p-2 rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-600 transition-all duration-200 group/github"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6 text-neutral-300 group-hover/github:text-white transition-colors duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
          )}
        </div>

        {/* Project Description */}
        <p className="text-neutral-300 text-lg leading-relaxed mb-6 flex-grow group-hover:text-neutral-200 transition-colors duration-300">
          {description}
        </p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 text-sm bg-neutral-800 text-neutral-300 rounded-full border border-neutral-700 hover:bg-neutral-700 hover:text-white transition-all duration-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        )}

        {/* View Project Button */}
        <CursorButton
          className="self-start bg-white text-black hover:bg-transparent hover:text-white"
          onClick={() => window.open(link, "_blank")}
        >
          View Project
        </CursorButton>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
    </motion.div>
  );
}
