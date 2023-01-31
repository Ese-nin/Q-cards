import React, { ChangeEvent, useState } from "react";
import { Button } from "@mui/material";
import { useAppDispatch } from "bll/store";
import { convertFileToBase64 } from "bll/convertFileToBase64";

type PropsType = {
  cardsPackId: string;
  answer: string;
};

export const AddImageQuestion = (props: PropsType) => {
  const dispatch = useAppDispatch();
  const cardsPack_id = props.cardsPackId;

  const [questionImg, setquestionImg] = useState("");

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      // console.log("file: ", file);

      if (file.size < 102400) {
        convertFileToBase64(file, (file64: string) => {
          // console.log("вызов санки");
          setquestionImg(file64);
          // нельзя сразу какртинку в санку пихать, ответа нет еще!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          // dispatch(addNewCardTC({ cardsPack_id, questionImg: file64, answer: props.answer }));
          // console.log("file64: ", file64);
        });
      } else {
        alert("Error: , Файл слишком большого размера");
        console.error("Error: ", "Файл слишком большого размера");
      }
    }
  };
  return (
    <>
      {questionImg! && (
        <img
          src={questionImg}
          alt="questionImg"
          // className={s.imgAvatar}
          // onError={wrongImg}
        />
      )}

      <label>
        <input
          type="file"
          accept={"image/*"}
          onChange={uploadHandler}
          style={{ display: "none" }}
        />
        <Button variant="contained" component={"span"}>
          Загрузить вопрос в виде картинки
        </Button>
      </label>
    </>
  );
};
