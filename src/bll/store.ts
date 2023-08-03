import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { AuthActionsType, authReducer } from "./reducers/auth-reducer";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppActionsType, appReducer } from "./reducers/app-reducer";
import { CardsActionType, packsReducer } from "./reducers/packs-reducer";
import { cardsReducer, CardsPageActionType } from "./reducers/cards-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  packs: packsReducer,
  cards: cardsReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
type RootActionsType = AuthActionsType | AppActionsType | CardsActionType | CardsPageActionType;
// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, RootActionsType>;

export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  RootActionsType
>;

// @ts-ignore
window.store = store;

export default store;
