import React from 'react';
import {NavLink} from "react-router-dom";
import s from './header.module.css'

export const Header = () => {
    return (
        <div>
            <div className={s.item}>
                <NavLink to='/profile'
                         className={({isActive}) => (isActive ? s.active : "")}>Profile</NavLink>
            </div>
        </div>
    );
};