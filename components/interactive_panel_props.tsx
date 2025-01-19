"use client";
import { useEffect, useRef } from "react";
import { FillButton, IconButton } from "./button";
import { HiArrowLeft } from "react-icons/hi2";

interface InteractiveButtonProps {
  icon: React.ReactNode;
  panelId: string; // ID of the panel to toggle
}

export const InteractiveButton = ({
  icon,
  panelId,
}: InteractiveButtonProps) => {
  const handleToggle = () => {
    const panel = document.getElementById(panelId);

    if (panel) {
      panel.classList.toggle("hidden");
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="rounded-full"
      aria-controls={panelId}
    >
      {icon}
    </button>
  );
};

interface InteractivePanelProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export const InteractivePanel = ({
  children,
  id,
  className,
}: InteractivePanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // click outside the panel to close it
  useEffect(() => {
    panelRef?.current?.classList.add("hidden");
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        (event.target as HTMLElement).id !== id
      ) {
        panelRef.current.classList.add("hidden");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id]);

  return (
    <div
      id={id}
      ref={panelRef}
      className={`bg-white shadow-lg border fixed z-30 flex-col items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
};

interface ClosePanelButtonProps {
  panelId: string; // ID of the panel to close
  className?: string; // Additional class for styling
}
