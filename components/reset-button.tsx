"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { RotateCcw } from "lucide-react";

export function ResetButton() {
  const [isResetting, setIsResetting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleReset = async () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser tous les compteurs des mots ? Cette action est irréversible.")) {
      try {
        setIsResetting(true);
        setMessage(null);
        
        const response = await axios.post("/api/words/reset");
        
        if (response.data.success) {
          setMessage("Les compteurs ont été réinitialisés avec succès.");
          // Force reload after 1.5 seconds to show updated data
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          setMessage("Erreur: " + response.data.message);
        }
      } catch (error) {
        setMessage("Une erreur est survenue lors de la réinitialisation.");
        console.error("Erreur de réinitialisation:", error);
      } finally {
        setIsResetting(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <Button 
        onClick={handleReset} 
        disabled={isResetting}
        variant="destructive"
        className="flex items-center gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        {isResetting ? "Réinitialisation en cours..." : "Réinitialiser tous les compteurs"}
      </Button>
      
      {message && (
        <p className={`text-sm mt-2 ${message.includes("succès") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
} 