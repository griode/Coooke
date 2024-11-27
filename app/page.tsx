"use client";
/* eslint-disable @next/next/no-img-element */
import {BsSearch, BsStarFill} from "react-icons/bs";
import {CategorySection} from "./ui/components/category_card";
import {SliderCard} from "./ui/components/slider_card";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useCurrentUser} from "./hooks/use_current_user";
import Header from "./ui/components/header";
import {RecipeSection} from "./ui/components/image_recipe_card";
import Image from "next/image";
import arrow from "./assets/icons/arrow.png";

export default function Home() {
  const starIconStyle = "text-yellow-500 h-5 w-5";
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      router.push("/ui/home"); // Redirect to home page if user is logged in
    }
  }, [router, currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-hidden w-screen">
      <main className="lg:mx-16 my-6 mx-6">
        <Header />
        <section className="flex flex-col md:flex-row mt-12 md:space-x-8 space-y-6 lg:space-y-0">
          <div className="lg:w-1/2 w-full">
            <h2 className="text-5xl lg:text-6xl font-bold">
              <div>
                <div className="ml-12 bg-[url('../app/assets/images/text_bg.jpg')] bg-clip-text bg-cover bg-center text-transparent">
                  <span className="text-transparent bg-clip-text bg-cover bg-gradient-to-r from-85% from-black to-transparent">
                    Fresh
                  </span>{" "}
                  Food
                </div>
                <div className="flex">
                  <div className="italic font-medium pb-2 pr-2 text-green-800/70 text-3xl lg:text-4xl">
                    With{" "}
                  </div>
                  Great
                  <span className="relative ml-4">
                    Taste
                    <Image
                      className="absolute w-40 top-0 left-4"
                      src={arrow}
                      alt="fleche"
                    />
                  </span>
                </div>
              </div>
            </h2>
            <p className="mt-12">
              Overall, &quot;Creating Delicious Dishes&quot; is an essential
              resource for anyone looking to start a food business or take their
              culinary skills to the next level.
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
                <BsSearch className="m-3 h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <SliderCard />
            <div className="w-full bg-black text-white rounded-3xl px-8 py-4 mt-4 flex items-center justify-between">
              <p className="font-bold text-lg">3,500 + Ratings</p>
              <div className="flex gap-2">
                <BsStarFill className={starIconStyle} />
                <BsStarFill className={starIconStyle} />
                <BsStarFill className={starIconStyle} />
                <BsStarFill className={starIconStyle} />
              </div>
            </div>
          </div>
        </section>
        <div className="mt-5 md:mt-0 flex space-y-5 md:space-y-0 md:space-x-12 flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex justify-center">
            <CategorySection />
          </div>
          <div className="w-full md:w-1/2 flex">
            <RecipeSection />
          </div>
        </div>
      </main>
    </div>
  );
}
