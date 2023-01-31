import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "bll/store";
import s from "./packList.module.css";
import { deleteCardPackTC, renameCardPackTC } from "bll/reducers/packs-reducer";
import TablesPackPage from "./tables/TablesPackPage";
import { PATH } from "bll/Path";
import { getCardsPageTC } from "bll/reducers/cards-reducer";
import { SearchInput } from "./SearchInput/SearchInput";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  cardsTotalCountSelector,
  isLoggedInSelector,
  packNameSelector,
  packUserIdSelector,
  pageCardsSelector,
  pageCountCardsSelector,
  user_idSelector,
} from "bll/selectors";
import back from "assets/icon/back.svg";
import { SuperPagination } from "UI/common";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
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
  const navigate = useNavigate();
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const cardsPack_id = params.cardsPack_id;

  const BackToPackList = () => {
    navigate(PATH.PACK_LIST);
  };

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

  const renamePack = (cardPackID: string, newNameCardPack: string) => {
    dispatch(renameCardPackTC(cardPackID, newNameCardPack));
  };

  const removePack = (pack_id: string) => {
    dispatch(deleteCardPackTC(pack_id));
    navigate(-1);
  };

  return (
    <>
      <div className={s.page}>
        <div className={s.backBlock} onClick={BackToPackList}>
          <img src={back} alt="back" />
          <span>Back to Packs List</span>
        </div>
        <div className={s.addNewPackLine}>
          <div className={s.nameAndBurger}>
            <h2>{packName}</h2>
            <BurgerMenu
              packName={packName}
              renamePack={renamePack}
              removePack={removePack}
              learnCards={learnCards}
            />
          </div>

          {meID === packUserID ? (
            <AddNewCardModal cardsPackId={cardsPack_id} />
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
