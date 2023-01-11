import {appReducer, InitialStateType, setAppStatusAC, setInitializeAC} from "./app-reducer";

let startState: InitialStateType;
beforeEach(() => {
    startState = {
        isInitialized: false,
        appStatus: 'idle'
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
export {}