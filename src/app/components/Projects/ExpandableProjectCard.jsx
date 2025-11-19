"use client";

import React from "react";
import { motion, useTransform } from "motion/react";

export const ExpandableProjectCard = ({
  project,
  scrollYProgress,
  index,
  totalProjects,
  setActive,
  id,
}) => {
  const range = [index * (1 / totalProjects), 1];
  const targetScale = [1, 1 - (totalProjects - index) * 0.05];
  const scale = useTransform(scrollYProgress, range, targetScale);

  return (
    <motion.div
      style={{ scale, top: `calc(-10% + ${index * 20}px)` }}
      className="h-[100vh] sticky flex flex-col items-center justify-center"
    >
      <motion.div
        layoutId={`card-${project.title}-${id}`}
        onClick={() => setActive(project)}
        className="p-4 flex flex-col bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl cursor-pointer w-full max-w-2xl mx-auto transition-all duration-300"
      >
        <div className="flex gap-4 flex-col w-full">
          <motion.div layoutId={`image-${project.title}-${id}`}>
            <img
              width={100}
              height={100}
              src={project.src}
              alt={project.title}
              className="h-60 w-full rounded-lg object-cover object-top"
            />
          </motion.div>
          <div className="flex justify-center items-center flex-col">
            <motion.h3
              layoutId={`title-${project.title}-${id}`}
              className="font-medium text-white text-center md:text-left text-base"
            >
              {project.title}
            </motion.h3>
            <motion.p
              layoutId={`description-${project.description}-${id}`}
              className="text-neutral-300 text-center md:text-left text-base"
            >
              {project.description}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
