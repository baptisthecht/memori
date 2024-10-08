"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronLeft, Filter, X } from "lucide-react"
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
    name: "Type",
    options: [
      { id: "francais", label: "Français" },
      { id: "hiragana", label: "Hiragana" },
      { id: "romaji", label: "Romaji" },
      { id: "kanji", label: "Kanji" },
    ],
  },
  {
    name: "Difficulty",
    options: [
      { id: "easy", label: "Easy" },
      { id: "medium", label: "Medium" },
      { id: "hard", label: "Hard" },
    ],
  },
]

type FilterPopoverProps = {
  selectedFilters: selectFiltersType, 
  setSelectedFilters: React.Dispatch<React.SetStateAction<selectFiltersType>>
}

export const FilterPopover: React.FC<FilterPopoverProps> = ({selectedFilters, setSelectedFilters}) =>  {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  // const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

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

  const resetFilters = () => {
    setSelectedFilters({})
  }

  const totalSelectedFilters = Object.values(selectedFilters).flat().length


  

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 p-0 rounded-[6px] relative"
          aria-label={totalSelectedFilters > 0 ? `Filters (${totalSelectedFilters} selected)` : 'Filters'}
        >
          <Filter className="h-4 w-4" />
          {totalSelectedFilters > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {totalSelectedFilters}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="start">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Filter</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-8 px-2 text-sm"
              disabled={totalSelectedFilters === 0}
            >
              <X className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
        {activeCategory ? (
          <div>
            <Button
              variant="ghost"
              className="flex w-full justify-start font-normal"
              onClick={() => setActiveCategory(null)}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{activeCategory}</h3>
              {filterCategories.find(cat => cat.name === activeCategory)?.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 mb-2">
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
        ) : (
          <div className="p-2">
            {filterCategories.map((category) => (
              <Button
                key={category.name}
                variant="ghost"
                className="flex w-full justify-start font-normal"
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