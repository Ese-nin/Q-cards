import { instance } from "./instance";

export const cardsAPI = {
  getCardsPage(params: GetCardsParamsType) {
    return instance.get<GetCardResponseType>("cards/card", {
      params,
    });
  },
  addNewCards(params: AddNewCardsType) {
    const data = {
      card: params,
    };
    return instance.post<AddNewCardResponseType>("cards/card", data);
  },
  deleteCards(cardID: string) {
    return instance.delete<RemoveCardResponseType>(`cards/card?id=${cardID}`);
  },
  renameCardQuestion(params: RenameCardQuestionType) {
    const data = {
      card: params,
    };
    return instance.put<RenameCardResponseType>("cards/card", data);
  },
};

// types

export type CardType = {
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

export type NewCard = CardType;

export type AddNewCardResponseType = {
  newCard: NewCard;
  token: string;
  tokenDeathTime: number;
};

export type RenameCardQuestionType = {
  _id: string;
  question?: string;
  answer?: string;
};

export type Updated_DeletedCardType = CardType & {
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
