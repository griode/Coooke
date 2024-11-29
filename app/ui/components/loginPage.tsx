import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/app/authentication/sign_with_google";
import { IconButton, OutlineButton } from "@/app/ui/components/button";
import { GrClose } from "react-icons/gr";
import CircularProgress from "@/app/ui/components/circular_progress";
import { FcGoogle } from "react-icons/fc";

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

  // log in with google
  const googleLoginHandler = () => {
    setIsLoading(true);
    signInWithGoogle().then((user) => {
      if (user) {
        router.push("/ui/home");
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
      className="fixed inset-0 w-screen bg-black/65 z-40 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-none md:rounded-2xl overflow-hidden flex flex-col md:flex-row items-center shadow-2xl relative h-full md:h-fit"
      >
        <IconButton onClick={closeHandler} className="absolute right-2 top-2">
          <GrClose className="text-xl m-1" />
        </IconButton>
        <div className="bg-[url('../app/assets/images/login_bg.png')] w-full h-96 bg-cover"></div>
        <div className="m-6">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm mt-6">
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
              <span className="text-sm font-normal">Continue with Google</span>
            </OutlineButton>
          )}
        </div>
      </div>
    </div>
  );
};
