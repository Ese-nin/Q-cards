import React, { FC } from "react";
import TableCell from "@mui/material/TableCell";
import s from "../TablesPackList.module.css";
import defaultCard from "assets/icon/defaultCard.jpg";
import { dateToDMY } from "utils/dateToDMY";
import SchoolIcon from "@mui/icons-material/School";
import { EditPackModal } from "components/modal/EditPackModal";
import { SuperButton } from "UI/common";
import { DeletePackModal } from "components/modal/DeletePackModal";
import TableRow from "@mui/material/TableRow";
import { CardPacksType } from "dal/packsAPI";

type Props = {
  row: CardPacksType;
  getPackPage: (id: string) => void;
  learnCards: (id: string) => void;
  meID: string;
};

export const PackRow: FC<Props> = ({ row, getPackPage, meID, learnCards }) => {
  const getCards = () => {
    getPackPage(row._id);
  };

  const learnPack = () => {
    learnCards(row._id);
  };

  return (
    <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>
        <div className={s.coverContainer + " " + s.cover}>
          <img
            onClick={getCards}
            src={row.deckCover ? row.deckCover : defaultCard}
            alt="defaultCard"
            style={{ width: "100%", cursor: "pointer" }}
          />
        </div>
      </TableCell>
      <TableCell component="th" scope="row">
        <button onClick={getCards} className={s.btnNamePagePack}>
          {row.name}
        </button>
      </TableCell>
      <TableCell align="left">{row.cardsCount}</TableCell>
      <TableCell align="left">{dateToDMY(row.updated)}</TableCell>
      <TableCell align="left">{row.user_name}</TableCell>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          padding: "20px 10px",
        }}
      >
        <button
          title={"learn"}
          onClick={learnPack}
          className={s.button_style}
          disabled={row.cardsCount === 0}
        >
          <SchoolIcon className={s.icon_style} />
        </button>
        {meID === row.user_id && (
          <>
            <EditPackModal name={row.name} id={row._id} userId={row.user_id} />
            <SuperButton className={s.button_style}>
              <DeletePackModal name={row.name} id={row._id} userId={row.user_id} />
            </SuperButton>
          </>
        )}
      </div>
    </TableRow>
  );
};
