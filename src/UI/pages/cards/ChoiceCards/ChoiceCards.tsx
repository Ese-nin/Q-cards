import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "bll/store";
import { getCardsPackTC } from "bll/reducers/packs-reducer";
import { useSearchParams } from "react-router-dom";
import { SuperButton } from "UI/common";
import { appStatusSelector } from "../../../../bll/selectors";

type ChoiceCardsPropsType = {
  userID: string;
};

export const ChoiceCards: React.FC<ChoiceCardsPropsType> = ({ userID }) => {
  const [searchParams, setSearchParams]: [URLSearchParams, Function] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const dispatch = useAppDispatch();

  const appStatus = useAppSelector(appStatusSelector);

  const chooseCards = useCallback((user_id: string) => {
    dispatch(getCardsPackTC({ user_id }));

    setSearchParams({ user_id });
  }, []);

  const disabled = appStatus === "loading";

  return (
    <div>
      <SuperButton
        disabled={disabled}
        xType={params.user_id ? "" : "secondary"}
        onClick={() => chooseCards(userID)}
      >
        My
      </SuperButton>
      <SuperButton
        disabled={disabled}
        xType={params.user_id ? "secondary" : ""}
        onClick={() => chooseCards("")}
      >
        All
      </SuperButton>
    </div>
  );
};
