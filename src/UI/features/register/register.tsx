import React, {useCallback, useState} from 'react';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import {useFormik} from 'formik';
import s from './register.module.css'
import {Navigate, NavLink} from 'react-router-dom';
import {registerTC} from '../login/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {InputWithEyeIcon} from "./InputWithEyeIcon/InputWithEyeIcon";
import {PATH} from "../../../bll/Path";

type RegFormikErrorsType = {
    email?: string
    password?: string
    confirmPassword?: string
}

const validate = (values: RegFormikErrorsType) => {
    const errors: RegFormikErrorsType = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 8) {
        errors.password = 'Must be 8 or more chars'
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords don\'t equal'
    }
    return errors
}

export const Register = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isHaveAccount = useAppSelector(state => state.auth.isHaveAccount)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate,
        onSubmit: values => {
            const {email, password} = values
            dispatch(registerTC(email, password))
        },
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);
    const handleClickShowPassword2 = useCallback(() => setShowPassword2((show) => !show), []);

    if (isHaveAccount) {
        return <Navigate to={PATH.LOGIN}/>
    }

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <div className={s.regContainer}>

            <FormControl sx={{m: 1, width: '35ch'}} variant="standard">

                <h2 className={s.regFormTitle}>Sign Up</h2>

                <form onSubmit={formik.handleSubmit}>

                    <FormGroup>
                        <FormControl margin={'normal'}>
                            <InputLabel>Email</InputLabel>
                            <Input
                                {...formik.getFieldProps('email')}
                            />
                        </FormControl>
                        {formik.errors.email && formik.touched.email &&
                            <div style={{color: 'crimson'}}>{formik.errors.email}</div>}

                        <FormControl margin={'normal'}>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                {...formik.getFieldProps('password')}
                                endAdornment={
                                    <InputWithEyeIcon showPassword={showPassword}
                                                      handleClickShowPassword={handleClickShowPassword}/>
                                }
                            />
                        </FormControl>
                        {formik.errors.password && formik.touched.password &&
                            <div style={{color: 'crimson'}}>{formik.errors.password}</div>}

                        <FormControl margin={'normal'}>
                            <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
                            <Input
                                type={showPassword2 ? 'text' : 'password'}
                                {...formik.getFieldProps('confirmPassword')}
                                endAdornment={
                                    <InputWithEyeIcon showPassword={showPassword2}
                                                      handleClickShowPassword={handleClickShowPassword2}/>
                                }
                            />
                        </FormControl>
                        {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                            <div style={{color: 'crimson'}}>{formik.errors.confirmPassword}</div>}

                        <Button style={{borderRadius: '30px'}}
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}>
                            Sign Up
                        </Button>

                    </FormGroup>
                </form>
            </FormControl>
            <div>
                <span>Already have an account?</span>
            </div>
            <NavLink to={'/login'}>Sign In</NavLink>
        </div>
    )
};