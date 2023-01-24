import {AxiosResponse} from "axios";
import {instance, UserDataResponseType} from "./authAPI";

export const learnAPI = {

    putAGrade(grade: number,
              card_id: string) {
        return instance.put<{}, AxiosResponse<UpdatedGradeType>, PutAGradeType>('cards/grade', {grade,card_id})
    }

}

type PutAGradeType = {

    grade: number,
    card_id: string

}

export type UpdatedGradeType= {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}