import { userAPI } from './../api/api';
import { updateObjectInArray } from './../Utils/objects-helpers';
const FOLLOW = '/users-reduser/FOLLOW';
const UNFOLLOW = '/users-reduser/UNFOLLOW';
const SET_USERS = '/users-reduser/SET-USERS'
const SHOWMORE = '/users-reduser/SHOW-MORE'
const SET_CURRENT_PAGE = '/users-reduser/SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = '/users-reduser/SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = '/users-reduser/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = '/users-reduser/TOGGLE_IS_FOLLOWING_PROGRESS'

let inilialState = {
    usersData: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}


const usersReducer = (state = inilialState, action) => {

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

export const follow = (userId) => ({ type: FOLLOW, userId });
export const unFollow = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const showMore = () => ({ type: SHOWMORE });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page });
export const setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount });
export const setToggleFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingIsFetching = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

// functions + thunks 

export const getUsersThunk = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setToggleFetching(true));
    let data = await userAPI.getUsers(currentPage, pageSize)
    dispatch(setToggleFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {

    dispatch(toggleFollowingIsFetching(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingIsFetching(false, userId));
}


export const followThunk = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.followUser.bind(userAPI), follow);
    }
}


export const unfollowThunk = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollowUser.bind(userAPI), unFollow);
    }
}





export default usersReducer;