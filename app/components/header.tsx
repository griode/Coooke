"use client";
import { useState, useEffect } from "react";
import Button from "./button";

const navLinks = ["Home", "Menu", "Booking", "Pricing"];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Empêche le défilement en arrière-plan lorsque le menu est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Nettoyage de l'effet pour éviter les fuites de mémoire
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="flex justify-between items-center p-4 md:p-0">
      <h1 className="text-2xl font-bold">
        cook <span className="text-orange-400">ia</span>
      </h1>

      {/* Bouton Menu pour les petits écrans */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-2xl focus:outline-none z-50"
        aria-label="Menu Button"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Navigation */}
      <nav
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col md:flex md:flex-row items-center justify-center fixed md:static inset-0 md:inset-auto bg-white md:bg-transparent gap-4 z-40 p-4 md:p-0`}
      >
        <ul className="flex flex-col items-center gap-8 md:gap-4 md:flex-row w-full md:w-auto">
          {navLinks.map((link, index) => (
            <li
              onClick={() => setMenuOpen(false)} // Ferme le menu au clic
              className="text-4xl md:text-sm cursor-pointer border-b md:border-0 w-full md:w-auto py-4 md:py-0 text-center"
              key={index}
            >
              {link}
            </li>
          ))}
        </ul>
      </nav>

      {/* Bouton Login */}
      <div className="hidden md:block">
        <Button>Login</Button>
      </div>
    </header>
  );
};

export default Header;