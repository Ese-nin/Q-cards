import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {deleteCardPackTC, getCardsPackTC, renameCardPackTC} from '../cardsPackList-reducer';
import {useAppDispatch, useAppSelector} from '../../../../bll/store';
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SuperButton from '../../../common/c2-SuperButton/SuperButton';
import s from './TablesPackList.module.css'
import {useNavigate} from 'react-router-dom';
import {getCardsPageTC} from '../cardPackPage-reducer';
import {PATH} from '../../../../bll/Path';
import iconDown from '../../../../assets/icon/iconDown.png'
import iconUp from '../../../../assets/icon/iconUp.png'
import sort from '../../../../assets/icon/sort.svg'

export default function TablesPackList() {
    const navigate = useNavigate();

    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector(state => state.cards.cardPacks)
    const meID = useAppSelector(state => state.auth.user_id)

    useEffect(() => {
        dispatch(getCardsPackTC({}))
    }, [])

    const learnCards = () => {
        alert('функция в разработке')
    }

    const getPackPage = (cardsPack_id: string) => {
        dispatch(getCardsPageTC({cardsPack_id}))
        navigate(PATH.PACK_PAGE + '?cardsPack_id=' + cardsPack_id)
    }


    const renamePack = (cardPackID: string, newNameCardPack: string) => {
        dispatch(renameCardPackTC(cardPackID, newNameCardPack))
    }

    const removePack = (pack_id: string) => {
        dispatch(deleteCardPackTC(pack_id))
    }

    /*const onChangeSort = (newSort: string) => {  // допилить сортировку!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        dispatch(getCardsPackTC({sortPacks: newSort, page: 1, pageCount: count}))

        setSearchParams({sortPacks: newSort, page: 1, pageCount: count})

    }*/

    // export const pureChange = (sort: string, down: string, up: string) => {
    //     let res = ''
    //     if (sort === res) {
    //         res = down
    //     } else if (sort !== down && sort === up) {
    //         res = ''
    //     } else if (sort === down) {
    //         res = up
    //     } else {
    //         res = down
    //     }
    //     return res
    // }
    //
    //
    const icon = sort === iconDown     // реализация иконки сортировки
        ? iconDown
        : sort === iconUp
            ? iconUp
            : sort

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{backgroundColor: '#EFEFEF'}}>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">Cards</TableCell>
                        <TableCell align="left">
                            <button
                                // onClick={onChangeSort}
                                className={s.btnNamePagePack}
                            >
                                Last Updated
                                <img
                                    className={s.sortIcon}
                                    src={icon}
                                    alt={'sort'}
                                />
                            </button>
                        </TableCell>
                        <TableCell align="left">Created by</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cardPacks.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                <button
                                    onClick={() => getPackPage(row._id)}
                                    className={s.btnNamePagePack}>
                                    {row.name}
                                </button>
                            </TableCell>
                            <TableCell align="left">{row.cardsCount}</TableCell>
                            <TableCell
                                align="left">{(new Date(row.updated)).getDate()}
                                .{(new Date(row.updated)).getMonth() < 10
                                    ? ((new Date(row.updated)).getMonth() + '1')
                                    : (new Date(row.updated)).getMonth() + 1}
                                .{(new Date(row.updated)).getFullYear()}</TableCell>
                            <TableCell align="left">{row.user_name}</TableCell>
                            <div style={{display: 'flex', marginTop: '15px', marginBottom: '5px'}}>
                                <SuperButton onClick={learnCards} className={s.button_style}
                                             disabled={row.cardsCount === 0}><SchoolIcon
                                    className={s.icon_style}/></SuperButton>
                                {meID === row.user_id && <div>
                                    <SuperButton onClick={() => renamePack(row._id, 'Updated name')}
                                                 className={s.button_style}>
                                        <BorderColorIcon className={s.icon_style}/>
                                    </SuperButton>
                                    <SuperButton onClick={() => removePack(row._id)}
                                                 className={s.button_style}>
                                        <DeleteOutlineIcon className={s.icon_style}/>
                                    </SuperButton>
                                </div>}
                            </div>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}