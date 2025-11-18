"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function QuickFactsCarousel() {
  const facts = [
    {
      id: 1,
      title: "Coffee Addict ☕",
      description: "I've had 6 cups of coffee in a single coding session!",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      icon: "☕",
    },
    {
      id: 2,
      title: "Music Lover 🎵",
      description: "Laufey's 'From The Start' has played 500+ times!",
      gradient: "from-pink-500 via-rose-500 to-purple-500",
      icon: "🎵",
    },
    {
      id: 3,
      title: "Gaming Enthusiast 🎮",
      description: "Built a university replica in Minecraft in one sitting!",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      icon: "🎮",
    },
    {
      id: 4,
      title: "The Office Fan 📺",
      description: "Watched it 4 times, can quote almost every episode!",
      gradient: "from-blue-500 via-cyan-500 to-sky-500",
      icon: "📺",
    },
    {
      id: 5,
      title: "Dog Person 🐕",
      description: "Every programmer needs a debugging duck... or dog!",
      gradient: "from-yellow-500 via-amber-500 to-orange-500",
      icon: "🐕",
    },
    {
      id: 6,
      title: "Indoor Enthusiast 🏠",
      description: "Perfect weekend = coding + snacks + good music!",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      icon: "🏠",
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
    <div className="w-full py-20 px-8 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Quick Facts Carousel
          </h2>
          <p className="text-neutral-400 text-center mb-12 text-lg">
            Swipe or click to explore! 👈👉
          </p>

          <div className="relative h-96 flex items-center justify-center overflow-hidden">
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
                className={`absolute w-full max-w-2xl h-80 bg-gradient-to-br ${facts[currentIndex].gradient} rounded-3xl shadow-2xl border-2 border-white/20 p-8 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-8xl mb-6"
                >
                  {facts[currentIndex].icon}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-white mb-4 text-center"
                >
                  {facts[currentIndex].title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-white/90 text-center max-w-lg"
                >
                  {facts[currentIndex].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-4 transition-all duration-300 border border-white/20"
            >
              <svg
                className="w-6 h-6"
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
              className="absolute right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-4 transition-all duration-300 border border-white/20"
            >
              <svg
                className="w-6 h-6"
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
          <div className="flex justify-center gap-2 mt-8">
            {facts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "w-3 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
