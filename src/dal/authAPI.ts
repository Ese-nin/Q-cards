import { instance } from "./instance";

export const authAPI = {
  me() {
    return instance.post<UserDataResponseType>(`auth/me`);
  },
  logIn(email: string, password: string, rememberMe: boolean) {
    return instance.post<UserDataResponseType>("auth/login", {
      email,
      password,
      rememberMe,
    });
  },
  logOut() {
    return instance.delete<LogOutResponseType>(`auth/me`);
  },
  register(email: string, password: string) {
    return instance.post<RegisterResponseType>(`auth/register`, {
      email,
      password,
    });
  },
  changeName(name: string, avatar?: string) {
    // тут потом нужно будет допилить изменение аватара!!!!
    return instance.put<ChangeNameResponseType>("/auth/me", { name });
  },
  forgotPass(email: string) {
    const data = {
      email,
      message: `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href="https://ese-nin.github.io/Q-cards/#/createNewPass/$token$">
            link</a>
                </div>`,
    };
    return instance.post<ForgotResponseType>(
      "https://neko-back.herokuapp.com/2.0/auth/forgot",
      data
    );
  },
  setNewPass(password: string, token: string) {
    const data = {
      password,
      resetPasswordToken: token,
    };
    return instance.post<NewPassResponseType>(
      "https://neko-back.herokuapp.com/2.0/auth/set-new-password",
      data
    );
  },
};

// types

type NewPassResponseType = LogOutResponseType;
export type LogOutResponseType = Pick<ForgotResponseType, "info">;
export type ForgotResponseType = {
  info: string;
  success: boolean;
  answer: boolean;
  html: boolean;
};
type RegisterResponseType = {
  addedUser: {
    created: string;
    email: string;
    isAdmin: boolean;
    name: string;
    publicCardPacksCount: number;
    rememberMe: boolean;
    updated: string;
    verified: boolean;
    __v: number;
    _id: string;
  };
};
export type UserDataResponseType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
  avatar?: any;
};
export type ChangeNameResponseType = {
  updatedUser: UserDataResponseType;
  token: string;
  tokenDeathTime: number;
};
