"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useData } from "@/contexts/Data";
import { ArrowLeft, Check, ChevronRight, Filter, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";

interface FilterOption {
    id: string;
    label: string;
}

interface FilterCategory {
    name: string;
    id: "lang" | "type" | "theme";
    options: FilterOption[];
}

const filterCategories: FilterCategory[] = [
    {
        name: "Langues",
        id: "lang",
        options: [
            { id: "francais", label: "Français" },
            { id: "hiragana", label: "Hiragana" },
            { id: "romaji", label: "Romaji" },
            { id: "kanji", label: "Kanji" },
        ],
    },
    {
        name: "Type",
        id: "type",
        options: [
            { id: "Verbe", label: "Verbe" },
            { id: "Nom", label: "Nom" },
            { id: "Adjectif", label: "Adjectif" },
            { id: "Adverbe", label: "Adverbe" },
            { id: "Particule", label: "Particule" },
            { id: "Expression", label: "Expression" },
            { id: "Pronom", label: "Pronom" },
            { id: "Heures", label: "Heures" },
        ],
    },
    {
        name: "Thèmes",
        id: "theme",
        options: [
            { id: "Action", label: "Action" },
            { id: "Objet", label: "Objet" },
            { id: "Nature", label: "Nature" },
            { id: "Métiers", label: "Métiers" },
            { id: "Animaux", label: "Animaux" },
            { id: "Jours", label: "Jours" },
            { id: "Temps", label: "Temps" },
            { id: "Nourriture", label: "Nourriture" },
            { id: "Vêtement", label: "Vêtement" },
            { id: "Salutations", label: "Salutations" },
            { id: "Question", label: "Question" },
            { id: "Direction", label: "Direction" },
            { id: "Conjonction", label: "Conjonction" },
            { id: "Expression", label: "Expression" },
        ],
    },
];

export const FilterPopover = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentView, setCurrentView] = useState<"main" | "types" | "themes" | "lang">("main");
    const [direction, setDirection] = useState<"forward" | "backward">("forward");
    const { filters, setFilters } = useData();

    const changeView = (view: "main" | "types" | "themes" | "lang", dir: "forward" | "backward") => {
        setDirection(dir);
        setTimeout(() => {
            setCurrentView(view);
        }, 10);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Vérifier si seule la touche "Shift" est pressée
            if (
                event.key === "Shift" &&
                !event.altKey &&
                !event.ctrlKey &&
                !event.metaKey
            ) {
                setIsOpen((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const filtersLength = Object.keys(filters).reduce(
        (acc, key) => acc + filters[key as "lang" | "type" | "theme"].length,
        0
    );

    const handleChange = (id: "lang" | "type" | "theme", value: string) => {
        setFilters((prev) => {
            const previousValues = prev[id] || [];
            if (previousValues.includes(value))
                return {
                    ...prev,
                    [id]: previousValues.filter((v) => v !== value),
                };
            const newValues = [...new Set([...previousValues, value])];
            return { ...prev, [id]: newValues };
        });
    };

    const resetFilters = () => {
        setFilters({ lang: [], type: [], theme: [] });
    };

    const selectAllInCategory = (id: "lang" | "type" | "theme", selectAll: boolean) => {
        const category = filterCategories.find(cat => cat.id === id);
        if (!category) return;

        if (selectAll) {
            // Sélectionner tous les items
            setFilters(prev => ({
                ...prev,
                [id]: category.options.map(option => option.id)
            }));
        } else {
            // Désélectionner tous les items
            setFilters(prev => ({
                ...prev,
                [id]: []
            }));
        }
    };

    const areAllSelected = (id: "lang" | "type" | "theme") => {
        const category = filterCategories.find(cat => cat.id === id);
        if (!category) return false;
        return category.options.every(option => filters[id].includes(option.id));
    };

    const renderMainView = () => (
        <div className="flex flex-col w-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold">Filtrer</h2>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={resetFilters}>
                    <RotateCcw className="h-4 w-4" />
                </Button>
            </div>
            <div className={`flex flex-col w-full transition-all duration-300 ease-in-out ${direction === "backward" ? "animate-slide-in-left" : ""}`}>
                <Button
                    variant="ghost"
                    className="flex justify-between items-center px-4 py-6 rounded-none hover:bg-navHover transition-colors"
                    onClick={() => changeView("lang", "forward")}
                >
                    <span className="font-normal">Langues</span>
                    <ChevronRight className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    className="flex justify-between items-center px-4 py-6 rounded-none hover:bg-navHover transition-colors"
                    onClick={() => changeView("types", "forward")}
                >
                    <span className="font-normal">Types de mot</span>
                    <ChevronRight className="h-5 w-5" />
                </Button>
                <Button
                    variant="ghost"
                    className="flex justify-between items-center px-4 py-6 rounded-none hover:bg-navHover transition-colors"
                    onClick={() => changeView("themes", "forward")}
                >
                    <span className="font-normal">Thèmes</span>
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );

    const renderCategoryView = (category: FilterCategory) => (
        <div className="flex flex-col w-full h-full">
            <div className="flex items-center p-4 border-b border-gray-700">
                <Button variant="ghost" size="icon" className="mr-2 h-8 w-8" onClick={() => changeView("main", "backward")}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-xl font-semibold">{category.name}</h2>
            </div>
            <div className="p-4 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <div 
                        onClick={() => selectAllInCategory(category.id, !areAllSelected(category.id))}
                        className="border border-gray-600 rounded-md h-5 w-5 flex items-center justify-center cursor-pointer"
                    >
                        {areAllSelected(category.id) && <Check className="h-3.5 w-3.5 text-orange-500" />}
                    </div>
                    <Button
                        variant="ghost"
                        className="p-0 h-auto font-normal hover:bg-transparent hover:text-white"
                        onClick={() => selectAllInCategory(category.id, !areAllSelected(category.id))}
                    >
                        Tout sélectionner
                    </Button>
                </div>
            </div>
            <div className={`flex flex-col overflow-y-auto max-h-[calc(600px-120px)] scrollbar-thin pr-1 transition-all duration-300 ease-in-out ${direction === "forward" ? "animate-slide-in-right" : ""}`}>
                {category.options.map((option) => (
                    <div 
                        key={option.id} 
                        className="flex items-center px-4 h-10 my-[2px] hover:bg-navHover transition-colors cursor-pointer min-h-[40px]"
                        onClick={() => handleChange(category.id, option.id)}
                    >
                        <Checkbox
                            id={option.id}
                            label={option.label}
                            checked={filters[category.id].includes(option.id)}
                            onCheckedChange={() => handleChange(category.id, option.id)}
                            className="border-gray-600 data-[state=checked]:bg-orange-500 data-[state=checked]:text-white data-[state=checked]:border-orange-500 h-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    size="icon"
                    className="w-9 h-9 p-2 rounded-[6px] relative bg-surface-secondary hover:bg-surface-secondary-hover"
                    aria-label={
                        Object.keys(filters).length > 0
                            ? `Filters (${Object.keys(filters)} selected)`
                            : "Filters"
                    }>
                    <Filter />
                    {filtersLength > 0 && (
                        <span className="absolute -top-1 -right-1 bg-surface-secondary-hover text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            {filtersLength}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
        
            <PopoverContent
                side="left"
                align="start"
                alignOffset={-16}
                sideOffset={24}
                className="w-80 p-0 bg-[#1e2130] text-white border-gray-700 max-h-[600px] overflow-hidden rounded-2xl transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
                {currentView === "main" && renderMainView()}
                {currentView === "types" && renderCategoryView(filterCategories.find(c => c.id === "type")!)}
                {currentView === "themes" && renderCategoryView(filterCategories.find(c => c.id === "theme")!)}
                {currentView === "lang" && renderCategoryView(filterCategories.find(c => c.id === "lang")!)}
            </PopoverContent>
        </Popover>
    );
}; 