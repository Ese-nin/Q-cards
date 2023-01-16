import React from 'react';
import SuperButton from "../../../common/c2-SuperButton/SuperButton";

type ChoiceCardsPropsType = {

}

export const ChoiceCards: React.FC<ChoiceCardsPropsType> = () => {
    return (
        <div>
            <SuperButton xType={'secondary'}>
                My
            </SuperButton>
            <SuperButton>
                All
            </SuperButton>
        </div>
    );
};