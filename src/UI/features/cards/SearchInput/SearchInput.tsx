import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { SuperInputText } from "UI/common";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type SuperDebouncedInputPropsType = Omit<
  DefaultInputPropsType,
  "type"
> & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: ReactNode;
  spanClassName?: string;
} & {
  onDebouncedChange?: (value: string) => void;
};

export const SearchInput: React.FC<SuperDebouncedInputPropsType> = ({
  onChangeText,
  onDebouncedChange,

  ...restProps
}) => {
  const [timerId, setTimerId] = useState<number | undefined>(undefined);

  const onChangeTextCallback = (value: string) => {
    onChangeText?.(value);

    if (onDebouncedChange) {
      setTimerId(undefined);
      setTimeout(() => {
        onDebouncedChange(value);
      }, 800);
    }
  };

  return <SuperInputText onChangeText={onChangeTextCallback} {...restProps} />;
};
