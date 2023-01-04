import {authReducer, InitialAuthStateType, logInAC, logOutAC} from "./auth-reducer";

let startState: InitialAuthStateType;
beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('isLoggedIn should be "true"', () => {
    const endState = authReducer(startState, logInAC())

    expect(endState.isLoggedIn).toBe(true)
})


test('isLoggedIn should be "false"', () => {
    startState = {isLoggedIn: true}

    const endState = authReducer(startState, logOutAC())

    expect(endState.isLoggedIn).toBe(false)
})