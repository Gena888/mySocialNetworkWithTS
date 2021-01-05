import { PostPutDeleteRegularResponse, LoginResponseType, MeResponseType } from "../types/apiTypes";
import { instanse } from "./api";



export const authAPI = {
    me() {
        return instanse.get<MeResponseType>('auth/me')
            .then(response => response.data);
    },
    Login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instanse.post<LoginResponseType>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(response => response.data);
    },
    Logout() {
        return instanse.delete<PostPutDeleteRegularResponse>('auth/login')
            .then(response => response.data);
    }
};
