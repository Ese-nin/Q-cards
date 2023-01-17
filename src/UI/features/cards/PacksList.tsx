import React from 'react';
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {Navigate} from 'react-router-dom';
import s from './packList.module.css'
import TablesPackList from './tables/TablesPackList';
import SuperPagination from '../../common/c9-SuperPagination/SuperPagination';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {addNewCardPackTC} from "./cardsPackList-reducer";
import {ChoiceCards} from "./ChoiceCards/ChoiceCards";
import {RangeSlider} from "./RangeSlider/RangeSlider";


export const PackList = () => {
   const dispatch=useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    let userID = useAppSelector(state => state.auth.user_id)
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

 const buttonClickHandler=()=>{
     dispatch(addNewCardPackTC())
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
                <div><RangeSlider/></div>
                <div><FilterAltOffIcon/></div>
            </div>

            <div className={s.tableBlock}>
                <TablesPackList/>
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