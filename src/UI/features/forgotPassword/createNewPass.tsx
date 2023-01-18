import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {Navigate, NavLink, useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import s from '../register/register.module.css';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import {setNewPasswordTC} from '../login/auth-reducer';
import {InputWithEyeIcon} from "../register/InputWithEyeIcon/InputWithEyeIcon";
import {PATH} from "../../../bll/Path";

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


    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
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
                                    <InputWithEyeIcon showPassword={showPassword}
                                                      handleClickShowPassword={handleClickShowPassword}/>
                                }
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


