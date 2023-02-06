import { BasicModal } from "./BasicModals";
import s from "./Modals.module.css";
import { Button } from "@mui/material";
import { useAppDispatch } from "bll/store";
import * as React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteCardTC } from "bll/reducers/cards-reducer";

type PropsType = {
  id: string;
  name: string;
  cardsPack_id: string;
};

export const DeleteCardModal = (props: PropsType) => {
  const dispatch = useAppDispatch();

  const id = props.id;
  const Name = props.name;
  const cardsPackId = props.cardsPack_id;
  const Title = "Delete Card";

  const removeCard = (cardsPackId: string, card_id: string) => {
    dispatch(deleteCardTC(cardsPackId, card_id));
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button title={"delete"} onClick={handleOpen} className={s.button_style}>
        <DeleteOutlineIcon className={s.icon_style} />
      </button>

      <BasicModal open={open} handleClose={handleClose}>
        <div className={s.firstBlock}>
          <span>{Title}</span>
        </div>

        <div>
          Do you really want to remove <span style={{ fontWeight: "bold" }}>{Name}</span>? All cards
          will be deleted.
        </div>
        <div className={s.saveBlock}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={() => removeCard(cardsPackId, id)}
          >
            Delete
          </Button>
        </div>
      </BasicModal>
    </>
  );
};
