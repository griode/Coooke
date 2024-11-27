"use client";

import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

export function AlertDialog({
  children,
  setShowDialog,
}: {
  children: React.ReactNode;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // close the modal.tsx
  useEffect(() => {
    // Désactiver le défilement de la page lorsque le modal.tsx est ouvert
    document.body.style.overflow = "hidden";
    // Nettoyage : réactiver le défilement lorsque le modal.tsx est fermé
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeHandler = () => {
    setShowDialog(false);
  };

  return (
    <div
      onClick={closeHandler}
      className="fixed inset-0 w-screen z-30 flex flex-col justify-center items-center backdrop-blur-sm"
    >
      <button className="absolute top-4 right-4 bg-black rounded-full p-1">
        <IoClose className="text-2xl text-white" />
      </button>
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}
