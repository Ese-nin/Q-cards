import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {Navigate, NavLink, useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import s from '../register/register.module.css';
import {Button, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {setNewPasswordTC} from '../login/auth-reducer';

type LoginFormikErrorsType = {
    password?: string
}

const validate = (values: LoginFormikErrorsType) => {
    const errors: LoginFormikErrorsType = {}
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 8) {
        errors.password = 'Must be 8 or more chars'
    }
    return errors
}


export const CreateNewPass = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const params = useParams<'token'>()
    let token = ''
    if (params.token) {
        token = params.token
    }

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate,
        onSubmit: values => {
            const {password} = values
            dispatch(setNewPasswordTC(password, token))
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

                <h2 className={s.regFormTitle}>Create new password</h2>

                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
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
                    </FormGroup>
                    <div>
                        <span>Create new password and we will send you further instructions to email</span>
                    </div>
                    <NavLink to={'/login'}>
                        <Button style={{borderRadius: '30px', marginTop: '20px'}}
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}>
                            Create new password
                        </Button>
                    </NavLink>
                </form>
            </FormControl>
        </div>
    )
};


