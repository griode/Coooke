import { IoClose } from "react-icons/io5";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { IconButton } from "./button";

export function AlertDialog({
    children,
    setShowDialog,
    header,
}: {
    children: ReactNode;
    setShowDialog: Dispatch<SetStateAction<boolean>>;
    header?: ReactNode;
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
            onClick={
                (event) => {
                    event.stopPropagation();
                    closeHandler();
                }
            }
            className="fixed bg-slate-800/65 inset-0 w-screen z-30 flex flex-col justify-center items-center"
        >
            <div className="absolute top-4 right-4 flex space-x-4">
                {header}
                <IconButton>
                    <IoClose />
                </IconButton>
            </div>

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
