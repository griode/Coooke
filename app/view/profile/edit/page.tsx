/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {FillButton, OutlineButton} from "@/app/components/button";
import {useRouter} from "next/navigation";
import EditProfileContainer from "../edit_container";
import Avatar from "@/app/components/avatar";
import {useAuth, useCurrentUser} from "@/app/hooks/use_current_user";
import pickImage from "@/app/data/functions/image_picker";
import {deleteFileByUrl, uploadBase64File,} from "@/app/data/functions/upload_file";
import {updateProfile} from "firebase/auth";
import {useState} from "react";

const EditProfilePage = () => {
  const router = useRouter();
  const { userAuth, loading } = useAuth();
  const { currentUser } = useCurrentUser();
  const [isUpdate, setIsUpdate] = useState<boolean>(true);

  const changeProfileImageHandler = async () => {
    const image = await pickImage();
    if (image) {
      const url = await uploadBase64File(image, "profile");
      deleteFileByUrl(currentUser?.photoURL ?? "");
      updateProfile(currentUser!, {
        photoURL: url,
      });
      currentUser?.reload();
      window.location.reload();
    }
  };

  const oneSaveHandler = () => {};

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
        <h1 className="text-2xl font-bold mb-4">Edit profile</h1>

        <div className="space-y-1 items-center mb-4">
          <div>Photo</div>
          <div className="flex space-x-4 items-center ">
            <Avatar
              src={currentUser?.photoURL ?? ""}
              alt={userAuth?.fullName ?? ""}
              width={100}
              height={100}
              className="h-20 w-20"
            />
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
            onClick={() => router.push("/view/profile")}
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
