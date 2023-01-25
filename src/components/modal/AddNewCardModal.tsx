import {BasicModal} from './BasicModals';
import {SuperSelect} from '../../UI/common';
import s from './Modals.module.css'
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import * as React from 'react';


export const AddNewCardModal = () => {

    const Title = 'Edit card'



    const TextOrImg = [
        {id: 1, value: 'Text'},
        {id: 2, value: 'Image'},
    ]

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            <Button onClick={handleOpen} variant="contained">
                {Title}
            </Button>

            <BasicModal open={open} handleClose={handleClose}>
                <div className={s.firstBlock}>
                    <span>{Title}</span>
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
        </>


    )
}