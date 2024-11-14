import { Dispatch, SetStateAction, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { GrClose } from "react-icons/gr";

export default function LoginPage({
  closeAction,
}: {
  closeAction: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    // Désactiver le défilement de la page lorsque le modal est ouvert
    document.body.style.overflow = "hidden";

    // Nettoyage : réactiver le défilement lorsque le modal est fermé
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeHandler = () => {
    closeAction(false);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        closeHandler();
      }}
      className="fixed inset-0 w-screen bg-black/65 z-30 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-none md:rounded-3xl overflow-hidden flex flex-col md:flex-row items-center shadow-2xl relative h-full md:h-fit"
      >
        <button
          onClick={closeHandler}
          className="absolute border-black right-4 top-4 border p-2 rounded-full w-8 h-8 bg-white flex items-center justify-center"
        >
          <GrClose className="text-2xl" />
        </button>
        <div className="bg-[url('../app/assets/images/login_bg.png')] w-full h-80 bg-cover"></div>
        <div className="m-6">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm mt-6">
            Transform your ingredients into delicious dishes - Scan and find
            recipes instantly!
          </p>
          <button className="rounded-full border-2 px-4 py-3 text-sm font-bold w-full mt-6 flex items-center justify-center">
            <FcGoogle className="text-2xl mr-2" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}