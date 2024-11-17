import NavigationBar from "./navigation_bar";
import { GrNotification } from "react-icons/gr";

export default function NavbarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen w-screen flex space-x-2 overflow-hidden">
      <NavigationBar />
      <div className="w-full h-full p-4 overflow-scroll">
        <div className="flex items-center justify-end">
          <button className="rounded-full bg-black text-white p-2 hover:bg-black/80 mb-4">
            <GrNotification />
          </button>
        </div>
        {children}
      </div>
    </section>
  );
}
