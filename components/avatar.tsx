import Image from "next/image";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";

interface AvatarProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  radius?: number;
  name?: string;
  onClick?: () => void;
  className?: string;
}

export default function Avatar({
  src,
  alt,
  width,
  height,
  name = "V",
  radius = 50,
  onClick,
  className = "",
}: AvatarProps) {
  const [loadingError, setLoadingError] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`bg-slate-100 cursor-pointer rounded-full overflow-hidden ${className}`}
      style={{ borderRadius: radius }}
    >
      {src === "" || loadingError ? (
        <div className="w-full h-full font-bold flex justify-center items-center">
          {name[0]}
        </div>
      ) : (
        <Image
          className="object-cover w-full h-full"
          src={src}
          alt={alt}
          width={width}
          height={height}
          onError={() => setLoadingError(true)}
        />
      )}
    </div>
  );
}
