import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {AuthActionsType, authReducer} from "../UI/features/login/auth-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppActionsType, appReducer} from "../UI/app-reducer";
import {CardsActionType, cardsReducer} from "../UI/features/cards/cards-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    cards: cardsReducer
})

type AppRootStateType = ReturnType<typeof rootReducer>
type RootActionsType = AuthActionsType | AppActionsType | CardsActionType
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, RootActionsType>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RootActionsType>


export default store