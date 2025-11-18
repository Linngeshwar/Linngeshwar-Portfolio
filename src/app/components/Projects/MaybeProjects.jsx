"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import CursorButton from "../Cursor/CursorButton";
import Lenis from "lenis";
import { useTransform } from "framer-motion";

export default function MaybeProjects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Pentesting-tool",
      description:
        "A collection of tools and scripts for penetration testing, including network scanning, vulnerability analysis, and exploitation.",
      link: "https://github.com/Linngeshwar/Pentesting-tool",
      githubLink: "https://github.com/Linngeshwar/Pentesting-tool",
      image: "/images/projects/pentesting-tool.png",
      technologies: ["TypeScript"],
    },
    {
      id: 2,
      title: "Blog App",
      description:
        "A full-stack blogging platform that allows users to create, edit, and share content with a modern UI and robust backend functionality.",
      link: "https://github.com/Linngeshwar/Blog-app",
      githubLink: "https://github.com/Linngeshwar/Blog-app",
      image: "/images/projects/blog-app.png",
      technologies: [
        "TypeScript",
        "Next.js",
        "Python",
        "Django",
        "Django REST Framework",
        "postgreSQL",
      ],
    },
    {
      id: 3,
      title: "Password Manager",
      description:
        "A secure application for storing and generating strong passwords with encryption, featuring user authentication and cross-device synchronization.",
      link: "https://github.com/Linngeshwar/password-manager",
      githubLink: "https://github.com/Linngeshwar/password-manager",
      image: "/images/projects/password-manager.png",
      technologies: ["JavaScript", "Electron", "Node.js", "Encryption"],
    },
    {
      id: 4,
      title: "Personal Journal",
      description:
        "A private digital journaling application that enables users to document thoughts, track moods, and organize entries with rich text formatting and media support.",
      link: "https://github.com/Linngeshwar/Personal-Journal",
      githubLink: "https://github.com/Linngeshwar/Personal-Journal",
      image: "/images/projects/personal-journal.png",
      technologies: ["TypeScript", "React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 5,
      title: "Portfolio",
      description:
        "A responsive personal portfolio website showcasing projects, skills, and professional experience with modern design and smooth animations.",
      link: "https://github.com/Linngeshwar/Portfolio",
      githubLink: "https://github.com/Linngeshwar/Portfolio",
      image: "/images/projects/portfolio.png",
      technologies: ["JavaScript", "React", "CSS", "HTML"],
    },
    {
      id: 6,
      title: "Tech Fiesta Webpage",
      description:
        "Frontend for a tech event management platform with registration, scheduling, and interactive event features developed for Club Asymmetric's tech festival.",
      link: "https://github.com/Club-Asymmetric/Tech-fiesta-frontend",
      githubLink: "https://github.com/Club-Asymmetric/Tech-fiesta-frontend",
      image: "/images/projects/tech-fiesta.png",
      technologies: ["TypeScript", "React", "CSS", "Redux", "Material UI"],
    },
    {
      id: 7,
      title: "Asymmetric Website",
      description:
        "Official website frontend for Club Asymmetric showcasing the club's activities, events, team members, and resources with a modern responsive design.",
      link: "https://github.com/Club-Asymmetric/Asymmetric-Website-frontend",
      githubLink:
        "https://github.com/Club-Asymmetric/Asymmetric-Website-frontend",
      image: "/images/projects/asymmetric-website.png",
      technologies: ["TypeScript", "React", "JavaScript", "CSS", "Next.js"],
    },
    {
      id: 8,
      title: "Recipe App",
      description:
        "An interactive recipe application allowing users to discover, save, and share cooking recipes with features like ingredient filtering and step-by-step instructions.",
      link: "https://github.com/Linngeshwar/Recipe-App",
      githubLink: "https://github.com/Linngeshwar/Recipe-App",
      image: "/images/projects/recipe-app.png",
      technologies: ["JavaScript", "React", "CSS", "HTML", "API Integration"],
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${(projects.length + 3) * 100}vh` }}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          link={project.link}
          githubLink={project.githubLink}
          image={project.image}
          technologies={project.technologies}
          scrollYProgress={scrollYProgress}
          index={index}
          totalProjects={projects.length}
          range={[index * (1 / projects.length), 1]}
          targetScale={[1, 1 - (projects.length - index) * 0.05]}
        />
      ))}
    </div>
  );
}

const ProjectCard = ({
  title,
  description,
  link,
  githubLink,
  image,
  technologies,
  scrollYProgress,
  index,
  range,
  targetScale,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const scale = useTransform(scrollYProgress, range, targetScale);

  return (
    <motion.div
      style={{ scale, top: `calc(-10% + ${index * 20}px)` }}
      className="h-[100vh] sticky flex flex-col items-center justify-center"
    >
      <motion.div
        className="project-card w-full max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-6 my-5 mx-8 lg:mx-16 p-6 lg:p-8 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 shadow-2xl rounded-2xl transition-all duration-300 hover:border-neutral-700 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Project Image */}
        {image && (
          <motion.div
            className="lg:col-span-3 w-full rounded-xl overflow-hidden bg-neutral-800 border border-neutral-700 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        )}

        {/* Project Details Column */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          {/* Project Title with GitHub Link */}
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <motion.h2
              className="text-2xl lg:text-3xl font-bold text-white group-hover:text-neutral-100 transition-colors duration-300"
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
          <p className="text-neutral-300 text-base lg:text-lg leading-relaxed mb-4 lg:mb-6 flex-grow group-hover:text-neutral-200 transition-colors duration-300">
            {description}
          </p>

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
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
    </motion.div>
  );
};
