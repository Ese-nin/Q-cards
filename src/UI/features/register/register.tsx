import React, {useState} from 'react';
import {Button, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {useFormik} from 'formik';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import s from './register.module.css'
import {Navigate, NavLink} from 'react-router-dom';
import {registerTC} from '../login/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../bll/store';

export type FormikErrorsType = {
    email?: string
    password?: string
    confirmPassword?: string
    rememberMe?: boolean
}

const validate = (values: FormikErrorsType) => {
    const errors: FormikErrorsType = {}
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
            formik.resetForm()
        },
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isHaveAccount) {
        return <Navigate to={'/login'}/>
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
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}>
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>}
                            />
                        </FormControl>
                        {formik.errors.password && formik.touched.password &&
                            <div style={{color: 'crimson'}}>{formik.errors.password}</div>}

                        <FormControl margin={'normal'}>
                            <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                {...formik.getFieldProps('confirmPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}>
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>}
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