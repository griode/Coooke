"use client";

import router from "next/router";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { LiaUserEditSolid } from "react-icons/lia";
import { OutlineButton } from "./button";
import { InteractivePanel } from "./interactive_panel_props";
import NavigationBar from "./navigation_bar";
import { auth } from "@/app/firebase";
import SearchPage from "./search";
import RecipeGenerator from "./recipe_generator";
// bell

const logoutHandler = () => {
  auth.signOut().then(() => {
    router.push("/");
  });
};

export default function NavbarContainer({
  children,
  pageIndex,
}: {
  children: React.ReactNode;
  pageIndex: number;
}) {
  return (
    <section className="h-screen w-screen flex space-x-0 md:space-x-2 overflow-hidden">
      <NavigationBar pageIndex={pageIndex} />
      <div className="w-full h-full p-2 md:p-4 overflow-x-hidden overflow-y-scroll">
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
            <RecipeGenerator />
          </InteractivePanel>
          {/* Profile Panel */}
          <InteractivePanel
            className="md:left-20 md:ml-1 md:bottom-4 md:w-96 md:rounded-xl"
            id={"profilePanel"}
          >
            <div className="space-y-2 w-full text-xl p-4">
              <OutlineButton
                onClick={() => router.push("/view/profile/edit")}
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
    </section>
  );
}
