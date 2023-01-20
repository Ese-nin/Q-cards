import React, {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {Navigate, useSearchParams} from 'react-router-dom';
import s from './packList.module.css'
import SuperPagination from '../../common/c9-SuperPagination/SuperPagination';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {addNewCardPackTC, getCardsPackTC} from './cardsPackList-reducer';
import {ChoiceCards} from './ChoiceCards/ChoiceCards';
import {RangeSlider} from './RangeSlider/RangeSlider';
import {SearchInput} from './SearchInput/SearchInput';
import {PATH} from '../../../bll/Path';
import TablesPackList from './tables/TablesPackList';
import {useDebounce} from "../../../utils/hooks/useDebounce";
import {
    cardPacksTotalCountSelector,
    isLoggedInSelector, maxCardsCountSelector, minCardsCountSelector,
    pageCountPacksSelector,
    pagePacksSelector, user_idSelector
} from "../../../bll/selectors";


export const PackList = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(isLoggedInSelector)
    const page = useAppSelector(pagePacksSelector)
    const pageCount = useAppSelector(pageCountPacksSelector)
    const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector)
    const minCardsCount = useAppSelector(minCardsCountSelector)
    const maxCardsCount = useAppSelector(maxCardsCountSelector)
    const userID = useAppSelector(user_idSelector)

    const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
    const params = Object.fromEntries(searchParams)

    const [values, setValues] = useState([minCardsCount, maxCardsCount])
    const [find, setFind] = useState('')

    const sliderDebouncedValue = useDebounce<number[]>(values, 600)
    const searchDebouncedValue = useDebounce<string>(find, 600)

    const changeSliderValues = (event: Event, value: number | number[]) => {
        if (Array.isArray(value)) {
            setValues(value)
        }
    }

    useEffect(() => {
        // dispatch(getCardsPackTC({...params, min: values[0], max: values[1]}))
        setSearchParams({...params, min: values[0], max: values[1]})
    }, [sliderDebouncedValue])

    const onChangeText = (value: string) => {
        setFind(value)
    }

    useEffect(() => {
        // dispatch(getCardsPackTC({...params, packName: find}))
        setSearchParams({...params, packName: find})
    }, [searchDebouncedValue])

    const addNewCardsPack = () => {
        params.user_id
            ? dispatch(addNewCardPackTC({}, userID))
            : dispatch(addNewCardPackTC({}))
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
                <Button variant="outlined" onClick={addNewCardsPack}>
                    Add new pack
                </Button>
            </div>
            <div className={s.formLine}>
                <div className={s.searchField}>
                    <SearchInput value={find}
                                 onChangeText={onChangeText}
                                 placeholder={'Search'}/>
                </div>
                <div><ChoiceCards userID={userID}/></div>
                <div className={s.slider}>
                    <span>{values[0]}</span>
                    <RangeSlider
                        min={minCardsCount}
                        max={maxCardsCount}
                        value={values}
                        onChange={changeSliderValues}/>
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