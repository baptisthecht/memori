"use client";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useData } from "@/contexts/Data";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";

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
    const { filters, setFilters } = useData();

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
                className="bg-surface-secondary w-auto space-y-2 min-w-48">
                <h1 className="text-sm font-semibold">Filtres</h1>
                <Accordion type="single" collapsible>
                    {filterCategories.map((category) => (
                        <AccordionItem
                            value={category.name}
                            key={category.name}>
                            <AccordionTrigger className="flex items-center gap-2">
                                <h2 className="text-sm font-semibold">
                                    {category.name}
                                </h2>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2">
                                {category.options.map((option) => (
                                    <Checkbox
                                        key={option.id}
                                        label={option.label}
                                        aria-label={option.id}
                                        onCheckedChange={() =>
                                            handleChange(category.id, option.id)
                                        }
                                        checked={filters[category.id].includes(
                                            option.id
                                        )}
                                    />
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </PopoverContent>
        </Popover>
    );
};
