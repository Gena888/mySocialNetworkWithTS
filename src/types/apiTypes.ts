
// userAPI

import { ContactsType, PhotosType } from "./types"

export type GetUserType = {
    count: number
    page: number
    term: string
    friend: boolean
}

// profileAPI


export type ProfileApiType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type ProfilePhotoApiType = {
    data: PhotosType
    resultCode: ResultCodesEnum
    messages: Array<string>
}

// authAPI
export type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export type LoginResponseType = {
    resultCode: ResultCodesEnum | ResultCodeCaptchaEnum
    messages: Array<string>
    data: {
        userId: number
    }
}

// securityAPI 

export type GetCaptureUrlType = {
    url: string
}

// common 

export type PostPutDeleteRegularResponse = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {
        data: Array<string>
    }
}

// enum's

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeCaptchaEnum {
    CaptchaIsRequired = 10
} 