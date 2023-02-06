import { BasicModal } from "./BasicModals";
import s from "./Modals.module.css";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useState } from "react";
import { useAppDispatch } from "../../bll/store";
import { Button } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { renameCardQuestionTC } from "../../bll/reducers/cards-reducer";
import { AddImageQuestion } from "../../UI/pages/cards/tables/AddImageQuestion";

type PropsType = {
  cardId: string;
  answer: string;
  cardsPackId: string;
  questionImg: string;
};

export const EditCardModal = (props: PropsType) => {
  const dispatch = useAppDispatch();
  const cards_id = props.cardId;
  const answer = props.answer;
  const cardsPackId = props.cardsPackId;

  const Title = "Edit card";

  // -------------------------------------------------------------

  // отрисовка картинки в теле модалки==========================
  const [questionImg, setquestionImg] = useState(props.questionImg);
  const handlerChangeQuestImg = (file64: string) => {
    setquestionImg(file64);
  };
  // для инпута---------------------------------------------------------

  const [Answer, setAnswer] = React.useState<string>(answer);
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };
  //-----------------------------------------------------------

  const [open, setOpen] = React.useState(false);

  const [cover, setCover] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const changeCardQuestion = (card_id: string, questionImg: string, Answer: string) => {
    dispatch(
      renameCardQuestionTC({ _id: card_id, questionImg: questionImg, answer: Answer }, cardsPackId)
    );
    setOpen(false);
  };

  return (
    <>
      <button title={"edit"} onClick={handleOpen} className={s.button_style}>
        <BorderColorIcon className={s.icon_style} />
      </button>

      <BasicModal open={open} handleClose={handleClose}>
        <div className={s.firstBlock}>
          <span>{Title}</span>
        </div>
        <div style={{ margin: "auto" }}>
          <img src={questionImg} alt="questionImg" className={s.imgQuest} />
        </div>
        <AddImageQuestion handlerChangeQuestImg={handlerChangeQuestImg} />
        <div>
          <TextField
            id="Answer"
            label="Answer"
            variant="standard"
            sx={{ width: "347px" }}
            onChange={handleChangeAnswer}
            value={Answer}
          />
        </div>
        <div className={s.saveBlock}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => changeCardQuestion(cards_id, questionImg, Answer)}
          >
            Save
          </Button>
        </div>
      </BasicModal>
    </>
  );
};
