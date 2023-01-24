import {BasicModal} from './BasicModals';
import {SuperSelect} from '../../UI/common';
import closeBtn from '../../assets/icon/closeBtn.svg'
import s from './Modals.module.css'
import TextField from '@mui/material/TextField';
import * as React from 'react';


export const EditCardModal = () => {

    const TextOrImg = [
        {id: 1, value: 'Text'},
        {id: 2, value: 'Image'},
    ]


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <BasicModal open={open} handleClose={handleClose}>
            <div className={s.firstBlock}>
                <span>Edit card</span>
                <button>
                    <img src={closeBtn} alt="close"/>
                </button>
            </div>

            <div>
                <span>Choose a question format</span>
                <SuperSelect
                    options={TextOrImg}
                />

            </div>

            <div>
                <TextField id="standard-basic" label="Question" variant="standard" sx={{width: '347px'}}/>
                <TextField id="standard-basic" label="Answer" variant="standard" sx={{width: '347px'}}/>
            </div>
        </BasicModal>

    )
}