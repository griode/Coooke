"use client";

import NavigationBar from "./navigation_bar";
// bell

export default function NavbarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-screen flex space-x-2 overflow-hidden">
      <NavigationBar />
      <div className="w-full h-full p-4 overflow-hidden">{children}</div>
    </section>
  );
}
