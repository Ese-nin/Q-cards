import React, {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import s from './packList.module.css'
import SuperPagination from '../../common/c9-SuperPagination/SuperPagination';
import {deleteCardPackTC, renameCardPackTC} from "./cardsPackList-reducer";
import TablesPackPage from './tables/TablesPackPage';
import {PATH} from "../../../bll/Path";
import {getCardsPageTC} from "./cardPackPage-reducer";
import {SearchInput} from "./SearchInput/SearchInput";
import {Navigate, useSearchParams} from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useDebounce} from "../../../utils/hooks/useDebounce";
import {
    cardsTotalCountSelector,
    isLoggedInSelector,
    packNameSelector,
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
    const [visibleMenuBar, setVisibleMenuBar] = useState<boolean>(false)
    const cardsPack_id = params.cardsPack_id

    const [find, setFind] = useState('')




    const onVisibleMenuBarHandler=()=>{
        setVisibleMenuBar(!visibleMenuBar)
    }

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

    const renamePack = (cardPackID: string, newNameCardPack: string) => {
        dispatch(renameCardPackTC(cardPackID, newNameCardPack))
    }

    const removePack = (pack_id: string) => {
        dispatch(deleteCardPackTC(pack_id))
    }

    const learnCards = () => {
        alert('функция в разработке')
    }

    const burgerMenu = <div className={s.burgerMenu} onClick={onVisibleMenuBarHandler}>
        <div className={s.iconMenu}>
            <div className={s.rectangleContainer}>
                <div className={s.ellipseBig}>
                    <div className={s.containerGroup}>
                        <div className={s.ellipse} style={{top: "150.62px"}}></div>
                        <div className={s.ellipse} style={{top: "147.12px"}}></div>
                        <div className={s.ellipse} style={{top: "143.63px"}}></div>
                        <div className={s.rectangle}></div>
                    </div>
                </div>
            </div>
        </div>
        {visibleMenuBar && <div className={s.menuBarContainer}>
            <div className={s.menuBar}>
                <div className={s.buttonGroup}>
                    <div className={s.buttonAndName} onClick={()=>renamePack(params.cardsPack_id,"Update Pack")}><BorderColorIcon className={s.icon_style}/>
                        <div className={s.name}>Edit</div>
                    </div>
                    <div className={s.buttonAndName} onClick={()=>removePack(params.cardsPack_id)}><DeleteOutlineIcon className={s.icon_style}/>
                        <div className={s.name}>Delete</div>
                    </div>
                    <div className={s.buttonAndName}><SchoolIcon className={s.icon_style}/>
                        <div className={s.name}>Learn</div>
                    </div>
                </div>
            </div>
        </div>}
    </div>

    return (<div className={s.page}>

            {burgerMenu} {/*поставить на место */}

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