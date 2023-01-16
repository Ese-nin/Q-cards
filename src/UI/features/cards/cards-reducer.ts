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
        updated: ""
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


export const cardsReducer = (state: initialCardsStateType = initialState, action: CardsActionType): initialCardsStateType => {
    switch (action.type) {
        case "GET_CARDS_PACK":
            console.log(action)
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

export type GetCardsPackACType = ReturnType<typeof getCardsPackAC>

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
            const data= res.data
            dispatch(getCardsPackAC(data.cardPacks, data.cardPacksTotalCount, data.maxCardsCount, data.minCardsCount, data.page, data.pageCount))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            handleServerNetworkError(err, dispatch)
        })
}