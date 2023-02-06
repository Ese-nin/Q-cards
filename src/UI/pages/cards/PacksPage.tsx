import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "bll/store";
import s from "./packList.module.css";
import TablesPackPage from "./tables/TablesPackPage";
import { PATH } from "bll/Path";
import { getCardsPageTC } from "bll/reducers/cards-reducer";
import { SearchInput } from "./SearchInput/SearchInput";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  cardPacksSelector,
  cardsTotalCountSelector,
  isLoggedInSelector,
  packNameSelector,
  packUserIdSelector,
  pageCardsSelector,
  pageCountCardsSelector,
  user_idSelector,
} from "bll/selectors";
import back from "assets/icon/back.svg";
import defaultCover from "assets/icon/defaultCard.jpg";
import { SuperPagination } from "UI/common";
import { AddNewCardModal } from "components/modal/AddNewCardModal";

export const PackPage = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const page = useAppSelector(pageCardsSelector);
  const pageCount = useAppSelector(pageCountCardsSelector);
  const cardsTotalCount = useAppSelector(cardsTotalCountSelector);
  const packName = useAppSelector(packNameSelector);
  const meID = useAppSelector(user_idSelector);
  const packUserID = useAppSelector(packUserIdSelector);
  const packs = useAppSelector(cardPacksSelector);
  const navigate = useNavigate();

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const cardsPack_id = params.cardsPack_id;

  const backToPackList = () => {
    navigate(PATH.PACK_LIST);
  };

  const pack = packs.find((p) => p._id === cardsPack_id);

  const onChangePagination = (page: number, pageCount: number) => {
    dispatch(getCardsPageTC({ ...params, cardsPack_id, page, pageCount }));
    setSearchParams({ ...params, page, pageCount });
  };

  const learnCards = useCallback(() => {
    navigate(PATH.LEARN_PAGE + "?cardsPack_id=" + cardsPack_id);
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <>
      <div className={s.page}>
        <div className={s.backBlock} onClick={backToPackList}>
          <img src={back} alt="back" />
          <span>Back to Packs List</span>
        </div>

        <div className={s.addNewPackLine}>
          <div>
            <div>
              <h2>{packName}</h2>
            </div>
            {pack && (
              <img
                className={s.packCover}
                src={pack.deckCover ? pack.deckCover : defaultCover}
                alt="pack cover"
              />
            )}
          </div>

          {meID === packUserID ? (
            <div className={s.buttonsBlock}>
              <AddNewCardModal cardsPackId={cardsPack_id} />
              <Button variant="contained" onClick={learnCards}>
                Learn to pack
              </Button>
            </div>
          ) : (
            <Button variant="contained" onClick={learnCards}>
              {" "}
              Learn to pack{" "}
            </Button>
          )}
        </div>

        <div className={s.formLine}>
          <div className={s.searchFieldCards}>
            <SearchInput from={"cards"} />
          </div>
        </div>
        <div className={s.tableBlock}>
          <TablesPackPage />
        </div>
        <div className={s.pagination}>
          <SuperPagination
            page={page}
            itemsCountForPage={pageCount}
            totalCount={cardsTotalCount}
            onChange={onChangePagination}
          />
        </div>
      </div>
    </>
  );
};
