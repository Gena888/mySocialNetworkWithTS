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

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeCaptchaEnum {
    CaptchaIsRequired = 10
} 