/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import EditProfileContainer from "../edit_container";
import { useAuth, useCurrentUser } from "@/app/hooks/use_current_user";
import pickImage from "@/app/data/utils/image_picker";
import {
  deleteFileByUrl,
  uploadBase64File,
} from "@/app/data/utils/upload_file";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import Avatar from "../../components/avatar";
import { OutlineButton, FillButton } from "../../components/button";
import CircularProgress from "../../components/circular_progress";

const EditProfilePage = () => {
  const router = useRouter();
  const { userAuth, loading } = useAuth();
  const { currentUser } = useCurrentUser();
  const [isUpdate, setIsUpdate] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeProfileImageHandler = async () => {
    const image = await pickImage();
    if (image) {
      setIsLoading(true);
      const url = await uploadBase64File(image, "profile");
      deleteFileByUrl(currentUser?.photoURL ?? "");
      updateProfile(currentUser!, {
        photoURL: url,
      });
      currentUser?.reload();
      setIsLoading(false);
      window.location.reload();
    }
  };

  const oneSaveHandler = () => { };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                src={currentUser?.photoURL ?? ""}
                alt={userAuth?.fullName ?? ""}
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
                if (userAuth?.fullName == e.target.value) {
                  setIsUpdate(true);
                } else {
                  setIsUpdate(false);
                }
              }}
              type="text"
              name="fullName"
              id="fullName"
              defaultValue={userAuth?.fullName ?? ""}
              className="w-full h-full outline-none bg-transparent"
            />
          </div>
        </label>
        <label htmlFor="bio">
          <div className=" border p-4 rounded-3xl mt-6">
            <div className="font-bold">Bio</div>
            <hr className="my-2" />
            <textarea
              onChange={(e) => {
                if (userAuth?.info == e.target.value) {
                  setIsUpdate(true);
                } else {
                  setIsUpdate(false);
                }
              }}
              name="bio"
              id="bio"
              defaultValue={userAuth?.info ?? ""}
              className="w-full h-full outline-none bg-transparent"
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
