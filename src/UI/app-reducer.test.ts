// import {appReducer, InitialStateType, setAppStatusAC, setInitializeAC} from "./app-reducer";
//
// let startState: InitialStateType;
// beforeEach(() => {
//     startState = {
//         isInitialized: false,
//         appStatus: 'idle'
//     }
// });
//
// test('app should be initialized', () => {
//
//     const endState = appReducer(startState, setInitializeAC())
//
//     expect(endState.isInitialized).toBe(true)
// })
//
// test('appStatus should be changed', () => {
//     const newStatus = 'success'
//
//     const endState = appReducer(startState, setAppStatusAC(newStatus))
//
//     expect(endState.appStatus).toBe(newStatus)
// })