import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from './../api/api';


const SET_USER_DATA = '/auth-reducer/SET_USER_DATA';
const SET_USER_PROFILE = '/auth-reducer/SET_USER_PROFILE'
const SET_CUPTCHA = '/auth-reducer/SET_CUPTCHA'
const SET_ERROR = '/auth-reducer/SET_ERROR'


let inilialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetching: true,
    rememberMe: false,
    captchaUrl: null,
    inStateError: null
};

const authReducer = (state = inilialState, action) => {

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

export const setAuthUserData = (userId, email, login, isAuth, captchaUrl) =>
    ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth, captchaUrl } });
export const setUserProfileData = (profileUserData) => ({ type: SET_USER_PROFILE, profileUserData })
export const setCuptchaUrl = (captchaUrl) => ({ type: SET_CUPTCHA, captchaUrl })
export const setError = (error) => ({ type: SET_ERROR, error })

// thunks

export const getUserDataThunk = () => async (dispatch) => {
    let data = await authAPI.me()

    if (data.resultCode === 0) {
        let { id, login, email } = data.data;
        dispatch(setAuthUserData(id, login, email, true, null));
    }
}

export const LoginThunk = (email, password, rememberMe, captcha) => async (dispatch) => {
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

export const LogoutThunk = () => async (dispatch) => {
    let data = await authAPI.Logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaThunk = () => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrt()
    dispatch(setCuptchaUrl(data.url))
}

export const setErrorThunk = (error) => (dispatch) => {
    dispatch(setError(error))
}


export default authReducer;
