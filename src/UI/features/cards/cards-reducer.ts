import {CardPacksType, cardsAPI} from '../../../dal/api';
import {ThunkAppDispatchType} from '../../../bll/store';
import {setAppStatusAC} from '../../app-reducer';
import {AxiosError} from 'axios';
import {handleServerNetworkError} from '../../../utils/error-utils';


const initialState = {
    cardPacks: [{
        id: '',
        user_id: '',
        name: '',
        cardsCount: 0,
        created: '',
        updated: '',
        user_name: ''
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
        case 'GET_CARDS_PACK':
            return {
                ...state,
                cardPacks: [...state.cardPacks, ...action.cardPacks],
                cardPacksTotalCount: action.cardPacksTotalCount,
                maxCardsCount: action.maxCardsCount,
                minCardsCount: action.minCardsCount,
                page: action.page,
                pageCount: action.pageCount
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
                               pageCount: number,
) => (
    {
        type: 'GET_CARDS_PACK',
        cardPacks,
        cardPacksTotalCount,
        maxCardsCount,
        minCardsCount,
        page,
        pageCount,

    } as const
)

export type GetCardsPackACType = ReturnType<typeof getCardsPackAC>

export const getCardsPackTC = (packName: string = '', min: number = 1, max: number = 9, sortPacks: string = '', page: number = 1, pageCount: number = 10, user_id: string = '', block: boolean = false) => (dispatch: ThunkAppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.getCardsPack(packName, min, max, sortPacks, page, pageCount, user_id, block)
        .then((res) => {
            dispatch(getCardsPackAC(res.data.cardPacks, res.data.cardPacksTotalCount, res.data.maxCardsCount, res.data.minCardsCount, res.data.page, res.data.pageCount))

            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            handleServerNetworkError(err, dispatch)
        })
}