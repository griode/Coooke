import { MouseEventHandler } from "react";

export default function FillButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-full bg-black text-white text-xs font-bold px-6 py-2 hover:bg-black/80"
    >
      {children}
    </button>
  );
}
