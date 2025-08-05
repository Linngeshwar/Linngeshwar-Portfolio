"use client";

import React, { useRef, useLayoutEffect } from "react";
// Make sure to install GSAP and ScrollTrigger: npm install gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard"; // Assuming ProjectCard is in a separate file

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
// Using the new projects array you provided.
const projects = [
  {
    id: 1,
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
    id: 2,
    title: "Password Manager",
    description:
      "A secure application for storing and generating strong passwords with encryption, featuring user authentication and cross-device synchronization.",
    link: "https://github.com/Linngeshwar/password-manager",
    githubLink: "https://github.com/Linngeshwar/password-manager",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Password+Manager",
    technologies: ["JavaScript", "Electron", "Node.js", "Encryption"],
  },
  {
    id: 3,
    title: "Personal Journal",
    description:
      "A private digital journaling application that enables users to document thoughts, track moods, and organize entries with rich text formatting and media support.",
    link: "https://github.com/Linngeshwar/Personal-Journal",
    githubLink: "https://github.com/Linngeshwar/Personal-Journal",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Personal+Journal",
    technologies: ["TypeScript", "React", "JavaScript", "CSS", "HTML"],
  },
  {
    id: 4,
    title: "Portfolio",
    description:
      "A responsive personal portfolio website showcasing projects, skills, and professional experience with modern design and smooth animations.",
    link: "https://github.com/Linngeshwar/Portfolio",
    githubLink: "https://github.com/Linngeshwar/Portfolio",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Portfolio",
    technologies: ["JavaScript", "React", "CSS", "HTML"],
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
    title: "Recipe App",
    description:
      "An interactive recipe application allowing users to discover, save, and share cooking recipes with features like ingredient filtering and step-by-step instructions.",
    link: "https://github.com/Linngeshwar/Recipe-App",
    githubLink: "https://github.com/Linngeshwar/Recipe-App",
    image: "https://placehold.co/600x400/1e293b/ffffff?text=Recipe+App",
    technologies: ["JavaScript", "React", "CSS", "HTML", "API Integration"],
  },
];

/**
 * Main Projects component, now powered by GSAP.
 */
export default function Projects() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    // A GSAP context allows for safe cleanup of all animations and ScrollTriggers created within it.
    let ctx = gsap.context(() => {
      const cards = cardsRef.current;

      // Set the initial state of all cards except the first one.
      gsap.set(cards.slice(1), { yPercent: 120, scale: 0.6, opacity: 0 });
      // Set the initial state of the first card.
      gsap.set(cards[0], { yPercent: 0, scale: 1, opacity: 1 });

      // Create a master timeline that will be controlled by the ScrollTrigger.
      const timeline = gsap.timeline();

      // Loop through the cards to create the stacking animation sequence.
      cards.forEach((card, index) => {
        if (index === 0) return; // Skip the first card as it's already in place.

        const prevCard = cards[index - 1];

        // Add a "breathing room" label to the timeline.
        timeline.addLabel(`start-card-${index}`);

        // Animate the previous card moving into the stack.
        timeline.to(
          prevCard,
          {
            scale: 1 - (cards.length - index) * 0.08,
            yPercent: -(cards.length - index) * 5,
            ease: "power2.inOut",
          },
          `start-card-${index}`
        ); // Start at the same time as the new card comes in.

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
        ); // Use the label to sync the animations.

        // Add an empty tween to create a pause, giving the user time to see the card.
        timeline.to({}, { duration: 0.2 });
      });

      // Create the ScrollTrigger to control the timeline.
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".sticky-container", // Pin the container that holds the cards.
        scrub: 3, // Increased scrub value for more smoothing.
        animation: timeline,
      });
    }, containerRef); // Scope the context to the main container.

    return () => ctx.revert(); // Cleanup GSAP animations and ScrollTriggers on component unmount.
  }, []);

  return (
    <div id="projects" className="">
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${projects.length * 120}vh` }}
      >
        {/* The sticky container now uses 'grid' to center its children. */}
        <div className="sticky-container sticky top-20 h-screen w-full grid place-items-center overflow-hidden">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[i] = el)}
              // Each card is placed in the same grid cell, and `place-items-center` on the parent handles the centering.
              className="[grid-area:1/1] w-full max-w-7xl h-[75vh]"
              style={{ willChange: "transform, opacity" }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
