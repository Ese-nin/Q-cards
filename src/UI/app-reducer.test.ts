import {appReducer, changeAppErrorAC, InitialStateType, setAppStatusAC, setInitializeAC} from "./app-reducer";

let startState: InitialStateType;
beforeEach(() => {
    startState = {
        isInitialized: false,
        appStatus: 'idle',
        error: null,
    }
});

test('app should be initialized', () => {

    const endState = appReducer(startState, setInitializeAC())

    expect(endState.isInitialized).toBe(true)
})

test('appStatus should be changed', () => {
    const newStatusSuccess = 'succeeded';
    const newStatusFailed = 'failed';

    const endState = appReducer(startState, setAppStatusAC(newStatusSuccess))
    const endState2 = appReducer(startState, setAppStatusAC(newStatusFailed))

    expect(endState.appStatus).toBe(newStatusSuccess)
    expect(endState2.appStatus).toBe(newStatusFailed)
})


test('error should be correct', () => {

    const errorMessage = 'Some Error'

    const endState = appReducer(startState, changeAppErrorAC(errorMessage))

    expect(endState.error).toBe(errorMessage)
})