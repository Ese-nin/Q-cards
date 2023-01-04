import React from 'react';
import {useAppSelector} from "../../../bll/store";
import {Navigate} from "react-router-dom";

export const LoginPage = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div>
            LOGIN PAGE
        </div>
    );
};