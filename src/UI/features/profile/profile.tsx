import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {Navigate} from 'react-router-dom';
import avatar from './Ellipse 45.png'
import s from './profile.module.css'
import {Button} from '@mui/material';
import {Logout} from '@mui/icons-material';
import {logoutTC, setNewNameTC} from '../login/auth-reducer';
import {EditableSpan} from '../../common/EditableSpan/EditableSpan';


export const Profile = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const Name = useAppSelector(store=> store.auth.name)
    const Email = useAppSelector(store=> store.auth.email)

    const LogOutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    const changeName = useCallback((name: string) => {
        dispatch(setNewNameTC(name))
    }, [Name])


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.profileBlock}>
            <span className={s.personalInfo}>Personal Information</span>
            <img src={avatar} alt="avatar" className={s.imgAvatar}/>
            <div>
                <EditableSpan value={Name} onChange={changeName}/>
            </div>
            <span className={s.mailText}>{Email}</span>
            <Button variant="outlined" startIcon={<Logout/>} onClick={LogOutHandler}>
                Log out
            </Button>
        </div>
    );
};