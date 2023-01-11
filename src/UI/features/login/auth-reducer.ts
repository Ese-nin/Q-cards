import {authAPI} from '../../../dal/api';
import {AxiosError} from 'axios';
import {Dispatch} from 'redux'
import {AppStatusType, setAppStatusAC} from "../../app-reducer";
import {ThunkAppDispatchType} from "../../../bll/store";

const initialState = {
    isLoggedIn: false,
    isHaveAccount: false
}

export const authReducer = (state: InitialAuthStateType = initialState, action: AuthActionsType): InitialAuthStateType => {
    switch (action.type) {
        case 'AUTH/SET_LOG_IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'AUTH/SET_LOG_OUT':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'AUTH/SET_HAVE_ACC':
            return {...state, isHaveAccount: action.isHaveAccount}
        default:
            return state
    }
}


// actions

export const logInAC = () => ({type: 'AUTH/SET_LOG_IN', isLoggedIn: true} as const)
export const logOutAC = () => ({type: 'AUTH/SET_LOG_OUT', isLoggedIn: false} as const)
export const setHaveAccountAC = (isHaveAccount: boolean) => ({type: 'AUTH/SET_HAVE_ACC', isHaveAccount} as const)

// export const logInAC = () => ({type: 'AUTH/SET_LOG_IN', isLoggedIn: true} as const)

// thank creators

export const logoutTC = () => (dispatch:ThunkAppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then(res => {

            dispatch(logOutAC())
            dispatch(setAppStatusAC('succeeded'))            /// прикрутить крутилочку ответа сервера
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            console.log('error: ', error)
        })
}


export const registerTC = (email: string, password: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.register(email, password)
        .then((res) => {
            // console.log(res.data)
            dispatch(setHaveAccountAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            console.warn(error)
            // view snackbar with error
            // dispatch(setAppStatusAC('failed'))
        })
}

// log in
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logIn(email, password, rememberMe)
        .then((res) => {
            dispatch(logInAC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console');

            console.log('Error: ', {...err})
        })
}

// me запрос

export const initializeProfileTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if (res.data.name) {
                dispatch(logInAC())
                dispatch(setAppStatusAC('succeeded'))


            }
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : (err.message + ', more details in the console');

            console.log('Error: ', {...err})
        })
}


// types

export type InitialAuthStateType = {
    isLoggedIn: boolean
    isHaveAccount: boolean
}

export type AuthActionsType = LogInActionType
    | LogOutActionType
    | SetHaveAccountActionType


type LogInActionType = ReturnType<typeof logInAC>
type LogOutActionType = ReturnType<typeof logOutAC>
type SetHaveAccountActionType = ReturnType<typeof setHaveAccountAC>