import React from 'react';
import {Button} from '@mui/material';
import {useAppSelector} from '../../../bll/store';
import {Navigate} from 'react-router-dom';
import s from './packList.module.css'

export const PackList = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


    return (<div className={s.page}>
            <div className={s.addNewPackLine}>
                <div>Packs list</div>
                <Button variant="outlined">
                    Add new pack
                </Button>
            </div>
            <div>
                <div>строка поиска</div>
                <div>мои чужие карты</div>
                <div>для слайдера</div>
                <div>кнопка сброса фильтров</div>
            </div>

            <div>
                таблица
            </div>

            <div>
                пагинация
            </div>
        </div>

    );
};