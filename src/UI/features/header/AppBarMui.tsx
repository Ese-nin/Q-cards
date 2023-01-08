import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from './Group 753.png'
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import SuperButton from '../../common/c2-SuperButton/SuperButton';


export default function MenuAppBar() {
    // добавленный код
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()


    return (
        <Box sx={{flexGrow: 1}}>

            <AppBar position="static" color="transparent">
                <Toolbar>
                    <img src={logo} alt="logo"/>
                    {isLoggedIn && (
                        <span>Ivan photo</span>
                    )}
                    {isLoggedIn || (<>
                            <SuperButton>
                                Sign in
                            </SuperButton>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}