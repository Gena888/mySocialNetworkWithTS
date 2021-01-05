import { userAPI } from '../api/api';
import { UsersType } from '../types/types';
import { updateObjectInArray } from '../Utils/objects-helpers';
import { InferActionTypes } from './redux-store';

export type InilialStateType = typeof inilialState

let inilialState = {
    usersData: [] as Array<UsersType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>, //array of usersId
}

const usersReducer = (state = inilialState, action: ActionTypes): InilialStateType => {

    switch (action.type) {

        case 'FOLLOW':
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', { followed: true })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', { followed: false })
            }
        case 'SET_USERS': {
            return {
                ...state,
                usersData: [...action.users]
            }
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.page
            }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        }
        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
};


export type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
    follow: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unFollow: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', users } as const),
    showMore: () => ({ type: 'SHOWMORE' } as const),
    setCurrentPage: (page: number) => ({ type: 'SET_CURRENT_PAGE', page } as const),
    setTotalUsersCount: (totalCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalCount } as const),
    setToggleFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingIsFetching: (isFetching: boolean, userId: number) => ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}


// functions + thunks 

export const getUsersThunk = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(actions.setToggleFetching(true));
    let data = await userAPI.getUsers(currentPage, pageSize)
    dispatch(actions.setToggleFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: (userId:number) => ActionTypes) => {

    dispatch(actions.toggleFollowingIsFetching(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingIsFetching(false, userId));
}

export const followThunk = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, userAPI.followUser.bind(userAPI), actions.follow);
    }
}

export const unfollowThunk = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollowUser.bind(userAPI), actions.unFollow);
    }
}

export default usersReducer;