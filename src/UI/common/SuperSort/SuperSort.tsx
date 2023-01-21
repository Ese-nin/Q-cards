import React from "react";
import s from "./SuperSort.module.css";
import downArrow from "./icons/iconDown.png";
import upArrow from "./icons/iconUp.png";
import noneArrows from "./icons/sort.svg";

const downIcon = downArrow;
const upIcon = upArrow;
const noneIcon = noneArrows;

export type SuperSortPropsType = {
  id?: string;
  sort: string;
  value: string;
  onChange: (newSort: string) => void;
};

export const pureChange = (sort: string, down: string, up: string) => {
  let temp = "";
  if (sort === temp) {
    temp = down;
  } else if (sort === down) {
    temp = up;
  } else if (sort === up) {
    return temp;
  } else if (sort > down && sort > up) {
    temp = down;
  }
  return temp;
};

export const SuperSort: React.FC<SuperSortPropsType> = ({
  sort,
  value,
  onChange,
  id = "hw15",
}) => {
  const up = "0" + value;
  const down = "1" + value;

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up));
  };

  const icon = sort === down ? downIcon : sort === up ? upIcon : noneIcon;

  return (
    <span id={id + "-sort-" + value} onClick={onChangeCallback}>
      <img
        className={icon === noneIcon ? s.sortIcon : s.upDownIcon}
        id={id + "-icon-" + sort}
        src={icon}
        alt={""}
      />
    </span>
  );
};
