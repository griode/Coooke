import Button from "./components/button";
import Image from "next/image";
import fleche from "@/app/assets/images/fleche.png";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function Home() {
  const navLinks = ["Home", "Menu", "Booking", "Pricing"];
  return (
    <div>
      <main className="mx-16 my-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Good <span className="text-orange-400">Food</span>
          </h1>
          <nav className="flex gap-4">
            <ul className="flex gap-4">
              {navLinks.map((link, index) => (
                <li className="text-sm cursor-pointer" key={index}>
                  {link}
                </li>
              ))}
            </ul>
          </nav>
          <Button>Login</Button>
        </header>
        <section className="flex my-16 space-x-6">
          <div className="w-1/2">
            <h2 className="text-6xl font-bold">
              <div>
                <div className="ml-12">Fresh Food</div>
                <div className="flex">
                  <div className="italic font-medium pb-2 pr-2 text-green-800/70 text-4xl">
                    With{" "}
                  </div>
                  Great Taste
                </div>
                <div className="flex justify-end w-96">
                  <Image src={fleche} alt="fleche" width={64} height={64} />
                </div>
              </div>
            </h2>
            <p className="mt-5">
              Overall, "Creating Delicious Dishes" is an essential resource for
              anyone looking to start a food business or take their culinary
              skills to the next level.
            </p>
            <div className="mt-12 rounded-full justify-end flex items-center">
              <input
                className="focus:bg-transparent shadow-lg shadow-slate-100 border outline-none text-sm pl-8 py-4 rounded-full bg-transparent w-full"
                type="search"
                name="search"
                id="search"
                placeholder="Find Great Food"
              />
              <button className="bg-black rounded-full text-white absolute mr-1">
                <MagnifyingGlassIcon className="m-3 h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <div className="w-full h-80 bg-slate-100 rounded-3xl"></div>
            <div className="w-full bg-black text-white rounded-3xl px-8 py-4 mt-4">
              <p className="font-bold text-lg">3,500 + Ratings</p>
              <div></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}