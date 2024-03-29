import { authAPI } from "dal";
import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { setAppStatusAC, setInitializeAC } from "./app-reducer";
import { AppThunk } from "../store";
import { handleServerNetworkError } from "../../utils/error-utils";

const initialState = {
  isLoggedIn: false,
  isHaveAccount: false,
  isSentInstruction: false,
  name: "",
  avatar: "",
  email: "",
  user_id: "",
  publicCardPacksCount: 0,
};

export type InitialAuthStateType = typeof initialState;

export const authReducer = (
  state: InitialAuthStateType = initialState,
  action: AuthActionsType
): InitialAuthStateType => {
  switch (action.type) {
    case "AUTH/SET_LOG_IN":
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        name: action.name,
        email: action.email,
        user_id: action.user_id,
        publicCardPacksCount: action.publicCardPacksCount,
        avatar: action.avatar,
      };
    case "AUTH/SET_LOG_OUT":
      return { ...state, isLoggedIn: action.isLoggedIn };
    case "AUTH/SET_HAVE_ACC":
      return { ...state, isHaveAccount: action.isHaveAccount };
    case "AUTH/SET_NEW_NAME":
      return { ...state, name: action.name };
    case "AUTH/SET_NEW_AVATAR":
      return { ...state, avatar: action.avatar };
    case "AUTH/SENT_INSTRUCTION":
      return { ...state, isSentInstruction: action.isSent };
    default:
      return state;
  }
};

// actions

export const logInAC = (
  name: string,
  email: string,
  user_id: string,
  publicCardPacksCount: number,
  avatar: string
) =>
  ({
    type: "AUTH/SET_LOG_IN",
    isLoggedIn: true,
    name,
    email,
    user_id,
    publicCardPacksCount,
    avatar,
  } as const);
export const logOutAC = () => ({ type: "AUTH/SET_LOG_OUT", isLoggedIn: false } as const);
export const setHaveAccountAC = (isHaveAccount: boolean) =>
  ({ type: "AUTH/SET_HAVE_ACC", isHaveAccount } as const);
export const changeNameAC = (name: string) => ({ type: "AUTH/SET_NEW_NAME", name } as const);
export const changeAvatarAC = (avatar: string) =>
  ({ type: "AUTH/SET_NEW_AVATAR", avatar } as const);
export const sentInstructionAC = (isSent: boolean) =>
  ({ type: "AUTH/SENT_INSTRUCTION", isSent } as const);

// thank creators

export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI
    .logOut()
    .then((res) => {
      dispatch(logOutAC());
      dispatch(setAppStatusAC("succeeded"));
    })
    .catch((err: AxiosError<{ error: string }>) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const registerTC =
  (email: string, password: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI
      .register(email, password)
      .then((res) => {
        dispatch(setHaveAccountAC(true));
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        handleServerNetworkError(err, dispatch);
      });
  };

// log in
export const loginTC =
  (email: string, password: string, rememberMe: boolean): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI
      .logIn(email, password, rememberMe)
      .then((res) => {
        const { name, email, _id, publicCardPacksCount, avatar } = res.data;
        dispatch(logInAC(name, email, _id, publicCardPacksCount, avatar));
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        handleServerNetworkError(err, dispatch);
      });
  };

// me запрос

export const initializeProfileTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI
    .me()
    .then((res) => {
      if (res.data.name) {
        const { name, email, _id, publicCardPacksCount, avatar } = res.data;
        dispatch(logInAC(name, email, _id, publicCardPacksCount, avatar));
        dispatch(changeAvatarAC(res.data.avatar));
        dispatch(setAppStatusAC("succeeded"));
      }
    })
    .catch((err: AxiosError<{ error: string }>) => {
      console.log(err.message);
      dispatch(setAppStatusAC("failed"));
    })
    .finally(() => {
      dispatch(setInitializeAC());
    });
};

export const setNewNameTC = (name: string, avatar?: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI
    .changeName(name, avatar)
    .then((res) => {
      dispatch(changeNameAC(res.data.updatedUser.name));
      dispatch(changeAvatarAC(res.data.updatedUser.avatar));
      dispatch(setAppStatusAC("succeeded"));
    })
    .catch((err: AxiosError<{ error: string }>) => {
      handleServerNetworkError(err, dispatch);
    });
};

export const forgotPasswordTC =
  (email: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI
      .forgotPass(email)
      .then((res) => {
        dispatch(sentInstructionAC(true));
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        handleServerNetworkError(err, dispatch);
      });
  };

export const setNewPasswordTC =
  (password: string, token: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI
      .setNewPass(password, token)
      .then((res) => {
        dispatch(setAppStatusAC("succeeded"));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        handleServerNetworkError(err, dispatch);
      });
  };

// types

export type AuthActionsType =
  | LogInActionType
  | LogOutActionType
  | SetHaveAccountActionType
  | changeNameActionType
  | SentInstructionActionType
  | changeAvatarActionType;

type LogInActionType = ReturnType<typeof logInAC>;
type LogOutActionType = ReturnType<typeof logOutAC>;
type SetHaveAccountActionType = ReturnType<typeof setHaveAccountAC>;
type changeNameActionType = ReturnType<typeof changeNameAC>;
type SentInstructionActionType = ReturnType<typeof sentInstructionAC>;
type changeAvatarActionType = ReturnType<typeof changeAvatarAC>;
