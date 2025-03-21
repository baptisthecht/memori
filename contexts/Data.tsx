"use client";
import { LANGUAGES } from "@/lib/types";
import { languages } from "@/lib/values";
import { PhraseExemple, Word } from "@prisma/client";
import axios from "axios";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

export const DataContext = createContext<ReturnType<typeof useDataState>>(
    null!
);

export const useDataState = () => {
    const [loading, setLoading] = useState(true);
    const [words, setWords] = useState<Word[]>([]);
    const [activeWord, setActiveWord] = useState<Word & { phrasesExemples?: PhraseExemple[] } | null>(null);
    const [activeLanguage, setActiveLanguage] = useState<LANGUAGES>("francais");
    const [filters, setFilters] = useState<
        Record<"lang" | "type" | "theme", string[]>
    >({ lang: [], type: [], theme: [] });

    function generateRandomWord() {
        if (words.length === 0) return null;
        const filteredWords = words.filter((word) => {
            if (
                filters.type.length > 0 &&
                !filters.type.includes(word.categorie1)
            )
                return false;
            if (
                filters.theme.length > 0 &&
                !filters.theme.includes(word.categorie2)
            )
                return false;
            return true;
        });
        setActiveWord(
            filteredWords[Math.floor(Math.random() * filteredWords.length)]
        );
        const filteredLanguages = languages.filter((lang) => {
            if (filters.lang.length > 0 && !filters.lang.includes(lang))
                return false;
            return true;
        });
        setActiveLanguage(
            filteredLanguages[
                Math.floor(Math.random() * filteredLanguages.length)
            ]
        );
    }

    function handleGoodAnswer() {
        if (!activeWord) return;
        axios.patch("/api/words", {
            id: activeWord.id,
            bonnesReponses: activeWord.bonnesReponses + 1,
        });
        generateRandomWord();
    }

    function handleBadAnswer() {
        if (!activeWord) return;
        axios.patch("/api/words", {
            id: activeWord.id,
            bonnesReponses: activeWord.mauvaisesReponses + 1,
        });
        generateRandomWord();
    }

    useEffect(() => {
        generateRandomWord();
    }, [words]);

    useEffect(() => {
        if (filters.lang.length > 0 && !filters.lang.includes(activeLanguage)) {
            generateRandomWord();
        }
        if (
            !activeWord?.categorie1 ||
            (filters.type.length > 0 &&
                !filters.type.includes(activeWord?.categorie1))
        ) {
            generateRandomWord();
        }
        if (
            !activeWord?.categorie2 ||
            (filters.theme.length > 0 &&
                !filters.theme.includes(activeWord?.categorie2))
        ) {
            generateRandomWord();
        }
    }, [filters]);

    return {
        words,
        setWords,
        activeWord,
        setActiveWord,
        generateRandomWord,
        activeLanguage,
        handleGoodAnswer,
        handleBadAnswer,
        filters,
        setFilters,
        loading,
        setLoading,
    };
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const value = useDataState();
    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
