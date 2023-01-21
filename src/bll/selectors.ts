import { AppRootStateType } from "./store";

// auth-reducer
export const isLoggedInSelector = (state: AppRootStateType) =>
  state.auth.isLoggedIn;
export const user_idSelector = (state: AppRootStateType) => state.auth.user_id;
export const nameSelector = (state: AppRootStateType) => state.auth.name;
export const emailSelector = (state: AppRootStateType) => state.auth.email;
export const isHaveAccountSelector = (state: AppRootStateType) =>
  state.auth.isHaveAccount;
export const isSentInstructionSelector = (state: AppRootStateType) =>
  state.auth.isSentInstruction;

// app-reducer
export const appStatusSelector = (state: AppRootStateType) =>
  state.app.appStatus;
export const errorSelector = (state: AppRootStateType) => state.app.error;
export const isInitializedSelector = (state: AppRootStateType) =>
  state.app.isInitialized;

// packs-reducer
export const cardPacksSelector = (state: AppRootStateType) =>
  state.cards.cardPacks;
export const pagePacksSelector = (state: AppRootStateType) => state.cards.page;
export const pageCountPacksSelector = (state: AppRootStateType) =>
  state.cards.pageCount;
export const minCardsCountSelector = (state: AppRootStateType) =>
  state.cards.minCardsCount;
export const maxCardsCountSelector = (state: AppRootStateType) =>
  state.cards.maxCardsCount;
export const cardPacksTotalCountSelector = (state: AppRootStateType) =>
  state.cards.cardPacksTotalCount;

// cards-reducer
export const cardsSelector = (state: AppRootStateType) => state.cardPage.cards;
export const cardsTotalCountSelector = (state: AppRootStateType) =>
  state.cardPage.cardsTotalCount;
export const pageCardsSelector = (state: AppRootStateType) =>
  state.cardPage.page;
export const pageCountCardsSelector = (state: AppRootStateType) =>
  state.cardPage.pageCount;
export const packNameSelector = (state: AppRootStateType) =>
  state.cardPage.packName;
export const minGradeSelector = (state: AppRootStateType) =>
  state.cardPage.minGrade;
export const maxGradeSelector = (state: AppRootStateType) =>
  state.cardPage.maxGrade;
export const packUserIdSelector = (state: AppRootStateType) =>
  state.cardPage.packUserId;
