import axios from 'axios'


const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
    headers: {}
})

export const authAPI = {
    me() {
        return instance.post<UserDataResponseType>(`auth/me`);
    },
    logIn(email: string, password: string, rememberMe: boolean) {
        return instance.post<UserDataResponseType>('auth/login', {email, password, rememberMe})
    },
    logOut() {
        return instance.delete<LogOutResponseType>(`auth/me`);
    },
    register(email: string, password: string) {
        return instance.post<RegisterResponseType>(`auth/register`, {email, password})
    },
    changeName(name: string) { // тут потом нужно будет допилить изменение аватара!!!!
        return instance.put<ChangeNameResponseType>('/auth/me', {name})
    },
    forgotPass(email: string) {
        const data = {
            email,
            message: `<div style="background-color: lime; padding: 15px">
            password recovery link: 
            <a href='https://ese-nin.github.io/Q-cards/#/createNewPass/$token$'>
            link</a>
                </div>`
        }
        return axios.post<ForgotResponseType>('https://neko-back.herokuapp.com/2.0/auth/forgot', data)
    },
    setNewPass(password: string, token: string) {
        const data = {
            password,
            resetPasswordToken: token
        }
        return instance.post<NewPassResponseType>('https://neko-back.herokuapp.com/2.0/auth/set-new-password', data)
    },

}

export const cardsAPI={
    getCardsPack(packName:string,min:number,max:number,sortPacks:string,page:number,pageCount:number,user_id:string,block:boolean){
           const data={
               packName,
               min,
               max,
               sortPacks,
               page,
               pageCount,
               user_id,
               block
           }as DefaultRequestCardsPack

        return instance.get<GetCardsPackResponseType>('cards/pack',{data} )
    }
}


export type DefaultRequestCardsPack={
    packName:string,
    min:number,
    max:number,
    sortPacks:string,
    page:number,
    pageCount:number,
    user_id:string,
    block:boolean
}

// types

type RegisterResponseType = {
    addedUser: {
        created: string
        email: string
        isAdmin: boolean
        name: string
        publicCardPacksCount: number
        rememberMe: boolean
        updated: string
        verified: boolean
        __v: number
        _id: string
    }
}

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
}

export type ChangeNameResponseType = {
  updatedUser: UserDataResponseType;
  token: string;
  tokenDeathTime: number;
}

type NewPassResponseType = LogOutResponseType
export type LogOutResponseType = {
    info: string
}

export type ForgotResponseType = {
  info: string;
  success: boolean;
  answer: boolean;
  html: boolean;
}

export type GetCardsPackResponseType ={
    cardPacks:Array<CardPacksType>,
    cardPacksTotalCount:number, // количество колод
    maxCardsCount:number,
    minCardsCount:number,
    page:number, // выбранная страница
    pageCount:number  // количество элементов на странице

}

export type CardPacksType={
    id:string,
    user_id:string,
    name:string,
    cardsCount:number,
    created:string,
    updated:string
}