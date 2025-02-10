import { IoIosClose } from "react-icons/io";

export default function Chip({ title }: { title: string }) {
  return (
    <div className="border w-fit px-2 py-1 rounded-xl flex justify-center space-x-1 items-center">
      <span className="text-sm">{title}</span>{" "}
      <button className="hover:bg-slate-200 rounded-full bg-white">
        <IoIosClose className="text-2xl" />
      </button>
    </div>
  );
}
