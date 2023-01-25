import React, {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'bll/store';
import s from './packList.module.css';
import {deleteCardPackTC, renameCardPackTC} from 'bll/reducers/packs-reducer';
import TablesPackPage from './tables/TablesPackPage';
import {PATH} from 'bll/Path';
import {addNewCardTC, getCardsPageTC} from 'bll/reducers/cards-reducer';
import {SearchInput} from './SearchInput/SearchInput';
import {Navigate, useNavigate, useSearchParams} from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useDebounce} from 'utils/hooks/useDebounce';
import {
    cardsTotalCountSelector,
    isLoggedInSelector,
    packNameSelector,
    packUserIdSelector,
    pageCardsSelector,
    pageCountCardsSelector,
    user_idSelector,
} from 'bll/selectors';
import back from 'assets/icon/back.svg';
import {SuperPagination} from 'UI/common';
import {AddNewCardModal} from '../../../components/modal/AddNewCardModal';

export const PackPage = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const page = useAppSelector(pageCardsSelector);
    const pageCount = useAppSelector(pageCountCardsSelector);
    const cardsTotalCount = useAppSelector(cardsTotalCountSelector);
    const packName = useAppSelector(packNameSelector);
    const navigate = useNavigate();
    const [find, setFind] = useState('');
    const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
    const params = Object.fromEntries(searchParams);
    const cardsPack_id = params.cardsPack_id;
    const meID = useAppSelector(user_idSelector);
    const IdCards = useAppSelector(packUserIdSelector);

    const [visibleMenuBar, setVisibleMenuBar] = useState<boolean>(false);

    const onVisibleMenuBarHandler = () => {
        setVisibleMenuBar(!visibleMenuBar);
    };
    const BackToPackList = () => {
        navigate(PATH.PACK_LIST);
    };
    const addNewCard = (question: string) => {
        dispatch(addNewCardTC({cardsPack_id, question}));
        setSearchParams({...params, cardsPack_id, cardQuestion: question});
    };

    const searchDebouncedValue = useDebounce<string>(find, 600);

    const onChangePagination = (page: number, pageCount: number) => {
        dispatch(getCardsPageTC({...params, cardsPack_id, page, pageCount}));
        setSearchParams({...params, page, pageCount});
    };

    const buttonClickHandler = () => {
        // some handle
    };

    const onChangeText = (value: string) => {
        setFind(value);
    };

    useEffect(() => {
        // dispatch(getCardsPageTC({...params, cardsPack_id, cardQuestion: find}))
        setSearchParams({...params, cardQuestion: find});
    }, [searchDebouncedValue]);

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>;
    }

    const renamePack = (cardPackID: string, newNameCardPack: string) => {
        dispatch(renameCardPackTC(cardPackID, newNameCardPack));
    };

    const removePack = (pack_id: string) => {
        dispatch(deleteCardPackTC(pack_id));
    };

    const learnCards = () => {
        alert('функция в разработке');
    };


    const burgerMenu = (
        <div className={s.burgerMenu} onClick={onVisibleMenuBarHandler}>
            <div className={s.iconMenu}>
                <div className={s.rectangleContainer}>
                    <div className={s.ellipseBig}>
                        <div className={s.containerGroup}>
                            <div className={s.ellipse} style={{top: '150.62px'}}></div>
                            <div className={s.ellipse} style={{top: '147.12px'}}></div>
                            <div className={s.ellipse} style={{top: '143.63px'}}></div>
                            <div className={s.rectangle}></div>
                        </div>
                    </div>
                </div>
            </div>
            {visibleMenuBar && (
                <div className={s.menuBarContainer}>
                    <div className={s.menuBar}>
                        <div className={s.buttonGroup}>
                            <div
                                className={s.buttonAndName}
                                onClick={() => renamePack(params.cardsPack_id, 'Update Pack')}
                            >
                                <BorderColorIcon className={s.icon_style}/>
                                <div className={s.name}>Edit</div>
                            </div>
                            <div className={s.buttonAndName} onClick={() => removePack(params.cardsPack_id)}>
                                <DeleteOutlineIcon className={s.icon_style}/>
                                <div className={s.name}>Delete</div>
                            </div>
                            <div className={s.buttonAndName}>
                                <SchoolIcon className={s.icon_style}/>
                                <div className={s.name}>Learn</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className={s.page}>
            <div className={s.backBlock} onClick={BackToPackList}>
                <img src={back} alt="back"/>
                <span>Back to Packs List</span>
            </div>
            <div className={s.addNewPackLine}>
                <div className={s.nameAndBurger}>
                    <h2>{packName}</h2>
                    {burgerMenu}

                </div>

                {/*здесь нужно построить зависимость от значения meID и IdCards если равно то кнопка модалки и бургер, если нет то только учить пачку*/}


                <Button variant="contained" onClick={buttonClickHandler}>
                    Learn to pack
                </Button>

                <AddNewCardModal/>


            </div>
            <div className={s.formLine}>
                <div className={s.searchFieldCards}>
                    <SearchInput value={find} onChangeText={onChangeText} placeholder={'Search'}/>
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
