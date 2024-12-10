import React, {createContext, useContext, useEffect, useState} from "react";
import {auth} from "@/app/firebase";
import {User} from "firebase/auth"; // Assurez-vous que `auth` est correctement configuré dans Firebase.

interface UserContextType {
    currentUser: User | null;
    loading: boolean;
    error: Error | null;
    setCurrentUser: (user: User | null) => void;
    userPhotoUrl: string | null;
    setUserPhotoUrl: (url: string | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Écoute des changements d'authentification Firebase
        const unsubscribe = auth.onAuthStateChanged(
            (user) => {
                setCurrentUser(user);
                setUserPhotoUrl(user?.photoURL ?? null);
                setLoading(false);
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
        <UserContext.Provider value={{currentUser, loading, error, setCurrentUser, userPhotoUrl, setUserPhotoUrl}}>
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