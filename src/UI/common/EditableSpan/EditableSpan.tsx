import React, { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Button from "@mui/material/Button";
import s from "./Span.module.css";

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [name, setName] = useState(props.value);

  const activateEditMode = () => {
    setEditMode(true);
    setName(props.value);
  };

  const activateViewMode = () => {
    if (name) {
      setEditMode(false);
      props.onChange(name);
    }
  };

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const placeholder = !name ? "type something" : "";

  return editMode ? (
    <div className={s.span}>
      <TextField
        placeholder={placeholder}
        value={name}
        onChange={changeName}
        autoFocus
        onBlur={activateViewMode}
      />
      <Button disabled={!name} variant="contained" onClick={activateViewMode}>
        SAVE
      </Button>
    </div>
  ) : (
    <div className={s.span}>
      <span onDoubleClick={activateEditMode}>{props.value}</span>
      <DriveFileRenameOutlineIcon onClick={activateEditMode} />
    </div>
  );
});
