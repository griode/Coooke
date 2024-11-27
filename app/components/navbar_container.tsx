"use client";

import NavigationBar from "./navigation_bar";
// bell

export default function NavbarContainer({
  children, pageIndex
}: {
    children: React.ReactNode;
    pageIndex: number;
}) {
  return (
    <section className="h-screen w-screen flex space-x-0 md:space-x-2 overflow-hidden">
      <NavigationBar pageIndex={pageIndex} />
      <div className="w-full h-full p-2 md:p-4 overflow-x-hidden overflow-y-scroll">{children}</div>
    </section>
  );
}
