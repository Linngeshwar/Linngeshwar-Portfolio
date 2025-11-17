"use client";

import React, {
  useEffect,
  useId,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CursorButton from "@/app/components/Cursor/CursorButton";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

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

  useLayoutEffect(() => {
    // Only run the animation if no card is expanded
    if (active) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      return;
    }

    // Small delay to ensure DOM is ready
    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const cardElements = cardsRef.current.filter((el) => el !== null);

        if (cardElements.length === 0) return;

        // Set the initial state of all cards except the first one.
        gsap.set(cardElements.slice(1), {
          yPercent: 120,
          scale: 0.6,
          opacity: 0,
        });
        // Set the initial state of the first card.
        gsap.set(cardElements[0], { yPercent: 0, scale: 1, opacity: 1 });

        // Create a master timeline that will be controlled by the ScrollTrigger.
        const timeline = gsap.timeline();

        // Loop through the cards to create the stacking animation sequence.
        cardElements.forEach((card, index) => {
          if (index === 0) return; // Skip the first card as it's already in place.

          const prevCard = cardElements[index - 1];

          // Add a "breathing room" label to the timeline.
          timeline.addLabel(`start-card-${index}`);

          // Animate the previous card moving into the stack.
          timeline.to(
            prevCard,
            {
              scale: 1 - (cardElements.length - index) * 0.08,
              yPercent: -(cardElements.length - index) * 5,
              ease: "power2.inOut",
            },
            `start-card-${index}`
          );

          // Animate the current card coming into view.
          timeline.to(
            card,
            {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              ease: "power2.inOut",
            },
            `start-card-${index}`
          );

          // Add an empty tween to create a pause
          timeline.to({}, { duration: 0.2 });
        });

        // Create the ScrollTrigger to control the timeline.
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".sticky-container",
          scrub: 1.5,
          animation: timeline,
          invalidateOnRefresh: true,
        });
      }, containerRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-[40]"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[45]">
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
              className="flex absolute top-4 right-4 items-center justify-center bg-white rounded-full h-10 w-10 z-[46] hover:bg-neutral-100 transition-colors"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-5xl h-full md:h-fit md:max-h-[90vh] flex flex-col bg-neutral-900 border border-neutral-800 sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="w-full"
              >
                <img
                  width={1920}
                  height={924}
                  src={active.image}
                  alt={active.title}
                  className="w-full h-auto aspect-[1920/924] object-cover object-center"
                />
              </motion.div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="text-2xl md:text-3xl font-bold text-neutral-100 mb-2"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.div className="h-1 bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-600 rounded-full w-32" />
                    </div>

                    {/* GitHub Link */}
                    {active.githubLink && (
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={active.githubLink}
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
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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
                      {active.description}
                    </p>
                  </motion.div>

                  {/* Technologies */}
                  {active.technologies && active.technologies.length > 0 && (
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
                        {active.technologies.map((tech, index) => (
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
                  <CursorButton
                    className="self-start bg-white text-black hover:bg-transparent hover:text-white inline-flex items-center gap-2"
                    onClick={() => window.open(active.link, "_blank")}
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
                  </CursorButton>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div
        className="relative w-full"
        style={{ height: `${cards.length * 120 + 100}vh` }}
        ref={containerRef}
      >
        <div className="sticky-container sticky top-20 h-screen w-full grid place-items-center overflow-hidden">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="[grid-area:1/1] w-full max-w-2xl"
              style={{ willChange: "transform, opacity" }}
            >
              <motion.div
                layoutId={`card-${card.title}-${id}`}
                onClick={() => setActive(card)}
                className="relative bg-black/40 backdrop-blur-sm border border-neutral-800/50 rounded-3xl overflow-hidden cursor-pointer hover:border-neutral-700 transition-all duration-300 group"
              >
                {/* Image Section */}
                <motion.div
                  layoutId={`image-${card.title}-${id}`}
                  className="relative w-full overflow-hidden"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-auto aspect-[1920/924] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                </motion.div>

                {/* Content Section */}
                <div className="relative p-6 md:p-8">
                  {/* Title */}
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-3"
                  >
                    {card.title}
                  </motion.h3>

                  {/* Decorative Line */}
                  <div className="h-1 bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-600 rounded-full w-20 mb-4" />

                  {/* Tech Stack Preview - Show first 3 */}
                  {card.technologies && card.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.technologies.slice(0, 3).map((tech, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 bg-neutral-800/50 border border-neutral-700/50 rounded-md text-xs font-medium text-neutral-300"
                        >
                          {tech}
                        </div>
                      ))}
                      {card.technologies.length > 3 && (
                        <div className="px-3 py-1 bg-neutral-800/50 border border-neutral-700/50 rounded-md text-xs font-medium text-neutral-400">
                          +{card.technologies.length - 3} more
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
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-500/10 via-neutral-600/10 to-neutral-700/10" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </>
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
      className="h-5 w-5 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
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
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Blog+App",
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
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Password+Manager",
    technologies: ["JavaScript", "Electron", "Node.js", "Encryption"],
  },
  {
    id: 4,
    title: "Personal Journal",
    description:
      "A private digital journaling application that enables users to document thoughts, track moods, and organize entries with rich text formatting and media support.",
    link: "https://github.com/Linngeshwar/Personal-Journal",
    githubLink: "https://github.com/Linngeshwar/Personal-Journal",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Personal+Journal",
    technologies: ["TypeScript", "React", "JavaScript", "CSS", "HTML"],
  },
  {
    id: 5,
    title: "Portfolio",
    description:
      "A responsive personal portfolio website showcasing projects, skills, and professional experience with modern design and smooth animations.",
    link: "https://github.com/Linngeshwar/Portfolio",
    githubLink: "https://github.com/Linngeshwar/Portfolio",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Portfolio",
    technologies: ["JavaScript", "React", "CSS", "HTML"],
  },
  {
    id: 6,
    title: "Tech Fiesta Webpage",
    description:
      "Frontend for a tech event management platform with registration, scheduling, and interactive event features developed for Club Asymmetric's tech festival.",
    link: "https://github.com/Club-Asymmetric/Tech-fiesta-frontend",
    githubLink: "https://github.com/Club-Asymmetric/Tech-fiesta-frontend",
    image:
      "https://placehold.co/600x400/1e293b/ffffff?text=Tech+Fiesta+Frontend",
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
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Asymmetric+Website",
    technologies: ["TypeScript", "React", "JavaScript", "CSS", "Next.js"],
  },
  {
    id: 8,
    title: "Recipe App",
    description:
      "An interactive recipe application allowing users to discover, save, and share cooking recipes with features like ingredient filtering and step-by-step instructions.",
    link: "https://github.com/Linngeshwar/Recipe-App",
    githubLink: "https://github.com/Linngeshwar/Recipe-App",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Recipe+App",
    technologies: ["JavaScript", "React", "CSS", "HTML", "API Integration"],
  },
];
