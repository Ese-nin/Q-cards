import React, { ChangeEvent } from "react";
import { Button } from "@mui/material";
import { convertFileToBase64 } from "bll/convertFileToBase64";

type PropsType = {
  setCover: (file64: string) => void;
};

export const AddImageCover = (props: PropsType) => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < 102400) {
        convertFileToBase64(file, (file64: string) => {
          props.setCover(file64);
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
        Загрузить обложку для колоды
      </Button>
    </label>
  );
};
