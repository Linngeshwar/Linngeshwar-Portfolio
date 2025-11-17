"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useId, useRef } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function ProjectCard({
  title = "Project Title",
  description = "This is a brief description of the project.",
  link = "#",
  githubLink = "github.com/linngeshwar",
  technologies = [],
  image = "https://placehold.co/600x400/1e293b/ffffff?text=Project",
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isExpanded]);

  useOutsideClick(ref, () => setIsExpanded(false));

  return (
    <>
      {/* Overlay Background */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-[100]"
          />
        )}
      </AnimatePresence>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 grid place-items-center z-[101] p-4">
            <motion.button
              key={`button-${title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 items-center justify-center bg-white rounded-full h-10 w-10 z-[102] hover:bg-neutral-100 transition-colors"
              onClick={() => setIsExpanded(false)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${title}-${id}`}
              ref={ref}
              className="w-full max-w-4xl h-full md:h-fit md:max-h-[90vh] flex flex-col bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Expanded Image */}
              <motion.div layoutId={`image-${title}-${id}`}>
                <img
                  src={image}
                  alt={title}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </motion.div>

              {/* Expanded Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <motion.h3
                        layoutId={`title-${title}-${id}`}
                        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-2"
                      >
                        {title}
                      </motion.h3>
                      <motion.div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full w-32" />
                    </div>

                    {/* GitHub Link in Expanded View */}
                    {githubLink && (
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 p-3 rounded-xl bg-neutral-800 border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-700 transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          className="w-6 h-6 text-neutral-300 hover:text-white transition-colors"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </motion.a>
                    )}
                  </div>

                  {/* Description */}
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-8"
                  >
                    <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                      {description}
                    </p>
                  </motion.div>

                  {/* Technologies */}
                  {technologies.length > 0 && (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mb-8"
                    >
                      <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {technologies.map((tech, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 border border-neutral-700/50 rounded-lg text-sm font-medium text-neutral-200"
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Action Button */}
                    <motion.a
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Project
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Compact Card Preview */}
      <motion.div
        layoutId={`card-${title}-${id}`}
        onClick={() => setIsExpanded(true)}
        className="relative bg-black/40 backdrop-blur-sm border border-neutral-800/50 rounded-3xl overflow-hidden cursor-pointer hover:border-neutral-700 transition-all duration-300 h-full group"
      >
        {/* Image Section */}
        <motion.div
          layoutId={`image-${title}-${id}`}
          className="relative h-48 md:h-56 overflow-hidden"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
        </motion.div>

        {/* Content Section */}
        <div className="relative p-6 md:p-8">
          {/* Title */}
          <motion.h3
            layoutId={`title-${title}-${id}`}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-3"
          >
            {title}
          </motion.h3>

          {/* Decorative Line */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full w-20 mb-4" />

          {/* Short Description Preview */}
          <p className="text-neutral-400 text-sm md:text-base line-clamp-2 mb-6">
            {description}
          </p>

          {/* Tech Stack Preview - Show first 3 */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {technologies.slice(0, 3).map((tech, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-neutral-800/50 border border-neutral-700/50 rounded-md text-xs font-medium text-neutral-300"
                >
                  {tech}
                </div>
              ))}
              {technologies.length > 3 && (
                <div className="px-3 py-1 bg-neutral-800/50 border border-neutral-700/50 rounded-md text-xs font-medium text-neutral-400">
                  +{technologies.length - 3} more
                </div>
              )}
            </div>
          )}

          {/* Click to Expand Hint */}
          <div className="flex items-center gap-2 text-neutral-500 text-sm">
            <span>Click to view details</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        </div>
      </motion.div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
