"use client";

import { useEffect, useState } from "react";
import data from "@/public/data/data.json";
import Image from "next/image";
import { Tooltip } from "@/components/ui/tooltip";

export default function Home() {
  const [randomWord, setRandomWord] = useState("");
  const [wordType, setWordType] = useState("");
  const [history, setHistory] = useState<{ word: string; type: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  useEffect(() => {
    generateRandomWord();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsTooltipVisible(true);
      } else if (event.key === " ") {
        event.preventDefault();
        handleNextWord();
      } else if (event.key === "ArrowRight") {
        handleNextWord();
      } else if (event.key === "ArrowLeft") {
        handlePreviousWord();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsTooltipVisible(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentIndex]);

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

  const getTranslations = () => {
    if (!randomWord) return "";
    const selectedWord = data.words.find(
      (word) => Object.values(word).includes(randomWord)
    );
    if (!selectedWord) return "";

    const translations = Object.entries(selectedWord)
      .filter(([key]) => key !== wordType.toLowerCase() && ["francais", "hiragana", "romaji", "kanji"].includes(key))
      .map(([key, value]) => `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}</strong>: ${value}`)
      .join("<br><div style='margin-top: 4px;'></div>");

    return translations;
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="div_quiz w-[704px] h-[380px] rounded-[16px] bg-[var(--surface-primary)] p-8 flex flex-col justify-between">
        {randomWord && (
          <div className="header_quiz w-full flex flex-row justify-between items-center p-auto">
            <div className="div_filtre w-6 h-6 bg-[var(--surface-secondary)] rounded-[6px] flex items-center justify-center hover:bg-[var(--surface-secondary-hover)] group">
              <Image src="/filtre.svg" alt="Filtrer" width={12} height={12} />
            </div>
            <div className="text-lg font-semibold">{wordType}</div>
            <div
              className="div_reponse w-6 h-6 bg-[var(--surface-secondary)] rounded-[6px] flex items-center justify-center hover:bg-[var(--surface-secondary-hover)] group relative"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              <Image src="/reponse.svg" alt="Aide" width={12} height={12} className="group-hover:text-[var(--icones-brand)]" />
              {isTooltipVisible && (
                <div className="absolute top-full mt-2 bg-[var(--surface-secondary)] text-[var(--text-white)] p-4 rounded opacity-100 transition-opacity w-auto" style={{ padding: '16px', whiteSpace: 'nowrap' }} dangerouslySetInnerHTML={{ __html: getTranslations() }} />
              )}
            </div>
          </div>
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