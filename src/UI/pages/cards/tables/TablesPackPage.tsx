import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "bll/store";
import { Rating } from "@mui/material";
import {
  cardsSelector,
  cardsStatusSelector,
  packUserIdSelector,
  user_idSelector,
} from "bll/selectors";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCardsPageTC } from "bll/reducers/cards-reducer";
import s from "./TablesPackList.module.css";
import { PATH } from "bll/Path";
import iconDown from "assets/icon/iconDown.png";
import iconUp from "assets/icon/iconUp.png";
import { EditCardModal } from "../../../../components/modal/EditCardModal";
import { DeleteCardModal } from "../../../../components/modal/DeleteCardModal";

export default function TablesPackPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cards = useAppSelector(cardsSelector);
  const cardsStatus = useAppSelector(cardsStatusSelector);
  const meID = useAppSelector(user_idSelector);
  const packUserID = useAppSelector(packUserIdSelector);

  const [sort, setSort] = useState("");
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const cardsPack_id = params.cardsPack_id;

  useEffect(() => {
    dispatch(getCardsPageTC({ cardsPack_id }));
  }, []);

  const sortIcon = sort[0] === "0" ? iconDown : iconUp;

  const onChangeSort = (column: string) => {
    const newSort = sort === "1" + column ? "0" + column : "1" + column;
    setSort(newSort);

    dispatch(getCardsPageTC({ cardsPack_id, sortCards: newSort, page: 1 }));

    setSearchParams({ ...params, sortPacks: newSort, page: 1 });
  };

  console.log(cards);

  if (!cards.length && cardsStatus !== "loading") {
    navigate(PATH.PACK_PAGE_EMPTY + "?cardsPack_id=" + cardsPack_id);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#EFEFEF" }}>
            <TableCell>Question</TableCell>
            <TableCell align="left">Answer</TableCell>
            <TableCell align="left">
              <button className={s.btnNamePagePack} onClick={() => onChangeSort("updated")}>
                Last Updated
                {sort.slice(1) === "updated" && <img src={sortIcon} alt="sort icon" />}
              </button>
            </TableCell>
            <TableCell align="left">
              <button className={s.btnNamePagePack} onClick={() => onChangeSort("grade")}>
                Grade
                {sort.slice(1) === "grade" && <img src={sortIcon} alt="sort icon" />}
              </button>
            </TableCell>
            {meID === packUserID && <TableCell align="left">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map((row) => (
            <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.question}{" "}
              </TableCell>
              <TableCell align="left">{row.answer}</TableCell>
              <TableCell align="left">
                {new Date(row.updated).getDate()}.
                {new Date(row.updated).getMonth() < 10
                  ? new Date(row.updated).getMonth() + "1"
                  : new Date(row.updated).getMonth() + 1}
                .{new Date(row.updated).getFullYear()}
              </TableCell>
              <TableCell align="left">
                <Rating name="half-rating" defaultValue={row.grade} precision={0.5} />
              </TableCell>

              {meID === row.user_id && (
                <TableCell align="left">
                  <div
                    style={{
                      display: "flex",
                      marginTop: "15px",
                      marginBottom: "5px",
                    }}
                  >
                    <EditCardModal
                      cardId={row._id}
                      question={row.question}
                      answer={row.answer}
                      cardsPackId={row.cardsPack_id}
                    />
                    <DeleteCardModal id={row._id} name={row.answer} cardsPack_id={cardsPack_id} />
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
