import React from 'react';
import {useAppSelector} from '../../../bll/store';
import {Navigate, NavLink} from 'react-router-dom';
import s from '../register/register.module.css';
import {Button, FormControl} from '@mui/material';
import mail from './Group 281.png'
import {PATH} from "../../../bll/Path";
import {emailSelector, isLoggedInSelector} from "../../../bll/selectors";

export const CheckEmail = () => {
    const isLoggedIn = useAppSelector(isLoggedInSelector)
    const Email = useAppSelector(emailSelector)

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (<div className={s.regContainer}>

            <FormControl sx={{m: 1, width: '35ch'}} variant="standard">

                <h2 className={s.regFormTitle}>Check Email</h2>

                <img className={s.iconMail} src={mail} alt="mail"/>


                <div>
                    <span>We’ve sent an Email with instructions to {Email}</span>
                </div>

                <NavLink to="/login" style={{display: 'flex', justifyContent: 'end', margin: '10px'}}>
                    <Button style={{borderRadius: '30px', marginTop: '20px'}}
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}>
                        Back to login
                    </Button>

                </NavLink>
            </FormControl>
        </div>
    )
};


