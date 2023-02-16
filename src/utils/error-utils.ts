import { AppActionsType, changeAppErrorAC, setAppStatusAC } from "../bll/reducers/app-reducer";
import { Dispatch } from "redux";
import { AxiosError } from "axios";

export const handleServerNetworkError = (
  err: AxiosError<{ error: string }>,
  dispatch: ErrorUtilsDispatchType
) => {
  const error = err.response ? err.response.data.error : err.message;
  dispatch(changeAppErrorAC(error));
  dispatch(setAppStatusAC("failed"));
};

type ErrorUtilsDispatchType = Dispatch<AppActionsType>;
