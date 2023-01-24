import {BasicModal} from './BasicModals';
import s from './Modals.module.css'
import TextField from '@mui/material/TextField';
import {Button, Checkbox} from '@mui/material';
import * as React from 'react';


export const AddNewPackModal = () => {

    const Title = 'Add new pack'

// для инпута
    const [namePack, setNamePack] = React.useState<string>('')
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNamePack(e.target.value)
    }

// для чекбокса
    const [checked, setChecked] = React.useState(false);

    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };




    return (
        <BasicModal>
            <div className={s.firstBlock}>
                <span>{Title}</span>
            </div>
            <div>
                <TextField
                    id="standard-basic"
                    label="Name pack"
                    variant="standard"
                    sx={{width: '347px'}}
                    onChange={handleChangeCheckbox}
                />
            </div>
            <div className={s.checkBoxBlock}>
                <Checkbox
                    checked={checked}
                    onChange={handleChangeCheckbox}
                    inputProps={{'aria-label': 'controlled'}}
                />
                <span>Private pack</span>
            </div>
            <div className={s.saveBlock}>
                <Button variant="outlined">Cancel</Button>
                <Button variant="contained">Save</Button>
            </div>
        </BasicModal>
    )
}