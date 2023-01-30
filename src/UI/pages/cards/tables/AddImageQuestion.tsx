import React, { ChangeEvent } from "react";
import { Button } from "@mui/material";
import { useAppDispatch } from "bll/store";
import { convertFileToBase64 } from "bll/convertFileToBase64";

export const AddImageQuestion = () => {
  const dispatch = useAppDispatch();

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      // console.log("file: ", file);

      if (file.size < 102400) {
        convertFileToBase64(file, (file64: string) => {
          // console.log("вызов санки");
          // dispatch();
          // console.log("file64: ", file64);
        });
      } else {
        alert("Error: , Файл слишком большого размера");
        console.error("Error: ", "Файл слишком большого размера");
      }
    }
  };
  return (
    <label>
      <input type="file" accept={"image/*"} onChange={uploadHandler} style={{ display: "none" }} />
      <Button variant="contained" component={"span"}>
        Загрузить вопрос в виде картинки
      </Button>
    </label>
  );
};
