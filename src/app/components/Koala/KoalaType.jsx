"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import CursorButton from "../Cursor/CursorButton";
import { useCursor } from "../../context/CursorContext";

export default function KoalaType() {
  const { setMenuHover } = useCursor();
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [errors, setErrors] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  const difficulties = {
    easy: {
      name: "Easy",
      description: "Simple words, no punctuation",
      endpoint: "https://random-word-api.herokuapp.com/word?number=30",
    },
    moderate: {
      name: "Moderate",
      description: "Mixed complexity with punctuation",
      endpoint: "https://random-word-api.herokuapp.com/word?number=25",
    },
    hard: {
      name: "Hard",
      description: "Complex words with punctuation",
      endpoint: "https://random-word-api.herokuapp.com/word?number=20",
    },
  };

  const processWords = (rawWords, difficulty) => {
    let processedWords = rawWords.map((word) => word.toLowerCase());

    if (difficulty === "moderate") {
      processedWords = processedWords.map((word, index) => {
        // Add punctuation randomly
        if (Math.random() < 0.3) {
          const punctuation = [",", ".", "!", "?"];
          word += punctuation[Math.floor(Math.random() * punctuation.length)];
        }
        // Capitalize some words
        if (Math.random() < 0.2) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      });
    } else if (difficulty === "hard") {
      processedWords = processedWords.map((word, index) => {
        // Add more complex punctuation
        if (Math.random() < 0.4) {
          const punctuation = [",", ".", "!", "?", ";", ":", '"'];
          word += punctuation[Math.floor(Math.random() * punctuation.length)];
        }
        // Capitalize more words
        if (Math.random() < 0.4) {
          word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      });
    }

    return processedWords;
  };

  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await fetch(difficulties[difficulty].endpoint);
      const data = await response.json();
      const processedWords = processWords(data, difficulty);
      setWords(processedWords);
      resetGame();
    } catch (error) {
      console.error("Error fetching words:", error);
      // Fallback words
      const fallbackWords = [
        "the",
        "quick",
        "brown",
        "fox",
        "jumps",
        "over",
        "lazy",
        "dog",
        "pack",
        "my",
        "box",
        "with",
        "five",
        "dozen",
        "liquor",
        "jugs",
      ];
      setWords(processWords(fallbackWords, difficulty));
      resetGame();
    }
    setLoading(false);
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setTypedText("");
    setErrors([]);
    setGameStarted(false);
    setGameEnded(false);
    setStartTime(null);
    setTimeElapsed(0);
    setWpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setTotalChars(0);

    // Focus the textarea when game resets
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const calculateWPM = useCallback(() => {
    if (timeElapsed > 0) {
      const minutes = timeElapsed / 60;
      const wordsTyped = Math.floor(correctChars / 5);
      return Math.round(wordsTyped / minutes);
    }
    return 0;
  }, [correctChars, timeElapsed]);

  const calculateAccuracy = useCallback(() => {
    if (totalChars === 0) return 100;
    return Math.round((correctChars / totalChars) * 100);
  }, [correctChars, totalChars]);

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      const interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameEnded]);

  useEffect(() => {
    setWpm(calculateWPM());
    setAccuracy(calculateAccuracy());
  }, [calculateWPM, calculateAccuracy]);

  const handleInputChange = useCallback(
    (e) => {
      if (gameEnded || words.length === 0) return;

      if (!gameStarted) {
        setGameStarted(true);
        setStartTime(Date.now());
      }

      const inputValue = e.target.value;
      const lastChar = inputValue[inputValue.length - 1];

      // Clear the textarea to just handle one character at a time
      if (textareaRef.current) {
        textareaRef.current.value = "";
      }

      const currentWord = words[currentWordIndex];
      const expectedChar = currentWord ? currentWord[currentCharIndex] : "";

      if (lastChar === " ") {
        // Only allow space if we've completed the current word
        if (currentCharIndex === currentWord.length) {
          // Space is counted as a correct character when used correctly
          setTotalChars((prev) => prev + 1);
          setCorrectChars((prev) => prev + 1);

          // Move to next word
          if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex((prev) => prev + 1);
            setCurrentCharIndex(0);
          } else {
            // Game completed
            setGameEnded(true);
          }
        }
        // If word is not complete, ignore the space (don't skip the word)
        return;
      }

      if (!lastChar && inputValue.length === 0) {
        // Backspace was pressed (textarea is now empty)
        if (currentCharIndex > 0) {
          setCurrentCharIndex((prev) => prev - 1);

          // Remove the last error status
          setErrors((prev) => {
            const newErrors = [...prev];
            newErrors.pop();
            return newErrors;
          });

          // Update typed text
          setTypedText((prev) => prev.slice(0, -1));

          if (totalChars > 0) {
            setTotalChars((prev) => prev - 1);

            // Check if we're removing a correct character
            const errorIndex = errors.length - 1;
            if (errorIndex >= 0 && !errors[errorIndex]) {
              setCorrectChars((prev) => prev - 1);
            }
          }
        }
        return;
      }

      // Handle regular character input
      if (lastChar && lastChar.length === 1) {
        // Only allow typing if we haven't reached the end of the word
        if (currentCharIndex < currentWord.length) {
          const isCorrect = lastChar === expectedChar;

          // Update error tracking
          setErrors((prev) => [...prev, !isCorrect]);

          // Update typed text
          setTypedText((prev) => prev + lastChar);

          // Update metrics
          setTotalChars((prev) => prev + 1);
          if (isCorrect) {
            setCorrectChars((prev) => prev + 1);
          }

          // Move to next character
          setCurrentCharIndex((prev) => prev + 1);
        }
      }
    },
    [
      gameStarted,
      gameEnded,
      words,
      currentWordIndex,
      currentCharIndex,
      totalChars,
      errors,
      typedText,
    ]
  );

  // Keep the backup keyboard event handler for better compatibility
  const handleKeyPress = useCallback(
    (e) => {
      if (gameEnded || words.length === 0) return;

      // For backspace key handling (easier to detect with keydown)
      if (e.key === "Backspace") {
        e.preventDefault();

        if (currentCharIndex > 0) {
          setCurrentCharIndex((prev) => prev - 1);

          // Remove the last error status
          setErrors((prev) => {
            const newErrors = [...prev];
            newErrors.pop();
            return newErrors;
          });

          // Update typed text
          setTypedText((prev) => prev.slice(0, -1));

          if (totalChars > 0) {
            setTotalChars((prev) => prev - 1);

            // Check if we're removing a correct character
            const errorIndex = errors.length - 1;
            if (errorIndex >= 0 && !errors[errorIndex]) {
              setCorrectChars((prev) => prev - 1);
            }
          }
        }
      } else if (e.key === " ") {
        // Handle space key directly
        e.preventDefault();

        const currentWord = words[currentWordIndex];

        if (currentCharIndex === currentWord?.length) {
          // Only allow space if we've completed the current word
          // Space is counted as a correct character when used correctly
          setTotalChars((prev) => prev + 1);
          setCorrectChars((prev) => prev + 1);

          // Move to next word
          if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex((prev) => prev + 1);
            setCurrentCharIndex(0);
          } else {
            // Game completed
            setGameEnded(true);
          }
        }
      }

      // Ensure textarea stays focused
      if (
        textareaRef.current &&
        document.activeElement !== textareaRef.current
      ) {
        textareaRef.current.focus();
      }
    },
    [gameEnded, words, currentCharIndex, errors, totalChars, currentWordIndex]
  );

  useEffect(() => {
    if (!isInView) return;

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [words, isInView]);

  // Focus textarea when game starts or resets
  useEffect(() => {
    if (!isInView) return;

    if (containerRef.current) {
      containerRef.current.focus();
    }

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [words, isInView]);

  // Set up key and input event handlers
  useEffect(() => {
    if (!isInView) return;

    const handleKeyDown = (e) => handleKeyPress(e);
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress, isInView]);

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        // Blur textarea when not in view to prevent focus stealing
        if (!entry.isIntersecting && textareaRef.current) {
          textareaRef.current.blur();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    fetchWords();
  }, [difficulty]);

  const getCharacterStyle = (wordIndex, charIndex) => {
    // Calculate absolute character index across all words
    let totalCharsBefore = 0;
    for (let i = 0; i < wordIndex; i++) {
      totalCharsBefore += words[i].length;
    }
    const absoluteCharIndex = totalCharsBefore + charIndex;
    const errorIndex = absoluteCharIndex;

    // If word is completed or character is typed
    if (
      wordIndex < currentWordIndex ||
      (wordIndex === currentWordIndex && charIndex < currentCharIndex)
    ) {
      // Character has been typed
      const errorsMade = errors[errorIndex];

      if (errorsMade) {
        // Incorrect character - RED
        return "text-red-500 bg-red-500/20";
      } else {
        // Correct character - GREEN
        return "text-green-500";
      }
    }

    // Current position (cursor)
    if (wordIndex === currentWordIndex && charIndex === currentCharIndex) {
      return "text-white border-b-2 border-white animate-pulse";
    }

    // Characters in current word not yet typed
    if (wordIndex === currentWordIndex) {
      return "text-gray-500";
    }

    // Future words
    return "text-gray-700";
  };

  // Calculate total characters in all words (including spaces between words)
  const totalCharactersInText = useMemo(() => {
    if (words.length === 0) return 0;
    // Add the length of each word + 1 for space after each word (except the last word)
    return words.reduce(
      (sum, word, index) =>
        sum + word.length + (index < words.length - 1 ? 1 : 0),
      0
    );
  }, [words]);

  // Calculate how many characters have been typed so far
  const charactersTypedSoFar = useMemo(() => {
    if (words.length === 0) return 0;

    // Count all characters in completed words (including spaces after them)
    let count = 0;
    for (let i = 0; i < currentWordIndex; i++) {
      count += words[i].length + 1; // +1 for the space after the word
    }

    // Add characters typed in the current word
    count += currentCharIndex;

    return count;
  }, [words, currentWordIndex, currentCharIndex]);

  // Calculate progress as percentage of total characters
  const progress =
    totalCharactersInText > 0
      ? (charactersTypedSoFar / totalCharactersInText) * 100
      : 0;

  return (
    <div
      id="koala"
      className="min-h-screen flex flex-col items-center justify-center p-8 z-10 bg-gradient-to-tl from-[hsl(0,0%,0%)] via-[hsl(210,100%,9%)] to-[hsla(0, 0%, 10%)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-6xl font-bold mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animate each character like in About.jsx */}
            {Array.from("KoalaType").map((char, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <p className="text-gray-400 text-lg">
            Test your typing speed and accuracy
          </p>
        </div>

        {/* Difficulty Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex border border-white/20 rounded-lg p-1 gap-1">
            {Object.entries(difficulties).map(([key, diff]) => (
              <CursorButton
                key={key}
                onClick={() => {
                  setDifficulty(key);
                  setMenuHover(false);
                }}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  difficulty === key
                    ? "bg-white text-black shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
                disabled={loading}
              >
                {diff.name}
              </CursorButton>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-center items-center gap-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{wpm}</div>
            <div className="text-sm text-gray-400">WPM</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{accuracy}%</div>
            <div className="text-sm text-gray-400">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{timeElapsed}s</div>
            <div className="text-sm text-gray-400">Time</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-8">
          <motion.div
            className="bg-white h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Game Container */}
        <motion.div
          ref={containerRef}
          tabIndex={0}
          className="backdrop-blur-sm border border-white/20 rounded-xl p-8 min-h-[200px] w-full max-w-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/30"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span className="ml-3 text-gray-400">Loading words...</span>
            </div>
          ) : words.length > 0 ? (
            <div className="text-2xl leading-relaxed font-mono max-w-full break-words flex flex-wrap">
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="mr-3 mb-2 inline-block">
                  {word.split("").map((char, charIndex) => (
                    <span
                      key={`${wordIndex}-${charIndex}`}
                      className={`${getCharacterStyle(
                        wordIndex,
                        charIndex
                      )} transition-colors duration-150`}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              Click "New Game" to start
            </div>
          )}
        </motion.div>

        {/* Game Controls */}
        <div className="flex justify-center mt-8 gap-4">
          <CursorButton
            onClick={() => {
              fetchWords();
              setMenuHover(false);
            }}
            disabled={loading}
            className="bg-white text-black hover:bg-transparent hover:text-white disabled:opacity-50 disabled:hover:bg-white/50 disabled:hover:text-black/50"
          >
            <span className="text-lg text-inherit">
              {loading ? "Loading..." : "New Game"}
            </span>
          </CursorButton>

          {gameStarted && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <CursorButton
                onClick={() => {
                  resetGame();
                  setMenuHover(false);
                }}
                className="bg-white text-black hover:bg-transparent hover:text-white"
              >
                <span className="text-lg text-inherit">Reset</span>
              </CursorButton>
            </motion.div>
          )}
        </div>

        {/* Game Over Modal */}
        {gameEnded && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="border border-white/20 rounded-xl p-8 text-center max-w-md w-full mx-4"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-white">
                Game Complete!
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Final WPM:</span>
                  <span className="text-white font-bold">{wpm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Accuracy:</span>
                  <span className="text-white font-bold">{accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white font-bold">{timeElapsed}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Difficulty:</span>
                  <span className="text-white font-bold">
                    {difficulties[difficulty].name}
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <CursorButton
                  onClick={() => {
                    fetchWords();
                    setMenuHover(false);
                  }}
                  className="bg-white text-black hover:bg-transparent hover:text-white"
                >
                  <span className="text-lg text-inherit">Play Again</span>
                </CursorButton>
                <CursorButton
                  onClick={() => {
                    setGameEnded(false);
                    setMenuHover(false);
                  }}
                  className="bg-white text-black hover:bg-transparent hover:text-white"
                >
                  <span className="text-lg text-inherit">Close</span>
                </CursorButton>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Instructions */}

        {/* Hidden textarea for capturing input */}
        <textarea
          ref={textareaRef}
          onChange={handleInputChange}
          className="absolute opacity-0 h-1 w-1 -z-10"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </motion.div>
    </div>
  );
}
