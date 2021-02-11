import { AppStateType } from "../redux-store"


export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const getLogin = (state: AppStateType) => {
    return state.auth.login
}

export const getProfilePhotos = (state: AppStateType) => {
    return state.profilePage.profile?.photos
}

export const getUserId = (state: AppStateType) => {
    return state.auth.userId
}