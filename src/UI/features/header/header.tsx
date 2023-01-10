import React from 'react';
import s from './header.module.css'
import MenuAppBar from './AppBarMui';

export const Header = () => {
    return (
        <div>
            <div className={s.item}>
                <MenuAppBar/>
            </div>
        </div>
    );
};