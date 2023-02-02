import { AppThunk } from "../store";
import { setAppStatusAC } from "./app-reducer";
import { AxiosError } from "axios";
import { handleServerNetworkError } from "utils/error-utils";
import {
  AddNewCardPackType,
  CardPacksType,
  GetCardsPackResponseType,
  GetPacksParamsType,
  packsAPI,
} from "dal/packsAPI";

const initialState = {
  cardPacks: [] as CardPacksType[],
  cardPacksTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
  page: 1,
  pageCount: 1,
};

export type InitialPacksStateType = typeof initialState;

export const packsReducer = (
  state: InitialPacksStateType = initialState,
  action: CardsActionType
): InitialPacksStateType => {
  switch (action.type) {
    case "PACK/GET_CARDS_PACK":
    case "PACK/ADD_NEW_CARD_PACK":
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

export const getCardsPackAC = (data: GetCardsPackResponseType) =>
  ({ type: "PACK/GET_CARDS_PACK", data } as const);

export const addNewCardPackAC = (data: GetCardsPackResponseType) =>
  ({ type: "PACK/ADD_NEW_CARD_PACK", data } as const);

export const deleteCardPackAC = (cardPackID: string) =>
  ({ type: "PACK/DELETE_CARS_PACK", cardPackID } as const);

export const renameCardPackAC = (cardPackID: string, newNameCardPack: string) =>
  ({ type: "PACK/RENAME_CARD_PACK", cardPackID, newNameCardPack } as const);

export const getCardsPackTC =
  (params: GetPacksParamsType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    packsAPI
      .getCardsPack(params)
      .then((res) => {
        dispatch(getCardsPackAC(res.data));
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        handleServerNetworkError(err, dispatch);
      });
  };

export const addNewCardPackTC =
  (params: AddNewCardPackType, user_id?: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    packsAPI
      .addNewCardPack(params)
      .then((res) => {
        dispatch(addNewCardPackAC(res.data));
        dispatch(getCardsPackTC(user_id ? { user_id } : {}));
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        handleServerNetworkError(err, dispatch);
      });
  };

export const deleteCardPackTC =
  (cardPackID: string, user_id?: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    packsAPI
      .deleteCardPack(cardPackID)
      .then((res) => {
        dispatch(getCardsPackTC(user_id ? { user_id } : {}));
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        handleServerNetworkError(err, dispatch);
      });
  };

export const renameCardPackTC =
  (pack_id: string, newName: string, deckCover: string, user_id?: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    packsAPI
      .renameCardPack(pack_id, newName, deckCover)
      .then((res) => {
        dispatch(getCardsPackTC(user_id ? { user_id } : {}));
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        handleServerNetworkError(err, dispatch);
      });
  };

// types

export type CardsActionType =
  | GetCardsPackACType
  | AddNewCardPackACType
  | DeleteCardPackACType
  | RenameCardPackACType;

export type GetCardsPackACType = ReturnType<typeof getCardsPackAC>;
export type AddNewCardPackACType = ReturnType<typeof addNewCardPackAC>;
export type DeleteCardPackACType = ReturnType<typeof deleteCardPackAC>;
export type RenameCardPackACType = ReturnType<typeof renameCardPackAC>;
