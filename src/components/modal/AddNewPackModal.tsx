import { BasicModal } from "./BasicModals";
import { SuperCheckbox } from "../../UI/common";
import closeBtn from "../../assets/icon/closeBtn.svg";
import s from "./Modals.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export const AddNewPackModal = () => {
  return (
    <BasicModal>
      <div className={s.firstBlock}>
        <span>Add new pack</span>
        <button>
          <img src={closeBtn} alt="close" />
        </button>
      </div>
      {/*<hr/>*/}
      <div>
        <TextField
          id="standard-basic"
          label="Name pack"
          variant="standard"
          sx={{ width: "347px" }}
        />
      </div>
      <div className={s.checkBoxBlock}>
        <SuperCheckbox />
        <span>Private pack</span>
      </div>
      <div className={s.saveBlock}>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Save</Button>
      </div>
    </BasicModal>
  );
};
