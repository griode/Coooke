"use client";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { LiaUserEditSolid } from "react-icons/lia";
import { OutlineButton } from "./button";
import { InteractivePanel } from "./interactive_panel_props";
import NavigationBar from "./navigation_bar";
import { auth } from "@/app/firebase";
import SearchPage from "@/app/search/search";
import ChatBox from "@/app/chatbox/chatbox";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useCallback } from "react";
import "@/style/scroll-style.css";
import { deleteUserId } from "@/utils/user_manager";
import CircularProgress from "./circular_progress";
import { useCurrentUser } from "@/hooks/use_current_user";
import React from "react";
import { routeNames } from "@/app/router/router";

interface NavbarContainerProps {
  children: ReactNode;
  pageIndex: number;
}

const NavbarContainer = ({ children, pageIndex }: NavbarContainerProps) => {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();

  // Verify user info
  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  const logoutHandler = useCallback(async () => {
    try {
      router.push("/");
      await auth.signOut();
      await deleteUserId();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }, [router]);

  // Class
  const containerClass = "w-full h-full flex justify-center items-center";
  const panelClass =
    "left-0 top-0 right-0 bottom-0 md:left-20 md:ml-1 md:top-4 md:bottom-4 md:w-96 md:rounded-xl";

  if (loading) {
    return (
      <div className={containerClass}>
        <CircularProgress size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <div className="w-full bg-slate-50 h-full p-3 md:p-5 overflow-x-hidden overflow-y-scroll scrollbar-hidden">
        <div>
          {/* Search Panel */}
          <InteractivePanel id="searchPanel" className={panelClass}>
            <SearchPage />
          </InteractivePanel>

          {/* Profile Panel */}
          <InteractivePanel
            id="profilePanel"
            className="md:left-20 md:ml-1 md:bottom-4 md:w-64 md:rounded-xl"
          >
            <div className="space-y-2 w-full text-xl p-4">
              <OutlineButton
                onClick={() => router.push(routeNames.edit_profile)}
                className="text-left flex items-center space-x-2 w-full border-none"
              >
                <LiaUserEditSolid className="text-xl" />
                <samp className="text-sm">Edit Profile</samp>
              </OutlineButton>
              <OutlineButton
                onClick={logoutHandler}
                className="text-left flex items-center space-x-2 w-full border-none"
              >
                <HiArrowRightOnRectangle className="text-xl" />
                <samp className="text-sm">Log out</samp>
              </OutlineButton>
            </div>
          </InteractivePanel>
        </div>
        <div className="flex gap-4">
          <div className={"bg-white fixed md:static bottom-0"}><ChatBox /></div>
          <div className={"bg-white"}>{children}</div>
        </div>

      </div>
    </div>
  );
};

export default React.memo(NavbarContainer);
