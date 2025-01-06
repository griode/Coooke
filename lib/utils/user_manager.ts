"use server";

import { cookies } from "next/headers";

export const getUserId = async () => {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get("userId");
        if (!userId) {
            return null;
        }
        return userId;
    } catch (error) {
        console.error("Error getting user id:", error);
        return null;
    }
};

export const setUserId = async (userId: string) => {
    try {
        const cookieStore = await cookies();
        cookieStore.set("userId", userId);
    } catch (error) {
        console.error("Error setting user id:", error);
    }
};

export const deleteUserId = async () => {
    try {
        const cookieStore = await cookies();
        cookieStore.set("userId", "");
    } catch (error) {
        console.error("Error deleting user id:", error);
    }
};