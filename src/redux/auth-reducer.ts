import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api';


const SET_USER_DATA = '/auth-reducer/SET_USER_DATA';
const SET_USER_PROFILE = '/auth-reducer/SET_USER_PROFILE'
const SET_CUPTCHA = '/auth-reducer/SET_CUPTCHA'
const SET_ERROR = '/auth-reducer/SET_ERROR'


let inilialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    isFetching: true as boolean,
    rememberMe: false as boolean,
    captchaUrl: null as string | null,
    inStateError: null as string | null
};

export type inilialStateType = typeof inilialState;

const authReducer = (state = inilialState, action: any): inilialStateType => {

    switch (action.type) {

        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case SET_USER_PROFILE:
            // debugger
            return {
                ...state,
                ...action.profileUserData
            }
        case SET_CUPTCHA:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        case SET_ERROR:
            return {
                ...state,
                inStateError: action.error
            }

        default:
            return state;

    }
}
// action creators
type SetAuthUserDataPayloadType = {
    userId: number| null,
    email: string| null,
    login: string| null,
    isAuth: boolean,
    captchaUrl: string| null
}

type SetAuthUserDataType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataPayloadType
}

type SetUserProfileDataType = {
    type: typeof SET_USER_PROFILE,
    profileUserData: any
}

type SetCuptchaUrlType = {
    type: typeof SET_CUPTCHA,
    captchaUrl: string
}

type SetErrorType = {
    type: typeof SET_ERROR,
    error: string | null
}

export const setAuthUserData = (userId: number| null , email: string| null, login: string| null, isAuth: boolean, captchaUrl: string | null): SetAuthUserDataType =>
    ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth, captchaUrl } });
export const setUserProfileData = (profileUserData: any): SetUserProfileDataType => ({ type: SET_USER_PROFILE, profileUserData })
export const setCuptchaUrl = (captchaUrl: string): SetCuptchaUrlType => ({ type: SET_CUPTCHA, captchaUrl })
export const setError = (error: string | null): SetErrorType => ({ type: SET_ERROR, error })

// thunks

export const getUserDataThunk = () => async (dispatch: any) => {
    let data = await authAPI.me()

    if (data.resultCode === 0) {
        let { id, login, email } = data.data;
        dispatch(setAuthUserData(id, login, email, true, null));
    }
}

export const LoginThunk = (email:string, password:string, rememberMe:boolean, captcha:string) => async (dispatch:any) => {
    let data = await authAPI.Login(email, password, rememberMe, captcha)

    if (data.resultCode === 0) {
        dispatch(getUserDataThunk())
        dispatch(setErrorThunk(null))
    } else if (data.resultCode === 10) {
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
        dispatch(getCaptchaThunk())
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const LogoutThunk = () => async (dispatch:any) => {
    let data = await authAPI.Logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, null))
    }
}

export const getCaptchaThunk = () => async (dispatch:any) => {
    let data = await securityAPI.getCaptchaUrt()
    dispatch(setCuptchaUrl(data.url))
}

export const setErrorThunk = (error:string | null) => (dispatch:any) => {
    dispatch(setError(error))
}


export default authReducer;
