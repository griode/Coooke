"use client";

import Image from "next/image";
import slide1 from "@/app/assets/images/slide_1.jpg";
import slide2 from "@/app/assets/images/slide_2.jpg";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";

export const SliderCard = () => {
  const [currentSlide, setCurrentSlide] = useState(slide1);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // Activer l'animation de fondu
      setTimeout(() => {
        setCurrentSlide((prevSlide) =>
          prevSlide === slide1 ? slide2 : slide1
        );
        setIsFading(false); // Désactiver l'animation après le changement
      }, 300); // Durée de l'animation de fondu
    }, 5000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  return (
    <div className="w-full h-80 bg-black rounded-3xl overflow-hidden relative">
      <div className="absolute m-7 my-8 z-30 flex items-center space-x-2">
        <div className="bg-black p-2 rounded-full">
          <StarIcon className="text-yellow-500 h-5 w-5" />
        </div>
        <h6 className="text-sm backdrop-blur-sm bg-white/70 px-4 py-2 rounded-full">
          Show Top-Rated Foods
        </h6>
      </div>
      <div className="font-bold absolute object-cover w-full h-full flex items-end">
        <h3 className="text-white text-2xl px-8 pt-12 pb-7 bg-gradient-to-t z-30 from-black/70 to-transparent">
          Savor Healthy Eats - Keep it Casual and Easy-Going!
        </h3>
      </div>
      <Image
        src={currentSlide}
        alt="image0"
        width={1000}
        height={800}
        className={`object-cover w-full h-full transition-opacity duration-300 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};