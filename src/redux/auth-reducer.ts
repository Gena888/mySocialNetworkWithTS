import { FormAction, stopSubmit } from 'redux-form';
import { securityAPI } from "../api/securityAPI";
import { authAPI } from "../api/authAPI";
import { ResultCodesEnum, ResultCodeCaptchaEnum } from '../types/apiTypes';
import { BaseThunkType, InferActionTypes } from './redux-store';


export type AuthInilialStateType = typeof inilialState;
export type ActionTypes = InferActionTypes<typeof AuthReducerActions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>


let inilialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    isFetching: true as boolean,
    rememberMe: false as boolean,
    captchaUrl: null as string | null,
    inStateError: null as string | null,
};

const authReducer = (state = inilialState, action: ActionTypes): AuthInilialStateType => {

    switch (action.type) {

        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        case 'SET_USER_PROFILE':
            // debugger
            return {
                ...state,
                ...action.profileUserData
            }
        case 'SET_CUPTCHA':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        case 'SET_ERROR':
            return {
                ...state,
                inStateError: action.error
            }

        default:
            return state;
    }
}

// action creators

export const AuthReducerActions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl: string | null) =>
        ({ type: 'SET_USER_DATA', payload: { userId, email, login, isAuth, captchaUrl } } as const),
    setUserProfileData: (profileUserData: any) => ({ type: 'SET_USER_PROFILE', profileUserData } as const),
    setCuptchaUrl: (captchaUrl: string) => ({ type: 'SET_CUPTCHA', captchaUrl } as const),
    setError: (error: string | null) => ({ type: 'SET_ERROR', error } as const)
}

// thunks

export const getUserDataThunk = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me()

    if (data.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = data.data;
        dispatch(AuthReducerActions.setAuthUserData(id, login, email, true, null));
    }
}

export const LoginThunk = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.Login(email, password, rememberMe, captcha)

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getUserDataThunk())
        dispatch(setErrorThunk(null))
    } else if (data.resultCode === ResultCodeCaptchaEnum.CaptchaIsRequired) {
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
        dispatch(getCaptchaThunk())
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const LogoutThunk = (): ThunkType => async (dispatch) => {
    let data = await authAPI.Logout()
    if (data.resultCode === 0) {
        dispatch(AuthReducerActions.setAuthUserData(null, null, null, false, null))
    }
}

export const getCaptchaThunk = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrt()
    dispatch(AuthReducerActions.setCuptchaUrl(data.url))
}

export const setErrorThunk = (error: string | null): BaseThunkType<ActionTypes, void> => (dispatch) => {
    dispatch(AuthReducerActions.setError(error))
}


export default authReducer;
