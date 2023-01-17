import {cardsAPI, CardType} from '../../../dal/api';
import {ThunkAppDispatchType} from '../../../bll/store';
import {setAppStatusAC} from '../../app-reducer';
import {AxiosError} from 'axios';
import {handleServerNetworkError} from '../../../utils/error-utils';


const initialState = {
    cards: [{
        answer: '',
        question: '',
        cardsPack_id: '',
        grade: 0,
        shots: 1,
        user_id: '',
        created: '',
        updated: '',
        _id: ''
    }],
    cardsTotalCount: 3,
    maxGrade: 5,
    minGrade: 2,
    page: 1, // выбранная страница
    pageCount: 1,  // количество элементов на странице
    packUserId: ''

}

export type initialCardsStateType = {
    cards: Array<CardType>,
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    page: number, // выбранная страница
    pageCount: number,  // количество элементов на странице
    packUserId: string

}


export type CardsActionType = GetCardsPackACType


export const cardPackPageReducer = (state: initialCardsStateType = initialState, action: CardsActionType): initialCardsStateType => {
    switch (action.type) {
        case 'GET_CARDS_PACK':
            return {
                ...state,
                ...action
            }
        default:
            return state
    }
}

export const getCardsPackAC = (cards: Array<CardType>,
                               cardPacksTotalCount: number, // количество колод
                               maxCardsCount: number,
                               minCardsCount: number,
                               page: number, // выбранная страница
                               pageCount: number) => (
    {
        type: 'GET_CARDS_PACK',
        cardPacks: cards,
        cardPacksTotalCount,
        maxCardsCount,
        minCardsCount,
        page,
        pageCount
    } as const
)


export type GetCardsPackACType = ReturnType<typeof getCardsPackAC>
export const getCardsPackTC = (packName: string = '', // для поиковой строки
                               min: number = 1,  // для кол-ва отображаемых паков
                               max: number = 4, // для кол-ва отображаемых паков
                               sortPacks: string = '', // для сортировки по возрастанию или убыванию
                               page: number = 1, // какая страница открыта
                               pageCount: number = 4, //кол-во паков на страницу
                               user_id: string = '', //чьи колоды, если пусто то, всех
                               block: boolean = false //для блока
) => (dispatch: ThunkAppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.getCardsPack(packName, min, max, sortPacks, page, pageCount, user_id, block)
        .then((res) => {
            const data = res.data
            // dispatch(getCardsPackAC(data.cardPacks, data.cardPacksTotalCount, data.maxCardsCount, data.minCardsCount, data.page, data.pageCount))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            handleServerNetworkError(err, dispatch)
        })
}

