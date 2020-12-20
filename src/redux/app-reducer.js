import { getUserDataThunk } from './auth-reducer';


const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'


let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }


}


export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS
})



export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getUserDataThunk());
    // let promi se2 = dispatch(какая то санка);
    // let promise3 = dispatch(ещё что то диспатчится);

    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    });
}

   
// когда все промисы заРезолвятся, тогда ты делаешь диспатч инициализации

// export const initializeApp = () => async (dispatch) => {
//     await dispatch(getUserDataThunk());
//     dispatch(initializedSuccess());
//   };
// А ЭТО АЛЬТЕРНАТИВНЫЙ СПОСОБ ЧЕРЕЗ async away

export default appReducer;