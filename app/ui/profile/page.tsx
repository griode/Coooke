"use client";
import {useRouter} from "next/navigation";
import Avatar from "@/app/components/avatar";
import {OutlineButton} from "@/app/components/button";
import NavbarContainer from "@/app/components/navbar_container";
import {useCurrentUser} from "@/app/hooks/use_user_provider";

export default function ProfilePage() {
    const {currentUser, loading} = useCurrentUser();
    const router = useRouter(); // Initialize router

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <NavbarContainer pageIndex={4}>
            <div className="flex space-x-4 items-center p-2 md:p-8">
                <Avatar
                    src={currentUser?.photoURL ?? ""}
                    alt={currentUser?.displayName ?? ""}
                    width={100}
                    height={100}
                    className="h-24 w-24 md:h-36 md:w-36"
                />
                <div className="space-y-2">
                    <div>Profile</div>
                    <h1 className="text-4xl md:text-6xl font-extrabold">
                        {currentUser?.displayName ?? "User"}
                    </h1>
                    <OutlineButton
                        onClick={() => router.push("/ui/profile/edit")}
                        className="w-fit"
                    >
                        Edit
                    </OutlineButton>
                </div>
            </div>
        </NavbarContainer>
    );
}