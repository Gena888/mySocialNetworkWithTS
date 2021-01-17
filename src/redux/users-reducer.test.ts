import { UsersType } from '../types/types';
import usersReducer, { InitialStateType, UsersReducerActions } from './users-reducer'

let state: InitialStateType;

beforeEach(() => {
    state = {
        usersData: [
            {
                id: 0,
                name: ' 1st user',
                followed: false,
                photos: { small: undefined, large: undefined },
                status: 'status 0'
            },
            {
                id: 1,
                name: ' 2st user',
                followed: false,
                photos: { small: undefined, large: undefined },
                status: 'status 0'
            },
            {
                id: 2,
                name: ' 3st user',
                followed: true,
                photos: { small: undefined, large: undefined },
                status: 'status 0'
            },
            {
                id: 3,
                name: ' 4st user',
                followed: true,
                photos: { small: undefined, large: undefined },
                status: 'status 0'
            }
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    };
})


test('follow sucess', () => {


    const newState: InitialStateType = usersReducer(state, UsersReducerActions.follow(1))

    expect(newState.usersData[0].followed).toBeFalsy();
    expect(newState.usersData[1].followed).toBeTruthy();
})

test('unfollow sucess', () => {


    const newState: InitialStateType = usersReducer(state, UsersReducerActions.unFollow(3))

    expect(newState.usersData[2].followed).toBeTruthy();
    expect(newState.usersData[3].followed).toBeFalsy();
})