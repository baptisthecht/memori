"use client";

import { useEffect, useState } from "react";
import data from "@/public/data/data.json";

export default function Home() {
  const [randomWord, setRandomWord] = useState("");
  const [wordType, setWordType] = useState("");
  const [history, setHistory] = useState<{ word: string; type: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    generateRandomWord();
  }, []);

  const generateRandomWord = () => {
    const words = data.words;
    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex];
    const properties: (keyof typeof selectedWord)[] = ["francais", "hiragana", "romaji", "kanji"];
    const randomProperty = properties[Math.floor(Math.random() * properties.length)];
    const newWord = selectedWord[randomProperty];
    const newWordType = randomProperty.charAt(0).toUpperCase() + randomProperty.slice(1);

    const updatedHistory = [...history.slice(0, currentIndex + 1), { word: newWord, type: newWordType }];
    setHistory(updatedHistory);
    setCurrentIndex(updatedHistory.length - 1);
    setRandomWord(newWord);
    setWordType(newWordType);
  };

  const handleNextWord = () => {
    if (currentIndex === history.length - 1) {
      generateRandomWord();
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setRandomWord(history[nextIndex].word);
      setWordType(history[nextIndex].type);
    }
  };

  const handlePreviousWord = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setRandomWord(history[prevIndex].word);
      setWordType(history[prevIndex].type);
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="div_quiz w-[704px] h-[380px] rounded-[16px] bg-[var(--surface-primary)] p-8 flex flex-col justify-between">
        {randomWord && (
          <div className="text-center text-lg font-semibold">{wordType}</div>
        )}
        {randomWord && (
          <div className="text-center text-[48px] font-bold self-center">{randomWord}</div>
        )}
        <div className="div_boutons flex flex-row gap-6 w-full">
          <button
            onClick={handlePreviousWord}
            className={`h-9 rounded-lg w-full ${currentIndex <= 0 ? 'bg-[var(--surface-secondary)] text-[var(--text-primary)] opacity-50 cursor-not-allowed' : 'bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary-hover)]'}`}
            disabled={currentIndex <= 0}
          >
            Mot précédent
          </button>
          <button
            onClick={handleNextWord}
            className="h-9 rounded-lg bg-[var(--surface-brand)] w-full text-white hover:bg-[var(--surface-brand-hover)]"
          >
            Mot suivant
          </button>
        </div>
      </div>
    </div>
  );
}