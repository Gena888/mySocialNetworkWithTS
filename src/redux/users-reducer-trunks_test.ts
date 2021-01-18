// jest.mock('./../api/userAPI')
import { followThunk } from './users-reducer'
import { userAPI as userAPIMock } from '../api/userAPI'
import { PostPutDeleteRegularResponse, ResultCodesEnum } from '../types/apiTypes';

jest.mock('./../api/userAPI')
// const userAPIMock = userAPI;

const result: PostPutDeleteRegularResponse = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {
        data: ['']
    }
}
//@ts-ignore
userAPIMock.followUser.mockReturnValue(Promise.resolve(result));

test('follow thunk test', async () => {

    const thunk = followThunk(1)
    const dispatchMock = jest.fn()

    //@ts-ignore
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)
})
