"use client";
import {useEffect, useRef} from "react";
import {FillButton, IconButton} from "./button";
import {HiArrowLeft} from "react-icons/hi2";

interface InteractiveButtonProps {
    icon: React.ReactNode;
    panelId: string; // ID unique pour identifier le panneau lié
}

export const InteractiveButton = ({
                                      icon,
                                      panelId,
                                  }: InteractiveButtonProps) => {
    const handleToggle = () => {
        const panel = document.getElementById(panelId);

        if (panel) {
            // Basculer la visibilité en fonction de la classe "hidden"
            panel.classList.toggle("hidden");
        }
    };

    return (
        <button
            onClick={handleToggle}
            className="p-2 rounded-xl hover:bg-slate-200 text-3xl md:text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            aria-controls={panelId} // Amélioration de l'accessibilité
        >
            {icon}
        </button>
    );
};

interface InteractivePanelProps {
    children: React.ReactNode;
    id: string; // ID unique pour identifier ce panneau
    className?: string;
}

export const InteractivePanel = ({
                                     children,
                                     id,
                                     className,
                                 }: InteractivePanelProps) => {
    const panelRef = useRef<HTMLDivElement>(null);

    // Gestion du clic à l'extérieur pour fermer le panneau
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node) &&
                (event.target as HTMLElement).id !== id // Ignore si l'élément cliqué a l'ID du panneau
            ) {
                panelRef.current.classList.add("hidden"); // Cache le panneau
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [id]);

    return (
        <div
            id={id} // ID unique pour la liaison avec le bouton
            ref={panelRef}
            className={`hidden shadow-[0_0_20px_rgba(0,0,0,0.2)] bg-white fixed z-30 flex-col items-center justify-center ${className}`}
        >
            {children}
        </div>
    );
};

interface ClosePanelButtonProps {
    panelId: string; // ID du panneau à fermer
    className?: string; // Optionnel : classes CSS supplémentaires
}

export const ClosePanelButton = ({
                                     panelId,
                                     className,
                                 }: ClosePanelButtonProps) => {
    const handleClose = () => {
        const panel = document.getElementById(panelId);

        if (panel) {
            panel.classList.add("hidden"); // Ajoute la classe "hidden" pour fermer le panneau
        }
    };

    return (
        <IconButton
            onClick={handleClose}
            className={`${className}`}
            aria-controls={panelId} // Amélioration de l'accessibilité
        >
            <HiArrowLeft/>
        </IconButton>
    );
};

export const InteractiveButtonFilled = ({
                                            icon,
                                            panelId,
                                        }: InteractiveButtonProps) => {
    const handleToggle = () => {
        const panel = document.getElementById(panelId);

        if (panel) {
            // Basculer la visibilité en fonction de la classe "hidden"
            panel.classList.toggle("hidden");
        }
    };

    return (
        <FillButton
            onClick={handleToggle}

            aria-controls={panelId} // Amélioration de l'accessibilité
        >
            {icon}
        </FillButton>
    );
};