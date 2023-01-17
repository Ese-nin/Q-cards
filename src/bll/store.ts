import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {AuthActionsType, authReducer} from "../UI/features/login/auth-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppActionsType, appReducer} from "../UI/app-reducer";
import {CardsActionType, cardsPackListReducer} from "../UI/features/cards/cardsPackList-reducer";
import {cardPackPageReducer, CardsPageActionType} from '../UI/features/cards/cardPackPage-reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    cards: cardsPackListReducer,
    cardPage: cardPackPageReducer
})

type AppRootStateType = ReturnType<typeof rootReducer>
type RootActionsType = AuthActionsType | AppActionsType | CardsActionType | CardsPageActionType
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, RootActionsType>

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RootActionsType>

// @ts-ignore
window.store = store

export default store