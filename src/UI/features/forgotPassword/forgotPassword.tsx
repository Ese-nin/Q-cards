import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {Navigate, NavLink} from 'react-router-dom';
import {useFormik} from 'formik';
import s from '../register/register.module.css';
import {Button, FormControl, FormGroup, Input, InputLabel} from '@mui/material';
import {forgotPasswordTC} from "../login/auth-reducer";
import {PATH} from "../../../bll/Path";

type ForgotFormikErrorsType = {
    email?: string
}

const validate = (values: ForgotFormikErrorsType) => {
    const errors: ForgotFormikErrorsType = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}


export const ForgotPassPage = () => {
    const sentInstruction = useAppSelector(state => state.auth.isSentInstruction)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate,
        onSubmit: values => {
            const {email} = values
            dispatch(forgotPasswordTC(email))
            formik.resetForm()
        },
    })

    if (sentInstruction) {
        return <Navigate to={PATH.CHECK_MAIL}/>
    }

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (<div className={s.regContainer}>

            <FormControl sx={{m: 1, width: '35ch'}} variant="standard">

                <h2 className={s.regFormTitle}>Forgot your password?</h2>

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
                        <div>
                            <span>Enter your email address and we will send you further instructions </span>
                        </div>
                    </FormGroup>
                    <Button style={{borderRadius: '30px', marginTop: '20px'}}
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}>
                        Send Instructions
                    </Button>
                </form>

                <div>
                    <span>Did you remember your password?</span>
                </div>

                <NavLink to="/login" style={{display: 'flex', justifyContent: 'end', margin: '10px'}}>Try logging
                    in</NavLink>
            </FormControl>
        </div>
    )
};


