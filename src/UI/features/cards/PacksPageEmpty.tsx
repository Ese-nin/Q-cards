import React from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../bll/store";
import s from "./packList.module.css";
import { PATH } from "../../../bll/Path";
import { addNewCardTC } from "../../../bll/reducers/cards-reducer";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { isLoggedInSelector, packNameSelector } from "../../../bll/selectors";
import back from "../../../assets/icon/back.svg";
import { AddNewCardModal } from "../../../components/modal/AddNewCardModal";

export const PackPageEmpty = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const packName = useAppSelector(packNameSelector);
  const navigate = useNavigate();
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const cardsPack_id = params.cardsPack_id;

  const addNewCard = (question: string) => {
    dispatch(addNewCardTC({ cardsPack_id, question }));
    setSearchParams({ ...params, cardsPack_id, cardQuestion: question });
  };

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  const BackToPackList = () => {
    navigate(PATH.PACK_LIST);
  };

  return (
    <div className={s.page}>
      <div className={s.backBlock} onClick={BackToPackList}>
        <img src={back} alt="back" />
        <span>Back to Packs List</span>
      </div>
      <div className={s.addNewPackLine}>
        <div className={s.nameAndBurger}>
          <h2>{packName}</h2>
        </div>
      </div>
      <div className={s.emptyCenterBlock}>
        <span>This pack is empty. Click add new card to fill this pack</span>
        <Button variant="outlined" onClick={() => addNewCard("New question")}>
          Add New Card
        </Button>
        эта кнопка для модалки
        <AddNewCardModal />
      </div>
    </div>
  );
};
