import React, {useCallback} from 'react';
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import {useAppDispatch} from "../../../../bll/store";
import {getCardsPackTC} from "../cardsPackList-reducer";
import {useSearchParams} from 'react-router-dom'

type ChoiceCardsPropsType = {
    userID: string
}

export const ChoiceCards: React.FC<ChoiceCardsPropsType> = ({userID}) => {

    const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
    const params = Object.fromEntries(searchParams)
    const dispatch = useAppDispatch()

    const chooseCards = useCallback((user_id: string) => {
        dispatch(getCardsPackTC({...params, user_id}))

        setSearchParams({...params, user_id})
    }, [])

    return (
        <div>
            <SuperButton xType={params.user_id ? '' : 'secondary'}
                         onClick={() => chooseCards(userID)}>
                My
            </SuperButton>
            <SuperButton xType={params.user_id ? 'secondary' : ''}
                onClick={() => chooseCards('')}>
                All
            </SuperButton>
        </div>
    );
};