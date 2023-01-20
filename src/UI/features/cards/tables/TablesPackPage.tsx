import * as React from 'react';
import {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../../../bll/store';
import {Rating} from '@mui/material';
import {cardsSelector, packUserIdSelector, user_idSelector} from "../../../../bll/selectors";
import SuperSort from "../../../common/SuperSort/SuperSort";
import {Navigate, useSearchParams} from 'react-router-dom';
import {deleteCardTC, getCardsPageTC, renameCardQuestionTC} from "../cardPackPage-reducer";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import s from "./TablesPackList.module.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {PATH} from '../../../../bll/Path';


export default function TablesPackPage() {

    const dispatch = useAppDispatch()
    const cards = useAppSelector(cardsSelector)
    const meID = useAppSelector(user_idSelector)
    const packUserID = useAppSelector(packUserIdSelector)

    const [sort, setSort] = useState('')
    const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams()
    const params = Object.fromEntries(searchParams)
    const cardsPack_id = params.cardsPack_id

    const changeCardQuestion = (card_id: string, newQuestion: string) => {
        dispatch(renameCardQuestionTC({_id: card_id, question: newQuestion}, cardsPack_id))
    }

    const removeCard = (card_id: string) => {
        dispatch(deleteCardTC(cardsPack_id, card_id))
    }

    const onChangeSort = (newSort: string) => {
        setSort(newSort)

        dispatch(getCardsPageTC({cardsPack_id, sortCards: newSort, page: 1}))

        setSearchParams({...params, sortPacks: newSort, page: 1})
    }

    console.log(cards)
    if (cards.length < 1) {
        return <Navigate to={PATH.PACK_PAGE_EMPTY}/>
    }


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{backgroundColor: '#EFEFEF'}}>
                        <TableCell>Question</TableCell>
                        <TableCell align="left">Answer</TableCell>
                        <TableCell align="left">
                            Last Updated
                            <SuperSort sort={sort} value={'updated'} onChange={onChangeSort}/>
                        </TableCell>
                        <TableCell align="left">Grade</TableCell>
                        {meID === packUserID && <TableCell align="left">Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{row.question} </TableCell>
                            <TableCell align="left">{row.answer}</TableCell>
                            <TableCell
                                align="left">{(new Date(row.updated)).getDate()}
                                .{(new Date(row.updated)).getMonth() < 10
                                    ? ((new Date(row.updated)).getMonth() + '1')
                                    : (new Date(row.updated)).getMonth() + 1}
                                .{(new Date(row.updated)).getFullYear()}</TableCell>
                            <TableCell align="left">
                                <Rating name="half-rating" defaultValue={row.grade} precision={0.5}/>
                            </TableCell>
                            { meID === row.user_id &&
                            <TableCell align="left">
                                <div style={{display: 'flex', marginTop: '15px', marginBottom: '5px'}}>
                                    <SuperButton onClick={() => changeCardQuestion(row._id, 'Updated question')}
                                                 className={s.button_style}>
                                        <BorderColorIcon className={s.icon_style}/>
                                    </SuperButton>
                                    <SuperButton onClick={() => removeCard(row._id)}
                                                 className={s.button_style}>
                                        <DeleteOutlineIcon className={s.icon_style}/>
                                    </SuperButton>
                                </div>
                            </TableCell>}

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}