import { setAppStatusAC } from "./app-reducer";
import { AxiosError } from "axios";
import { handleServerNetworkError } from "utils/error-utils";
import {
  AddNewCardsType,
  cardsAPI,
  CardType,
  GetCardsParamsType,
  RenameCardQuestionType,
} from "dal/cardsAPI";
import { AppThunk } from "../store";

const initialState = {
  cards: [
    {
      answer: "",
      question: "",
      cardsPack_id: "",
      grade: 0,
      shots: 1,
      user_id: "",
      created: "",
      updated: "",
      _id: "",
    },
  ],
  cardsTotalCount: 3,
  maxGrade: 5,
  minGrade: 2,
  page: 1, // выбранная страница
  pageCount: 1, // количество элементов на странице
  packUserId: "",
  packName: "",
};

export type InitialCardsStateType = {
  cards: Array<CardType>;
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number; // выбранная страница
  pageCount: number; // количество элементов на странице
  packUserId: string;
  packName: string;
};

export type CardsPageActionType = GetCardsPackACType;

export const cardsReducer = (
  state: InitialCardsStateType = initialState,
  action: CardsPageActionType
): InitialCardsStateType => {
  switch (action.type) {
    case "GET_CARDS_PAGE":
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
};

export const getCardsPageAC = (
  cards: Array<CardType>,
  cardsTotalCount: number, // количество колод
  maxGrade: number,
  minGrade: number,
  page: number, // выбранная страница
  pageCount: number,
  packUserId: string,
  packName: string
) =>
  ({
    type: "GET_CARDS_PAGE",
    cards,
    cardsTotalCount,
    maxGrade,
    minGrade,
    page,
    pageCount,
    packUserId,
    packName,
  } as const);

// cardAnswer: string = 'english ',
// cardQuestion: string = 'english ',
// cardsPack_id: string = '634dc6dd4e2e6c50ec5a1369', // тестовый айди 3ей карточки
// min: number = 1,  // для кол-ва отображаемых паков
// max: number = 4, // для кол-ва отображаемых паков
// sortCards: string = '0grade', // для сортировки по возрастанию или убыванию
// page: number = 1, // какая страница открыта
// pageCount: number = 4, //кол-во паков на страницу

export type GetCardsPackACType = ReturnType<typeof getCardsPageAC>;
export const getCardsPageTC =
  (params: GetCardsParamsType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    cardsAPI
      .getCardsPage(params)
      .then((res) => {
        const data = res.data;
        dispatch(
          getCardsPageAC(
            data.cards,
            data.cardsTotalCount,
            data.maxGrade,
            data.minGrade,
            data.page,
            data.pageCount,
            data.packUserId,
            data.packName
          )
        );
        dispatch(setAppStatusAC("succeeded"));
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