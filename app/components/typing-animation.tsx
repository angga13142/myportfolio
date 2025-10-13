"use client";

import { useEffect, useState } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
}

export function TypingAnimation({
  text,
  speed = 50,
  delay = 500,
  className = "",
  cursorClassName = "",
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);

  // Start typing after delay
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  // Typing effect
  useEffect(() => {
    if (!started) return;
    
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, started]);

  // Cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span className={className}>
      {displayedText}
      <span
        className={`inline-block ${cursorClassName} ${
          showCursor ? "opacity-100" : "opacity-0"
        } transition-opacity duration-100`}
        style={{
          width: "2px",
          height: "1em",
          backgroundColor: "currentColor",
          marginLeft: "2px",
          verticalAlign: "middle",
        }}
      />
    </span>
  );
}

interface MatrixTypingProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export function MatrixTyping({
  text,
  speed = 40,
  delay = 1000,
  className = "",
}: MatrixTypingProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [glitchChars, setGlitchChars] = useState<number[]>([]);

  const matrixChars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01";

  // Start typing after delay
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  // Matrix glitch effect
  useEffect(() => {
    if (!started || currentIndex >= text.length) return;

    const glitchTimer = setInterval(() => {
      const randomIndices: number[] = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * Math.min(currentIndex + 5, text.length));
        randomIndices.push(randomIndex);
      }
      setGlitchChars(randomIndices);
    }, 100);

    return () => clearInterval(glitchTimer);
  }, [currentIndex, text.length, started]);

  // Typing effect
  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      // Clear glitch after typing is done
      const clearTimer = setTimeout(() => {
        setGlitchChars([]);
      }, 500);
      return () => clearTimeout(clearTimer);
    }
  }, [currentIndex, text, speed, started]);

  const renderText = () => {
    return displayedText.split("").map((char, index) => {
      const isGlitching = glitchChars.includes(index);
      const displayChar = isGlitching
        ? matrixChars[Math.floor(Math.random() * matrixChars.length)]
        : char;

      return (
        <span
          key={index}
          className={`inline-block transition-all duration-100 ${
            isGlitching ? "text-green-400 animate-pulse" : ""
          }`}
        >
          {displayChar}
        </span>
      );
    });
  };

  return (
    <span className={className}>
      {renderText()}
      {currentIndex < text.length && (
        <span
          className="inline-block animate-pulse ml-0.5"
          style={{
            width: "2px",
            height: "1em",
            backgroundColor: "currentColor",
            verticalAlign: "middle",
          }}
        />
      )}
    </span>
  );
}
