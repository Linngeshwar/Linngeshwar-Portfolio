import { CometCard } from "@/components/ui/comet-card";
import React from "react";

export default function FunFactsFlip() {
  const funFacts = [
    { icon: "🎲", text: "I can solve a Rubik's Cube in under 30 seconds." },
    { icon: "🐕", text: "I had a pet dog named Azhagi." },
    { icon: "⛏️", text: "I have over 500 hours in Minecraft." },
    { icon: "🍫", text: "I make amazing brownies." },
    { icon: "🌍", text: "I am a leftist." },
    { icon: "💻", text: "I started coding when I was 15." },
  ];

  return (
    <div className="w-full py-12">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        Fun Facts About Me
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {funFacts.map((fact, index) => (
          <CometCard key={index} className="w-full">
            <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6 rounded-2xl h-full min-h-[180px] flex flex-col items-center justify-center text-center border border-purple-500/20">
              <div className="text-5xl mb-4">{fact.icon}</div>
              <p className="text-white text-lg font-medium">{fact.text}</p>
            </div>
          </CometCard>
        ))}
      </div>
    </div>
  );
}
