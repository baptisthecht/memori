import { FC, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

// Déclarez les props pour le composant
interface HelpPopoverProps {
  translations: Record<string, string>;
}

export const HelpPopover: FC<HelpPopoverProps> = ({ translations }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Gérer les événements de clavier pour ouvrir/fermer le popover avec CTRL
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsPopoverOpen(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        setIsPopoverOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Image
          src="/reponse.svg"
          alt="Aide"
          width={12}
          height={12}
          className="group-hover:text-[var(--icones-brand)] select-none cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent className="translate-y-9 mt-1 translate-x-3 w-auto bg-surface-secondary" side="right">
        <div className="grid gap-2">
          {/* Affiche les traductions passées en prop */}
          {Object.entries(translations).map(([key, value]) => (
            <p key={key} className="text-sm">
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
          </p>         
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};