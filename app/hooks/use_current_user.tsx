import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/app/firebase";
import { User } from "firebase/auth";
import { UserAuth } from "@/app/api/entities/user_auth";
import { UserProvider } from "@/app/api/provider/user_provider";

interface UserContextType {
  currentUser: User | null;
  loading: boolean;
  error: Error | null;
  setCurrentUser: (user: User | null) => void;
  userPhotoUrl: string | null;
  setUserPhotoUrl: (url: string | null) => void;
  userInfo: UserAuth | null;
  setUserInfo: (userInfo: UserAuth | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProviderContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [userInfo, setUserInfo] = useState<UserAuth | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setCurrentUser(user);
        setUserPhotoUrl(user?.photoURL ?? null);
        setLoading(false);

        UserProvider.get(user?.uid ?? "").then(
          (value) => {
            if (value === null && user) {
              const newUser: UserAuth = {
                uid: user.uid,
                full_name: user.displayName ?? "",
                email: user.email ?? "",
                photo_url: user.photoURL ?? "",
                info_message: `Hi ${user.displayName}! Welcome to CookBook! 👋, I'm your personal assistant. I'm here to help you cook delicious meals.`,
              };
              UserProvider.create(newUser).then(() => setUserInfo(newUser));
              setLoading(false);
              setCurrentUser(user);
            } else {
              setUserInfo(value);
            }
          },
          (error) => {
            setError(error);
          }
        );
      },
      (firebaseError) => {
        setError(firebaseError);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        loading,
        error,
        setCurrentUser,
        userPhotoUrl,
        setUserPhotoUrl,
        userInfo,
        setUserInfo,
      }}
    >
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
