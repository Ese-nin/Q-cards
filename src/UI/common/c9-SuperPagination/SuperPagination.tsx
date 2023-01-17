import React, {ChangeEvent, useState} from 'react'
import {Pagination} from '@mui/material'
import s from './SuperPagination.module.css'
import SuperSelect from '../c5-SuperSelect/SuperSelect';

export type SuperPaginationPropsType = {
    id?: string
    page: number
    itemsCountForPage: number
    totalCount: number
    onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = (
    {
        page, itemsCountForPage, totalCount, id = 'hw15', onChange
    }
) => {
    const lastPage = Math.ceil(totalCount / itemsCountForPage)

    const [localPage, setLocalPage] = useState(page)
    const [localCount, setLocalCount] = useState(itemsCountForPage)

    const onChangeCallback = (event:  ChangeEvent<unknown>, page: number) => {
        onChange(page, itemsCountForPage)
        setLocalPage(page)
    }

    const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(1, +event.currentTarget.value)
    }

    return (
        <div className={s.pagination}>
            <Pagination
                id={id + '-pagination'}
                page={localPage}
                count={lastPage}
                onChange={onChangeCallback}
                hideNextButton
                hidePrevButton
                variant="outlined"
                color="primary"
            />

            <span className={s.text1}>
                Show
            </span>

            <SuperSelect
                id={id + '-pagination-select'}
                value={itemsCountForPage}
                options={[
                    {id: 4, value: 4},
                    {id: 7, value: 7},
                    {id: 10, value: 10},
                ]}
                onChange={onChangeSelect}
            />

            <span className={s.text2}>
                Cards per Page
            </span>
        </div>
    )
}

export default SuperPagination
