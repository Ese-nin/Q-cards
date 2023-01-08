import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {Navigate} from 'react-router-dom';
import avatar from './Ellipse 45.png'
import s from './profile.module.css'
import {Button} from '@mui/material';
import {Logout} from '@mui/icons-material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {logoutTC} from '../login/auth-reducer';





export const Profile = () => {
    const dispatch = useAppDispatch()


    const LogOutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    // if (!isLoggedIn) {
    //     return <Navigate to={'/login'}/>
    // }

    return (
        <div className={s.profileBlock}>
            Внимание! Проверка на залоггированность закоменчена для рабочего процесса!
            <span className={s.personalInfo}>Personal Information</span>
            <img src={avatar} alt="avatar" className={s.imgAvatar}/>
            <div>
                <span className={s.nameText}>Ivan</span>
                <DriveFileRenameOutlineIcon/>
            </div>
            <span className={s.mailText}>j&johnson@gmail.com</span>
            <Button variant="outlined" startIcon={<Logout/>} onClick={LogOutHandler}>
                Log out
            </Button>
        </div>
    );
};