import {BasicModal} from './BasicModals';
import s from './Modals.module.css'
import {Button} from '@mui/material';
import {deleteCardPackTC} from '../../bll/reducers/packs-reducer';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {user_idSelector} from '../../bll/selectors';
import * as React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


type PropsType = {
    id: string
    userId: string
    name: string
}


export const DeletePackModal = (props: PropsType) => {
    const meID = useAppSelector(user_idSelector);
    const dispatch = useAppDispatch();

    const id = props.id
    const userId = props.userId
    const Name = props.name


    const Title = 'Delete Pack'

    const removePack = (id: string, userId: string) => {
        userId === meID
            ? dispatch(deleteCardPackTC(id, userId))
            : dispatch(deleteCardPackTC(id));
    };


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (<>
            <Button onClick={handleOpen} variant="contained" className={s.button_style}>
                <DeleteOutlineIcon className={s.icon_style}/>
            </Button>


            <BasicModal open={open} handleClose={handleClose}>
                <div className={s.firstBlock}>
                    <span>{Title}</span>
                </div>

                <div>
                    Do you really want to remove <span style={{fontWeight: 'bold'}}>{Name}</span>?
                    All cards will be deleted.
                </div>
                <div className={s.saveBlock}>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained"
                            sx={{backgroundColor: 'red'}}
                            onClick={() => removePack(id, userId)}>
                        Delete
                    </Button>
                </div>


            </BasicModal>
        </>


    )
}