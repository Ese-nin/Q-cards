import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {Button} from '@mui/material';
import s from './Span.module.css'

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [name, setName] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setName(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(name);
    }
    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    return editMode
        ? <div className={s.span}><TextField value={name} onChange={changeName} autoFocus onBlur={activateViewMode}/> <Button variant="contained" onClick={activateViewMode}>SAVE</Button> </div>
        : <div className={s.span}><span onDoubleClick={activateEditMode}>{props.value}</span><DriveFileRenameOutlineIcon onClick={activateEditMode}/></div>
});
