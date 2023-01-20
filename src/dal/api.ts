import axios, {AxiosResponse} from 'axios'


const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
    headers: {}
})
export const authAPI = {
    me() {
        return instance.post<{}, AxiosResponse<UserDataResponseType>>(`auth/me`);
    },
    logIn(email: string, password: string, rememberMe: boolean) {
        return instance.post<{ email: string, password: string, rememberMe: boolean }, AxiosResponse<UserDataResponseType>>
        ('auth/login',
            {
                email,
                password,
                rememberMe
            })
    },
    logOut() {
        return instance.delete<'', AxiosResponse<LogOutResponseType>>(`auth/me`);
    },
    register(email: string, password: string) {
        return instance.post<{ email: string, password: string }, AxiosResponse<RegisterResponseType>>
        (`auth/register`,
            {
                email,
                password
            })
    },
    changeName(name: string, avatar?: string) { // тут потом нужно будет допилить изменение аватара!!!!
        return instance.put<{ name: string, avatar?: string }, AxiosResponse<ChangeNameResponseType>>('/auth/me', {name})
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
        return axios.post<{ email: string, message: string }, AxiosResponse<ForgotResponseType>>('https://neko-back.herokuapp.com/2.0/auth/forgot', data)
    },
    setNewPass(password: string, token: string) {
        const data = {
            password,
            resetPasswordToken: token
        }
        return instance.post<{ password: string, resetPasswordToken: string }, AxiosResponse<NewPassResponseType>>('https://neko-back.herokuapp.com/2.0/auth/set-new-password', data)
    },
}

export const cardPackAPI = {
    getCardsPack(params: GetPacksParamsType) {
        return instance.get<'', AxiosResponse<GetCardsPackResponseType>>('cards/pack',
            {params}
        )
    },

    addNewCardPack(params: AddNewCardPackType) {
        const data = {
            cardsPack: {
                params
            }
        }
        return instance.post<{ cardsPack: AddNewCardPackType }, AxiosResponse<GetCardsPackResponseType>>('cards/pack', data)
    },

    deleteCardPack(cardPackID: string) {
        return instance.delete<'', AxiosResponse<DeletePackResponseType>>('cards/pack', {
            params: {
                id: cardPackID
            }
        })
    },

    renameCardPack(_id: string, name: string) {
        const data = {
            cardsPack: {
                _id, name
            }
        }
        return instance.put<{_id: string, name: string}, AxiosResponse<RenameCardPackType>>('cards/pack', data)
    }
}

export const cardsAPI = {
    getCardsPage(params: GetCardsParamsType) {
        return instance.get<'', AxiosResponse<GetCardResponseType>>('/cards/card', {params})
    },
    addNewCards(params: AddNewCardsType) {
        const data = {
            params
        }
        return instance.post('cards/card', data)
    },
    deleteCards(cardsID: string) {
        return instance.delete('cards/card', {
            params: {
                cardsID
            }
        })
    },
    renameCardQuestion(params: RenameCardQuestionType) {
        const data = {
            params
        }
        return instance.put('cards/card', data)
    }
}

export type DefaultRequestCardsPack = {
    packName: string,
    min: number,
    max: number,
    sortPacks: string,
    page: number,
    pageCount: number,
    user_id: string,
    block: boolean
}

// types

type NewPassResponseType = LogOutResponseType
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
export type LogOutResponseType = {
    info: string
}
export type ForgotResponseType = {
    info: string;
    success: boolean;
    answer: boolean;
    html: boolean;
}
export type GetCardsPackResponseType = {
    cardPacks: Array<CardPacksType>,
    cardPacksTotalCount: number, // количество колод
    maxCardsCount: number,
    minCardsCount: number,
    page: number, // выбранная страница
    pageCount: number  // количество элементов на странице
}

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
}

export type DeletePackResponseType = {
  deletedCardsPack: DeletedCardsPack;
  token: string;
  tokenDeathTime: number;
}

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
}

export type CardPacksType = {
    _id: string,
    user_id: string,
    name: string,
    cardsCount: number,
    created: string,
    updated: string,
    user_name: string
}
export type CardType = {
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number,
    shots: number,
    user_id: string,
    created: string,
    updated: string,
    _id: string
}
export type GetPacksParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
    block?: boolean
}
export type AddNewCardPackType = {
    name?: string,
    deckCover?: string,
    privatePack?: boolean
}
export type RenameCardPackType = {
    cardPackID: string,
    newNameCardPack?: string
}
export type AddNewCardsType = {
    card: {
        cardsPack_id: string,
        question?: string
        answer?: string,
        grade?: number,
        shots?: number,
        answerImg?: string,
        questionImg?: string,
        questionVideo?: string,
        answerVideo?: string
    }
}
export type RenameCardQuestionType = {
    id: string,
    question?: string
}

export type GetCardsParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}