import { AppRootStateType } from "./store";

// auth-reducer
export const isLoggedInSelector = (state: AppRootStateType) => state.auth.isLoggedIn;
export const user_idSelector = (state: AppRootStateType) => state.auth.user_id;
export const nameSelector = (state: AppRootStateType) => state.auth.name;
export const emailSelector = (state: AppRootStateType) => state.auth.email;
export const isHaveAccountSelector = (state: AppRootStateType) => state.auth.isHaveAccount;
export const isSentInstructionSelector = (state: AppRootStateType) => state.auth.isSentInstruction;

// app-reducer
export const appStatusSelector = (state: AppRootStateType) => state.app.appStatus;
export const errorSelector = (state: AppRootStateType) => state.app.error;
export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized;

// packs-reducer
export const cardPacksSelector = (state: AppRootStateType) => state.packs.cardPacks;
export const pagePacksSelector = (state: AppRootStateType) => state.packs.page;
export const pageCountPacksSelector = (state: AppRootStateType) => state.packs.pageCount;
export const minCardsCountSelector = (state: AppRootStateType) => state.packs.minCardsCount;
export const maxCardsCountSelector = (state: AppRootStateType) => state.packs.maxCardsCount;
export const cardPacksTotalCountSelector = (state: AppRootStateType) =>
  state.packs.cardPacksTotalCount;

// cards-reducer
export const cardsSelector = (state: AppRootStateType) => state.cards.cards;
export const cardsTotalCountSelector = (state: AppRootStateType) => state.cards.cardsTotalCount;
export const pageCardsSelector = (state: AppRootStateType) => state.cards.page;
export const pageCountCardsSelector = (state: AppRootStateType) => state.cards.pageCount;
export const packNameSelector = (state: AppRootStateType) => state.cards.packName;
export const minGradeSelector = (state: AppRootStateType) => state.cards.minGrade;
export const maxGradeSelector = (state: AppRootStateType) => state.cards.maxGrade;
export const packUserIdSelector = (state: AppRootStateType) => state.cards.packUserId;
export const cardsStatusSelector = (state: AppRootStateType) => state.cards.entityStatus;
