const initialState = {
    isInitialized: false,
    appStatus: 'idle'
}

export const appReducer = (state = <InitialStateType>initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_INITIALIZE':
            return {...state, isInitialized: action.isInitialized}
        case 'APP/SET_APP_STATUS':
            return {...state, appStatus: action.appStatus}
        default:
            return state
    }
}

// actions

export const setInitializeAC = () => ({type: 'APP/SET_INITIALIZE', isInitialized: true} as const)
export const setAppStatusAC = (newStatus: AppStatusType) => ({
    type: 'APP/SET_APP_STATUS',
    appStatus: newStatus
} as const)


// types

export type AppStatusType = 'idle' | 'succeeded' | 'failed' | 'loading'
export type InitialStateType = {
    isInitialized: boolean
    appStatus: AppStatusType
}

export type AppActionsType = SetInitializeActionType
    | SetAppStatusActionType

type SetInitializeActionType = ReturnType<typeof setInitializeAC>
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>