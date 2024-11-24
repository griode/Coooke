import { MouseEventHandler } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

// Outline Button
export const OutlineButton = ({
  children,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border text-xs font-bold px-4 py-2 hover:bg-black/5 ${className}`}
    >
      {children}
    </button>
  );
};

// Fill Button
export const FillButton = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-full bg-black text-white text-xs font-bold px-4 py-2 hover:bg-black/80 ${className}`}
    >
      {children}
    </button>
  );
};

// icon Button
export const IconButton = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border text-xs font-bold p-2 hover:bg-black/5 ${className}`}
    >
      {children}
    </button>
  );
};
