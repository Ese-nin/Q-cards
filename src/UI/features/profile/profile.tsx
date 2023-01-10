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
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const Name = useAppSelector(store=> store.auth.name)
    const Email = useAppSelector(store=> store.auth.email)


    const LogOutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.profileBlock}>
            <span className={s.personalInfo}>Personal Information</span>
            <img src={avatar} alt="avatar" className={s.imgAvatar}/>
            <div>
                {/*<EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>*/}
                <span className={s.nameText}>{Name}</span>
                <DriveFileRenameOutlineIcon/>
            </div>
            <span className={s.mailText}>{Email}</span>
            <Button variant="outlined" startIcon={<Logout/>} onClick={LogOutHandler}>
                Log out
            </Button>
        </div>
    );
};