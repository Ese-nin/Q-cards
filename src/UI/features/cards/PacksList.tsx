import React, {useState} from 'react';
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {Navigate, useSearchParams} from 'react-router-dom';
import s from './packList.module.css'
import TablesPackList from './tables/TablesPackList';
import SuperPagination from '../../common/c9-SuperPagination/SuperPagination';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {addNewCardPackTC, getCardsPackTC} from "./cardsPackList-reducer";
import {ChoiceCards} from "./ChoiceCards/ChoiceCards";
import {RangeSlider} from "./RangeSlider/RangeSlider";


export const PackList = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const cardPacksTotalCount = useAppSelector(state => state.cards.cardPacksTotalCount)
    const minCardsCount = useAppSelector(state => state.cards.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.cards.maxCardsCount)
    let userID = useAppSelector(state => state.auth.user_id)

    const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
    const params = Object.fromEntries(searchParams)

    const [value1, setValue1] = useState(minCardsCount)
    const [value2, setValue2] = useState(maxCardsCount)

    const changeSliderValues = (event: Event, value: number | number[]) => {
        if (Array.isArray(value)) {
            setValue1(value[0])
            setValue2(value[1])
        }

        // dispatch(getCardsPackTC({...params, min: value1, max: value2}))
        // setSearchParams({...params, min: value1, max: value2})
    }

    const buttonClickHandler = () => {
        dispatch(addNewCardPackTC({}))
    }

    const onChangePagination = (newPage: number, newCount: number) => {
        dispatch(getCardsPackTC({...params, page: newPage, pageCount: newCount}))
        setSearchParams({...params, page: newPage, pageCount: newCount})
    }

    const resetFilter = () => {
        dispatch(getCardsPackTC({}))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (<div className={s.page}>
            <div className={s.addNewPackLine}>
                <div>Packs list</div>
                <Button variant="outlined" onClick={buttonClickHandler}>
                    Add new pack
                </Button>
            </div>
            <div className={s.formLine}>
                <div>строка поиска</div>
                <div><ChoiceCards userID={userID}/></div>
                <div className={s.slider}>
                    <span>{value1}</span>
                    <RangeSlider
                        min={minCardsCount}
                        max={maxCardsCount}
                        value={[value1, value2]}
                        onChange={changeSliderValues}/>
                    <span>{value2}</span>
                </div>
                <div><FilterAltOffIcon onClick={resetFilter}/></div>
            </div>

            <div className={s.tableBlock}>
                <TablesPackList/>
            </div>

            <div>
                <SuperPagination
                    page={page}
                    itemsCountForPage={pageCount}
                    totalCount={cardPacksTotalCount}
                    onChange={onChangePagination}
                />
            </div>
        </div>

    );
};