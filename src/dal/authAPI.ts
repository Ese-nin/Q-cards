import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL:
        process.env.NODE_ENV === "development"
            ? "http://localhost:7542/2.0/"
            : "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
});

export const authAPI = {
    me() {
        return instance.post<{}, AxiosResponse<UserDataResponseType>>(`auth/me`);
    },
    logIn(email: string, password: string, rememberMe: boolean) {
        return instance.post<
            { email: string; password: string; rememberMe: boolean },
            AxiosResponse<UserDataResponseType>
        >("auth/login", {
            email,
            password,
            rememberMe,
        });
    },
    logOut() {
        return instance.delete<"", AxiosResponse<LogOutResponseType>>(`auth/me`);
    },
    register(email: string, password: string) {
        return instance.post<{ email: string; password: string }, AxiosResponse<RegisterResponseType>>(
            `auth/register`,
            {
                email,
                password,
            }
        );
    },
    changeName(name: string, avatar?: string) {
        // тут потом нужно будет допилить изменение аватара!!!!
        return instance.put<{ name: string; avatar?: string }, AxiosResponse<ChangeNameResponseType>>(
            "/auth/me",
            {name}
        );
    },
    forgotPass(email: string) {
        const data = {
            email,
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href='https://ese-nin.github.io/Q-cards/#/createNewPass/$token$'>
            link</a>
                </div>`,
        };
        return axios.post<{ email: string; message: string }, AxiosResponse<ForgotResponseType>>(
            "https://neko-back.herokuapp.com/2.0/auth/forgot",
            data
        );
    },
    setNewPass(password: string, token: string) {
        const data = {
            password,
            resetPasswordToken: token,
        };
        return instance.post<
            { password: string; resetPasswordToken: string },
            AxiosResponse<NewPassResponseType>
        >("https://neko-back.herokuapp.com/2.0/auth/set-new-password", data);
    },
};

// types

type NewPassResponseType = LogOutResponseType;
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
export type LogOutResponseType = {
    info: string;
};
export type ForgotResponseType = {
    info: string;
    success: boolean;
    answer: boolean;
    html: boolean;
};
