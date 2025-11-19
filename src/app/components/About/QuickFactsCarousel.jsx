"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CometCard } from "@/components/ui/comet-card";

export default function QuickFactsCarousel() {
  const facts = [
    {
      id: 1,
      title: "Cuber 🧩",
      description:
        "I can solve a Rubik's Cube in under 30 seconds,I love practicing algorithms and speedsolving.",
      gradient: "from-slate-900 via-purple-800 to-slate-900",
      icon: "🧩",
    },
    {
      id: 2,
      title: "Music Lover 🎵",
      description:
        "Favorites include Billie, Chappell, Laufey and Olivia a wide mix of white girl music on repeat.",
      gradient: "from-purple-900 via-slate-900 to-purple-900",
      icon: "🎵",
    },
    {
      id: 3,
      title: "Sitcom Fan 📺",
      description:
        "Big into sitcoms like The Office, Friends, How I Met Your Mother, Brooklyn Nine-Nine, and The Big Bang Theory are all favorites.",
      gradient: "from-purple-900/50 via-slate-900 to-purple-900/50",
      icon: "📺",
    },
    {
      id: 4,
      title: "Gaming Enthusiast 🎮",
      description:
        "I love starting fresh Minecraft worlds over and over coz the early game grind never gets old!",
      gradient: "from-slate-900 via-purple-900/40 to-slate-800",
      icon: "🎮",
    },
    {
      id: 5,
      title: "Dog Person 🐕",
      description: "Dogs are just the best what else can i say!",
      gradient: "from-slate-800 via-purple-900/30 to-slate-900",
      icon: "🐕",
    },
    {
      id: 6,
      title: "Indoor Enthusiast 🏠",
      description: "Perfect weekend = gaming + coding + snacks + good music!",
      gradient: "from-purple-900 via-slate-800 to-purple-900/60",
      icon: "🏠",
    },
    {
      id: 7,
      title: "Upma Enjoyer",
      description: "I actually like upma, There I said it, sue me",
      gradient: "from-purple-800 via-slate-900 to-purple-800",
      image: "/images/upma.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % facts.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused, facts.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex(
      (currentIndex + newDirection + facts.length) % facts.length
    );
  };

  return (
    <div className="w-full py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            FUNdamental Facts
          </h2>
          <p className="text-neutral-400 text-center mb-8 sm:mb-10 lg:mb-12 text-base sm:text-lg px-4">
            <span className="hidden sm:inline">
              Swipe or tap to discover a few personal highlights 👈👉
            </span>
            <span className="sm:hidden">
              Swipe to discover personal highlights 👈👉
            </span>
          </p>

          <div className="relative h-[28rem] sm:h-[32rem] lg:h-96 flex items-center justify-center overflow-hidden px-2 sm:px-0">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="absolute w-full max-w-2xl h-[26rem] sm:h-[30rem] lg:h-80 cursor-grab active:cursor-grabbing"
              >
                <CometCard className="w-full h-full">
                  <div
                    className={`w-full h-full bg-gradient-to-br ${facts[currentIndex].gradient} rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="mb-4 sm:mb-6"
                    >
                      {facts[currentIndex].image ? (
                        <img
                          src={facts[currentIndex].image}
                          alt={facts[currentIndex].title}
                          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain"
                        />
                      ) : (
                        <span className="text-5xl sm:text-6xl lg:text-8xl">
                          {facts[currentIndex].icon}
                        </span>
                      )}
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 text-center px-4"
                    >
                      {facts[currentIndex].title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-base sm:text-lg lg:text-xl text-white/90 text-center max-w-lg px-4"
                    >
                      {facts[currentIndex].description}
                    </motion.p>
                  </div>
                </CometCard>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-2 sm:left-4 z-10 bg-purple-900/20 hover:bg-purple-900/40 backdrop-blur-sm text-white rounded-full p-2 sm:p-3 lg:p-4 transition-all duration-300 border border-purple-500/30"
              aria-label="Previous fact"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-2 sm:right-4 z-10 bg-purple-900/20 hover:bg-purple-900/40 backdrop-blur-sm text-white rounded-full p-2 sm:p-3 lg:p-4 transition-all duration-300 border border-purple-500/30"
              aria-label="Next fact"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {facts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 sm:w-8 bg-purple-500"
                    : "w-2 sm:w-3 bg-purple-500/30 hover:bg-purple-500/50"
                }`}
                aria-label={`Go to fact ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
