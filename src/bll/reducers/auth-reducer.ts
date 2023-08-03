import { authAPI } from "dal";
import { AxiosError } from "axios";
import { Dispatch } from "redux";
import { setAppStatusAC, setInitializeAC } from "./app-reducer";
import { AppThunk } from "../store";
import { handleServerNetworkError } from "../../utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logInAC(
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        user_id: string;
        publicCardPacksCount: number;
        avatar: string;
        isLoggedIn: true;
      }>
    ) {
      (state.isLoggedIn = action.payload.isLoggedIn),
        (state.name = action.payload.name),
        (state.email = action.payload.email),
        (state.user_id = action.payload.user_id);
      (state.publicCardPacksCount = action.payload.publicCardPacksCount),
        (state.avatar = action.payload.avatar);
    },
    logOutAC(state, action: PayloadAction<{ isLoggedIn: false }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setHaveAccountAC(state, action: PayloadAction<{ isHaveAccount: boolean }>) {
      state.isHaveAccount = action.payload.isHaveAccount;
    },
    changeNameAC(state, action: PayloadAction<{ name: string }>) {
      state.name = action.payload.name;
    },
    changeAvatarAC(state, action: PayloadAction<{ avatar: string }>) {
      state.avatar = action.payload.avatar;
    },
    sentInstructionAC(state, action: PayloadAction<{ isSentInstruction: boolean }>) {
      state.isSentInstruction = action.payload.isSentInstruction;
    },
  },
});

export const authReducer = slice.reducer;
export const {
  logInAC,
  logOutAC,
  setHaveAccountAC,
  changeNameAC,
  changeAvatarAC,
  sentInstructionAC,
} = slice.actions;

export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI
    .logOut()
    .then((res) => {
      dispatch(logOutAC({ isLoggedIn: false }));
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
        dispatch(setHaveAccountAC({ isHaveAccount: true }));
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
        dispatch(
          logInAC({
            name: name,
            email: email,
            user_id: _id,
            publicCardPacksCount: publicCardPacksCount,
            avatar: avatar,
            isLoggedIn: true,
          })
        );
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
        dispatch(
          logInAC({
            name: name,
            email: email,
            user_id: _id,
            publicCardPacksCount: publicCardPacksCount,
            avatar: avatar,
            isLoggedIn: true,
          })
        );
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
      dispatch(changeNameAC({ name: res.data.updatedUser.name }));
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
        dispatch(sentInstructionAC({ isSentInstruction: true }));
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
