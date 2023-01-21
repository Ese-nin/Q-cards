import { AxiosResponse } from "axios";
import { instance } from "./authAPI";

export const cardsAPI = {
  getCardsPage(params: GetCardsParamsType) {
    return instance.get<"", AxiosResponse<GetCardResponseType>>("/cards/card", {
      params,
    });
  },
  addNewCards(params: AddNewCardsType) {
    const data = {
      card: params,
    };
    return instance.post<
      { card: GetCardsParamsType },
      AxiosResponse<AddNewCardResponseType>
    >("cards/card", data);
  },
  deleteCards(cardID: string) {
    return instance.delete<"", AxiosResponse<RemoveCardResponseType>>(
      `cards/card?id=${cardID}`
    );
  },
  renameCardQuestion(params: RenameCardQuestionType) {
    const data = {
      card: params,
    };
    return instance.put<
      { card: RenameCardQuestionType },
      AxiosResponse<RenameCardResponseType>
    >("cards/card", data);
  },
};

// types

export type GetCardResponseType = {
  cards: CardType[];
  packUserId: string;
  packName: string;
  packPrivate: boolean;
  packDeckCover: string;
  packCreated: string;
  packUpdated: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
  token: string;
  tokenDeathTime: number;
};

export type CardType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  shots: number;
  user_id: string;
  created: string;
  updated: string;
  _id: string;
};

export type AddNewCardsType = {
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

export type NewCard = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
};

export type AddNewCardResponseType = {
  newCard: NewCard;
  token: string;
  tokenDeathTime: number;
};

export type RenameCardQuestionType = {
  _id: string;
  question?: string;
};

export type Updated_DeletedCardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: number;
  shots: number;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
  answerImg: string;
  answerVideo: string;
  questionImg: string;
  questionVideo: string;
};

export type RenameCardResponseType = {
  updatedCard: Updated_DeletedCardType;
  token: string;
  tokenDeathTime: number;
};

export type RemoveCardResponseType = {
  deletedCard: Updated_DeletedCardType;
  token: string;
  tokenDeathTime: number;
};

export type GetCardsParamsType = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};
