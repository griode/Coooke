import Avatar from "./avatar";
import Image from "next/image";
import logo from "@/app/assets/icons/logo.png";
import { useCurrentUser } from "@/app/hooks/use_current_user";
import { InteractiveButton, InteractivePanel } from "./interactive_panel_props";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { OutlineButton } from "./button";
import { useCallback } from "react";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";

export const NavigationBar = () => {
  const { currentUser, userInfo } = useCurrentUser();
  const router = useRouter();

  const logoutHandler = useCallback(async () => {
    try {
      router.push("/");
      await auth.signOut();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [router]);

  return (
    <div className="flex justify-between items-center">
      <h1 className="flex items-center h-2">
        <div className="text-5xl mb-1 font-black">C</div>
        <div className="bg-slate-800 rounded-full w-6 h-6">
          <Image className="w-full h-full" src={logo} alt="logo" />
        </div>
        <div className="text-4xl font-black pb-1">ook</div>
      </h1>
      <div className="gap-2 flex">
        <div className="rounded-full font-bold border w-10 h-10 flex items-center justify-center">
          {userInfo?.number_of_tokens ?? 0}
        </div>
        <InteractiveButton
          icon={
            <Avatar
              className="w-9 h-9"
              name={currentUser?.displayName ?? ""}
              src={currentUser?.photoURL ?? ""}
              alt={`${currentUser?.displayName ?? ""}'s avatar`}
              width={100}
              height={100}
            />
          }
          panelId={"profile-panel"}
        />

        <InteractivePanel
          id="profile-panel"
          className="rounded-xl top-12 mt-3 right-0 md:right-24 lg:right-36 mr-6"
        >
          <div className="space-y-2 w-full text-xl p-4">
            <div className="flex items-center space-x-2">
              <Avatar
                className="w-10 h-10"
                name={currentUser?.displayName ?? ""}
                src={currentUser?.photoURL ?? ""}
                alt={`${currentUser?.displayName ?? ""}'s avatar`}
                width={100}
                height={100}
              />
              <div className="flex flex-col">
                <samp className="font-bold text-sm">
                  {currentUser?.displayName ?? ""}
                </samp>
                <samp className="text-xs">{currentUser?.email ?? ""}</samp>
              </div>
            </div>
            <hr />
            <OutlineButton
              onClick={logoutHandler}
              className="text-left text-lg flex items-center space-x-2 w-full border-none"
            >
              <HiArrowRightOnRectangle className="text-xl" />
              <samp className="text-sm">Log out</samp>
            </OutlineButton>
          </div>
        </InteractivePanel>
      </div>
    </div>
  );
};
