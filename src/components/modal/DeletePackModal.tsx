import { BasicModal } from "./BasicModals";
import { SuperCheckbox } from "../../UI/common";
import closeBtn from "../../assets/icon/closeBtn.svg";
import s from "./Modals.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export const DeletePackModal = () => {
  return (
    <BasicModal>
      <div className={s.firstBlock}>
        <span>Delete Pack</span>
        <button>
          <img src={closeBtn} alt="close" />
        </button>
      </div>

      <div>Do you really want to remove Pack Name? All cards will be deleted.</div>
      <div className={s.saveBlock}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" sx={{ backgroundColor: "red" }}>
          Delete
        </Button>
      </div>
    </BasicModal>
  );
};
