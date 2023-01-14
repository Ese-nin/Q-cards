import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../bll/store";
import {getCardsPackTC} from "../cards-reducer";

export const CardsPack = () => {
    const dispatch=useAppDispatch()
    const name=useAppSelector(state => state.cards.cardPacks)

    useEffect(()=>{
        dispatch(getCardsPackTC())
    },[])

    return (
        <div>
            <h1>name</h1>
        </div>
    );
};

