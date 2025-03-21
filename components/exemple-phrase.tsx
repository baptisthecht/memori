"use client";

import { useState } from "react";

interface ExemplePhaseProps {
  originalPhrase: string;
  frenchTranslation: string;
}

export const ExemplePhrase = ({
  originalPhrase,
  frenchTranslation,
}: ExemplePhaseProps) => {
  const [showTranslation, setShowTranslation] = useState(false);

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  return (
    <div
      className="w-full h-[36px] rounded-[8px] flex items-center justify-center px-4 cursor-pointer transition-colors hover:bg-navHover"
      onClick={toggleTranslation}
      style={{
        backgroundColor: showTranslation ? "rgba(255, 126, 33, 0.1)" : "transparent",
      }}
    >
      <p className="text-sm text-center">
        {showTranslation ? frenchTranslation : originalPhrase}
      </p>
    </div>
  );
}; 