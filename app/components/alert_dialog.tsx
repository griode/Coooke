import {IoClose} from "react-icons/io5";
import {Dispatch, ReactNode, SetStateAction, useEffect} from "react";
import {IconButton} from "./button";

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
            className="fixed bg-slate-800/10 backdrop-blur-sm inset-0 w-screen z-30 flex flex-col justify-center items-center"
        >
            <IconButton className="absolute top-4 right-4">
                <IoClose/>
            </IconButton>
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
