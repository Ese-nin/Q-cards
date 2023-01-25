import React, { ChangeEvent, useState } from "react";
import { Pagination } from "@mui/material";
import s from "./SuperPagination.module.css";
import { SuperSelect } from "../c5-SuperSelect/SuperSelect";
import { useAppSelector } from "../../../bll/store";
import { appStatusSelector } from "../../../bll/selectors";

export type SuperPaginationPropsType = {
  id?: string;
  page: number;
  itemsCountForPage: number;
  totalCount: number;
  onChange: (page: number, count: number) => void;
};

export const SuperPagination: React.FC<SuperPaginationPropsType> = ({
  page,
  itemsCountForPage,
  totalCount,
  id = "hw15",
  onChange,
}) => {
  const lastPage = Math.ceil(totalCount / itemsCountForPage);

  const appStatus = useAppSelector(appStatusSelector);

  const [localPage, setLocalPage] = useState(page);

  const onChangeCallback = (event: ChangeEvent<unknown>, page: number) => {
    onChange(page, itemsCountForPage);
    setLocalPage(page);
  };

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(1, +event.currentTarget.value);
    setLocalPage(1);
  };

  const disabled = appStatus === "loading";

  return (
    <div className={s.pagination}>
      <Pagination
        disabled={disabled}
        id={id + "-pagination"}
        page={localPage}
        count={lastPage}
        onChange={onChangeCallback}
        hideNextButton
        hidePrevButton
        variant="outlined"
        color="primary"
      />

      <span className={s.text1}>Show</span>

      <SuperSelect
        disabled={disabled}
        id={id + "-pagination-select"}
        value={itemsCountForPage}
        options={[
          { id: 4, value: 4 },
          { id: 7, value: 7 },
          { id: 10, value: 10 },
        ]}
        onChange={onChangeSelect}
      />

      <span className={s.text2}>Items per Page</span>
    </div>
  );
};
