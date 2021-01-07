import { applyMiddleware, combineReducers, createStore, compose, Action } from "redux"
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import navReducer from './nav-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import ReduxThunk, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer"


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    navPage: navReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
});

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>

//actions type 

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>

//thunk type 

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(ReduxThunk)))
// этот способ создания стора для расширения хром redux. 

// @ts-ignore
document.__store__ = store

export default store



// const store = createStore(reducers, applyMiddleware(ReduxThunk)); классика