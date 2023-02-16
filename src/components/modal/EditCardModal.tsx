import { BasicModal } from "./BasicModals";
import s from "./Modals.module.css";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../bll/store";
import { Button } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { renameCardQuestionTC } from "../../bll/reducers/cards-reducer";
import { AddImageQuestion } from "../../UI/pages/cards/tables/AddImageQuestion";

type PropsType = {
  cardId: string;
  question: string;
  answer: string;
  cardsPackId: string;
  questionImg: string;
};

export const EditCardModal = (props: PropsType) => {
  const dispatch = useAppDispatch();
  const cards_id = props.cardId;
  const question = props.question;
  const answer = props.answer;
  const cardsPackId = props.cardsPackId;

  const Title = "Edit card";

  // -------------------------------------------------------------

  // отрисовка картинки в теле модалки==========================
  const [questionImg, setQuestionImg] = useState(props.questionImg);
  const handlerChangeQuestImg = (file64: string) => {
    setQuestionImg(file64);
  };
  // для инпута---------------------------------------------------------

  const [Question, setQuestion] = useState<string>(question);
  const handleChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const [Answer, setAnswer] = useState<string>(answer);
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };
  //-----------------------------------------------------------

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const changeCardQuestion = (
    card_id: string,
    questionImg: string,
    Question: string,
    Answer: string
  ) => {
    dispatch(
      renameCardQuestionTC(
        { _id: card_id, questionImg: questionImg, question: Question, answer: Answer },
        cardsPackId
      )
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
            id="Question"
            label="Question"
            variant="standard"
            sx={{ width: "347px" }}
            onChange={handleChangeQuestion}
            value={Question}
          />
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
            onClick={() => changeCardQuestion(cards_id, questionImg, Question, Answer)}
          >
            Save
          </Button>
        </div>
      </BasicModal>
    </>
  );
};
