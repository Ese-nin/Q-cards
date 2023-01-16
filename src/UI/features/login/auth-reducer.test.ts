import {
    authReducer,
    InitialAuthStateType,
    logInAC,
    logOutAC,
    sentInstructionAC,
    setHaveAccountAC
} from "./auth-reducer";

let startState: InitialAuthStateType;
beforeEach(() => {
    startState = {
        isLoggedIn: false,
        isHaveAccount: false,
        isSentInstruction: false,
        name: '',
        email: '',
        user_id: '',
    }
})

test('isLoggedIn should be "true"', () => {
    const email = 'blabla@dhdh.com';
    const name = 'Name'
    const id = '123';

    const endState = authReducer(startState, logInAC(name, email, id))

    expect(endState.isLoggedIn).toBe(true)
})


test('isLoggedIn should be "false"', () => {
    startState = {isLoggedIn: true, isHaveAccount: false, isSentInstruction: false, name: '', email: '', user_id: ''}

    const endState = authReducer(startState, logOutAC())

    expect(endState.isLoggedIn).toBe(false)
})


test('isHaveAccount should be changed', () => {
    const newValue = true;

    const endState = authReducer(startState, setHaveAccountAC(newValue))

    expect(endState.isHaveAccount).toBe(newValue)
})


test('instructions should be sent', () => {
    const endState = authReducer(startState, sentInstructionAC(true))

    expect(endState.isSentInstruction).toBe(true)
    expect(startState.isSentInstruction).toBe(false)
})