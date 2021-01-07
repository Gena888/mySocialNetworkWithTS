import { getUserDataThunk } from './auth-reducer'
import { InferActionTypes } from './redux-store'



let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

type ActionsType = InferActionTypes<typeof appReducerActions>

export const appReducerActions = {
    initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const)
}


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getUserDataThunk());
    // let promi se2 = dispatch(какая то санка);
    // let promise3 = dispatch(ещё что то диспатчится);

    Promise.all([promise]).then(() => {
        dispatch(appReducerActions.initializedSuccess())
    });
}

// когда все промисы заРезолвятся, тогда ты делаешь диспатч инициализации

// export const initializeApp = () => async (dispatch) => {
//     await dispatch(getUserDataThunk());
//     dispatch(initializedSuccess());
//   };
// А ЭТО АЛЬТЕРНАТИВНЫЙ СПОСОБ ЧЕРЕЗ async away

export default appReducer;