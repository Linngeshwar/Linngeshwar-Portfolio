"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ExpandableProjectCard } from "./ExpandableProjectCard";
import Lenis from "lenis";

export default function ProjectsFinally() {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);
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

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const projects = [
    {
      id: 1,
      title: "Pentesting-tool",
      description: "Penetration Testing Tools",
      src: "/images/projects/pentesting-tool.png",
      ctaText: "Visit",
      ctaLink: "https://github.com/Linngeshwar/Pentesting-tool",
      technologies: ["TypeScript"],
      content: () => {
        return (
          <p>
            A collection of tools and scripts for penetration testing, including
            network scanning, vulnerability analysis, and exploitation.
            <br />
            <br />
            This comprehensive toolkit provides security professionals with
            essential utilities for assessing network security and identifying
            potential vulnerabilities in systems.
            <br />
            <br />
            <strong>Technologies:</strong> TypeScript
          </p>
        );
      },
    },
    {
      id: 2,
      title: "Blog App",
      description: "Full-Stack Blogging Platform",
      src: "/images/projects/blog-app.png",
      ctaText: "Visit",
      ctaLink: "https://github.com/Linngeshwar/Blog-app",
      technologies: [
        "TypeScript",
        "Next.js",
        "Python",
        "Django",
        "Django REST Framework",
        "postgreSQL",
      ],
      content: () => {
        return (
          <p>
            A full-stack blogging platform that allows users to create, edit,
            and share content with a modern UI and robust backend functionality.
            <br />
            <br />
            Built with Next.js on the frontend and Django REST Framework on the
            backend, this application provides a seamless experience for content
            creators and readers alike.
            <br />
            <br />
            <strong>Technologies:</strong> TypeScript, Next.js, Python, Django,
            Django REST Framework, PostgreSQL
          </p>
        );
      },
    },
    {
      id: 3,
      title: "Password Manager",
      description: "Secure Password Storage",
      src: "/images/projects/password-manager.png",
      ctaText: "Visit",
      ctaLink: "https://github.com/Linngeshwar/password-manager",
      technologies: ["JavaScript", "Electron", "Node.js", "Encryption"],
      content: () => {
        return (
          <p>
            A secure application for storing and generating strong passwords
            with encryption, featuring user authentication and cross-device
            synchronization.
            <br />
            <br />
            Built with Electron, this desktop application ensures your passwords
            are encrypted and safely stored locally, with modern security
            practices implemented throughout.
            <br />
            <br />
            <strong>Technologies:</strong> JavaScript, Electron, Node.js,
            Encryption
          </p>
        );
      },
    },
    {
      id: 4,
      title: "Personal Journal",
      description: "Digital Journaling App",
      src: "/images/projects/journal-app.png",
      ctaText: "Visit",
      ctaLink: "https://github.com/Linngeshwar/Personal-Journal",
      technologies: ["TypeScript", "React", "JavaScript", "CSS", "HTML"],
      content: () => {
        return (
          <p>
            A private digital journaling application that enables users to
            document thoughts, track moods, and organize entries with rich text
            formatting and media support.
            <br />
            <br />
            This React-based application provides an intuitive interface for
            maintaining a personal journal with features like mood tracking and
            rich text editing.
            <br />
            <br />
            <strong>Technologies:</strong> TypeScript, React, JavaScript, CSS,
            HTML
          </p>
        );
      },
    },
    {
      id: 5,
      title: "Portfolio",
      description: "Personal Portfolio Website",
      src: "/images/projects/portfolio.png",
      ctaText: "Visit",
      ctaLink: "https://github.com/Linngeshwar/Portfolio",
      technologies: ["JavaScript", "React", "CSS", "HTML"],
      content: () => {
        return (
          <p>
            A responsive personal portfolio website showcasing projects, skills,
            and professional experience with modern design and smooth
            animations.
            <br />
            <br />
            Built with React, this portfolio demonstrates web development skills
            through an engaging and interactive user experience.
            <br />
            <br />
            <strong>Technologies:</strong> JavaScript, React, CSS, HTML
          </p>
        );
      },
    },
    {
      id: 6,
      title: "Tech Fiesta Webpage",
      description: "Tech Event Management",
      src: "/images/projects/tech-fiesta.png",
      ctaText: "Visit",
      ctaLink: "https://github.com/Club-Asymmetric/Tech-fiesta-frontend",
      technologies: ["TypeScript", "React", "CSS", "Redux", "Material UI"],
      content: () => {
        return (
          <p>
            Frontend for a tech event management platform with registration,
            scheduling, and interactive event features developed for Club
            Asymmetric's tech festival.
            <br />
            <br />
            This platform streamlines event management with features for
            participant registration, event scheduling, and real-time updates.
            <br />
            <br />
            <strong>Technologies:</strong> TypeScript, React, CSS, Redux,
            Material UI
          </p>
        );
      },
    },
    {
      id: 7,
      title: "Asymmetric Website",
      description: "Club Official Website",
      src: "/images/projects/asymmetric-website.png",
      ctaText: "Visit",
      ctaLink: "https://github.com/Club-Asymmetric/Asymmetric-Website-frontend",
      technologies: ["TypeScript", "React", "JavaScript", "CSS", "Next.js"],
      content: () => {
        return (
          <p>
            Official website frontend for Club Asymmetric showcasing the club's
            activities, events, team members, and resources with a modern
            responsive design.
            <br />
            <br />
            Developed with Next.js, this website serves as the digital face of
            Club Asymmetric, providing information and engagement opportunities
            for members and visitors.
            <br />
            <br />
            <strong>Technologies:</strong> TypeScript, React, JavaScript, CSS,
            Next.js
          </p>
        );
      },
    },
    {
      id: 8,
      title: "Recipe App",
      description: "Interactive Recipe Platform",
      src: "/images/projects/recipe-app.png",
      ctaText: "Visit",
      ctaLink: "https://github.com/Linngeshwar/Recipe-App",
      technologies: ["JavaScript", "React", "CSS", "HTML", "API Integration"],
      content: () => {
        return (
          <p>
            An interactive recipe application allowing users to discover, save,
            and share cooking recipes with features like ingredient filtering
            and step-by-step instructions.
            <br />
            <br />
            This React application integrates with recipe APIs to provide a vast
            collection of recipes with detailed instructions and ingredient
            lists.
            <br />
            <br />
            <strong>Technologies:</strong> JavaScript, React, CSS, HTML, API
            Integration
          </p>
        );
      },
    },
  ];

  return (
    <div
      id="projects"
      ref={containerRef}
      className="relative"
      style={{ height: `${(projects.length + 3) * 100}vh` }}
    >
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-neutral-900/95 backdrop-blur-xl border border-white/10 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-white text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-300 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4 pb-6">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-300 text-xs md:text-sm lg:text-base max-h-60 md:max-h-fit pb-4 flex flex-col items-start gap-4 overflow-auto [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.3)_transparent]"
                  >
                    <div className="[&_strong]:text-white [&_strong]:font-semibold">
                      {typeof active.content === "function"
                        ? active.content()
                        : active.content}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      {projects.map((project, index) => (
        <ExpandableProjectCard
          key={index}
          project={project}
          scrollYProgress={scrollYProgress}
          index={index}
          totalProjects={projects.length}
          setActive={setActive}
          id={id}
        />
      ))}
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
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
