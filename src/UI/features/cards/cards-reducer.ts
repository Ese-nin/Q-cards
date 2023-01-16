import {CardPacksType, cardsAPI} from "../../../dal/api";
import {ThunkAppDispatchType} from "../../../bll/store";
import {setAppStatusAC} from "../../app-reducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../../utils/error-utils";


const initialState = {
    cardPacks: [{
        id: "",
        user_id: "",
        name: "",
        cardsCount: 0,
        created: "",
        updated: "",
        user_name: ""
    }],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1, // выбранная страница
    pageCount: 1  // количество элементов на странице

}

export type initialCardsStateType = {
    cardPacks: Array<CardPacksType>,
    cardPacksTotalCount: number, // количество колод
    maxCardsCount: number,
    minCardsCount: number,
    page: number, // выбранная страница
    pageCount: number  // количество элементов на странице

}


export type CardsActionType = GetCardsPackACType
    | AddNewCardPackACType
    | DeleteCardPackACType


export const cardsReducer = (state: initialCardsStateType = initialState, action: CardsActionType): initialCardsStateType => {
    switch (action.type) {
        case "GET_CARDS_PACK":
            return {
                ...state,
                ...action
            }
        case "ADD_NEW_CARD_PACK":        //по сути это не нужно, но мб когда-то понадобится
            return {
                ...state,
                ...action
            }
        default:
            return state
    }
}

export const getCardsPackAC = (cardPacks: Array<CardPacksType>,
                               cardPacksTotalCount: number, // количество колод
                               maxCardsCount: number,
                               minCardsCount: number,
                               page: number, // выбранная страница
                               pageCount: number) => (
    {type: "GET_CARDS_PACK", cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount, page, pageCount} as const
)

export const addNewCardPackAC = (cardPacks: Array<CardPacksType>,
                                 cardPacksTotalCount: number, // количество колод
                                 maxCardsCount: number,
                                 minCardsCount: number,
                                 page: number, // выбранная страница
                                 pageCount: number) => ({
        type: "ADD_NEW_CARD_PACK", cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount, page, pageCount
    } as const
)

export const deleteCardPackAC=(cardPackID:string)=>({
    type:"DELETE_CARS_PACK", cardPackID}as const
)

export const renameCardPackAC=(cardPackID:string, newNameCardPack:string)=>({
        type:"RENAME_CARD_PACK", cardPackID,newNameCardPack }as const
)



export type GetCardsPackACType = ReturnType<typeof getCardsPackAC>
export type AddNewCardPackACType = ReturnType<typeof addNewCardPackAC>
export type DeleteCardPackACType= ReturnType<typeof deleteCardPackAC>
export type RenameCardPackACType = ReturnType<typeof renameCardPackAC>
export const getCardsPackTC = (packName: string = "", // для поиковой строки
                               min: number = 1,  // для кол-ва отображаемых паков
                               max: number = 4, // для кол-ва отображаемых паков
                               sortPacks: string = "", // для сортировки по возрастанию или убыванию
                               page: number = 1, // какая страница открыта
                               pageCount: number = 4, //кол-во паков на страницу
                               user_id: string = "", //чьи колоды, если пусто то, всех
                               block: boolean = false //для блока
) => (dispatch: ThunkAppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.getCardsPack(packName, min, max, sortPacks, page, pageCount, user_id, block)
        .then((res) => {
            const data = res.data
            dispatch(getCardsPackAC(data.cardPacks, data.cardPacksTotalCount, data.maxCardsCount, data.minCardsCount, data.page, data.pageCount))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const addNewCardPackTC = (name: string = "New Card Pack", deckCover: string = "", privatePack: boolean = false) => (dispatch: ThunkAppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.addNewCardPack(name, deckCover, privatePack)
        .then((res) => {
            dispatch(getCardsPackTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const deleteCardPackTC=(cardPackID:string)=>(dispatch: ThunkAppDispatchType)=>{
    dispatch(setAppStatusAC('loading'))
    cardsAPI.deleteCardPack(cardPackID)
        .then((res)=>{
            dispatch(getCardsPackTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            handleServerNetworkError(err, dispatch)
        })
}

export const renameCardPackTC=(cardPackID:string,newNameCardPack:string="Updated Card Pack")=>(dispatch: ThunkAppDispatchType)=>{
    dispatch(setAppStatusAC('loading'))
    cardsAPI.renameCardPack(cardPackID,newNameCardPack)
        .then((res)=>{
            dispatch(getCardsPackTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            handleServerNetworkError(err, dispatch)
        })
}