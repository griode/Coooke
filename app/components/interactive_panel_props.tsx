"use client";

import { useState, useRef, useEffect } from "react";

interface InteractivePanelProps {
  icon: React.ReactNode;
  activateIcon: React.ReactNode;
  child: React.ReactNode;
  position?: string;
}

export default function InteractivePanel({
  icon,
  activateIcon,
  child,
  position,
}: InteractivePanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Gestion du clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Ferme le panneau si on clique à l'extérieur
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Bouton pour afficher/masquer le panneau */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-slate-200 text-4xl md:text-2xl"
      >
        {isOpen ? activateIcon : icon}
      </button>

      {/* Panneau interactif */}
      {isOpen && (
        <div
          ref={panelRef}
          className={`shadow-[0_0_20px_rgba(0,0,0,0.2)] bg-white absolute rounded-xl w-96 z-30 flex flex-col items-center justify-center ${position}`}
        >
          {child}
        </div>
      )}
    </div>
  );
}
