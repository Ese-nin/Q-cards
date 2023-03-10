import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getCardsPackTC } from "bll/reducers/packs-reducer";
import { useAppDispatch, useAppSelector } from "bll/store";
import s from "./TablesPackList.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PATH } from "bll/Path";
import { cardPacksSelector, user_idSelector } from "bll/selectors";
import iconDown from "assets/icon/iconDown.png";
import iconUp from "assets/icon/iconUp.png";
import { PackRow } from "./tableBodies/PackRow";

export function TablesPackList() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const cardPacks = useAppSelector(cardPacksSelector);
  const meID = useAppSelector(user_idSelector);

  const [sort, setSort] = useState("");
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const user_id = params.user_id;

  useEffect(() => {
    dispatch(getCardsPackTC(user_id ? { user_id } : {}));
  }, []);

  const learnCards = (cardsPack_id: string) => {
    navigate(PATH.LEARN_PAGE + "?cardsPack_id=" + cardsPack_id);
  };

  const getPackPage = (cardsPack_id: string) => {
    navigate(PATH.PACK_PAGE + "?cardsPack_id=" + cardsPack_id);
  };

  const sortIcon = sort[0] === "0" ? iconDown : iconUp;
  const onChangeSort = (column: string) => {
    const newSort = sort === "1" + column ? "0" + column : "1" + column;

    setSort(newSort);

    dispatch(getCardsPackTC({ ...params, sortPacks: newSort, page: 1 }));
    setSearchParams({ ...params, sortPacks: newSort, page: 1 });
  };

  const tableBody = cardPacks.length ? (
    cardPacks.map((row) => (
      <PackRow
        key={row._id}
        row={row}
        meID={meID}
        getPackPage={getPackPage}
        learnCards={learnCards}
      />
    ))
  ) : (
    <div className={s.tablesNotFound}>Packs not found. Choose other search parameters.</div>
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#EFEFEF" }}>
            <TableCell align="left">Cover</TableCell>
            <TableCell>
              <button className={s.btnNamePagePack}>Name</button>
            </TableCell>
            <TableCell align="left">
              <button className={s.btnNamePagePack} onClick={() => onChangeSort("cardsCount")}>
                Cards
                {sort.slice(1) === "cardsCount" && <img src={sortIcon} alt="sort icon" />}
              </button>
            </TableCell>
            <TableCell align="left">
              <button className={s.btnNamePagePack} onClick={() => onChangeSort("updated")}>
                Last Updated
                {sort.slice(1) === "updated" && <img src={sortIcon} alt="sort icon" />}
              </button>
            </TableCell>
            <TableCell align="left">
              <button className={s.btnNamePagePack} onClick={() => onChangeSort("user_name")}>
                Created by
                {sort.slice(1) === "user_name" && <img src={sortIcon} alt="sort icon" />}
              </button>
            </TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableBody}</TableBody>
      </Table>
    </TableContainer>
  );
}
