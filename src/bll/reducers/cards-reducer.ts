import { AppStatusType, setAppStatusAC } from "./app-reducer";
import { AxiosError } from "axios";
import { handleServerNetworkError } from "utils/error-utils";
import {
  AddNewCardsType,
  cardsAPI,
  CardType,
  GetCardResponseType,
  GetCardsParamsType,
  RenameCardQuestionType,
} from "dal/cardsAPI";
import { AppThunk } from "../store";
import { learnAPI } from "../../dal/learnAPI";

const initialState = {
  cards: [] as CardType[],
  cardsTotalCount: 3,
  maxGrade: 5,
  minGrade: 2,
  page: 1,
  pageCount: 1,
  packUserId: "",
  packName: "",
  entityStatus: "idle" as AppStatusType,
};

export type InitialCardsStateType = typeof initialState;

export const cardsReducer = (
  state: InitialCardsStateType = initialState,
  action: CardsPageActionType
): InitialCardsStateType => {
  switch (action.type) {
    case "CARDS/GET_CARDS_PAGE":
      return {
        ...state,
        ...action.data,
      };
    case "CARDS/SET_STATUS":
      return { ...state, entityStatus: action.entityStatus };
    default:
      return state;
  }
};

// actions

export const getCardsPageAC = (data: GetCardResponseType) =>
  ({ type: "CARDS/GET_CARDS_PAGE", data } as const);

export const setCardsStatusAC = (newStatus: AppStatusType) =>
  ({ type: "CARDS/SET_STATUS", entityStatus: newStatus } as const);

// thunks

export const getCardsPageTC =
  (params: GetCardsParamsType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(setCardsStatusAC("loading"));
    cardsAPI
      .getCardsPage(params)
      .then((res) => {
        dispatch(getCardsPageAC(res.data));
        dispatch(setAppStatusAC("succeeded"));
        dispatch(setCardsStatusAC("succeeded"));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log("сломалось");
        handleServerNetworkError(err, dispatch);
      });
  };

export const addNewCardTC =
  (params: AddNewCardsType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardsAPI
      .addNewCards(params)
      .then((res) => {
        dispatch(getCardsPageTC({ cardsPack_id: params.cardsPack_id }));
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log("сломалось");
        handleServerNetworkError(err, dispatch);
      });
  };

export const deleteCardTC =
  (cardsPack_id: string, cardID: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardsAPI
      .deleteCards(cardID)
      .then((res) => {
        dispatch(getCardsPageTC({ cardsPack_id }));
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log("сломалось");
        handleServerNetworkError(err, dispatch);
      });
  };

export const renameCardQuestionTC =
  (params: RenameCardQuestionType, cardsPack_id: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardsAPI
      .renameCardQuestion(params)
      .then((res) => {
        dispatch(getCardsPageTC({ cardsPack_id }));
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log("сломалось");
        handleServerNetworkError(err, dispatch);
      });
  };

export const putAGradeTC =
  (grade: number, card_id: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    learnAPI.putAGrade(grade, card_id).then((res) => {
      /*dispatch(putAGradeAC(res.data));*/
      console.log(res.data);
      dispatch(setAppStatusAC("succeeded"));
    });
  };

// types

export type CardsPageActionType = GetCardsPackACType | setCardsStatusACType;

export type GetCardsPackACType = ReturnType<typeof getCardsPageAC>;
export type setCardsStatusACType = ReturnType<typeof setCardsStatusAC>;
