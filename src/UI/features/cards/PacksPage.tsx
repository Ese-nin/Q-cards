import React, {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import s from './packList.module.css'
import SuperPagination from '../../common/c9-SuperPagination/SuperPagination';
import TablesPackPage from './tables/TablesPackPage';
import {PATH} from "../../../bll/Path";
import {getCardsPageTC} from "./cardPackPage-reducer";
import {SearchInput} from "./SearchInput/SearchInput";
import {Navigate, useSearchParams} from "react-router-dom";
import {useDebounce} from "../../../utils/hooks/useDebounce";
import {
    cardsTotalCountSelector,
    isLoggedInSelector, packNameSelector,
    pageCardsSelector,
    pageCountCardsSelector
} from "../../../bll/selectors";


export const PackPage = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(isLoggedInSelector)
    const page = useAppSelector(pageCardsSelector)
    const pageCount = useAppSelector(pageCountCardsSelector)
    const cardsTotalCount = useAppSelector(cardsTotalCountSelector)
    const packName = useAppSelector(packNameSelector)

    const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
    const params = Object.fromEntries(searchParams)
    const cardsPack_id = params.cardsPack_id

    const [find, setFind] = useState('')

    const searchDebouncedValue = useDebounce<string>(find, 600)

    const onChangePagination = (page: number, pageCount: number) => {
        dispatch(getCardsPageTC({...params, cardsPack_id, page, pageCount}))
        setSearchParams({...params, page, pageCount})
    }

    const buttonClickHandler = () => {
        // some handle
    }

    const onChangeText = (value: string) => {
        setFind(value)
    }

    useEffect(() => {
        dispatch(getCardsPageTC({...params, cardsPack_id, cardQuestion: find}))
        setSearchParams({...params, cardQuestion: find})
    }, [searchDebouncedValue])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }


    return (<div className={s.page}>
            <div className={s.addNewPackLine}>
                <div>{packName}</div>
                <Button variant="outlined" onClick={buttonClickHandler}>
                    Learn to pack
                </Button>
            </div>
            <div className={s.formLine}>
                <div className={s.searchFieldCards}>
                    <SearchInput value={find}
                                 onChangeText={onChangeText}
                                 placeholder={'Search'}/>
                </div>
            </div>

            <div className={s.tableBlock}>
                <TablesPackPage/>
            </div>

            <div className={s.pagination}>
                <SuperPagination
                    page={page}
                    itemsCountForPage={pageCount}
                    totalCount={cardsTotalCount}
                    onChange={onChangePagination}
                />
            </div>
        </div>

    );
};