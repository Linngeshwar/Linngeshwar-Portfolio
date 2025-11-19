import React, { memo } from "react";
import CursorButton from "../Cursor/CursorButton";
import { useState } from "react";
import { useCursor } from "../../context/CursorContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

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
      specialQuestion: true,
    },
    { option1: "Minecraft", option2: "GTA V", correctOption: "Minecraft" },
    { option1: "Friends", option2: "The Office", correctOption: "The Office" },
    { option1: "Cat", option2: "Dog", correctOption: "Dog" },
    { option1: "Indoor", option2: "Outdoor", correctOption: "Indoor" },
    { option1: "Sure", option2: "Hell yeah", correctOption: "Hell yeah" },
    { option1: "Chocolate", option2: "Strawberry", correctOption: "Chocolate" },
    { option1: "Morning", option2: "Night", correctOption: "Night" },
    { option1: "Movies", option2: "Series", correctOption: "Series" },
    { option1: "Pizza", option2: "Burger", correctOption: "Pizza" },
    { option1: "Summer", option2: "Winter", correctOption: "Winter" },
    { option1: "Books", option2: "Audiobooks", correctOption: "Books" },
    { option1: "Android", option2: "iOS", correctOption: "Android" },
    { option1: "Mumbo", option2: "Grian", correctOption: "Grian" },
    {
      option1: "Blonde Blazer",
      option2: "Invisigal",
      correctOption: "Blonde Blazer",
    },
    { option1: "God of War", option2: "RDR2", correctOption: "RDR2" },
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
    "Am I an indoor person or an outdoor person?",
    "Is Billie an amazing artist?",
    "What is my favorite ice cream flavor?",
    "Am I a morning person or a night owl?",
    "Do I prefer movies or series?",
    "Pizza or burger?",
    "Summer or winter?",
    "Physical books or audiobooks?",
    "Android or iOS?",
    "Mumbo or Grian?",
    "Blonde Blazer or Invisigal?",
    "RDR2 or God of War?",
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [currentToastErrorMessage, setCurrentToastErrorMessage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [questionOrder, setQuestionOrder] = useState([]);
  const { setMenuHover } = useCursor();

  const personalityResults = [
    {
      score: 8,
      title: "Soul Twin",
      message: "You know me better than I know myself! Are you spying on me?",
      color: "text-gray-200",
    },
    {
      score: 7,
      title: "Best Friend Material",
      message: "We're definitely BFFs! You get me on a spiritual level!",
      color: "text-gray-300",
    },
    {
      score: 6,
      title: "Good Friend",
      message: "You know me pretty well! Let's hang out more often!",
      color: "text-gray-400",
    },
    {
      scoreRange: [4, 5],
      title: "Getting There",
      message: "Not bad! We should spend more time together!",
      color: "text-gray-400",
    },
    {
      scoreRange: [0, 3],
      title: "Stranger Alert",
      message:
        "Have we even met? Let's change that! Time to get to know each other!",
      color: "text-gray-500",
    },
  ];

  // Function to shuffle and select 8 questions (always including "Am I funny?")
  const shuffleQuestions = () => {
    const funnyQuestionIndex = 2; // "Am I funny?" is at index 2
    const otherIndices = [...Array(questions.length).keys()].filter(
      (i) => i !== funnyQuestionIndex
    );

    // Shuffle other questions and take 7 of them
    const shuffledOthers = otherIndices
      .sort(() => Math.random() - 0.5)
      .slice(0, 7);

    // Combine with "Am I funny?" and shuffle the final 8
    const finalSelection = [...shuffledOthers, funnyQuestionIndex].sort(
      () => Math.random() - 0.5
    );

    setQuestionOrder(finalSelection);
  };

  // Confetti effect for correct answers
  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  // Get personality result
  const getPersonalityResult = () => {
    const result = personalityResults.find((r) => {
      if (r.score !== undefined) return r.score === score;
      if (r.scoreRange)
        return score >= r.scoreRange[0] && score <= r.scoreRange[1];
      return false;
    });
    return result || personalityResults[personalityResults.length - 1];
  };

  // Initialize shuffled questions on mount
  React.useEffect(() => {
    shuffleQuestions();
  }, []);

  //   okay so there is no animations i want to add a lotta animations first
  //  once the user answers if the asnwer is correct the button should become
  //  green and then fall down out of the screen and if its wrong it should
  //  become red and fall down the other button shoudl also fall down and once
  //  thiis is done the new question should appear witha typing effect and the
  // button should scale up from 0 and no opacity

  // Helper to force a mousemove event to update the cursor

  const handleAnswer = (selected) => {
    const currentQuestion = questionOrder[current];
    const isAnswerCorrect = selected === options[currentQuestion].correctOption;

    setSelectedAnswer(selected);
    setIsCorrect(isAnswerCorrect);

    // Check if this is the special "Am I funny?" question
    if (options[currentQuestion].specialQuestion) {
      if (isAnswerCorrect) {
        setScore((prev) => prev + 1);
        triggerConfetti();

        setTimeout(() => {
          if (current < questionOrder.length - 1) {
            setCurrent((prev) => prev + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
          } else {
            setShowScore(true);
          }
        }, 1500);
      } else {
        // Shake screen on wrong answer
        setShakeScreen(true);
        setTimeout(() => setShakeScreen(false), 500);

        if (currentToastErrorMessage < wrongAnswerToastMessage.length) {
          setCurrentToastErrorMessage((prev) => prev + 1);
          toast.error(wrongAnswerToastMessage[currentToastErrorMessage], {
            duration: 3000,
            style: {
              background: "#1f1f1f",
              color: "#fff",
              border: "2px solid #666",
            },
          });

          // Reset for next attempt WITHOUT making buttons disappear
          setTimeout(() => {
            setSelectedAnswer(null);
            setIsCorrect(null);
          }, 500); // Shorter delay so buttons reappear quickly
        } else {
          // Finally move on after all messages
          setTimeout(() => {
            if (current < questionOrder.length - 1) {
              setCurrent((prev) => prev + 1);
              setSelectedAnswer(null);
              setIsCorrect(null);
            } else {
              setShowScore(true);
            }
          }, 1500);
        }
      }
    } else {
      // Normal question handling
      if (isAnswerCorrect) {
        setScore((prev) => prev + 1);
        triggerConfetti();
      } else {
        // Shake screen on wrong answer
        setShakeScreen(true);
        setTimeout(() => setShakeScreen(false), 500);

        toast.error("Wrong answer!", {
          duration: 2000,
          style: {
            background: "#1f1f1f",
            color: "#fff",
            border: "2px solid #666",
          },
        });
      }

      setTimeout(() => {
        if (current < questionOrder.length - 1) {
          setCurrent((prev) => prev + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
        } else {
          setShowScore(true);
        }
      }, 1500);
    }

    setMenuHover(false);
  };

  const resetQuiz = () => {
    shuffleQuestions();
    setCurrent(0);
    setScore(0);
    setShowScore(false);
    setCurrentToastErrorMessage(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setMenuHover(false);
  };

  const currentQuestion = questionOrder[current];
  const personalityResult = getPersonalityResult();
  const progressPercentage =
    questionOrder.length > 0 ? ((current + 1) / questionOrder.length) * 100 : 0;

  return (
    <motion.div
      className="flex flex-col w-full h-full"
      animate={
        shakeScreen
          ? {
              x: [0, -10, 10, -10, 10, 0],
              transition: { duration: 0.5 },
            }
          : {}
      }
    >
      <div className="flex justify-start items-center mb-4">
        <h2 className="text-3xl font-bold">How Well Do You Know Me?</h2>
      </div>

      {/* Progress Bar */}
      {!showScore && questionOrder.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Question {current + 1} of {questionOrder.length}
            </span>
            <span className="text-sm text-gray-400">
              Score: {score}/{questionOrder.length}
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className="bg-white h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col items-start justify-center">
        {showScore ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8 space-y-6"
          >
            {/* Personality Result */}
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-2xl p-8 max-w-2xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h3
                  className={`text-4xl font-bold mb-4 ${personalityResult.color}`}
                >
                  {personalityResult.title}
                </h3>
                <p className="text-xl text-gray-300 mb-6">
                  {personalityResult.message}
                </p>
                <div className="text-3xl font-bold text-white mb-2">
                  Final Score: {score} / {questionOrder.length}
                </div>
                <div className="text-lg text-gray-400">
                  Accuracy: {Math.round((score / questionOrder.length) * 100)}%
                </div>
              </motion.div>

              {/* Share Score */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600"
              >
                <p className="text-sm text-gray-400 text-center mb-2">
                  Share your result:
                </p>
                <p className="text-center text-white font-medium">
                  "I got {score}/{questionOrder.length} on Linngeshwar's quiz!{" "}
                  {personalityResult.title}"
                </p>
                <CursorButton
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `I got ${score}/${questionOrder.length} on Linngeshwar's "How Well Do You Know Me" quiz! ${personalityResult.title} 🎉`
                    );
                    toast.success("Copied to clipboard!", {
                      duration: 2000,
                      style: {
                        background: "#1f1f1f",
                        color: "#fff",
                        border: "2px solid #666",
                      },
                    });
                  }}
                  className="mt-3 w-full bg-transparent text-white border-2 border-white hover:bg-white hover:text-black"
                >
                  Copy Result
                </CursorButton>
              </motion.div>

              {/* Retry Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6"
              >
                <CursorButton
                  onClick={resetQuiz}
                  className="w-full bg-white text-black hover:bg-transparent hover:text-white border-2 border-white"
                >
                  Try Again with Different Questions
                </CursorButton>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {questionOrder.length > 0 && (
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="text-xl font-medium mb-6 mt-8">
                  <TypeWriterText
                    key={questions[currentQuestion]}
                    text={questions[currentQuestion]}
                  />
                </div>
                <div className="flex items-start justify-start space-x-5">
                  <AnimatePresence mode="wait">
                    {/* Option 1 Button */}
                    <motion.div
                      key={`option1-${current}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        selectedAnswer === options[currentQuestion].option1
                          ? {
                              scale: [1, 1.1, 1],
                              // Don't make buttons fall on special question wrong answers
                              y:
                                !options[currentQuestion].specialQuestion ||
                                isCorrect
                                  ? [0, 0, 1000]
                                  : [0, 0, 0],
                              opacity:
                                !options[currentQuestion].specialQuestion ||
                                isCorrect
                                  ? [1, 1, 0]
                                  : [1, 1, 1],
                              backgroundColor: isCorrect
                                ? "#10b981"
                                : "#ef4444",
                            }
                          : selectedAnswer &&
                            !options[currentQuestion].specialQuestion
                          ? {
                              y: [0, 1000],
                              opacity: [1, 0],
                            }
                          : {
                              scale: 1,
                              opacity: 1,
                            }
                      }
                      exit={{ y: 1000, opacity: 0 }}
                      transition={{
                        scale: { duration: 0.3 },
                        y: { duration: 0.8, delay: selectedAnswer ? 0.5 : 0 },
                        opacity: {
                          duration: 0.3,
                          delay: selectedAnswer ? 0.8 : 0,
                        },
                      }}
                    >
                      <CursorButton
                        onClick={() =>
                          handleAnswer(options[currentQuestion].option1)
                        }
                        disabled={selectedAnswer !== null}
                        className={`bg-white text-black hover:bg-transparent hover:text-white transition-colors duration-300 ${
                          selectedAnswer === options[currentQuestion].option1
                            ? isCorrect
                              ? "!bg-gray-200 !text-black"
                              : "!bg-gray-700 !text-white"
                            : ""
                        }`}
                      >
                        <span className="text-lg text-inherit">
                          {options[currentQuestion].option1}
                        </span>
                      </CursorButton>
                    </motion.div>

                    {/* Option 2 Button */}
                    <motion.div
                      key={`option2-${current}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        selectedAnswer === options[currentQuestion].option2
                          ? {
                              scale: [1, 1.1, 1],
                              // Don't make buttons fall on special question wrong answers
                              y:
                                !options[currentQuestion].specialQuestion ||
                                isCorrect
                                  ? [0, 0, 1000]
                                  : [0, 0, 0],
                              opacity:
                                !options[currentQuestion].specialQuestion ||
                                isCorrect
                                  ? [1, 1, 0]
                                  : [1, 1, 1],
                              backgroundColor: isCorrect
                                ? "#10b981"
                                : "#ef4444",
                            }
                          : selectedAnswer &&
                            !options[currentQuestion].specialQuestion
                          ? {
                              y: [0, 1000],
                              opacity: [1, 0],
                            }
                          : {
                              scale: 1,
                              opacity: 1,
                            }
                      }
                      exit={{ y: 1000, opacity: 0 }}
                      transition={{
                        scale: { duration: 0.3 },
                        y: { duration: 0.8, delay: selectedAnswer ? 0.5 : 0 },
                        opacity: {
                          duration: 0.3,
                          delay: selectedAnswer ? 0.8 : 0,
                        },
                      }}
                    >
                      <CursorButton
                        onClick={() =>
                          handleAnswer(options[currentQuestion].option2)
                        }
                        disabled={selectedAnswer !== null}
                        className={`bg-white text-black hover:bg-transparent hover:text-white transition-colors duration-300 ${
                          selectedAnswer === options[currentQuestion].option2
                            ? isCorrect
                              ? "!bg-gray-200 !text-black"
                              : "!bg-gray-700 !text-white"
                            : ""
                        }`}
                      >
                        <span className="text-lg text-inherit">
                          {options[currentQuestion].option2}
                        </span>
                      </CursorButton>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
