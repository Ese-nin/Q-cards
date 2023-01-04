import React from 'react';
import {useAppSelector} from "../../../bll/store";
import {Navigate} from "react-router-dom";

export const Profile = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>
            PROFILE PAGE
        </div>
    );
};