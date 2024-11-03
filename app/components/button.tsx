export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-full bg-black text-white text-xs font-bold px-6 py-2 hover:bg-black/80">
      {children}
    </button>
  );
}
