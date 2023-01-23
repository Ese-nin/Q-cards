import {BasicModal} from './BasicModals';
import {SuperCheckbox, SuperSelect} from '../../UI/common';
import closeBtn from '../../assets/icon/closeBtn.svg'
import s from './Modals.module.css'
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';


export const EditCardModal = () => {

    const TextOrImg = [
        {id: 1, value: 'Text'},
        {id: 2, value: 'Image'},
    ]

    return (
        <BasicModal>
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