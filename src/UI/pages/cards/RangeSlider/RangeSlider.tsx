import * as React from "react";
import { SyntheticEvent, useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import s from "./RangeSlider.module.css";
import { useAppDispatch, useAppSelector } from "bll/store";
import { appStatusSelector, maxCardsCountSelector, minCardsCountSelector } from "bll/selectors";
import { useSearchParams } from "react-router-dom";
import { getCardsPackTC } from "bll/reducers/packs-reducer";

export const RangeSlider = () => {
  const minCardsCount = useAppSelector(minCardsCountSelector);
  const maxCardsCount = useAppSelector(maxCardsCountSelector);
  const appStatus = useAppSelector(appStatusSelector);

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const userID = searchParams.get("user_id");

  const [values, setValues] = useState<number[]>([0, 100]);

  useEffect(() => {
    setValues([minCardsCount, maxCardsCount]);
  }, [minCardsCount, maxCardsCount]);

  const minDistance = 3;
  const changeSliderValues = (e: Event, value: number | number[], activeThumb: number) => {
    if (Array.isArray(value)) {
      if (activeThumb === 0) {
        setValues([Math.min(value[0], values[1] - minDistance), values[1]]);
      } else {
        setValues([values[0], Math.max(value[1], values[0] + minDistance)]);
      }
    }
  };

  const onChangeCommittedHandler = (e: Event | SyntheticEvent, value: number | number[]) => {
    if (Array.isArray(value)) {
      let min = value[0];
      let max = value[1];
      const params = userID ? { user_id: userID, min, max } : { min, max };
      dispatch(getCardsPackTC({ ...searchParamsObject, ...params }));
      setSearchParams({ ...searchParamsObject, ...params });
    }
  };

  return (
    <div className={s.slider}>
      <span>{values[0]}</span>
      <Slider
        min={0}
        max={maxCardsCount}
        value={values}
        onChange={changeSliderValues}
        onChangeCommitted={onChangeCommittedHandler}
        disableSwap
        disabled={appStatus === "loading"}
      />
      <span>{values[1]}</span>
    </div>
  );
};
