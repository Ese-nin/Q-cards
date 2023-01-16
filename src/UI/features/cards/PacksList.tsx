import React from 'react';
import {Button} from '@mui/material';
import {useAppSelector} from '../../../bll/store';
import {Navigate} from 'react-router-dom';
import s from './packList.module.css'
import Tables from './tables/Tables';
import SuperPagination from '../../common/c9-SuperPagination/SuperPagination';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';


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
            <div className={s.formLine}>
                <div>строка поиска</div>
                <div>мои чужие карты</div>
                <div>для слайдера</div>
                <div><FilterAltOffIcon/></div>
            </div>

            <div className={s.tableBlock}>
                <Tables/>
            </div>

            <div>
               <SuperPagination
                   page={1}
                   itemsCountForPage={4}
                   totalCount={4}
                   // onChange={()=}
               />
            </div>
        </div>

    );
};