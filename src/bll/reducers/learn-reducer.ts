import { AppThunk } from "../store";
import { setAppStatusAC } from "./app-reducer";
import axios from "axios";
import { learnAPI, UpdatedGradeType } from "../../dal/learnAPI";

export type InitialLearnStateType = UpdatedGradeType;

export type LearnActionType = PutAGradeACType;
export const learnReducer = (
  state: InitialLearnStateType,
  action: LearnActionType
): InitialLearnStateType => {
  switch (action.type) {
    case "PUT_A_GRAGE":
      return {
        ...state /*,
        ...action,*/,
      };
  }
};

export const putAGradeAC = (card: UpdatedGradeType) =>
  ({
    type: "PUT_A_GRAGE",
    card,
  } as const);

export type PutAGradeACType = ReturnType<typeof putAGradeAC>;

export const putAGradeTC =
  (grade: number, card_id: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    learnAPI.putAGrade(grade, card_id).then((res) => {
      dispatch(putAGradeAC(res.data));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
