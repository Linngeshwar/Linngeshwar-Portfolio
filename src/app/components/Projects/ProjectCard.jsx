"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ProjectCard({
  title = "Project Title",
  description = "This is a brief description of the project.",
  link = "#",
  githubLink = "github.com/linngeshwar",
  technologies = [],
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative my-12 mx-auto max-w-4xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Main Card Container */}
      <div className="relative bg-black/40 backdrop-blur-sm border border-neutral-800/50 rounded-3xl overflow-hidden">
        {/* Gradient Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))",
            filter: "blur(20px)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-10">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <motion.h3
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-2"
                animate={
                  isHovered
                    ? {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }
                    : {}
                }
                transition={{ duration: 3, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                {title}
              </motion.h3>

              {/* Decorative Line */}
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>

            {/* GitHub Button */}
            {githubLink && (
              <motion.a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-6 p-3 rounded-xl bg-neutral-900/50 border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/50 transition-all duration-300"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-7 h-7 text-neutral-300 hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
            )}
          </div>

          {/* Description */}
          <p className="text-neutral-300 text-lg leading-relaxed mb-8">
            {description}
          </p>

          {/* Technologies Grid */}
          {technologies.length > 0 && (
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="relative group/tech"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="px-4 py-2 bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 border border-neutral-700/50 rounded-lg text-sm font-medium text-neutral-200 hover:text-white hover:border-neutral-600 transition-all duration-300 cursor-default">
                      {tech}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <motion.button
            onClick={() => window.open(link, "_blank")}
            className="group/btn relative px-8 py-4 bg-white text-black font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Project
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={isHovered ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </span>

            {/* Button Hover Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </div>

        {/* Animated Corner Accents */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Floating Dots Background Effect */}
      <div className="absolute inset-0 -z-10 opacity-30">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
