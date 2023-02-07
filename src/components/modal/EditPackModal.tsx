import { BasicModal } from "./BasicModals";
import s from "./Modals.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { renameCardPackTC } from "bll/reducers/packs-reducer";
import { useAppDispatch, useAppSelector } from "bll/store";
import { user_idSelector } from "bll/selectors";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { AddImageCover } from "../../UI/pages/cards/tables/AddImageCover";

type PropsType = {
  name: string;
  id: string;
  userId: string;
  deckCover: string;
};

export const EditPackModal = (props: PropsType) => {
  const dispatch = useAppDispatch();
  const meID = useAppSelector(user_idSelector);
  const PackId = props.id;
  const UserId = props.userId;

  const Title = "Edit pack";

  // для инпута
  const [namePack, setNamePack] = React.useState<string>(props.name);

  // отрисовка картинки в теле модалки==========================
  const [deckCover, setdeckCover] = useState(props.deckCover);
  const handlerChangeDeckCover = (file64: string) => {
    setdeckCover(file64);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamePack(e.target.value);
  };

  const renamePack = (PackId: string, namePack: string, UserId: string, cover: string) => {
    UserId === meID
      ? dispatch(renameCardPackTC(PackId, namePack, cover, UserId))
      : dispatch(renameCardPackTC(PackId, namePack, cover));
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <button title={"edit"} onClick={handleOpen} className={s.button_style}>
        <BorderColorIcon className={s.icon_style} />
      </button>

      <BasicModal open={open} handleClose={handleClose}>
        <div className={s.firstBlock}>
          <span>{Title}</span>
        </div>

        <div>
          <div className={s.coverContainer}>
            <div style={{ margin: "auto" }}>
              <img src={deckCover} alt="questionImg" className={s.imgQuest} />
            </div>
            <div className={s.cover}>
              <AddImageCover setCover={handlerChangeDeckCover} />
            </div>
          </div>
        </div>

        <div>
          <TextField
            id="standard-basic"
            label="Name pack"
            variant="standard"
            sx={{ width: "347px" }}
            onChange={handleChangeInput}
            value={namePack}
            autoFocus={true}
          />
        </div>
        <div className={s.saveBlock}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => renamePack(PackId, namePack, UserId, deckCover)}
          >
            Save
          </Button>
        </div>
      </BasicModal>
    </>
  );
};
