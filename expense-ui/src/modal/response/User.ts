import { Profile } from "./Profile";

export interface User{
    user: {
        name?: string;
        email?: string;
    }
    profile?: Profile
}

export interface LoginCredential{
    username: string;
    password: string;
}

export interface UserToken{
    token: string | null;
    refreshToken: string | null;
    expireIn: string | null;
}