import { BasicModal } from "./BasicModals";
import s from "./Modals.module.css";
import TextField from "@mui/material/TextField";
import { Button, Checkbox } from "@mui/material";
import * as React from "react";
import { addNewCardPackTC } from "bll/reducers/packs-reducer";
import { useAppDispatch, useAppSelector } from "bll/store";
import { useSearchParams } from "react-router-dom";
import { user_idSelector } from "bll/selectors";
import { SuperButton } from "../../UI/common";
import { InputTypeFileInModal } from "../../UI/common/inputTypeFileCover/inputTypeFileInModal";

export const AddNewPackModal = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const userID = useAppSelector(user_idSelector);

  const Title = "Add new pack";

  // для инпута
  const [namePack, setNamePack] = React.useState<string>("");
  const [cover, setCover] = React.useState<string>("");
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamePack(e.target.value);
  };

  // для чекбокса
  const [checked, setChecked] = React.useState(false);

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const addNewCardsPack = (namePack: string, checked: boolean, cover: string) => {
    params.user_id
      ? dispatch(
          addNewCardPackTC({ name: namePack, privatePack: checked, deckCover: cover }, userID)
        )
      : dispatch(addNewCardPackTC({ name: namePack, privatePack: checked, deckCover: cover })); // надо еще диспачить и картинку Cover
    setCover("");
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onAddCoverClick = () => {};
  // тут подгружать картинку через inputTypeFile в setCover и потом диспачить addNewCardsPack

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        Add new pack
      </Button>

      <BasicModal open={open} handleClose={handleClose}>
        <div className={s.firstBlock}>
          <span>{Title}</span>
        </div>
        <div className={s.coverContainer}>
          <div className={s.coverMenu}>
            <div>Cover</div>
          </div>
          <div className={s.cover}>
            <InputTypeFileInModal cover={cover} setCover={setCover} />
          </div>
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Name pack"
            variant="standard"
            sx={{ width: "347px" }}
            onChange={handleChangeInput}
          />
        </div>
        <div className={s.checkBoxBlock}>
          <Checkbox
            checked={checked}
            onChange={handleChangeCheckbox}
            inputProps={{ "aria-label": "controlled" }}
          />
          <span>Private pack</span>
        </div>
        <div className={s.saveBlock}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => addNewCardsPack(namePack, checked, cover)}>
            Save
          </Button>
        </div>
      </BasicModal>
    </>
  );
};
