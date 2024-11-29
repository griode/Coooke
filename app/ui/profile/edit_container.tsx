"use client";
import { useRouter } from "next/navigation";
import NavbarContainer from "../components/navbar_container";
import { IconButton, OutlineButton } from "../components/button";
import { useState } from "react";
import { HiOutlineCog6Tooth } from "react-icons/hi2";

const NavLink = ({
  children,
  path,
  isActive,
}: {
  children: React.ReactNode;
  path: string;
  isActive?: boolean;
}) => {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer hover:bg-slate-100 rounded-xl px-3 text-xl md:text-lg text-start w-full font-semibold leading-5 my-2"
      onClick={() => {
        router.push(path);
      }}
    >
      <div className="py-3 px-1 md:px-0 md:py-2 ">{children}</div>

      {isActive && <div className="bg-black h-1 rounded-full w-full"></div>}
    </div>
  );
};

const EditProfileContainer = ({
  children,
  pageEditIndex,
}: {
  children: React.ReactNode;
  pageEditIndex: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavbarContainer pageIndex={2}>
      <div className="flex md:mt-10 p-2 md:p-8 md:space-x-20">
        <div
          className={`${
            isOpen ? "block" : "hidden md:block"
          } w-fit border shadow-2xl md:shadow-none md:rounded-2xl p-4 md:h-fit absolute left-0 top-0 h-full md:static bg-white z-20`}
        >
          <OutlineButton className="md:hidden" onClick={toggle}>
            Close
          </OutlineButton>
          <NavLink path="/ui/profile/edit" isActive={pageEditIndex === 0}>
            Edit profile
          </NavLink>
          <NavLink
            path="/ui/profile/account_manager"
            isActive={pageEditIndex === 1}
          >
            Account management
          </NavLink>
        </div>
        <div className="overflow-y-scroll overflow-x-hidden w-full">
          <IconButton
            onClick={toggle}
            className={`mb-4 md:hidden flex items-center space-x-2 absolute top-0 right-0 mt-4 mr-4 ${
              isOpen ? "hidden" : "block"
            }`}
          >
            <HiOutlineCog6Tooth className="text-xl" />
          </IconButton>
          {children}
        </div>
      </div>
    </NavbarContainer>
  );
};

export default EditProfileContainer;
