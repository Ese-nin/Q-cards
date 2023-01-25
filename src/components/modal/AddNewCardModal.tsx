import {BasicModal} from './BasicModals';
import {SuperSelect} from '../../UI/common';
import s from './Modals.module.css'
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import * as React from 'react';
import {addNewCardTC} from '../../bll/reducers/cards-reducer';
import {useAppDispatch} from '../../bll/store';


export const AddNewCardModal = () => {
    const dispatch = useAppDispatch();

    const Title = 'Add new card'

// чекбокс --------------------------------------------
    const TextOrImg = [
        {id: 1, value: 'Text'},
        {id: 2, value: 'Image'},
    ]

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
// -------------------------------------------------------------

    const addNewCard = (question: string) => {
        dispatch(addNewCardTC({cardsPack_id, question}));
        setSearchParams({...params, cardsPack_id, cardQuestion: question});
    };


    // для инпута---------------------------------------------------------
    const [Question, setQuestion] = React.useState<string>('')
    const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value)
    }

    const [Answer, setAnswer] = React.useState<string>('')
    const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value)
    }
    //-----------------------------------------------------------

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
                    <TextField id="Question"
                               label="Question"
                               variant="standard"
                               sx={{width: '347px'}}
                               onChange={handleChangeQuestion}
                               value={Question}
                    />
                    <TextField id="Answer"
                               label="Answer"
                               variant="standard"
                               sx={{width: '347px'}}
                               onChange={handleChangeAnswer}
                               value={Answer}
                    />
                </div>
                <div className={s.saveBlock}>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained"
                            onClick={() => addNewCard('New question')}
                    >
                        Save
                    </Button>
                </div>
            </BasicModal>
        </>


    )
}