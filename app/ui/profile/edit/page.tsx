/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import EditProfileContainer from "../edit_container";

import pickImage from "@/app/backend/utils/image_picker";
import { deleteFileByUrl, uploadBase64ImageCompress, } from "@/app/backend/utils/upload_file";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import Avatar from "@/app/components/avatar";
import { FillButton, OutlineButton } from "@/app/components/button";
import CircularProgress from "@/app/components/circular_progress";
import { useCurrentUser } from "@/app/hooks/use_user_provider";

const EditProfilePage = () => {
    const router = useRouter();
    const { currentUser, userPhotoUrl, setUserPhotoUrl, userInfo } = useCurrentUser();
    const [isUpdate, setIsUpdate] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const changeProfileImageHandler = async () => {
        const image = await pickImage();
        if (image) {
            setIsLoading(true);
            const url = await uploadBase64ImageCompress(image, "profile");
            await deleteFileByUrl(currentUser?.photoURL ?? "");
            updateProfile(currentUser!, {
                photoURL: url,
            });
            setUserPhotoUrl(url);
            setIsLoading(false);
        }
    };

    const oneSaveHandler = () => {
    };


    return (
        <EditProfileContainer pageEditIndex={0}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <h1 className="text-2xl font-bold mb-8">Edit profile</h1>

                <div className="space-y-1 items-center mb-4">
                    <div>Photo</div>
                    <div className="flex space-x-4 items-center ">
                        <div className="relative flex items-center justify-center">
                            <Avatar
                                src={userPhotoUrl ?? ""}
                                alt={currentUser?.displayName ?? ""}
                                width={100}
                                height={100}
                                className="h-20 w-20"
                            />
                            {isLoading && (
                                <div className="absolute z-10">
                                    <CircularProgress infinite={true} size={50} />
                                </div>
                            )}
                        </div>

                        <OutlineButton
                            onClick={changeProfileImageHandler}
                            className="w-fit h-fit"
                        >
                            Change
                        </OutlineButton>
                    </div>
                </div>
                <label htmlFor="fullName">
                    <div className=" border p-4 rounded-3xl mt-6">
                        <div className="font-bold flex space-x-2 items-center">
                            <span>Name</span>
                        </div>
                        <hr className="my-2" />
                        <input
                            onChange={(e) => {
                                if (currentUser?.displayName == e.target.value) {
                                    setIsUpdate(true);
                                } else {
                                    setIsUpdate(false);
                                }
                            }}
                            type="text"
                            name="fullName"
                            id="fullName"
                            defaultValue={currentUser?.displayName ?? ""}
                            className="w-full h-full outline-none bg-transparent"
                        />
                    </div>
                </label>
                <label htmlFor="bio">
                    <div className=" border p-4 rounded-3xl mt-6">
                        <div className="font-bold">Bio</div>
                        <hr className="my-2" />
                        <textarea
                            maxLength={80}
                            onChange={(e) => {
                                if (userInfo?.info == e.target.value) {
                                    setIsUpdate(true);
                                } else {
                                    setIsUpdate(false);
                                }
                            }}
                            name="bio"
                            id="bio"
                            defaultValue={userInfo?.info ?? ""}
                            className="w-full h-full outline-none bg-transparent resize-none"
                        ></textarea>
                    </div>
                </label>
                <hr className="my-8" />
                <div className="space-x-4">
                    <OutlineButton
                        onClick={() => router.push("/ui/profile")}
                        className="w-fit"
                    >
                        Cancel
                    </OutlineButton>
                    <FillButton
                        disabled={isUpdate}
                        onClick={oneSaveHandler}
                        className="w-fit"
                    >
                        Save
                    </FillButton>
                </div>
            </form>
        </EditProfileContainer>
    );
};

export default EditProfilePage;
