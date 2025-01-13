import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/authentication/sign_with_google";
import { IconButton, OutlineButton } from "@/components/button";
import { GrClose } from "react-icons/gr";
import CircularProgress from "@/components/circular_progress";
import { FcGoogle } from "react-icons/fc";
import logo from "@/assets/icons/logo.png";
import Image from "next/image"
import { setUserId } from "@/lib/utils/user_manager";
import {routeNames} from "@/app/router/router";

export const LoginPage = ({
    closeAction,
}: {
    closeAction: Dispatch<SetStateAction<boolean>>;
}) => {
    const router = useRouter(); // Initialize router
    const [isLoading, setIsLoading] = useState(false); // State to track loading status

    // close the modal.tsx
    useEffect(() => {
        // Désactiver le défilement de la page lorsque le modal.tsx est ouvert
        document.body.style.overflow = "hidden";
        // Nettoyage : réactiver le défilement lorsque le modal.tsx est fermé
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const closeHandler = () => {
        closeAction(false);
    };

    // log in with Google
    const googleLoginHandler = () => {
        setIsLoading(true);
        signInWithGoogle().then((user) => {
            if (user) {
                setUserId(user.uid).then(() => console.log("User logged in"));
                router.push(routeNames.home);
            } else {
                setIsLoading(false);
            }
        });
    };

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                closeHandler();
            }}
            className="fixed inset-0 w-screen bg-slate-800/65 z-40 flex justify-center items-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-none md:rounded-2xl overflow-hidden flex flex-col md:flex-row items-center shadow-2xl relative h-full md:h-fit"
            >
                <IconButton onClick={closeHandler} className="absolute right-2 top-2">
                    <GrClose className="text-xl m-1" />
                </IconButton>
                <div className={`bg-[url('../assets/images/login_bg.png')] w-full h-60 md:h-96  bg-cover`}></div>
                <div className="m-4">
                    <h1 className="flex items-center my-4">
                        <div className="text-6xl pb-3 font-black">C</div>
                        <div className="bg-slate-800 rounded-full w-7 h-7">
                            <Image
                                className="w-full h-full"
                                src={logo}
                                alt="logo"
                            />
                        </div>
                        <div className="text-4xl font-black pb-1">ook</div>
                    </h1>
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-sm mt-4">
                        Transform your ingredients into delicious dishes - Scan and find
                        recipes instantly!
                    </p>
                    <div className="mt-6"></div>
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <CircularProgress infinite={isLoading} size={40} />
                        </div>
                    ) : (
                        <OutlineButton
                            onClick={googleLoginHandler}
                            className="flex items-center justify-center w-full space-x-2"
                        >
                            <FcGoogle className="text-2xl" />
                            <span>Continue with Google</span>
                        </OutlineButton>
                    )}
                </div>
            </div>
        </div>
    );
};
