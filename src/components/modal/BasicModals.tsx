import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {FC, ReactNode} from 'react';
import {Button} from '@mui/material';
import s from './Modals.module.css';
import closeBtn from '../../assets/icon/closeBtn.svg';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 347,
    height: 311,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
};

type PropsType = {
    children: ReactNode
}


export const BasicModal: FC<PropsType> = ({children}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <Button onClick={handleOpen} variant="contained">Add new pack</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <button className={s.closeButton}>
                        <img src={closeBtn} alt="close" onClick={handleClose}/>
                    </button>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}