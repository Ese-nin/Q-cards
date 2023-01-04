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


// types

export type InitialAuthStateType = {
    isLoggedIn: boolean
}

export type AuthActionsType = LogInActionType
    | LogOutActionType

type LogInActionType = ReturnType<typeof logInAC>
type LogOutActionType = ReturnType<typeof logOutAC>