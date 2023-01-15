import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../bll/store";
import {getCardsPackTC} from "../cards-reducer";

export const CardsPack = () => {
    useEffect(()=>{
        dispatch(getCardsPackTC())
    },[])
    const dispatch=useAppDispatch()
    const value=useAppSelector(state => state.cards)


    console.log(value)

    return (
        <div>

        </div>
    );
};

