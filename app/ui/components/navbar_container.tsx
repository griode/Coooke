"use client";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { LiaUserEditSolid } from "react-icons/lia";
import { OutlineButton } from "./button";
import { InteractivePanel } from "./interactive_panel_props";
import NavigationBar from "./navigation_bar";
import { auth } from "@/app/firebase";
import SearchPage from "./search";
import ChatBox from "../chatbox/chatbox";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import "@/app/scroll-style.css";
import { useCurrentUser } from "@/app/hooks/use_current_user";
// bell

export default function NavbarContainer({
  children,
  pageIndex,
}: {
  children: ReactNode;
  pageIndex: number;
}) {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();

  useEffect(() => {
    if (currentUser === null && loading === false) {
      router.push("/"); // Redirect to home page if user is logged in
    }
  }, [router, currentUser, loading]);

  const logoutHandler = async () => {
    router.push("/");
    await auth.signOut();
  };

  if (loading) {
    return <div className="center">Loading...</div>;
  }

  if (auth.currentUser !== null) {
    return (
      <div className="h-screen w-screen flex space-x-0 md:space-x-2 overflow-hidden">
        <NavigationBar pageIndex={pageIndex} />
        <div className="w-full h-full p-2 md:p-4 overflow-x-hidden overflow-y-scroll scrollbar-hidden">
          <div>
            {/* Search Panel */}
            <InteractivePanel
              id="searchPanel"
              className="left-0 top-0 right-0 bottom-0 md:left-20 md:ml-1 md:top-4 md:bottom-4 md:w-96 md:rounded-xl"
            >
              <SearchPage />
            </InteractivePanel>
            {/* Chat Panels */}
            <InteractivePanel
              id="chatPanel"
              className="left-0 top-0 right-0 bottom-0 md:left-20 md:ml-1 md:top-4 md:bottom-4 md:w-96 md:rounded-xl"
            >
              <ChatBox />
            </InteractivePanel>
            {/* Profile Panel */}
            <InteractivePanel
              className="md:left-20 md:ml-1 md:bottom-4 md:w-96 md:rounded-xl"
              id={"profilePanel"}
            >
              <div className="space-y-2 w-full text-xl p-4">
                <OutlineButton
                  onClick={() => router.push("/ui/profile/edit")}
                  className="text-left flex items-center space-x-2 w-full"
                >
                  <LiaUserEditSolid className="text-xl" />
                  <samp className="text-sm">Edit Profile</samp>
                </OutlineButton>
                <OutlineButton
                  onClick={logoutHandler}
                  className="text-left flex items-center space-x-2 w-full"
                >
                  <HiArrowRightOnRectangle className="text-xl" />
                  <samp className="text-sm">Log out</samp>
                </OutlineButton>
              </div>
            </InteractivePanel>
          </div>
          {children}
        </div>
      </div>
    );
  }
  return <div></div>;
}
