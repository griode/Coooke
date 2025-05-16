"use client";
import Image from "next/image";
import slide1 from "@/app/assets/images/slide_1.jpg";
import slide2 from "@/app/assets/images/slide_2.jpg";
import slide3 from "@/app/assets/images/slide_3.jpg";
import { useEffect, useState, useMemo } from "react";
import { BsStarFill } from "react-icons/bs";

export const SliderCard = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // Utilisation d'un index pour simplifier
  const [isFading, setIsFading] = useState(false);
  const slides = useMemo(() => [slide1, slide2, slide3], []);

  // Gestion du changement de slide avec animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // Activer l'animation de fondu
      setTimeout(() => {
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length); // Passer au slide suivant
        setIsFading(false); // Désactiver l'animation après le changement
      }, 300); // Durée de l'animation de fondu
    }, 5000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, [slides.length]);

  return (
    <div className="relative w-full h-80 bg-background rounded-3xl overflow-hidden">
      {/* Badge "Top-Rated Foods" */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
        <div className="bg-background/65 backdrop-blur-xl p-2 rounded-full">
          <BsStarFill className="text-yellow-500 h-5 w-5" />
        </div>
        <h6 className="text-sm bg-background/65 backdrop-blur-xl px-4 py-2 rounded-full">
          Show Top-Rated Foods
        </h6>
      </div>

      {/* Titre du slider */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-8 text-white z-10">
        <h3 className="text-2xl font-bold">
          Savor Healthy Eats - Keep it Casual and Easy-Going!
        </h3>
      </div>

      {/* Image du slider */}
      <Image
        src={slides[currentSlideIndex]}
        alt={`Slide ${currentSlideIndex + 1}`}
        width={1000}
        height={800}
        priority // Optimisation pour le premier rendu
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"
          }`}
      />
    </div>
  );
};