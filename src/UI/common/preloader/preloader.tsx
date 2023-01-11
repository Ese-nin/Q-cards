import React from 'react';
import s from './preloader.module.css'
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export const Preloader = () => {
    return (
        <span className={s.loader}></span>
       /* <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>*/
    );
};