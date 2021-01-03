import axios, { AxiosResponse } from "axios";
import { LoginResponseType, MeResponseType } from "../types/apiTypes";
import { ProfileType } from "../types/types";
import Message from './../components/Dialogs/Message/Message';


const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'fd404da8-ea6d-494b-90d2-bb5c412e9027'
    }
}
);



export const userAPI = {
    unfollowUser(id: number) {
        return instanse.delete(`follow/${id}`)
            .then(response => response.data)
    },


    followUser(id: number) {
        return instanse.post(`follow/${id}`, {})
            .then(response => response.data)
    },

    getUsers(currentPage: number, pageSize: number) {
        return instanse.get(`users?page=${currentPage}&count=${pageSize} `)
            .then(response => response.data)
    },

    getUsers2(pageNumber: number, pageSize: number) {
        return instanse.get(`users?page=${pageNumber}&count=${pageSize}`)
            .then(response => response.data)
    }
}



export const profileAPI = {
    getProfileData(profileId: number) {
        return instanse.get('profile/' + profileId)
            .then(response => response.data)
    },

    getStatus(userId: number) {
        return instanse.get('profile/status/' + userId)
            .then(response => response.data)
    },

    updateStatus(status: string) {
        return instanse.put('profile/status/', { status: status })
            .then(response => response.data)
    },
    putNewPhoto(photoFile: any) {
        let formData = new FormData();
        formData.append('image', photoFile)
        return instanse.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'mulipart/form-data'
            }
        })
            .then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return instanse.put('profile', profile)
            .then(response => response.data)
    }

}


export const authAPI = {

    me() {
        return instanse.get<MeResponseType>('auth/me')
            .then(response => response.data)

    },

    Login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instanse.post<LoginResponseType>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(response => response.data)
    },

    Logout() {
        return instanse.delete('auth/login')
            .then(response => response.data)
    }

}

export const securityAPI = {
    getCaptchaUrt() {
        return instanse.get('security/get-captcha-url')
            .then(response => response.data)
    }
}

