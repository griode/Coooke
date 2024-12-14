import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/app/firebase";
import { User } from "firebase/auth";
import UserModel from "@/app/backend/model/user_model";
import UserProvider from "@/app/backend/provider/user_provider"; // Assurez-vous que `auth` est correctement configuré dans Firebase.
import { Timestamp } from "firebase/firestore";

interface UserContextType {
    currentUser: User | null;
    loading: boolean;
    error: Error | null;
    setCurrentUser: (user: User | null) => void;
    userPhotoUrl: string | null;
    setUserPhotoUrl: (url: string | null) => void;
    userInfo: UserModel | null;
    setUserInfo: (userInfo: UserModel | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProviderContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [userInfo, setUserInfo] = useState<UserModel | null>(null);

    useEffect(() => {
        // Écoute des changements d'authentification Firebase
        const unsubscribe = auth.onAuthStateChanged(
            (user) => {
                setCurrentUser(user);
                setUserPhotoUrl(user?.photoURL ?? null);
                setLoading(false);
                UserProvider.getUser(user?.uid ?? "").then(
                    (value) => {
                        if (value === null) {
                            const newUser = new UserModel({
                                id: user?.uid ?? "",
                                fullName: user?.displayName ?? "",
                                email: user?.email ?? "",
                                birth: Timestamp.fromDate(new Date()),
                                allergens: [],
                                diet: "",
                                info: "",
                                language: "",
                                cuisine: "",
                                existingRecipes: [],
                                weight: 0,
                                size: 0,
                                gender: "",
                                registrationToken: "",
                                numberAuthorizedRequest: 0,
                                isPremium: false,
                                lastRequest: Timestamp.fromDate(new Date()),
                                numberRequest: 0,
                                favoriteRecipes: [],
                                createdBy: user?.uid ?? "",
                            })
                            UserProvider.createUser(newUser).then(() => setUserInfo(newUser));
                        } else {
                            setUserInfo(value);
                        }

                    },
                    (error) => {
                        setError(error);
                    }
                )

            },
            (firebaseError) => {
                setError(firebaseError);
                setLoading(false);
            }
        );

        // Nettoyage de l'écouteur lors du démontage du composant
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider
            value={{ currentUser, loading, error, setCurrentUser, userPhotoUrl, setUserPhotoUrl, userInfo, setUserInfo }}>
            {loading ? <div>Loading...</div> : children}
        </UserContext.Provider>
    );
};

export const useCurrentUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useCurrentUser must be used within a UserProvider");
    }
    return context;
};