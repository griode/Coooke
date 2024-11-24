import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";
export default function Avatar({
  src,
  alt,
  width,
  height,
  radius = 100,
  onClick,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  radius?: number;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      style={{ width: `${radius}px`, height: `${radius}px` }}
      className={`relative bg-slate-100 rounded-full ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="z-10 rounded-full w-full h-full object-cover absolute"
      />
      <div className="z-0 absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <BsPersonCircle className="text-4xl" />
      </div>
    </div>
  );
}
