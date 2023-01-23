import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { SuperInputText } from "UI/common";
import { useDebounce } from "utils/hooks/useDebounce";
import { useAppDispatch } from "bll/store";
import { getCardsPackTC } from "../../../../bll/reducers/packs-reducer";
import { getCardsPageTC } from "../../../../bll/reducers/cards-reducer";
import { useSearchParams } from "react-router-dom";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type SuperDebouncedInputPropsType = Omit<DefaultInputPropsType, "type"> & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: ReactNode;
  spanClassName?: string;
} & {
  onDebouncedChange?: (value: string) => void;
  type: "packs" | "cards";
};

export const SearchInput: React.FC<SuperDebouncedInputPropsType> = ({
  onChangeText,
  onDebouncedChange,
  type,

  ...restProps
}) => {
  const dispatch = useAppDispatch();

  const [searchParams]: [URLSearchParams, Function] = useSearchParams();
  const searchParamsObject = Object.fromEntries(searchParams);
  const cardsPack_id = searchParamsObject.cardsPack_id;

  const [find, setFind] = useState("");
  const [isFirstLoad, setFirstLoad] = useState(true);

  const searchDebouncedValue = useDebounce<string>(find, 600);

  const onChangeHandler = (value: string) => {
    setFind(value);
  };

  useEffect(() => {
    if (!isFirstLoad) {
      if (type === "packs") {
        dispatch(getCardsPackTC({ ...searchParamsObject, packName: find }));
      } else if (type === "cards") {
        cardsPack_id && dispatch(getCardsPageTC({ cardsPack_id, cardQuestion: find }));
      }
    }

    if (isFirstLoad) {
      setFirstLoad(false);
    }
  }, [searchDebouncedValue]);

  return (
    <SuperInputText
      value={find}
      onChangeText={onChangeHandler}
      placeholder={"Search"}
      {...restProps}
    />
  );
};