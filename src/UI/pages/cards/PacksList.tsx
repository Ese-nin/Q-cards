import React from "react";
import { useAppDispatch, useAppSelector } from "bll/store";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import s from "./packList.module.css";
import s2 from "./tables/TablesPackList.module.css";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { addNewCardPackTC, getCardsPackTC } from "bll/reducers/packs-reducer";
import { ChoiceCards } from "./ChoiceCards/ChoiceCards";
import { RangeSlider } from "./RangeSlider/RangeSlider";
import { SearchInput } from "./SearchInput/SearchInput";
import { PATH } from "bll/Path";
import { TablesPackList } from "./tables/TablesPackList";
import {
  cardPacksTotalCountSelector,
  isLoggedInSelector,
  pageCountPacksSelector,
  pagePacksSelector,
  user_idSelector,
} from "bll/selectors";
import { SuperButton, SuperPagination } from "UI/common";
import { AddNewPackModal } from "components/modal/AddNewPackModal";

export const PackList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const page = useAppSelector(pagePacksSelector);
  const pageCount = useAppSelector(pageCountPacksSelector);
  const cardPacksTotalCount = useAppSelector(cardPacksTotalCountSelector);

  const userID = useAppSelector(user_idSelector);

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const user_id = searchParams.get("user_id");

  const addNewCardsPack = () => {
    user_id ? dispatch(addNewCardPackTC({}, user_id)) : dispatch(addNewCardPackTC({}));
  };

  const onChangePagination = (newPage: number, newCount: number) => {
    const params = { page: newPage, pageCount: newCount };
    dispatch(getCardsPackTC({ ...searchParamsObject, ...params }));
    setSearchParams({ ...searchParamsObject, ...params });
  };

  const resetFilter = () => {
    dispatch(getCardsPackTC(user_id ? { user_id } : {}));
    setSearchParams(user_id ? { user_id } : {});
  };

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={s.page}>
      <div className={s.addNewPackLine}>
        <div>
          <h2>Packs list</h2>
        </div>
        <AddNewPackModal />
      </div>
      <div className={s.formLine}>
        <div className={s.searchField}>
          <SearchInput from={"packs"} />
        </div>
        <div>
          <ChoiceCards userID={userID} />
        </div>
        <div>
          <RangeSlider />
        </div>
        <SuperButton className={s2.button_style} onClick={resetFilter}>
          <FilterAltOffIcon />
        </SuperButton>
      </div>

      <div className={s.tableBlock}>
        <TablesPackList />
      </div>

      <div className={s.pagination}>
        <SuperPagination
          page={page}
          itemsCountForPage={pageCount}
          totalCount={cardPacksTotalCount}
          onChange={onChangePagination}
        />
      </div>
    </div>
  );
};
