"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function MatchingGame() {
  const pairs = [
    { id: 1, question: "Favorite Food", answer: "Biriyani", emoji: "🍛" },
    { id: 2, question: "Dream City", answer: "Venice", emoji: "🏛️" },
    { id: 3, question: "Favorite Game", answer: "Minecraft", emoji: "🎮" },
    { id: 4, question: "Favorite Show", answer: "The Office", emoji: "📺" },
    { id: 5, question: "Pet Preference", answer: "Dog", emoji: "🐕" },
    { id: 6, question: "Lifestyle", answer: "Indoor", emoji: "🏠" },
  ];

  const createCards = () => {
    const cards = [];
    pairs.forEach((pair) => {
      cards.push({ ...pair, type: "question", pairId: pair.id });
      cards.push({ ...pair, type: "answer", pairId: pair.id });
    });
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState(createCards());
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].pairId === cards[second].pairId) {
        setMatched([...matched, cards[first].pairId]);
        setFlipped([]);
        if (matched.length + 1 === pairs.length) {
          setTimeout(() => setIsWon(true), 500);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
      setMoves(moves + 1);
    }
  }, [flipped]);

  const handleCardClick = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(cards[index].pairId)
    ) {
      return;
    }
    setFlipped([...flipped, index]);
  };

  const resetGame = () => {
    setCards(createCards());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsWon(false);
  };

  return (
    <div className="w-full min-h-screen py-20 px-8 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Match My Preferences!
          </h2>
          <p className="text-neutral-400 text-center mb-8 text-lg">
            Match the questions with the correct answers to learn more about me!
            🎯
          </p>

          <div className="text-center mb-8">
            <p className="text-white text-xl">Moves: {moves}</p>
            {isWon && (
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-400 text-2xl font-bold mt-2"
              >
                🎉 You Won! Great job!
              </motion.p>
            )}
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-8">
            {cards.map((card, index) => (
              <MemoryCard
                key={index}
                card={card}
                index={index}
                isFlipped={
                  flipped.includes(index) || matched.includes(card.pairId)
                }
                isMatched={matched.includes(card.pairId)}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>

          <div className="text-center">
            <motion.button
              onClick={resetGame}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset Game
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function MemoryCard({ card, index, isFlipped, isMatched, onClick }) {
  return (
    <motion.div
      className="h-32 perspective-1000 cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: isFlipped ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Back of Card (Hidden) */}
        <div
          className="absolute w-full h-full rounded-xl bg-gradient-to-br from-neutral-700 to-neutral-800 border-2 border-neutral-600 flex items-center justify-center shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-4xl">❓</div>
        </div>

        {/* Front of Card (Content) */}
        <div
          className={`absolute w-full h-full rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-lg border-2 ${
            isMatched
              ? "bg-gradient-to-br from-green-500 to-emerald-600 border-green-400"
              : "bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400"
          }`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-3xl mb-1">{card.emoji}</div>
          <p className="text-white text-xs font-semibold">
            {card.type === "question" ? card.question : card.answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
