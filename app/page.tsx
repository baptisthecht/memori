"use client";

import { useEffect, useState } from "react";
import {words } from "@/public/data/data";
import { HelpPopover } from "@/components/HelpPopover";
import { FilterPopover } from "@/components/filter-popover";

export type selectFiltersType = {
  [key: string]: string[] | undefined; 
  Langues?: ("francais" | "hiragana" | "romaji" | "kanji")[], // Assurez-vous que cela correspond aux valeurs de "categorie 1"
  Type?: ("Verbe" | "Nom" | "Adjectif")[], // Ajoutez cette ligne
  Thèmes?: ("Action" | "Objet" | "Nature" | "Métiers" | "Animaux")[]
}

export default function Home() {
  const [randomWord, setRandomWord] = useState("");
  const [wordType, setWordType] = useState("");
  const [history, setHistory] = useState<{ word: string; type: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const [selectedFilters, setSelectedFilters] = useState<selectFiltersType>({})

  const getFilteredTranslations = () => {
    if (!randomWord) return {};
  
    const selectedWord = words.find(
      (word) => Object.values(word).includes(randomWord)
    );
    if (!selectedWord) return {};
  
    const allowedKeys = ["francais", "hiragana", "romaji", "kanji"];
    const filteredTranslations = Object.entries(selectedWord).reduce(
      (acc, [key, value]) => {
        if (key !== wordType.toLowerCase() && allowedKeys.includes(key)) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>
    );
  
    return filteredTranslations;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentIndex]);

  useEffect(() => generateRandomWord(), [selectedFilters])

  const generateRandomWord = () => {
    
    const filteredWords = words.filter(word => {
      // Vérification du filtre "Thèmes"
      if (selectedFilters.Thèmes && selectedFilters.Thèmes.length > 0) {
        if (!selectedFilters.Thèmes.includes(word["categorie 2"] as "Action" | "Objet" | "Nature" | "Métiers" | "Animaux")) {
          return false;
        }
      }
      // Vérification du filtre "Type"
      if (selectedFilters.Type && selectedFilters.Type.length > 0) {
        if (!selectedFilters.Type.includes(word["categorie 1"] as "Verbe" | "Nom" | "Adjectif")) {
          return false;
        }
      }
      return true;
    });

    if (filteredWords.length === 0) {
      setRandomWord("🦍"); // Assurez-vous que cette ligne est bien modifiée
      setWordType("");
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    const selectedWord = filteredWords[randomIndex];
    
    let properties: (keyof typeof selectedWord)[];

    if (selectedFilters.Langues && selectedFilters.Langues.length > 0) {
      properties = selectedFilters.Langues;
    } else {
      properties = ["francais", "hiragana", "romaji", "kanji"];
    }

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

  // const getTranslations = () => {
  //   if (!randomWord) return "";
  //   const selectedWord = words.find(
  //     (word) => Object.values(word).includes(randomWord)
  //   );
  //   if (!selectedWord) return "";

  //   const translations = Object.entries(selectedWord)
  //     .filter(([key]) => key !== wordType.toLowerCase() && ["francais", "hiragana", "romaji", "kanji"].includes(key))
  //     .map(([key, value]) => `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}</strong>: ${value}`)
  //     .join("<br><div style='margin-top: 4px;'></div>");

  //   return translations;
  // };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="div_quiz w-[704px] h-[380px] rounded-[16px] bg-[var(--surface-primary)] p-8 flex flex-col justify-between">
        {randomWord && (
          <div className="header_quiz w-full flex flex-row justify-between items-center p-auto">
            <FilterPopover selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
            <div className="text-lg font-semibold">
              {randomWord === "🦍" ? "Aucun mot trouvé" : wordType}
            </div>
            <div
              className="div_reponse w-8 h-8 bg-[var(--surface-secondary)] cursor-pointer rounded-[6px] flex items-center justify-center hover:bg-[var(--surface-secondary-hover)] group relative"
            >
              <HelpPopover translations={getFilteredTranslations()} />
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