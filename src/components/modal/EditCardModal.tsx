import { BasicModal } from "./BasicModals";
import { SuperSelect } from "../../UI/common";
import s from "./Modals.module.css";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useEffect } from "react";
import { useAppDispatch } from "../../bll/store";
import { Button } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { renameCardQuestionTC } from "../../bll/reducers/cards-reducer";

type PropsType = {
  cardId: string;
  question: string;
  answer: string;
  cardsPackId: string;
};

export const EditCardModal = (props: PropsType) => {
  const dispatch = useAppDispatch();
  const cards_id = props.cardId;
  const question = props.question;
  const answer = props.answer;
  const cardsPackId = props.cardsPackId;

  const Title = "Edit card";

  // чекбокс --------------------------------------------
  const TextOrImg = [
    { id: 1, value: "Text" },
    { id: 2, value: "Image" },
  ];

  // -------------------------------------------------------------

  // для инпута---------------------------------------------------------
  const [Question, setQuestion] = React.useState<string>("");
  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const [Answer, setAnswer] = React.useState<string>("");
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };
  //-----------------------------------------------------------

  useEffect(() => {
    setQuestion(question);
    setAnswer(answer);
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const changeCardQuestion = (card_id: string, Question: string, Answer: string) => {
    dispatch(
      renameCardQuestionTC({ _id: card_id, question: Question, answer: Answer }, cardsPackId)
    );
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        <BorderColorIcon className={s.icon_style} />
      </Button>

      <BasicModal open={open} handleClose={handleClose}>
        <div className={s.firstBlock}>
          <span>{Title}</span>
        </div>

        <div>
          <span>Choose a question format</span>
          <SuperSelect options={TextOrImg} />
        </div>

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
            onClick={() => changeCardQuestion(cards_id, Question, Answer)}
          >
            Save
          </Button>
        </div>
      </BasicModal>
    </>
  );
};
