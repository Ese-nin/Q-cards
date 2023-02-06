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
import {
  appStatusSelector,
  cardsSelector,
  packUserIdSelector,
  user_idSelector,
} from "bll/selectors";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCardsPageTC } from "bll/reducers/cards-reducer";
import s from "./TablesPackList.module.css";
import { PATH } from "bll/Path";
import iconDown from "assets/icon/iconDown.png";
import iconUp from "assets/icon/iconUp.png";
import { CardRow } from "./tableBodies/CardRow";

export default function TablesPackPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cards = useAppSelector(cardsSelector);
  const appStatus = useAppSelector(appStatusSelector);
  const meID = useAppSelector(user_idSelector);
  const packUserID = useAppSelector(packUserIdSelector);

  const [sort, setSort] = useState("");
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const cardsPack_id = params.cardsPack_id;
  const cardQuestion = params.cardQuestion;

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

  if (!cards.length && appStatus !== "loading" && !cardQuestion) {
    navigate(PATH.PACK_PAGE_EMPTY + "?cardsPack_id=" + cardsPack_id);
  }

  const tableBody =
    !cards.length && cardQuestion && appStatus !== "loading" ? (
      <div className={s.tablesNotFound}>Cards not found. Choose other search parameters</div>
    ) : (
      cards.map((row) => (
        <CardRow key={row._id} row={row} cardsPack_id={cardsPack_id} meID={meID} />
      ))
    );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#EFEFEF" }}>
            {/*здесь добавить проверку на наличие questionImg - если его нет то отображается письменный вопрос*/}
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
        <TableBody>{tableBody}</TableBody>
      </Table>
    </TableContainer>
  );
}
