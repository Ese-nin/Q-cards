import { BasicModal } from "./BasicModals";
import s from "./Modals.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { addNewCardTC } from "bll/reducers/cards-reducer";
import { useAppDispatch } from "bll/store";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AddImageQuestion } from "UI/pages/cards/tables/AddImageQuestion";

type PropsType = {
  cardsPackId: string;
};
export const AddNewCardModal = (props: PropsType) => {
  const dispatch = useAppDispatch();
  const cardsPack_id = props.cardsPackId;
  const Title = "Add new card";

  // отрисовка картинки в теле модалки==========================
  const [questionImg, setquestionImg] = useState("");
  const handlerChangeQuestImg = (file64: string) => {
    setquestionImg(file64);
  };

  // открыть закрыть модалку---------------------------------
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // чекбокс --------------------------------------------
  const [chose, setChose] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setChose(event.target.value as string);
  };

  // -------------------------------------------------------------

  // для инпута---------------------------------------------------------
  const [Question, setQuestion] = useState<string>("");
  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.value.trim().length) {
    setQuestion(e.target.value);
    // }
  };

  const [Answer, setAnswer] = useState<string>("");
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };
  //-----------------------------------------------------------

  const addNewCard = (Question: string, Answer: string, questionImg?: string) => {
    dispatch(
      addNewCardTC({ cardsPack_id, question: Question, answer: Answer, questionImg: questionImg })
    );
    setOpen(false);
    setQuestion("");
    setAnswer("");
    setChose("");
    setquestionImg("");
  };

  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        {Title}
      </Button>

      <BasicModal open={open} handleClose={handleClose}>
        <div className={s.firstBlock}>
          <span>{Title}</span>
        </div>

        <div>
          <span>Choose a question format</span>

          <Box sx={{ minWidth: 200, paddingTop: "15px" }}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Choose format</InputLabel>
              <Select
                labelId="select-label1"
                id="select-label"
                value={chose}
                label="Choose format"
                onChange={handleChange}
              >
                <MenuItem value={1}>Text</MenuItem>
                <MenuItem value={2}>Image</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {+chose === 1 && (
            <TextField
              id="Question"
              label="Question"
              variant="standard"
              sx={{ width: "347px" }}
              onChange={handleChangeQuestion}
              value={Question}
            />
          )}
          {+chose === 2 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <AddImageQuestion handlerChangeQuestImg={handlerChangeQuestImg} />
              {questionImg! && <img src={questionImg} alt="questionImg" className={s.imgQuest} />}
            </div>
          )}
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
          <Button variant="contained" onClick={() => addNewCard(Question, Answer, questionImg)}>
            Save
          </Button>
        </div>
      </BasicModal>
    </>
  );
};
