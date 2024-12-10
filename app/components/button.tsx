import {MouseEventHandler} from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    disabled?: boolean;
    id?: string;
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
            className={`rounded-xl border border-slate-400 md:text-sm font-bold px-4 py-2 
        ${
                disabled
                    ? "bg-gray-200 text-slate-500 border-gray-300 cursor-not-allowed"
                    : "hover:bg-slate-800/5"
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
                               id,
                               onClick,
                               className = "",
                               disabled = false,
                           }: ButtonProps) => {
    return (
        <button
            id={id}
            onClick={!disabled ? onClick : undefined}
            className={`rounded-xl border md:text-sm px-4 py-2 
        ${
                disabled
                    ? "bg-gray-500 text-white border-gray-400 cursor-not-allowed"
                    : "bg-slate-800 text-white hover:bg-slate-900"
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
            className={`rounded-xl border text-xl font-bold p-2 flex items-center justify-center
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