import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth, googleProvider } from "@/app/firebase";

export const signInWithGoogle = async (): Promise<User | null> => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        GoogleAuthProvider.credentialFromResult(result);
        return result.user;
    } catch (error) {
        console.log(error);
        return null;
    }
}