import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from './Group 753.png'
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import s from './header.module.css';
import {NavLink} from 'react-router-dom';


export default function MenuAppBar() {
    // добавленный код
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()


    return (
        <Box sx={{flexGrow: 1}}>

            <AppBar position="static" color="transparent">
                <Toolbar sx={{
                    justifyContent: 'space-between'
                }}>
                    <img src={logo} alt="logo"/>
                    <div className={s.tempDiv}>
                        <NavLink to="/profile"
                                 className={({isActive}) => (isActive ? s.active : '')}>Profile</NavLink>
                        <NavLink to="/login"
                                 className={({isActive}) => (isActive ? s.active : '')}>Login</NavLink>
                        <NavLink to="/register"
                                 className={({isActive}) => (isActive ? s.active : '')}>Register</NavLink>
                    </div>

                    {isLoggedIn && (
                        <span>Ivan photo</span>
                    )}
                    {isLoggedIn || (<>
                            <NavLink to="/login">
                                <SuperButton>
                                    Sign in
                                </SuperButton>
                            </NavLink>


                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
        ;
}