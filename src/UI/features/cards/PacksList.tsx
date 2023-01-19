import React, {useState} from 'react';
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {Navigate, useSearchParams} from 'react-router-dom';
import s from './packList.module.css'
import {TablesPackList} from './tables/TablesPackList';
import SuperPagination from '../../common/c9-SuperPagination/SuperPagination';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {addNewCardPackTC, getCardsPackTC} from "./cardsPackList-reducer";
import {ChoiceCards} from "./ChoiceCards/ChoiceCards";
import {RangeSlider} from "./RangeSlider/RangeSlider";
import {SearchInput} from "./SearchInput/SearchInput";
import {PATH} from "../../../bll/Path";


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

    const [values, setValues] = useState([minCardsCount, maxCardsCount])
    // const [value2, setValue2] = useState(maxCardsCount)
    const [find, setFind] = useState('')

    const changeSliderValues = (event: React.SyntheticEvent | Event, value: number | number[]) => {
        if (Array.isArray(value)) {
            setValues(value)
        }

        // dispatch(getCardsPackTC({...params, min: value1, max: value2}))
        setSearchParams({...params, min: values[0], max: values[1]})
    }

    const onChangeText = (value: string) => {
        setFind(value)
    }

    const onDebouncedChange = (value: string) => {
        // dispatch(getCardsPackTC({...params, packName: value}))
        setSearchParams({...params, packName: value})
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
        return <Navigate to={PATH.LOGIN}/>
    }

    return (<div className={s.page}>
            <div className={s.addNewPackLine}>
                <div>Packs list</div>
                <Button variant="outlined" onClick={buttonClickHandler}>
                    Add new pack
                </Button>
            </div>
            <div className={s.formLine}>
                <div className={s.searchField}>
                    <SearchInput value={find}
                                 onChangeText={onChangeText}
                                 onDebouncedChange={onDebouncedChange}
                                 placeholder={'Search'}/>
                </div>
                <div><ChoiceCards userID={userID}/></div>
                <div className={s.slider}>
                    <span>{values[0]}</span>
                    <RangeSlider
                        min={minCardsCount}
                        max={maxCardsCount}
                        value={values}
                        onChangeCommitted={changeSliderValues}/>
                    <span>{values[1]}</span>
                </div>
                <div><FilterAltOffIcon onClick={resetFilter}/></div>
            </div>

            <div className={s.tableBlock}>
                <TablesPackList/>
            </div>

            <div className={s.pagination}>
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