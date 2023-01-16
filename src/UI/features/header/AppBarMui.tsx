import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from './Group 753.png'
import {useAppSelector} from '../../../bll/store';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import s from './header.module.css';
import {NavLink} from 'react-router-dom';
import {ForgotPassPage} from '../forgotPassword/forgotPassword';
import {CreateNewPass} from '../forgotPassword/createNewPass';


export default function MenuAppBar() {
    // добавленный код
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const Name = useAppSelector(store => store.auth.name)
    // const dispatch = useAppDispatch()


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
                        <NavLink to="/forgot"
                                 className={({isActive}) => (isActive ? s.active : '')}>ForgotPassPage
                        </NavLink>
                        <NavLink to="/checkMail"
                                 className={({isActive}) => (isActive ? s.active : '')}>checkMail</NavLink>
                        <NavLink to="/createNewPass/*"
                                 className={({isActive}) => (isActive ? s.active : '')}>CreateNewPass</NavLink>
                        <NavLink to="/packlist"
                                 className={({isActive}) => (isActive ? s.active : '')}>packlist</NavLink>
                        <NavLink to="/CardsPack"
                                 className={({isActive}) => (isActive ? s.active : '')}>CardsPack</NavLink> // работаем в packlist, эту ссылку удалим похже!!!!!
                    </div>

                    {isLoggedIn && (
                        <span>{Name} photo</span>
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