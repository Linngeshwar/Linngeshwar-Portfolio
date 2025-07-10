import React, { memo } from "react";
import CursorButton from "./CursorButton";
import { useState } from "react";
import { useCursor } from "../context/CursorContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const TypeWriterText = memo(function TypeWriterText({ text, speed = 50 }) {
  return (
    <span className="text-2xl text-inherit">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (index * speed) / 1000, duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
});

export default function ThisOrThat() {
  const options = [
    { option1: "Biriyani", option2: "Parotta", correctOption: "Biriyani" },
    { option1: "Paris", option2: "Venice", correctOption: "Venice" },
    {
      option1: "Definitely Yes",
      option2: "No",
      correctOption: "Definitely Yes",
    },
    { option1: "Minecraft", option2: "Sekiro", correctOption: "Minecraft" },
    { option1: "Friends", option2: "The Office", correctOption: "The Office" },
    { option1: "Cat", option2: "Dog", correctOption: "Dog" },
    { option1: "Indoor", option2: "Outdoor", correctOption: "Indoor" },
    { option1: "sure", option2: "Hell yeah", correctOption: "Hell yeah" },
  ];

  const wrongAnswerToastMessage = [
    "Wrong answer! Try again.",
    "Incorrect! Give it another shot.",
    "What part of the question did you not understand?",
    "omg are you stupid?",
    "There is no way you're serious right now.",
    "Are you even trying?",
    "There is only 2 options, how do even get it wrong this many times?",
    "YOU'RE SO STUPID",
    "F you, you're not funny",
    "I can't even",
    "Why are you like this?",
    "Seriously, how do you mess up this bad?",
    "God i wish i was near you so i could slap you",
    "If i was you i would have killed myself in minecraft",
    "YOU CAN NOT BE FR RN",
    "No no no no nono oononononononononononononononono",
    "Noooooooooooooooooooooooooooo",
    "this just isn't happening",
    "why meee",
    "stop it please",
    "i can't take this anymore",
    "i'm begging you",
    "i'm literally begging you",
    "i'm on my knees",
    "i'm literally on my knees",
    "i'm crying",
    "i'm literally crying",
    "i'm literally crying rn",
    "i'm literally crying rn, please stop",
    "i'm literally crying rn, please stop, i can't take this anymore",
    "I can't handle this",
    "I can't even",
    "I can't --",
    "--even speak",
    "*sobs uncontrollably*",
    "fine",
    "i give up",
    "I'm not funny",
    "I know I'm not funny",
    "I know I'm not funny, but you don't have to be mean about it",
    "you win",
  ];

  const questions = [
    "What is my favorite food?",
    "What is my favorite tourist destination?",
    "Am I funny?",
    "What is my favorite game?",
    "What is my go-to sitcom?",
    "Am I a cat person or a dog person?",
    "Am I a indoor person or an outdoor person?",
    "Is laufey an amazing artist?",
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [currentToastErrorMessage, setCurrentToastErrorMessage] = useState(0);
  const { setMenuHover } = useCursor();

  //   okay so there is no animations i want to add a lotta animations first
  //  once the user answers if the asnwer is correct the button should become
  //  green and then fall down out of the screen and if its wrong it should
  //  become red and fall down the other button shoudl also fall down and once
  //  thiis is done the new question should appear witha typing effect and the
  // button should scale up from 0 and no opacity

  // Helper to force a mousemove event to update the cursor

  const handleAnswer = (selected) => {
    if (current === 2) {
      if (selected === options[current].correctOption) {
        setScore((prev) => prev + 1);
        if (current < questions.length - 1) {
          setCurrent((prev) => prev + 1);
        } else {
          setShowScore(true);
        }
        setMenuHover(false);
      } else {
        if (currentToastErrorMessage < wrongAnswerToastMessage.length) {
          setCurrentToastErrorMessage((prev) => prev + 1);
          toast.error(wrongAnswerToastMessage[currentToastErrorMessage]);
        } else {
          setCurrent((prev) => prev + 1);
          setMenuHover(false);
        }
      }
    } else {
      if (selected === options[current].correctOption) {
        setScore((prev) => prev + 1);
      }
      if (current < questions.length - 1) {
        setCurrent((prev) => prev + 1);
      } else {
        setShowScore(true);
      }
      setMenuHover(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full ">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-start items-center ml-18">
        <h2 className="text-3xl font-bold">How Well Do You Know Me?</h2>
      </div>
      <div className="flex flex-col items-start justify-center ml-18">
        {showScore ? (
          <div className="text-2xl font-semibold mt-8">
            Your score: {score} / {questions.length}
          </div>
        ) : (
          <>
            <div className="text-xl font-medium mb-6 mt-8">
              <TypeWriterText
                key={questions[current]}
                text={questions[current]}
              />
            </div>
            <div className="flex items-start justify-start space-x-5">
              <CursorButton
                onClick={() => handleAnswer(options[current].option1)}
              >
                <span className="text-lg text-inherit">
                  {options[current].option1}
                </span>
              </CursorButton>

              <CursorButton
                onClick={() => handleAnswer(options[current].option2)}
              >
                <span className="text-lg text-inherit">
                  {options[current].option2}
                </span>
              </CursorButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
