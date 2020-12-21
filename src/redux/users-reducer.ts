import { userAPI } from '../api/api';
import { UsersType } from '../types/types';
import { updateObjectInArray } from '../Utils/objects-helpers';
const FOLLOW = '/users-reduser/FOLLOW';
const UNFOLLOW = '/users-reduser/UNFOLLOW';
const SET_USERS = '/users-reduser/SET-USERS'
const SHOWMORE = '/users-reduser/SHOW-MORE'
const SET_CURRENT_PAGE = '/users-reduser/SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = '/users-reduser/SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = '/users-reduser/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = '/users-reduser/TOGGLE_IS_FOLLOWING_PROGRESS'

export type InilialStateType = typeof inilialState

let inilialState = {
    usersData: [] as Array<UsersType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFetching: true as boolean,
    followingInProgress: [] as Array<number>, //array of usersId
}

const usersReducer = (state = inilialState, action: any): InilialStateType => {

    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', { followed: true })

            }

        case UNFOLLOW:
            return {
                ...state,
                usersData: updateObjectInArray(state.usersData, action.userId, 'id', { followed: false })
            }


        case SET_USERS: {
            return {
                ...state,
                usersData: [...action.users]

            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.page
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        }

        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
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

// Action creators 

type FollowActionType = {
    type: typeof FOLLOW
    userId: number
}
type UnFollow = {
    type: typeof UNFOLLOW
    userId: number
}
type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
type ShowMoreActionType = {
    type: typeof SHOWMORE
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    page: number
}
type TotalCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
type SetToggleFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type ToggleFollowingIsFetchingActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

export const follow = (userId: number): FollowActionType => ({ type: FOLLOW, userId });
export const unFollow = (userId: number): UnFollow => ({ type: UNFOLLOW, userId });
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({ type: SET_USERS, users });
export const showMore = (): ShowMoreActionType => ({ type: SHOWMORE });
export const setCurrentPage = (page: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, page });
export const setTotalUsersCount = (totalCount: number): TotalCountActionType => ({ type: SET_TOTAL_USERS_COUNT, totalCount });
export const setToggleFetching = (isFetching: boolean): SetToggleFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingIsFetching = (isFetching: boolean, userId: number): ToggleFollowingIsFetchingActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

// functions + thunks 

export const getUsersThunk = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setToggleFetching(true));
    let data = await userAPI.getUsers(currentPage, pageSize)
    dispatch(setToggleFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch: any, userId: any, apiMethod: any, actionCreator: any) => {

    dispatch(toggleFollowingIsFetching(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingIsFetching(false, userId));
}


export const followThunk = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, userAPI.followUser.bind(userAPI), follow);
    }
}


export const unfollowThunk = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollowUser.bind(userAPI), unFollow);
    }
}





export default usersReducer;