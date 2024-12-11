"use client";
import {useRouter} from "next/navigation";
import NavbarContainer from "@/app/components/navbar_container";
import {FillButton, IconButton} from "@/app/components/button";
import React, {useState} from "react";
import {HiOutlineCog6Tooth, HiXMark} from "react-icons/hi2";
import {auth} from "@/app/firebase";

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
    const router = useRouter();

    const logoutHandler = () => {
        auth.signOut().then(() => router.push("/"))
    };

    return (
        <NavbarContainer pageIndex={2}>
            <div className="flex md:mt-10 p-2 md:p-8 md:space-x-20">
                <div
                    className={`${
                        isOpen ? "block" : "hidden md:block"
                    } w-full md:w-1/3 border shadow-2xl md:shadow-none md:rounded-2xl p-3 md:p-4 md:h-fit fixed left-0 top-0 h-full md:static bg-white z-20`}
                >
                    <div className="md:hidden flex justify-between items-center ml-3 mb-4">
                        <h2 className="text-2xl font-bold">Setting</h2>
                        <IconButton onClick={toggle}>
                            <HiXMark/>
                        </IconButton>
                    </div>

                    <NavLink path="/ui/profile/edit" isActive={pageEditIndex === 0}>
                        Edit profile
                    </NavLink>
                    <NavLink
                        path="/ui/profile/account_manager"
                        isActive={pageEditIndex === 1}
                    >
                        Account management
                    </NavLink>
                    <FillButton
                        onClick={logoutHandler}
                        className={"w-full md:hidden mt-2"}>Log out</FillButton>
                </div>
                <div className="overflow-y-scroll overflow-x-hidden w-full">
                    <IconButton
                        onClick={toggle}
                        className={`mb-4 md:hidden flex items-center space-x-2 absolute top-0 right-0 mt-4 mr-4 ${
                            isOpen ? "hidden" : "block"
                        }`}
                    >
                        <HiOutlineCog6Tooth/>
                    </IconButton>
                    {children}
                </div>

            </div>
        </NavbarContainer>
    );
};

export default EditProfileContainer;