import Image from "next/image";
import { useState } from "react";

interface AvatarProps {
  src: string;
  alt: string;
  size?: string;
  radius?: string;
  width?: number;
  height?: number;
  name?: string;
  onClick?: () => void;
  className?: string;
}

export default function Avatar({
  src,
  alt,
  size = "2.29rem",
  width = 100,
  height = 100,
  radius = "50%",
  name = "",
  onClick,
  className = "",
}: AvatarProps) {
  const [loadingError, setLoadingError] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`bg-slate-100 cursor-pointer rounded-full overflow-hidden ${className}`}
      style={{ borderRadius: radius ?? "50%", width: size, height: size }}
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
