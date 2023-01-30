import { instance } from "./instance";

export const packsAPI = {
  getCardsPack(params: GetPacksParamsType) {
    return instance.get<GetCardsPackResponseType>("cards/pack", { params });
  },

  addNewCardPack(params: AddNewCardPackType) {
    const data = {
      cardsPack: params,
    };
    return instance.post<GetCardsPackResponseType>("cards/pack", data);
  },

  deleteCardPack(cardPackID: string) {
    return instance.delete<DeletePackResponseType>("cards/pack", {
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
    return instance.put<RenameCardPackType>("cards/pack", data);
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

export type CardPacksType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  grade: number;
  cardsCount: number;
  created: string;
  updated: string;
  cover: string;
};

export type AddNewCardPackType = {
  name?: string;
  deckCover?: string;
  privatePack?: boolean;
};

export type DeletePackResponseType = {
  deletedCardsPack: CardPacksType;
  token: string;
  tokenDeathTime: number;
};

export type RenameCardPackType = {
  cardPackID: string;
  newNameCardPack?: string;
};
