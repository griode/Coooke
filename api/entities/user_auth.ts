export type UserAuth = {
    uid: string;
    fullname: string;
    photoURL: string;
    birthday: Date;
    numberOfTokens: number;
    lastRequest: Date;
    email: string;
    createdAt: Date;
    status: boolean;
}