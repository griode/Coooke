/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import UserModel from "../model/user_model";
import { db } from "@/app/firebase";

class UserProvider {

    static async createUser(user: UserModel) {
        if (user && user.id) {
            try {
                const docRef = doc(db, "users", user.id);
                await setDoc(docRef, user.toFirestore());
            } catch (error) {
                console.error("Error creating document:", error);
            }
        }
    }

    static async getUser(userId: string): Promise<UserModel | null> {
        if (userId !== null || userId !== "") {
            try {
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return UserModel.fromFirestore(docSnap);
                } else {
                    return null;
                }
            } catch (error) {
                console.log("Error getting document:", error);
                return null;
            }
        }
        return null;
    }

    // update user
    static async updateUser(userId: string, data: any) {
        try {
            const docRef = doc(db, "users", userId);
            await updateDoc(docRef, data);
        } catch (error) {
            console.error("Error updating document:", error);
        }
    }
}

export default UserProvider;
