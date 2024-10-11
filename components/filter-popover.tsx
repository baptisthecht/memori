"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronLeft, Filter, RefreshCw } from "lucide-react"
import React from 'react'
import { selectFiltersType } from '@/app/page'



interface FilterOption {
  id: string;
  label: string;
}

interface FilterCategory {
  name: string;
  options: FilterOption[];
}

const filterCategories: FilterCategory[] = [
  {
    name: "Langues",
    options: [
      { id: "francais", label: "Français" },
      { id: "hiragana", label: "Hiragana" },
      { id: "romaji", label: "Romaji" },
      { id: "kanji", label: "Kanji" },
    ],
  },
  {
    name: "Type",
    options: [
      { id: "Verbe", label: "Verbe" },
      { id: "Nom", label: "Nom" },
      { id: "Adjectif", label: "Adjectif" },
      { id: "Heures", label: "Heures" },
    ],
  },
  {
    name: "Thèmes",
    options: [
      { id: "Action", label: "Action" },
      { id: "Objet", label: "Objet" },
      { id: "Nature", label: "Nature" },
      { id: "Métiers", label: "Métiers" },
      { id: "Animaux", label: "Animaux" },
      { id: "Jours", label: "Jours" } // Ajout de l'option "Jours"
    ],
  },
]

type FilterPopoverProps = {
  selectedFilters: selectFiltersType,
  setSelectedFilters: React.Dispatch<React.SetStateAction<selectFiltersType>>
}

export const FilterPopover: React.FC<FilterPopoverProps> = ({ selectedFilters, setSelectedFilters }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Initialiser les filtres sélectionnés avec des tableaux vides par défaut
  const initializeFilters = () => {
    const initialFilters: selectFiltersType = {};
    filterCategories.forEach(category => {
      initialFilters[category.name] = []; // Initialiser avec des tableaux vides
    });
    setSelectedFilters(initialFilters);
  };

  // Appeler initializeFilters lors du premier rendu
  useEffect(() => {
    initializeFilters();
  }, []);

  // Ajouter un gestionnaire d'événements pour la touche "Majuscule"
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Vérifier si seule la touche "Shift" est pressée
      if (event.key === 'Shift' && !event.altKey && !event.ctrlKey && !event.metaKey) {
        setIsOpen(prev => !prev); // Ouvre ou ferme le popover
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
  }

  const handleCheckboxChange = (category: string, optionId: string) => {
    setSelectedFilters((prev: selectFiltersType) => {
      const updatedFilters = { ...prev }
      if (!updatedFilters[category]) {
        updatedFilters[category] = []
      }
      if (updatedFilters[category].includes(optionId)) {
        updatedFilters[category] = updatedFilters[category].filter(id => id !== optionId)
      } else {
        updatedFilters[category].push(optionId)
      }
      return updatedFilters
    })
  }

  const handleSelectAllChange = (category: string, selectAll: boolean) => {
    setSelectedFilters((prev: selectFiltersType) => {
      const updatedFilters = { ...prev }
      if (selectAll) {
        updatedFilters[category] = filterCategories.find(cat => cat.name === category)?.options.map(option => option.id) || []
      } else {
        updatedFilters[category] = []
      }
      return updatedFilters
    })
  }

  const resetFilters = () => {
    initializeFilters(); // Réinitialiser à toutes les options désélectionnées
  }

  const totalSelectedFilters = Object.values(selectedFilters).flat().length




  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 p-0 rounded-[6px] relative bg-surface-secondary hover:bg-surface-secondary-hover"
          aria-label={totalSelectedFilters > 0 ? `Filters (${totalSelectedFilters} selected)` : 'Filters'}
        >
          <Filter className="h-3 w-3" />
          {totalSelectedFilters > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {totalSelectedFilters}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`w-[250px] p-0 ${isOpen ? 'bg-surface-secondary' : ''}`}
        align="start"
        side="left"
      >
        <div className="p-4 border-b" style={{ borderColor: '#yourColorCode' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">
              {activeCategory ? activeCategory : "Filter"}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-8 px-2 text-sm"
              disabled={totalSelectedFilters === 0}
            >
              <RefreshCw className="h-4 w-4" />
              {/* Supprimez le texte "Reset" ici */}
            </Button>
          </div>
        </div>
        {activeCategory ? (
          <div className="p-2">
            <Button
              variant="ghost"
              className="flex w-full justify-start font-normal px-2 hover:bg-surface-secondary-hover"
              onClick={() => setActiveCategory(null)}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`select-all-${activeCategory}`}
                    checked={selectedFilters[activeCategory]?.length === filterCategories.find(cat => cat.name === activeCategory)?.options.length}
                    onCheckedChange={(checked) => handleSelectAllChange(activeCategory, checked as boolean)}
                  />
                  <label htmlFor={`select-all-${activeCategory}`} className="text-sm font-medium leading-none">
                    Tout sélectionner
                  </label>
                </div>
                {filterCategories.find(cat => cat.name === activeCategory)?.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={selectedFilters[activeCategory]?.includes(option.id)}
                      onCheckedChange={() => handleCheckboxChange(activeCategory, option.id)}
                    />
                    <label htmlFor={option.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2">
            {filterCategories.map((category) => (
              <Button
                key={category.name}
                variant="ghost"
                className="flex w-full justify-start font-normal hover:bg-surface-secondary-hover"
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
                <span className="ml-auto">{selectedFilters[category.name]?.length || 0}</span>
              </Button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
