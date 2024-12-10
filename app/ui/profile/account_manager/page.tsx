"use client";
import EditProfileContainer from "../edit_container";
import {GrLanguage} from "react-icons/gr";
import {TbFrustumOff} from "react-icons/tb";
import {useRouter} from "next/navigation";
// import {useState} from "react";
import {FillButton, OutlineButton} from "@/app/components/button";
// import Chip from "@/app/components/chip";

// const formatDate = (date: Date) => {
//     if (!date) return "2000-01-01"; // Valeur par défaut
//     const d = date;
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
//     const day = String(d.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
// };

const AccountManagerPage = () => {
    const router = useRouter();
    // const [isUpdate, setIsUpdate] = useState<boolean>(true);
    //
    // const oneSaveHandler = () => {
    // };
    //
    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center h-full">Loading...</div>
    //     );
    // }

    return (
        <EditProfileContainer pageEditIndex={1}>
            <form>
                {/* Page Title */}
                <h1 className="text-2xl font-bold mb-8">Account Management</h1>

                {/* Allergy Section */}
                <div className="border p-4 rounded-3xl">
                    <div className="font-bold flex space-x-2 items-center">
                        <TbFrustumOff aria-hidden="true"/> <span>Allergies</span>
                    </div>
                    <hr className="my-2"/>
                    <div className="flex flex-wrap gap-2 items-center">
                        {/*{userAuth?.allergens && userAuth.allergens.length > 0 ? (*/}
                        {/*    userAuth.allergens.map((allergy, index) => (*/}
                        {/*        <Chip key={index} title={allergy}/>*/}
                        {/*    ))*/}
                        {/*) : (*/}
                        {/*    <p className="text-sm text-gray-500">No allergies listed.</p>*/}
                        {/*)}*/}
                        <FillButton className="w-fit" aria-label="Add new allergy">
                            Add Allergy
                        </FillButton>
                    </div>
                </div>

                {/* Birth Date Section */}
                <label htmlFor="birthDate">
                    <div className="border p-4 rounded-3xl mt-6">
                        <div className="font-bold flex space-x-2 items-center">
                            <span>Birth Date</span>
                        </div>
                        <hr className="my-2"/>
                        <input
                            type="date"
                            name="birthDate"
                            id="birthDate"
                            // onChange={(e) => {
                            //     // if (
                            //     //     e.target.value ==
                            //     //     formatDate(userAuth?.birth.toDate() ?? new Date())
                            //     // ) {
                            //     //     setIsUpdate(true);
                            //     // } else {
                            //     //     setIsUpdate(false);
                            //     // }
                            // }}
                            //defaultValue={formatDate(userAuth?.birth.toDate() ?? new Date())}
                            className="w-full h-full outline-none bg-transparent"
                            aria-label="Select your birth date"
                        />
                    </div>
                </label>

                {/* Language Section */}
                <label htmlFor="language">
                    <div className="border p-4 rounded-3xl mt-6">
                        <div className="font-bold flex space-x-2 items-center">
                            <GrLanguage aria-hidden="true"/> <span>Language</span>
                        </div>
                        <hr className="my-2"/>
                        <select
                            name="language"
                            id="language"
                            // onChange={(e) => {
                            //     // if (userAuth?.language == e.target.value) {
                            //     //     setIsUpdate(true);
                            //     // } else {
                            //     //     setIsUpdate(false);
                            //     // }
                            // }}
                            //defaultValue={userAuth?.language ?? "en"}
                            className="w-full h-full outline-none bg-white focus:outline-none"
                            aria-label="Select your preferred language"
                        >
                            {[
                                {key: "fr", value: "French"},
                                {key: "en", value: "English"},
                                {
                                    key: "es",
                                    value: "Spanish",
                                },
                            ].map((lang) => (
                                <option key={lang.key} value={lang.key}>
                                    {lang.value}
                                </option>
                            ))}
                        </select>
                    </div>
                </label>

                {/* Account Deletion Section */}
                <div
                    className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-between items-start md:items-center">
                    <div className="md:w-2/3">
                        <h2 className="font-semibold text-lg">
                            Delete Your Data and Account
                        </h2>
                        <p className="text-sm text-gray-600">
                            Permanently delete your data and everything associated with your
                            account.
                        </p>
                    </div>
                    <OutlineButton
                        className="w-fit h-fit"
                        aria-label="Delete your account"
                        onClick={() => {
                            if (
                                window.confirm("Are you sure you want to delete your account?")
                            ) {
                                // Suppression du compte ici
                            }
                        }}
                    >
                        Delete Account
                    </OutlineButton>
                </div>

                <hr className="my-8"/>

                {/* Action Buttons */}
                <div className="space-x-4 flex">
                    <OutlineButton
                        onClick={() => router.push("/ui/profile")}
                        className="w-fit"
                        aria-label="Cancel changes"
                    >
                        Cancel
                    </OutlineButton>
                    <FillButton
                        // disabled={isUpdate}
                        // onClick={oneSaveHandler}
                        className="w-fit"
                        aria-label="Save changes"
                    >
                        Save
                    </FillButton>
                </div>
            </form>
        </EditProfileContainer>
    );
};

export default AccountManagerPage;
