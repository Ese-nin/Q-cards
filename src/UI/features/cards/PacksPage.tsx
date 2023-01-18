import React from 'react';
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {Navigate, useSearchParams} from 'react-router-dom';
import s from './packList.module.css'
import SuperPagination from '../../common/c9-SuperPagination/SuperPagination';
import {addNewCardPackTC, getCardsPackTC} from "./cardsPackList-reducer";
import TablesPackPage from './tables/TablesPackPage';
import {PATH} from "../../../bll/Path";


export const PackPage = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const cardPacksTotalCount = useAppSelector(state => state.cards.cardPacksTotalCount)

    const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()


    const onChangePagination = (page: number, pageCount: number) => {
        const params = Object.fromEntries(searchParams)

        dispatch(getCardsPackTC({...params, page, pageCount}))
        setSearchParams({...params, page, pageCount})
    }

    const buttonClickHandler = () => {
        dispatch(addNewCardPackTC({}))
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
                <div>строка поиска</div>
            </div>

            <div className={s.tableBlock}>
                <TablesPackPage/>
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