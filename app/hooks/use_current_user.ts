'use client';
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import UserProvider from "../data/provider/user_provider";
import UserModel from "../data/model/user_model";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Nettoyer l'abonnement lorsque le composant est démonté
    return () => unsubscribe();
  }, []);

  return { currentUser, loading };
};

export const useAuth = () => {
  const [userAuth, setUserAuth] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      UserProvider.getUser(user?.uid ?? "").then((userData) => {
        setUserAuth(userData);
        setLoading(false);
      });
    });

    // Nettoyer l'abonnement lorsque le composant est démonté
    return () => unsubscribe();
  }, []);

  return { userAuth, loading };
};
