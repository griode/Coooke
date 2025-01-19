import { apiConfig } from "@/api/config";
import { UserAuth } from "@/api/entities/user_auth";


export class UserProvider {
    static user: UserAuth | undefined;

    static get = async (uid: string) => {
        try {
            const response = await fetch(`${apiConfig.base_url}/user/?uid=${uid}`, {
                method: 'GET',
                headers: apiConfig.request_headers,
            })
            if (response.ok) {
                console.log(response);
                const data = (await response.json())['data'] as UserAuth[];
                return data.length > 0 ? data[0] : null;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            return null;
        }
    }

    // add new user
    static create = async (user: UserAuth) => {
        try {
            const response = await fetch(`${apiConfig.base_url}/user/`, {
                method: 'POST',
                headers: apiConfig.request_headers,
                body: JSON.stringify(user)
            })

            if (response.ok) {
                const data = (await response.json())['data'] as UserAuth[];
                return data.length > 0 ? data[0] : null;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Unexpected error:", error)
            return null
        }
    }
}