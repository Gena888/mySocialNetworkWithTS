import { followThunk, UsersReducerActions } from './users-reducer'
import { userAPI } from '../api/userAPI'
import { PostPutDeleteRegularResponse, ResultCodesEnum } from '../types/apiTypes';

jest.mock('../api/userAPI')
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>;

const result: PostPutDeleteRegularResponse = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {
        data: ['']
    }
}

userAPIMock.followUser.mockReturnValue(Promise.resolve(result));

test('follow thunk test', async () => {

    const thunk = followThunk(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, UsersReducerActions.toggleFollowingIsFetching(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, UsersReducerActions.follow)
    expect(dispatchMock).toHaveBeenNthCalledWith(3, UsersReducerActions.toggleFollowingIsFetching(false, 1))
})
