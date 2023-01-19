import React, {useState} from 'react';
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {Navigate, useSearchParams} from 'react-router-dom';
import s from './packList.module.css'
import SuperPagination from '../../common/c9-SuperPagination/SuperPagination';
import {addNewCardPackTC} from "./cardsPackList-reducer";
import TablesPackPage from './tables/TablesPackPage';
import {PATH} from "../../../bll/Path";
import {getCardsPageTC} from "./cardPackPage-reducer";
import {SearchInput} from "./SearchInput/SearchInput";


export const PackPage = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const page = useAppSelector(state => state.cardPage.page)
    const pageCount = useAppSelector(state => state.cardPage.pageCount)
    const cardsTotalCount = useAppSelector(state => state.cardPage.cardsTotalCount)

    const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
    const params = Object.fromEntries(searchParams)

    const [find, setFind] = useState('')

    const onChangePagination = (page: number, pageCount: number) => {


        dispatch(getCardsPageTC({cardsPack_id: 'pack_id', page, pageCount})) // допилить
        setSearchParams({...params, page, pageCount})
    }

    const buttonClickHandler = () => {
        dispatch(addNewCardPackTC({}))
    }

    const onChangeText = (value: string) => {
        setFind(value)
    }

    const onDebouncedChange = (value: string) => {
        // dispatch(getCardsPackTC({...params, cardsPack_id: 'pack_id', cardQuestion: value}))
        setSearchParams({...params, cardQuestion: value})
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }


    return (<div className={s.page}>
            <div className={s.addNewPackLine}>
                <div>Friend’s Pack</div>
                <Button variant="outlined" onClick={buttonClickHandler}>
                    Learn to pack
                </Button>
            </div>
            <div className={s.formLine}>
                <div className={s.searchFieldCards}>
                    <SearchInput value={find}
                                 onChangeText={onChangeText}
                                 onDebouncedChange={onDebouncedChange}
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