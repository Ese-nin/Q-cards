import React, {useCallback} from 'react';
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import {useAppDispatch} from "../../../../bll/store";
import {getCardsPackTC} from "../cards-reducer";

type ChoiceCardsPropsType = {
    userID: string
}

export const ChoiceCards: React.FC<ChoiceCardsPropsType> = ({userID}) => {

    const dispatch = useAppDispatch()

    const chooseCards = useCallback((user_id: string) => {
        dispatch(getCardsPackTC(user_id))
    }, [])

    return (
        <div>
            <SuperButton xType={userID ? 'secondary' : ''} // допилить
                         onClick={() => chooseCards(userID)}>
                My
            </SuperButton>
            <SuperButton xType={!userID ? 'secondary' : ''} // допилить
                onClick={() => chooseCards('')}>
                All
            </SuperButton>
        </div>
    );
};