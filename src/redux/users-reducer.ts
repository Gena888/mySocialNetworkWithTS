import { userAPI } from "../api/userAPI";
import { UsersType } from '../types/types';
import { updateObjectInArray } from '../Utils/objects-helpers';
import { BaseThunkType, InferActionTypes } from './redux-store';
import { FormAction } from 'redux-form';
import { Dispatch } from "react";
import { PostPutDeleteRegularResponse } from "../types/apiTypes";

export type InitialStateType = typeof inilialState
export type FilterType = typeof inilialState.filter
export type ActionTypes = InferActionTypes<typeof UsersReducerActions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>
type DispatchType = Dispatch<ActionTypes>

let inilialState = {
    usersData: [] as Array<UsersType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>, //array of usersId
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

const usersReducer = (state = inilialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {

        case 'usersReduser/FOLLOW':
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', { followed: true })
            }
        case 'usersReduser/UNFOLLOW':
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', { followed: false })
            }
        case 'usersReduser/SET_USERS': {
            return {
                ...state,
                usersData: [...action.users]
            }
        }
        case 'usersReduser/SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.page
            }
        }
        case 'usersReduser/SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        }
        case 'usersReduser/TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'usersReduser/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        case 'usersReduser/SET_FILTER': {
            return {
                ...state, filter: action.payload
            }
        }
        default:
            return state;
    }
};

export const UsersReducerActions = {
    follow: (userId: number) => ({ type: 'usersReduser/FOLLOW', userId } as const),
    unFollow: (userId: number) => ({ type: 'usersReduser/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'usersReduser/SET_USERS', users } as const),
    showMore: () => ({ type: 'usersReduser/SHOWMORE' } as const),
    setCurrentPage: (page: number) => ({ type: 'usersReduser/SET_CURRENT_PAGE', page } as const),
    setTotalUsersCount: (totalCount: number) => ({ type: 'usersReduser/SET_TOTAL_USERS_COUNT', totalCount } as const),
    setToggleFetching: (isFetching: boolean) => ({ type: 'usersReduser/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingIsFetching: (isFetching: boolean, userId: number) => ({ type: 'usersReduser/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),
    setFilter: (filter: FilterType) => ({ type: 'usersReduser/SET_FILTER', payload: filter } as const)
}

// functions + thunks 

export const getUsersThunk = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch) => {
    dispatch(UsersReducerActions.setToggleFetching(true));
    dispatch(UsersReducerActions.setFilter(filter))
    let data = await userAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
    dispatch(UsersReducerActions.setToggleFetching(false));
    dispatch(UsersReducerActions.setUsers(data.items));
    dispatch(UsersReducerActions.setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (
    dispatch: DispatchType,
    userId: number,
    apiMethod: (userId: number) => Promise<PostPutDeleteRegularResponse>,
    actionCreator: (userId: number) => ActionTypes
) => {
    dispatch(UsersReducerActions.toggleFollowingIsFetching(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(UsersReducerActions.toggleFollowingIsFetching(false, userId));
}
export const followThunk = (userId: number): ThunkType => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, userAPI.followUser.bind(userAPI), UsersReducerActions.follow);
    }
}
export const unfollowThunk = (userId: number): ThunkType => {
    return async (dispatch) => {
        await followUnfollowFlow(dispatch, userId, userAPI.unfollowUser.bind(userAPI), UsersReducerActions.unFollow);
    }
}
// для обхода типизации в usersContainer 
export const setCurrentPageThunk = (page: number): BaseThunkType<ActionTypes, void> => (dispatch) => {
    dispatch(UsersReducerActions.setCurrentPage(page))
}


export default usersReducer;