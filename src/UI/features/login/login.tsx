import React from 'react';
import {useAppSelector} from "../../../bll/store";
import {Navigate, NavLink} from "react-router-dom";
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import classes from "./login.module.css";

export const LoginPage = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={classes.loginPage_renamed}>
            <div className={classes.header}>
                LOGIN PAGE - тут будет компонента хедер
            </div>
            <div className={classes.loginPage_container}>
                <div className={classes.login_container}>
                    <div className={classes.singIn}>
                        <div className={classes.singIn_text}>
                            Sing in
                        </div>
                        <div className={classes.mail_password_container}>
                            <div className={classes.mail}>
                                <div className={classes.email_password_text}>
                                    Email
                                </div>
                                <div className={classes.input_container}>
                                    <SuperInputText className={classes.input_login_password}/>
                                    <div className={classes.rectangle}/>
                                </div>
                            </div>
                            <div className={classes.password}>
                                <div className={classes.email_password_text}>
                                    Password
                                </div>
                                <div className={classes.input_container}>
                                    <SuperInputText className={classes.input_login_password}/>
                                    <div className={classes.rectangle}/>

                                </div>
                            </div>
                        </div>
                        <div className={classes.rememberMe}>
                            <SuperCheckbox/>
                            <div>Remember me</div>
                        </div>
                        <div className={classes.forgotPassword}>
                            Forgot Password?
                        </div>
                        <div className={classes.singIn_btn_container}>
                            <SuperButton className={classes.singIn_bnt}>Sing In</SuperButton>
                        </div>
                        <div className={classes.account_container}>
                            <div className={classes.account_text}>
                                Already have an account?
                            </div>
                        </div>
                        <div className={classes.singUp_link}>
                            <NavLink to={"/"} className={classes.singUp_link_style}>Sing Up</NavLink>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};