import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {Navigate, NavLink} from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {FormikErrorsType} from '../register/register';
import {useFormik} from 'formik';
import {loginTC} from './auth-reducer';
import s from '../register/register.module.css';
import {Button, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';


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
    return errors
}


export const LoginPage = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate,
        onSubmit: values => {
            const {email, password, rememberMe} = values
            dispatch(loginTC(email, password, rememberMe))
            formik.resetForm()
        },
    })

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (<div className={s.regContainer}>

            <FormControl sx={{m: 1, width: '35ch'}} variant="standard">

                <h2 className={s.regFormTitle}>Sign in</h2>

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

                        <FormControlLabel label={'rememberMe'}
                                          control={<Checkbox
                                              {...formik.getFieldProps('rememberMe')}
                                          />}
                        />
                        <NavLink to="/register">Forgot Password?</NavLink>
                        <Button style={{borderRadius: '30px'}}
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}>
                            Sign In
                        </Button>

                    </FormGroup>
                </form>
            </FormControl>
            <div>
                <span>Already have an account?</span>
            </div>
            <NavLink to={'/register'}>Sign Up</NavLink>
        </div>
    )
};


