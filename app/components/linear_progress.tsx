import React from "react";

interface LinearProgressProps {
  progress: number; // Progression (en pourcentage de 0 à 100)
  color?: string; // Couleur de la barre de progression
  height?: number; // Hauteur de la barre
  infinite?: boolean; // Indicateur de progression infinie
}

const LinearProgress: React.FC<LinearProgressProps> = ({
  progress,
  color = "#000",
  height = 10,
  infinite = false,
}) => {
  return (
    <div
      className="linear-progress-container"
      style={{
        height: `${height}px`,
        backgroundColor: "#e6e6e6",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      <div
        className={`linear-progress-bar ${
          infinite ? "linear-progress-bar--infinite" : ""
        }`}
        style={{
          width: infinite ? "100%" : `${progress}%`,
          backgroundColor: color,
          height: "100%",
          transition: "width 0.3s ease",
        }}
      ></div>
      {infinite && (
        <style>{`
          .linear-progress-bar--infinite {
            animation: linear-progress-move 1.5s linear infinite;
          }

          @keyframes linear-progress-move {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      )}
    </div>
  );
};

export default LinearProgress;