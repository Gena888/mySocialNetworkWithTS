import { createSelector } from "reselect"
import { AppStateType } from "../redux-store"


export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status
}

export const getAutorisedUserId = (state: AppStateType) => {
    return state.auth.userId
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const getIsValidInput = (state: AppStateType) => {
    return state.profilePage.isValidInput
}



