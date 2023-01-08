import React from 'react';
import './App.css';
import {Header} from "./features/header/header";
import {Navigate, Route, Routes} from "react-router-dom";
import {Profile} from "./features/profile/profile";
import {LoginPage} from "./features/login/login";
import {Register} from "./features/register/register";

export const App = () => {

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route path={'*'} element={<Navigate to='/404'/>}/>
            </Routes>
        </div>
    )
};