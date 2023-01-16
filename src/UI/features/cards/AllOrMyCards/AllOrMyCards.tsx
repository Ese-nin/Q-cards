import React from 'react';
import SuperButton from "../../../common/c2-SuperButton/SuperButton";

export const AllOrMyCards = () => {
    return (
        <div>
            <SuperButton xType={'secondary'}>
                My
            </SuperButton>
            <SuperButton>
                All
            </SuperButton>
        </div>
    );
};