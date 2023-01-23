import * as React from "react";
import { useEffect, useState } from "react";
import Slider, { SliderProps } from "@mui/material/Slider";
import s from "./RangeSlider.module.css";
import { useAppDispatch, useAppSelector } from "bll/store";
import { maxCardsCountSelector, minCardsCountSelector } from "bll/selectors";
import { useDebounce } from "utils/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { getCardsPackTC } from "bll/reducers/packs-reducer";

export const RangeSlider: React.FC<SliderProps> = () => {
  const minCardsCount = useAppSelector(minCardsCountSelector);
  const maxCardsCount = useAppSelector(maxCardsCountSelector);

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const userID = searchParams.get("user_id");

  const [values, setValues] = useState([minCardsCount || 0, maxCardsCount || 100]);
  const [isFirstLoad, setFirstLoad] = useState(true);
  const [isSecondLoad, setSecondLoad] = useState(true);

  const sliderDebouncedValue = useDebounce<number[]>(values, 600);

  useEffect(() => {
    setValues([minCardsCount, maxCardsCount]);
  }, [maxCardsCount, minCardsCount]);

  useEffect(() => {
    if (!isFirstLoad && !isSecondLoad) {
      let min = values[0];
      let max = values[1];
      const params = userID ? { user_id: userID, min, max } : { min, max };
      dispatch(getCardsPackTC({ ...searchParamsObject, ...params }));
      setSearchParams({ ...searchParamsObject, ...params });
    }

    if (isFirstLoad) {
      setFirstLoad(false);
    }
    if (!isFirstLoad && isSecondLoad) {
      setSecondLoad(false);
    }
  }, [sliderDebouncedValue]);

  const minDistance = 5;
  const changeSliderValues = (event: Event, value: number | number[], activeThumb: number) => {
    if (!Array.isArray(value)) {
      return;
    }

    if (activeThumb === 0) {
      setValues([Math.min(value[0], values[1] - minDistance), values[1]]);
    } else {
      setValues([values[0], Math.max(value[1], values[0] + minDistance)]);
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
        disableSwap
      />
      <span>{values[1]}</span>
    </div>
  );
};
