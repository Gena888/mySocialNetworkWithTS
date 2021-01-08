import { stopSubmit, FormAction } from 'redux-form';
import { PhotosType, postDataType, ProfileType } from '../types/types';
import { profileAPI } from './../api/profileAPI';
import { BaseThunkType, InferActionTypes } from './redux-store';

export type InitialStateType = typeof initialState
export type ActionTypes = InferActionTypes<typeof profileReducerActions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>

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

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        case 'ADD_POST':
            let newPost = {
                id: 5,
                message: action.newTextBody,
                likes: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            };
        case 'SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            };

        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'DELETE_POST':
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id != action.postId)
            }
        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                } as ProfileType
                // временное решение
            }
        case 'SET_IS_VALID_INPUT':
            return {
                ...state,
                isValidInput: action.isValid
            }


        default:
            return state;

    };

};
// action creators



export const profileReducerActions = {
    deletePostAC: (postId: number) => ({ type: 'DELETE_POST', postId } as const),
    addNewPostAC: (newTextBody: string) => ({ type: 'ADD_POST', newTextBody } as const),
    setUserProfile: (profile: ProfileType | null) => ({ type: 'SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
    savaPhotoSuccess: (photos: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photos } as const),
    setIsValidInput: (isValid: boolean) => ({ type: 'SET_IS_VALID_INPUT', isValid } as const)
}
/// thunks


export const getProfileDataThunk = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfileData(userId)
    dispatch(profileReducerActions.setUserProfile(data));
}

export const getStatusThunk = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(profileReducerActions.setStatus(data));
}
//по окончанию асинхронной операции мы пытаемся выполнить try, если пришла ошибка -
// - мы перехватываем её catch и что то с ней делаем, в ней есть message. код шибки(500/404 и тд.)
// это локальный обработчик ошибок в противовес глоаблному в app.js
export const updateStatusThunk = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(profileReducerActions.setStatus(status));
        }
    } catch (error) {
        console.log(error)
    }
}

export const savePhotoThunk = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.putNewPhoto(file)
    if (data.resultCode === 0) {
        dispatch(profileReducerActions.savaPhotoSuccess(data.data.photos));
    }
}

export const saveProfileThunk = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    let userId = getState().auth.userId
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getProfileDataThunk(userId))
        } else {
            throw new Error('userId cant be null')
        }
        dispatch(profileReducerActions.setIsValidInput(true))
    } else {
        dispatch(profileReducerActions.setIsValidInput(false))
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