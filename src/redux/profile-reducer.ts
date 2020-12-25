import { profileAPI } from '../api/api';
import { stopSubmit } from 'redux-form';
import { PhotosType, postDataType, ProfileType } from '../types/types';

const ADD_POST = '/profile-reducer/ADD-POST';
const SET_USER_PROFILE = '/profile-reducer/SET_USER_PROFILE';
const SET_STATUS = '/profile-reducer/SET_STATUS';
const DELETE_POST = '/profile-reducer/DELETE_POST';
const SAVE_PHOTO_SUCCESS = '/profile-reducer/SAVE_PHOTO_SUCCESS';
const SET_IS_VALID_INPUT = '/profile-reducer/SET_IS_VALID_INPUT'


export type InitialStateType = typeof initialState

let initialState = {
    postsData: [
        { id: 1, likes: 121, message: 'Hallow it\'s my first post. ' },
        { id: 2, likes: 231, message: 'Here should be second post but i\'v got no idea.' },
        { id: 3, likes: 321, message: 'For third post i\'v still have no idea. I guess twitter in not for me.' }
    ] as Array<postDataType>,
    profile: null as ProfileType | null,
    status: ' ' as string,
    isValidInput: false as boolean,
    newPostText: ' ' as string,
    isAuth: false as boolean

};

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {

        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newTextBody,
                likes: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };

        case SET_STATUS:
            return {
                ...state,
                status: action.status

            }
        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id != action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType
                // временное решение
            }
        case SET_IS_VALID_INPUT:
            return {
                ...state,
                isValidInput: action.isValid
            }


        default:
            return state;

    };

};
// action creators

type DeletePostACActionType = {
    type: typeof DELETE_POST
    postId: number
}
type AddNewPostACActionType = {
    type: typeof ADD_POST
    newTextBody: string
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType | null
}
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
type SavaPhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
type SetIsValidInputActionType = {
    type: typeof SET_IS_VALID_INPUT
    isValid: boolean
}


export const deletePostAC = (postId: number): DeletePostACActionType => ({ type: DELETE_POST, postId })
export const addNewPostAC = (newTextBody: string): AddNewPostACActionType => ({ type: ADD_POST, newTextBody });
export const setUserProfile = (profile: ProfileType | null): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status })
export const savaPhotoSuccess = (photos: PhotosType): SavaPhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos })
export const setIsValidInput = (isValid: boolean): SetIsValidInputActionType => ({ type: SET_IS_VALID_INPUT, isValid })

/// thunks


export const getProfileDataThunk = (userId: number | null) => async (dispatch: any) => {
    let data = await profileAPI.getProfileData(userId)
    dispatch(setUserProfile(data));
}

export const getStatusThunk = (userId: number | null) => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(setStatus(data));
}
//по окончанию асинхронной операции мы пытаемся выполнить try, если пришла ошибка -
// - мы перехватываем её catch и что то с ней делаем, в ней есть message. код шибки(500/404 и тд.)
// это локальный обработчик ошибок в противовес глоаблному в app.js
export const updateStatusThunk = (status: string) => async (dispatch: any) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        console.log(error)
    }
}

export const savePhotoThunk = (file: any) => async (dispatch: any) => {
    let data = await profileAPI.putNewPhoto(file)
    if (data.resultCode === 0) {
        dispatch(savaPhotoSuccess(data.data.photos));
    }
}


export const saveProfileThunk = (profile: ProfileType | null) => async (dispatch: any, getState: any) => {
    let userId = getState().auth.userId
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        dispatch(getProfileDataThunk(userId))
        dispatch(setIsValidInput(true))

    } else {
        dispatch(setIsValidInput(false))
        let wrongNetwork = data.messages[0].slice(
            data.messages[0].indexOf(">") + 1,
            data.messages[0].indexOf(")")
        )
            .toLocaleLowerCase();
        dispatch(
            stopSubmit("edit-profile", {
                contacts: { [wrongNetwork]: data.messages[0] }
            })
        );
        return Promise.reject(data.messages[0]);

        // как сделать чтобы все сообщения сразу подсветились? 
    }

}


export default profileReducer;



// let key = data.messages[0].match(/Contacts->(\w+)/)[1].toLowerCase();
// dispatch(stopSubmit('edit-profile', {
//     contacts: { [key]: data.messages[0] },
// })); тоже самое что и выше в else только с регулярным выражением. 