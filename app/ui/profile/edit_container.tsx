"use client";
import { useRouter } from "next/navigation";
import NavbarContainer from "../components/navbar_container";

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
      className="cursor-pointer hover:bg-slate-100 rounded-xl px-3 text-lg text-start w-full font-semibold leading-5 my-2"
      onClick={() => {
        router.push(path);
      }}
    >
      <div className="py-2 ">{children}</div>

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
  return (
    <NavbarContainer pageIndex={2}>
      <div className="flex mt-10 p-8 space-x-20">
        <div className="w-64 border rounded-2xl p-4 h-fit">
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
        <div className="w-1/2 overflow-y-scroll overflow-x-hidden">
          {children}
        </div>
      </div>
    </NavbarContainer>
  );
};

export default EditProfileContainer;
