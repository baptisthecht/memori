"use client";

import React, { useEffect, useState } from "react";
import { HelpPopover } from "@/components/HelpPopover";
import { FilterPopover } from "@/components/filter-popover";
import leftArrow from "@/public/fleche_gauche.svg";
import rightArrow from "@/public/fleche_droite.svg";
import Image from "next/image";

export type selectFiltersType = {
  [key: string]: string[] | undefined; 
  Langues?: ("francais" | "hiragana" | "romaji" | "kanji")[],
  Type?: ("Verbe" | "Nom" | "Adjectif" | "Adverbe" | "Particule" | "Expression" | "Pronom" | "Heures")[], // Ajout de "Heures"
  Thèmes?: ("Action" | "Objet" | "Nature" | "Métiers" | "Animaux" | "Jours" | "Temps" | "Nourriture" | "Vêtement" | "Salutations" | "Question" | "Direction" | "Conjonction" | "Expression")[]
}

// Définissez le type pour les mises à jour
interface WordUpdates {
  bonnes_reponses?: number;
  mauvaises_reponses?: number;
  affichages?: number;
  niveau_leitner?: number;
}

// Définir le type pour les mots
type Word = {
  francais: string;
  hiragana?: string; // Ajout de la propriété hiragana
  romaji?: string;   // Ajout de la propriété romaji
  kanji?: string;    // Ajout de la propriété kanji
  categorie1: string;
  categorie2: string;
  phrases_exemples?: { [key: string]: string }[];
  affichages?: number;
  niveau_leitner?: number;
};

export default function Home() {
  const [words, setWords] = useState<Word[]>([]); // Utiliser le type Word
  const [randomWord, setRandomWord] = useState("");
  const [wordType, setWordType] = useState("");
  const [history, setHistory] = useState<{ word: string; type: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [selectedFilters, setSelectedFilters] = useState<selectFiltersType>({});

  useEffect(() => {
    // Fetch words from the API
    const fetchWords = async () => {
      try {
        const response = await fetch('/api/words');
        const data = await response.json();
        setWords(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des mots:", error);
      }
    };

    fetchWords();
  }, []);

  const determineWordType = (word: Word): string => {
    if (word.francais) return "Français";
    if (word.hiragana) return "Hiragana";
    if (word.romaji) return "Romaji";
    if (word.kanji) return "Kanji";
    return "Inconnu";
  };

  const generateRandomWord = () => {
    if (words.length === 0) return;

    // Filtrer les mots selon les critères de filtre
    const filteredWords = words.filter((word: Word) => {
      // Filtrage par thèmes
      if (selectedFilters.Thèmes && selectedFilters.Thèmes.length > 0) {
        if (!selectedFilters.Thèmes.includes(word.categorie2 as typeof selectedFilters.Thèmes[number])) {
          return false;
        }
      }
      // Filtrage par type
      if (selectedFilters.Type && selectedFilters.Type.length > 0) {
        if (!selectedFilters.Type.includes(word.categorie1 as typeof selectedFilters.Type[number])) {
          return false;
        }
      }
      // Filtrage par langues
      if (selectedFilters.Langues && selectedFilters.Langues.length > 0) {
        const hasSelectedLanguage = selectedFilters.Langues.some(lang => {
          return word[lang as keyof Word] !== undefined && word[lang as keyof Word] !== "";
        });
        if (!hasSelectedLanguage) {
          return false;
        }
      }
      return true;
    });

    // Après le filtrage
    console.log("Filtered Words:", filteredWords);

    if (filteredWords.length === 0) {
      setRandomWord("🦍");
      setWordType("");
      return;
    }

    // Sélectionner un mot aléatoire
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    const selectedWord = filteredWords[randomIndex];

    // Choisir aléatoirement une propriété parmi francais, hiragana, romaji, kanji
    const wordProperties = ["francais", "hiragana", "romaji", "kanji"];
    const availableProperties = wordProperties.filter(prop => selectedWord[prop as keyof Word]);
    const randomProperty = availableProperties[Math.floor(Math.random() * availableProperties.length)];
    const selectedValue = selectedWord[randomProperty as keyof Word];

    if (typeof selectedValue === 'string') {
      setRandomWord(selectedValue);
      setWordType(randomProperty.charAt(0).toUpperCase() + randomProperty.slice(1)); // Mettre à jour le type de mot
    } else {
      setRandomWord("🦍");
      setWordType(""); // Réinitialiser le type de mot si la valeur n'est pas une chaîne
    }
  };

  useEffect(() => generateRandomWord(), [selectedFilters, words]);

  const [affichages, setAffichages] = useState(0);
  const [bonnesReponses, setBonnesReponses] = useState(0);
  const [mauvaisesReponses, setMauvaisesReponses] = useState(0);
  const [niveauLeitner, setNiveauLeitner] = useState(1);

  // Ajoutez un état pour stocker l'ID du mot actuel
  const [currentWordId, setCurrentWordId] = useState<number | null>(null);

  const getFilteredTranslations = () => {
    if (!randomWord) return {};

    if (wordType === "Heures") {
      const [heure, minute] = randomWord.split(":");
      const heureObj = heures.find((h: { heure: string }) => h.heure === heure);
      const minuteObj = minutes.find((m: { minute: string }) => m.minute === minute);

      if (heureObj && minuteObj) {
        return {
          romaji: `${heureObj.romaji} ${minuteObj.romaji}`
        };
      }
      return {};
    }

    const selectedWord = words.find(
      (word) => Object.values(word).includes(randomWord)
    );
    if (!selectedWord) return {};

    const allowedKeys = ["francais", "hiragana", "romaji", "kanji"];
    const filteredTranslations = Object.entries(selectedWord).reduce(
      (acc, [key, value]) => {
        if (key !== wordType.toLowerCase() && allowedKeys.includes(key)) {
          acc[key] = value as string;
        }
        return acc;
      },
      {} as Record<string, string>
    );

    return filteredTranslations;
  };

  const getExampleSentence = () => {
    if (wordType === "Heures") {
      const translations = getFilteredTranslations();
      return {
        sentence: translations.romaji || "Pas de traduction",
        translation: translations.romaji || "Pas de traduction",
        romaji: translations.romaji || "Pas de traduction"
      };
    }

    const selectedWord = words.find(
      (word) => Object.values(word).includes(randomWord)
    );

    if (!selectedWord || !selectedWord.phrases_exemples) {
      return { sentence: "Hello world", translation: "Hello world", romaji: "Hello world" };
    }

    const languageKey = wordType.toLowerCase() as keyof typeof selectedWord.phrases_exemples[0];
    const examples = selectedWord.phrases_exemples.map((example) => ({
      sentence: example[languageKey],
      translation: example.francais,
      romaji: example.romaji
    }));

    const validExamples = examples.filter((example) => example.sentence);
    if (validExamples.length === 0) {
      return { sentence: "Hello world", translation: "Hello world", romaji: "Hello world" };
    }

    const randomIndex = Math.floor(Math.random() * validExamples.length);
    return validExamples[randomIndex];
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

  const handleNextWord = () => {
    if (currentIndex === history.length - 1) {
      generateRandomWord();
    } else {
      const nextIndex = currentIndex + 1;
      if (nextIndex < history.length) {
        setCurrentIndex(nextIndex);
        setRandomWord(history[nextIndex].word);
        setWordType(history[nextIndex].type);
      }
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

  const updateWordInDatabase = async (wordId: number, updates: WordUpdates) => {
    try {
        console.log('Updating word:', wordId, updates); // Log des données envoyées
        const response = await fetch('/api/updateWord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wordId, updates }),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de la base de données');
        }

        const data = await response.json();
        console.log('API response:', data.message); // Log de la réponse de l'API
    } catch (error) {
        console.error('Erreur:', error);
    }
  };

  const handleBonneReponse = () => {
    if (currentWordId !== null) {
        const newBonnesReponses = bonnesReponses + 1;
        const newAffichages = affichages + 1;
        const newNiveauLeitner = Math.min(niveauLeitner + 1, 5);

        setBonnesReponses(newBonnesReponses);
        setAffichages(newAffichages);
        setNiveauLeitner(newNiveauLeitner);

        updateWordInDatabase(currentWordId, {
            bonnes_reponses: newBonnesReponses,
            affichages: newAffichages,
            niveau_leitner: newNiveauLeitner,
        });
    }
    handleNextWord();
  };

  const handleMauvaiseReponse = () => {
    if (currentWordId !== null) {
        const newMauvaisesReponses = mauvaisesReponses + 1;
        const newAffichages = affichages + 1;

        setMauvaisesReponses(newMauvaisesReponses);
        setAffichages(newAffichages);
        setNiveauLeitner(1);

        updateWordInDatabase(currentWordId, {
            mauvaises_reponses: newMauvaisesReponses,
            affichages: newAffichages,
            niveau_leitner: 1,
        });
    }
    handleNextWord();
  };

  const [showTranslation, setShowTranslation] = useState(false);
  const [currentExample, setCurrentExample] = useState(getExampleSentence());

  const handlePhraseClick = () => {
    setShowTranslation(!showTranslation);
  };

  useEffect(() => {
    setCurrentExample(getExampleSentence());
  }, [randomWord]);

  useEffect(() => {
    if (randomWord) {
      // Incrémenter le champ affichages
      const currentWord = words.find(word => Object.values(word).includes(randomWord));
      if (currentWord) {
        currentWord.affichages = (currentWord.affichages ?? 0) + 1;
      }
    }
  }, [randomWord]);

  const getNextWord = () => {
    const sortedWords = words.sort((a, b) => {
      // Comparer par niveau Leitner
      const niveauLeitnerA = a.niveau_leitner ?? 0;
      const niveauLeitnerB = b.niveau_leitner ?? 0;
      if (niveauLeitnerA !== niveauLeitnerB) {
        return niveauLeitnerA - niveauLeitnerB;
      }
      // Si les niveaux Leitner sont égaux, comparer par affichages
      return (a.affichages ?? 0) - (b.affichages ?? 0);
    });

    // Sélectionner le premier mot trié
    const nextWord = sortedWords[0];

    // Mettre à jour l'état avec le mot sélectionné
    setRandomWord(nextWord.francais);
    setAffichages((nextWord.affichages ?? 0) + 1); // Utilisation de la coalescence nulle pour gérer le cas undefined

    // Assurez-vous de mettre à jour la base de données ici si nécessaire
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="div_quiz w-[704px] h-[400px] rounded-[16px] bg-[var(--surface-primary)] p-8 flex flex-col justify-between">
        <div className="div_header_quiz w-full flex flex-row justify-between items-center p-auto">
          <FilterPopover selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
          <div className="text-lg font-semibold">
            {randomWord === "🦍" ? "Aucun mot trouvé" : ` ${wordType} `}
          </div>
          <div
            className="div_reponse w-8 h-8 bg-[var(--surface-secondary)] cursor-pointer rounded-[6px] flex items-center justify-center hover:bg-[var(--surface-secondary-hover)] group relative"
          >
            <HelpPopover translations={getFilteredTranslations()} />
          </div>
        </div>
        {randomWord && (
          <div className="div_mot_phrase flex flex-col items-center">
            <div className="text-center text-[48px] font-bold" dangerouslySetInnerHTML={{ __html: randomWord }}>
            </div>
            <div
              className="text-center text-[14px] font-regular inline-block h-auto p-2 px-8 rounded-[6px] hover:bg-[var(--surface-secondary)] relative group cursor-pointer"
              onClick={handlePhraseClick}
            >
              <div>{currentExample.sentence}</div>
              {showTranslation && (
                <div className="mt-2">
                  {currentExample.sentence !== currentExample.translation && (
                    <div>{currentExample.translation}</div>
                  )}
                  {currentExample.sentence !== currentExample.romaji && (
                    <div>{currentExample.romaji}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="div_boutons flex flex-row gap-2 w-full">
          <div className="div_boutons_gauche w-full align-top gap-2 flex flex-row">
            <button
              onClick={handlePreviousWord} // Appel de la fonction pour le mot précédent
              className="h-9 min-w-9 rounded-lg bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--surface-secondary-hover)] flex items-center justify-center"
            >
              <Image src={leftArrow} alt="Fleche Gauche" className="w-3 h-3 inline-block" />
            </button>
            <button
              onClick={handleMauvaiseReponse}
              className="h-9 rounded-lg w-full bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary-hover)]"
            >
              Mauvaise réponse
            </button>
          </div>
          <div className="div_boutons_droits w-full align-top gap-2 flex flex-row">
            <button
              onClick={handleBonneReponse}
              className="h-9 rounded-lg bg-[var(--surface-brand)] w-full text-white hover:bg-[var(--surface-brand-hover)]"
            >
              Bonne réponse
            </button>
            <button
              onClick={handleNextWord} // Appel de la fonction pour le mot suivant
              className="h-9 min-w-9 rounded-lg bg-[var(--surface-brand)] hover:bg-[var(--surface-brand-hover)]  flex items-center justify-center"
            >
              <Image src={rightArrow} alt="Fleche Droite" className="w-3 h-3 inline-block" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
