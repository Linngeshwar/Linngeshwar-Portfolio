"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import RotatingText from "@/TextAnimations/RotatingText/RotatingText";
import ThisOrThat from "./ThisOrThat";
import ShinyText from "@/TextAnimations/ShinyText/ShinyText";

export default function About() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="grid grid-cols-3 grid-rows-3 items-center justify-center h-screen ">
      {/*LInngeshwar Name section */}
      <motion.div
        className="flex ml-16 col-span-2 text-center h-full justify-start items-end whitespace-nowrap overflow-clip"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-9xl font-bold mb-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: Math.random() * 0.1 + 0.1, // Randomize staggerChildren between 0.05 and 0.15
                delayChildren: 0.3,
              },
            },
          }}
        >
          {"Linngeshwar B".split("").map((char, index) => (
            <motion.span
              key={index}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="inline-block"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              animate={
                !isHovered
                  ? { color: ["#ffffff"] } // Static color when hovered
                  : {
                      color: [
                        "#ffffff",
                        "#f0f0f0",
                        "#d0d0d0",
                        "#a0a0a0",
                        "#808080",
                        "#606060",
                        "#404040",
                        "#202020",
                        "#000000",
                        "#202020",
                        "#404040",
                        "#606060",
                        "#808080",
                        "#a0a0a0",
                        "#d0d0d0",
                        "#f0f0f0",
                        "#ffffff",
                      ],
                      transition: {
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: index * 0.05,
                      },
                    }
              }
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
      {/* Description section */}
      <div className="col-span-2 flex flex-col justify-around row-start-2 text-2xl h-full ml-18">
        <ShinyText
          duration={1}
          text="I am a passionate web developer with a keen interest in creating dynamic and responsive web applications who is trying to figure things out. My expertise lies in leveraging modern technologies to build user-friendly interfaces and seamless user experiences."
        />
        <div className="flex flex-row items-center gap-4">
          <p className="text-2xl md-2">I am a</p>
          <RotatingText
            texts={["Developer", "Coder", "Engineer", "Programmer", "Creator"]}
            mainClassName=" sm:px-2 md:px-3 bg-white text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
      </div>
      {/* Fun and Interactive section */}
      <div className="col-span-1 row-start-3 flex justify-center items-center h-full">
        <ThisOrThat />
      </div>
      <div className="col-span-2 row-start-3 flex justify-end items-end mr-40 h-full">
        <img src="/images/we bare bears.png" alt="We Bare Bears" />
      </div>
    </div>
  );
}
