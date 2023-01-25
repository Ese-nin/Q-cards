import {BasicModal} from './BasicModals';
import {SuperSelect} from '../../UI/common';
import s from './Modals.module.css'
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import * as React from 'react';
import {addNewCardTC} from '../../bll/reducers/cards-reducer';
import {useAppDispatch} from '../../bll/store';

type PropsType = {
    cardsPackId: string
}
export const AddNewCardModal = (props: PropsType) => {
    const dispatch = useAppDispatch();
    const cardsPack_id = props.cardsPackId

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

    const addNewCard = (Question: string, Answer: string) => {
        dispatch(addNewCardTC({cardsPack_id, question: Question, answer: Answer}));
        // setSearchParams({...params, cardsPack_id, cardQuestion: Question});
        console.log(cardsPack_id)
    };


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
                            onClick={() => addNewCard(Question, Answer)}
                    >
                        Save
                    </Button>
                </div>
            </BasicModal>
        </>


    )
}