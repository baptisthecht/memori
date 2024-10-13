"use client";

import { useEffect, useState } from "react";
import { words } from "@/public/data/data";
import { HelpPopover } from "@/components/HelpPopover";
import { FilterPopover } from "@/components/filter-popover";

export type selectFiltersType = {
  [key: string]: string[] | undefined;
  Langues?: ("francais" | "hiragana" | "romaji" | "kanji")[],
  Type?: ("Verbe" | "Nom" | "Adjectif" | "Heures" | "Expression" | "Adverbe" | "Particule" | "Pronom")[], // Ajout des nouvelles catégories
  Thèmes?: ("Action" | "Objet" | "Nature" | "Métiers" | "Animaux" | "Salutations" | "Temps" | "Vêtement" | "Lieu" | "Personne" | "Question" | "Direction" | "Nourriture")[] // Ajout des nouvelles catégories
}

// Fonction pour générer une heure aléatoire
const generateRandomTime = (): string => {
  const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Fonction pour générer un horaire aléatoire avec formatage
const generateRandomSchedule = (): string => {
  const startHours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const startMinutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  const endHours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const endMinutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  return `<span style="font-weight: normal;">de</span> ${startHours}:${startMinutes} <span style="font-weight: normal;">à</span> ${endHours}:${endMinutes}`;
};

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
          acc[key] = String(value); // Conversion de la valeur en chaîne
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
    // Vérifier si le filtre "Heures" est le seul actif
    const isOnlyHeuresSelected = selectedFilters.Type?.length === 1 && selectedFilters.Type.includes("Heures");

    let pool = [];

    if (isOnlyHeuresSelected) {
      // Générer des heures simples et des horaires
      const randomTimes = Array.from({ length: 5 }, () => ({
        word: generateRandomTime(),
        type: "Heures"
      }));

      const randomSchedules = Array.from({ length: 5 }, () => ({
        word: generateRandomSchedule(),
        type: "Heures"
      }));

      pool = [...randomTimes, ...randomSchedules];
    } else {
      // Filtrer les mots selon les autres critères
      const filteredWords = words.filter(word => {
        // Vérification du filtre "Thèmes"
        if (selectedFilters.Thèmes && selectedFilters.Thèmes.length > 0) {
          if (!selectedFilters.Thèmes.includes(word["categorie2"] as "Action" | "Objet" | "Nature" | "Métiers" | "Animaux" | "Salutations" | "Temps" | "Vêtement" | "Lieu" | "Personne" | "Question" | "Direction" | "Nourriture")) {
            return false;
          }
        }
        // Vérification du filtre "Type"
        if (selectedFilters.Type && selectedFilters.Type.length > 0) {
          if (!selectedFilters.Type.includes(word["categorie1"] as "Verbe" | "Nom" | "Adjectif" | "Heures" | "Expression" | "Adverbe" | "Particule" | "Pronom")) {
            return false;
          }
        }
        return true;
      });

      pool = filteredWords.map(word => {
        let properties: (keyof typeof word)[];

        if (selectedFilters.Langues && selectedFilters.Langues.length > 0) {
          properties = selectedFilters.Langues;
        } else {
          properties = ["francais", "hiragana", "romaji", "kanji"];
        }

        const randomProperty = properties[Math.floor(Math.random() * properties.length)];
        return { word: word[randomProperty], type: randomProperty.charAt(0).toUpperCase() + randomProperty.slice(1) };
      });
    }

    if (pool.length === 0) {
      setRandomWord("🦍");
      setWordType("");
      return;
    }

    // Sélectionner un mot, une heure ou un horaire aléatoire
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selectedEntry = pool[randomIndex];

    const updatedHistory = [...history.slice(0, currentIndex + 1), { word: String(selectedEntry.word), type: selectedEntry.type }];
    setHistory(updatedHistory);
    setCurrentIndex(updatedHistory.length - 1);
    setRandomWord(String(selectedEntry.word)); // Conversion en chaîne
    setWordType(selectedEntry.type);
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
          <div className="text-center text-[48px] font-bold self-center" dangerouslySetInnerHTML={{ __html: randomWord }}></div>
        )}
        <div className="div_boutons flex flex-row gap-6 w-full">
          <div className="div_boutons_gauche flex flex-row gap-2 w-full">


            <button
              onClick={handlePreviousWord}
              className={`h-9 rounded-lg w-full ${currentIndex <= 0 ? 'bg-[var(--surface-secondary)] text-[var(--text-primary)] opacity-50 cursor-not-allowed' : 'bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary-hover)]'}`}
              disabled={currentIndex <= 0}
            >
              Mot précédent
            </button>
          </div>

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
