import * as React from "react";
import { FC, ReactNode } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import s from "./Modals.module.css";
import closeBtn from "../../assets/icon/closeBtn.svg";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 347,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "30px",
};

type PropsType = {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
};

export const BasicModal: FC<PropsType> = ({ children, open, handleClose }) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <button className={s.closeButton}>
            <img src={closeBtn} alt="close" onClick={handleClose} />
          </button>
          {children}
        </Box>
      </Modal>
    </>
  );
};
