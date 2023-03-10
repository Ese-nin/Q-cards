import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "bll/store";
import { getCardsPackTC } from "bll/reducers/packs-reducer";
import { useSearchParams } from "react-router-dom";
import { appStatusSelector } from "bll/selectors";
import Button from "@mui/material/Button";

type ChoiceCardsPropsType = {
  userID: string;
};

export const ChoiceCards: React.FC<ChoiceCardsPropsType> = ({ userID }) => {
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const dispatch = useAppDispatch();

  const appStatus = useAppSelector(appStatusSelector);

  const chooseCards = useCallback((user_id: string) => {
    const checkUserID = user_id.length ? { user_id } : {};
    dispatch(getCardsPackTC(checkUserID));

    setSearchParams(checkUserID);
  }, []);

  const disabled = appStatus === "loading";

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <Button
        disabled={disabled}
        variant={params.user_id ? "contained" : "outlined"}
        onClick={() => chooseCards(userID)}
      >
        My
      </Button>
      <Button
        disabled={disabled}
        variant={params.user_id ? "outlined" : "contained"}
        onClick={() => chooseCards("")}
      >
        All
      </Button>
    </div>
  );
};
