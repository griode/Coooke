"use client";
import NavbarContainer from "@/app/components/navbar_container";
import { useCurrentUser } from "@/app/hooks/use_current_user";
import Avatar from "@/app/components/avatar";
import Chip from "@/app/components/chip";
import { GrLanguage } from "react-icons/gr";
import { TbFrustumOff } from "react-icons/tb";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { currentUser, loading } = useCurrentUser();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  const logoutHandler = () => {
    auth.signOut().then(() => {
      router.push("/");
    });
  };

  return (
    <NavbarContainer>
      <div className="flex space-x-4 items-center">
        <Avatar
          src={currentUser?.photoURL ?? ""}
          alt={currentUser?.displayName ?? ""}
          width={100}
          height={100}
          radius={120}
        />
        <div className="space-y-2">
          <div>Profile</div>
          <h1 className="text-6xl font-extrabold">
            {currentUser?.displayName ?? "User"}
          </h1>
          <button className="px-4 py-1 text-sm border rounded-full">
            Edit
          </button>
        </div>
      </div>
      <div className="flex mt-10">
        <div className="w-1/2">
          <div className=" border p-4 rounded-3xl">
            <div className="font-bold flex space-x-2 items-center">
              <TbFrustumOff /> <span>Allergy</span>
            </div>
            <hr className="my-2" />
            <div className="flex flex-wrap gap-2">
              <Chip title={"Cornish"} />
              <Chip title={"Onion"} />
              <Chip title={"Garlic"} />
              <Chip title={"Mushroom"} />
            </div>
          </div>
          <div className=" border p-4 rounded-3xl mt-6">
            <div className="font-bold flex space-x-2 items-center">
              <GrLanguage /> <span>Language</span>
            </div>
            <hr className="my-2" />
            <div className="text-sm">English</div>
          </div>
          <div className=" border p-4 rounded-3xl mt-6">
            <div className="font-bold">Bio</div>
            <hr className="my-2" />
            <div className="text-sm">
              I love cooking and eating delicious food. I am passionate about
              creating healthy and tasty meals that are easy to prepare and
              enjoy.
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={logoutHandler}
              className="border py-2 px-4 rounded-xl w-full"
            >
              Log out
            </button>
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
      <hr className="mt-8" />
      <div></div>
    </NavbarContainer>
  );
}
