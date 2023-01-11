import {authReducer, InitialAuthStateType, logInAC, logOutAC, setHaveAccountAC} from "./auth-reducer";

let startState: InitialAuthStateType;
beforeEach(() => {
    startState = {
        isLoggedIn: false,
        isHaveAccount: false
    }
})

test('isLoggedIn should be "true"', () => {
    const endState = authReducer(startState, logInAC())

    expect(endState.isLoggedIn).toBe(true)
})


test('isLoggedIn should be "false"', () => {
    startState = {isLoggedIn: true, isHaveAccount: false}

    const endState = authReducer(startState, logOutAC())

    expect(endState.isLoggedIn).toBe(false)
})


test('isHaveAccount should be changed', () => {
    const newValue = true;

    const endState = authReducer(startState, setHaveAccountAC(newValue))

    expect(endState.isHaveAccount).toBe(newValue)
})
export {}