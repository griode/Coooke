import { MouseEventHandler } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}

// Outline Button
export const OutlineButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`rounded-xl border md:text-sm font-bold px-4 py-2 
        ${
          disabled
            ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
            : "hover:bg-black/5"
        } 
        ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

// Fill Button
export const FillButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`rounded-xl border md:text-sm px-4 py-2 
        ${
          disabled
            ? "bg-gray-500 text-white border-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-black/80"
        } 
        ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

// Icon Button
export const IconButton = ({
  children,
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={`rounded-xl border text-2xl font-bold p-1 flex items-center justify-center
        ${
          disabled
            ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
            : "hover:bg-slate-100 bg-white"
        } 
        ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};