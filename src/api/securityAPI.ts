import { GetCaptureUrlType } from "../types/apiTypes";
import { instanse } from "./api";



export const securityAPI = {
    getCaptchaUrt() {
        return instanse.get<GetCaptureUrlType>('security/get-captcha-url')
            .then(response => response.data);
    }
};
