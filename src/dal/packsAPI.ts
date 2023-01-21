import { instance } from "./authAPI";
import { AxiosResponse } from "axios";

export const packsAPI = {
  getCardsPack(params: GetPacksParamsType) {
    return instance.get<"", AxiosResponse<GetCardsPackResponseType>>("cards/pack", { params });
  },

  addNewCardPack(params: AddNewCardPackType) {
    const data = {
      cardsPack: {
        params,
      },
    };
    return instance.post<
      { cardsPack: AddNewCardPackType },
      AxiosResponse<GetCardsPackResponseType>
    >("cards/pack", data);
  },

  deleteCardPack(cardPackID: string) {
    return instance.delete<"", AxiosResponse<DeletePackResponseType>>("cards/pack", {
      params: {
        id: cardPackID,
      },
    });
  },

  renameCardPack(_id: string, name: string) {
    const data = {
      cardsPack: {
        _id,
        name,
      },
    };
    return instance.put<{ _id: string; name: string }, AxiosResponse<RenameCardPackType>>(
      "cards/pack",
      data
    );
  },
};

// types

export type GetPacksParamsType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: boolean;
};

export type GetCardsPackResponseType = {
  cardPacks: Array<CardPacksType>;
  cardPacksTotalCount: number; // количество колод
  maxCardsCount: number;
  minCardsCount: number;
  page: number; // выбранная страница
  pageCount: number; // количество элементов на странице
};

export type AddNewCardPackType = {
  name?: string;
  deckCover?: string;
  privatePack?: boolean;
};

export type DeletedCardsPack = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
};

export type DeletePackResponseType = {
  deletedCardsPack: DeletedCardsPack;
  token: string;
  tokenDeathTime: number;
};

export type RenameCardPackType = {
  cardPackID: string;
  newNameCardPack?: string;
};

export type CardPacksType = {
  _id: string;
  user_id: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
  user_name: string;
};
