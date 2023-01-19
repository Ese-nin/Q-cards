import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from '../../../../bll/store';


export default function TablesPackPage() {

    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cardPage.cards)


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{backgroundColor: '#EFEFEF'}}>
                        <TableCell>Question</TableCell>
                        <TableCell align="left">Answer</TableCell>
                        <TableCell align="left">Last Updated</TableCell>
                        <TableCell align="left">Grade</TableCell>
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
                            <TableCell align="left">Grade</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}