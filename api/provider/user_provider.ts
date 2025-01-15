import UserModel from "@/data/entities/user_auth";
import {apiConfig} from "@/data/config";


export class UserProvider {
    static users: UserModel | undefined;

    get = async (uid: string)=> {
        const response = await fetch(`${apiConfig.base_url}/user/?uid=${uid}`)
        const data = await response.json()
    }

    // add new user
    create = (user: UserModel)=> {
        const response = fetch(`${apiConfig.base_url}/user/`, {
            method: 'POST',
            body: JSON.stringify(user)
        })
    }

    // update user token
}