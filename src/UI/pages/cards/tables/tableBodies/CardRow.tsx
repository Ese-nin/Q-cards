import React, { FC } from "react";
import { CardType } from "dal/cardsAPI";
import TableCell from "@mui/material/TableCell";
import s from "../TablesPackList.module.css";
import { dateToDMY } from "utils/dateToDMY";
import { Rating } from "@mui/material";
import { EditCardModal } from "components/modal/EditCardModal";
import { DeleteCardModal } from "components/modal/DeleteCardModal";
import TableRow from "@mui/material/TableRow";

type Props = {
  row: CardType;
  meID: string;
};

export const CardRow: FC<Props> = ({ row, meID }) => {
  const resultQuestion = row.questionImg ? (
    <img src={row.questionImg} alt="questionImg" className={s.imgQuest} />
  ) : (
    row.question
  );

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {resultQuestion}
      </TableCell>
      <TableCell align="left">{row.answer}</TableCell>
      <TableCell align="left">{dateToDMY(row.updated)}</TableCell>
      <TableCell align="left">
        <Rating name="half-rating" value={row.grade} readOnly precision={0.5} />
      </TableCell>

      {meID === row.user_id && (
        <TableCell align="left">
          <div
            style={{
              display: "flex",
            }}
          >
            <EditCardModal
              cardId={row._id}
              question={row.question}
              answer={row.answer}
              cardsPackId={row.cardsPack_id}
              questionImg={row.questionImg}
            />
            <DeleteCardModal id={row._id} name={row.answer} cardsPack_id={row.cardsPack_id} />
          </div>
        </TableCell>
      )}
    </TableRow>
  );
};
