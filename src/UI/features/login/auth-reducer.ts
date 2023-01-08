import {authAPI} from '../../../dal/api';
import {AxiosError} from 'axios';
import {Dispatch} from 'redux'

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialAuthStateType = initialState, action: AuthActionsType): InitialAuthStateType => {
    switch (action.type) {
        case 'AUTH/SET_LOG_IN':
        case 'AUTH/SET_LOG_OUT':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}


// actions

export const logInAC = () => ({type: 'AUTH/SET_LOG_IN', isLoggedIn: true} as const)
export const logOutAC = () => ({type: 'AUTH/SET_LOG_OUT', isLoggedIn: false} as const)


// thank creators

export const logoutTC = () => (dispatch: Dispatch<AuthActionsType>) => {
    // dispatch(setAppStatusAC('loading'))                         /// прикрутить крутилочку ответа сервера
    authAPI.logOut()
        .then(res => {

            dispatch(logOutAC())
            // dispatch(setAppStatusAC('succeeded'))            /// прикрутить крутилочку ответа сервера
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            console.log('error: ', error)
        })
}


export const registerTC = (email: string, password: string) => (dispatch: Dispatch) => {
  authAPI.register(email, password)
    .then((res) => {
      console.log(res.data)
      // redirect to login
    })
    .catch((err)=>{
      console.log(err.response.data.error)
      // view snackbar with error
    })
}

// types

export type InitialAuthStateType = {
    isLoggedIn: boolean
}

export type AuthActionsType = LogInActionType
    | LogOutActionType

type LogInActionType = ReturnType<typeof logInAC>
type LogOutActionType = ReturnType<typeof logOutAC>