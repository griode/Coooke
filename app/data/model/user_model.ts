import {DocumentSnapshot, Timestamp} from 'firebase/firestore';

class UserModel {
    id?: string;
    fullName: string;
    email?: string | null;
    birth: Timestamp;
    allergens: string[] = []; // Replace 'any' with a more specific type if known
    diet: string;
    info?: string | null;
    language?: string | null;
    cuisine?: string | null;
    existingRecipes?: string[] | null; // Replace 'any' with a specific type if known
    weight?: number; // Replace 'any' with number, string, or other specific type
    size?: number; // Replace 'any' with number, string, or other specific type
    gender?: string | null;
    registrationToken?: string | null;
    numberAuthorizedRequest: number;
    isPremium: boolean;
    lastRequest?: Timestamp | null;
    numberRequest: number;
    favoriteRecipes: string[] = [];
    createdBy: string;

    constructor(params: {
        id?: string;
        fullName: string;
        email?: string | null;
        birth: Timestamp;
        allergens: string[];
        diet: string;
        info?: string | null;
        language?: string | null;
        cuisine?: string | null;
        existingRecipes?: string[] | null;
        weight?: number;
        size?: number;
        gender?: string | null;
        registrationToken?: string | null;
        numberAuthorizedRequest: number;
        isPremium: boolean;
        lastRequest?: Timestamp | null;
        numberRequest: number;
        favoriteRecipes: string[];
        createdBy: string;
    }) {
        this.id = params.id;
        this.fullName = params.fullName;
        this.email = params.email;
        this.birth = params.birth;
        this.allergens = params.allergens;
        this.diet = params.diet;
        this.info = params.info;
        this.language = params.language;
        this.cuisine = params.cuisine;
        this.existingRecipes = params.existingRecipes;
        this.weight = params.weight;
        this.size = params.size;
        this.gender = params.gender;
        this.registrationToken = params.registrationToken;
        this.numberAuthorizedRequest = params.numberAuthorizedRequest;
        this.isPremium = params.isPremium;
        this.lastRequest = params.lastRequest;
        this.numberRequest = params.numberRequest;
        this.favoriteRecipes = params.favoriteRecipes;
        this.createdBy = params.createdBy;
    }

    static fromFirestore(
        snapshot: DocumentSnapshot,
    ): UserModel {
        const data = snapshot.data();
        if (!data) throw new Error('Document data is undefined');
        return new UserModel({
            id: snapshot.id,
            fullName: data['fullName'],
            email: data['email'],
            birth: data['birth'],
            allergens: data['allergens'],
            diet: data['diet'],
            info: data['info'],
            language: data['language'],
            cuisine: data['cuisine'],
            existingRecipes: data['existingRecipes'],
            weight: data['weight'],
            size: data['size'],
            gender: data['gender'],
            registrationToken: data['registrationToken'],
            numberAuthorizedRequest: data['numberAuthorizedRequest'],
            isPremium: data['isPremium'],
            lastRequest: data['lastRequest'],
            numberRequest: data['numberRequest'],
            favoriteRecipes: data['favoriteRecipes'] ?? [],
            createdBy: data['createdBy'],
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toFirestore(): Record<string, any> {
        return {
            id: this.id,
            fullName: this.fullName,
            email: this.email,
            birth: this.birth,
            allergens: this.allergens,
            diet: this.diet,
            info: this.info,
            language: this.language,
            cuisine: this.cuisine,
            existingRecipes: this.existingRecipes,
            weight: this.weight,
            size: this.size,
            gender: this.gender,
            registrationToken: this.registrationToken,
            numberAuthorizedRequest: this.numberAuthorizedRequest,
            isPremium: this.isPremium,
            lastRequest: this.lastRequest,
            numberRequest: this.numberRequest,
            favoriteRecipes: this.favoriteRecipes,
            createdAt: Timestamp.fromDate(new Date()),
            updatedAt: Timestamp.fromDate(new Date()),
            createdBy: this.createdBy,
        };
    }
}

export default UserModel;