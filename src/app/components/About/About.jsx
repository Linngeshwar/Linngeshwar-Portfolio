"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import RotatingText from "@/TextAnimations/RotatingText/RotatingText";
import ThisOrThat from "./ThisOrThat";
import ShinyText from "@/TextAnimations/ShinyText/ShinyText";
import CursorButton from "../Cursor/CursorButton";

export default function About() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id="about"
      className="min-h-screen flex flex-col justify-between py-10 px-4 sm:px-8 md:px-12 lg:px-16"
    >
      {/* Top Section - Name and Description */}
      <div className="container mx-auto">
        {/* Linngeshwar Name section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: Math.random() * 0.1 + 0.1,
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

          {/* Description section */}
          <div className="max-w-4xl space-y-6 mt-10">
            <ShinyText
              duration={1}
              text="I am a passionate web developer with a keen interest in creating dynamic and responsive web applications who is trying to figure things out. My expertise lies in leveraging modern technologies to build user-friendly interfaces and seamless user experiences."
              className="text-base sm:text-lg md:text-xl lg:text-2xl"
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                I am a
              </p>
              <RotatingText
                texts={[
                  "Developer",
                  "Coder",
                  "Engineer",
                  "Programmer",
                  "Creator",
                ]}
                mainClassName="sm:px-2 md:px-3 bg-white text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
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
        </motion.div>
      </div>

      {/* Bottom Section - Quiz and Image */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end">
        {/* Fun and Interactive section */}
        <div className="flex justify-center lg:justify-start items-end order-2 lg:order-1">
          <ThisOrThat />
        </div>
        {/* Image */}
        <div className="flex justify-center lg:justify-end items-end order-1 lg:order-2">
          <img
            src="/images/we bare bears.png"
            alt="We Bare Bears"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
