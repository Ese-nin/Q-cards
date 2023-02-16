import React, { ChangeEvent, useState } from "react";
import { IconButton } from "@mui/material";
import PartyModeIcon from "@mui/icons-material/PartyMode";
import defaultAvatar from "./Ellipse 45.png";
import s from "./profile.module.css";
import { setNewNameTC } from "bll/reducers/auth-reducer";
import { useAppDispatch, useAppSelector } from "bll/store";
import { avatarSelector, nameSelector } from "bll/selectors";
import { convertFileToBase64 } from "bll/convertFileToBase64";

export const InputTypeFile = () => {
  const dispatch = useAppDispatch();
  const Name = useAppSelector(nameSelector);
  const Avatar = useAppSelector(avatarSelector);

  const [isAvaBroken, setIsAvaBroken] = useState(false);

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      // console.log("file: ", file);

      if (file.size < 102400) {
        convertFileToBase64(file, (file64: string) => {
          // console.log("вызов санки");
          dispatch(setNewNameTC(Name, file64));
          // console.log("file64: ", file64);
        });
      } else {
        alert("Error: , Файл слишком большого размера");
        console.error("Error: ", "Файл слишком большого размера");
      }
    }
  };
  console.log({ Avatar });

  const wrongImg = () => {
    setIsAvaBroken(true);
  };

  return (
    <>
      <img
        src={isAvaBroken ? defaultAvatar : Avatar}
        alt="avatar"
        className={s.imgAvatar}
        onError={wrongImg}
      />
      <IconButton component="label">
        <PartyModeIcon />
        <input
          type="file"
          accept={"image/*"}
          onChange={uploadHandler}
          style={{ display: "none" }}
        />
      </IconButton>
    </>
  );
};
