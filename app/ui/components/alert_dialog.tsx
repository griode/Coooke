import {IoClose} from "react-icons/io5";
import {Dispatch, ReactNode, SetStateAction, useEffect} from "react";

export function AlertDialog({
  children,
  setShowDialog,
}: {
  children: ReactNode;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeHandler = () => {
    setShowDialog(false);
  };

  return (
    <div
      onClick={closeHandler}
      className="fixed inset-0 w-screen z-30 flex flex-col justify-center items-center backdrop-blur-sm"
    >
      <button className="absolute top-4 right-4 bg-black rounded-full p-1">
        <IoClose className="text-2xl text-white" />
      </button>
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}
